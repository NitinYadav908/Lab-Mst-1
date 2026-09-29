import React, { useState } from "react";

function PostManager({ role, posts, setPosts }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  const isAdmin = role === "Admin";

  const createPost = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter title and content.");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim()
    };

    setPosts((currentPosts) => [
      ...currentPosts,
      newPost
    ]);

    setTitle("");
    setContent("");
  };

  const startEdit = (post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
  };

  const updatePost = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter title and content.");
      return;
    }

    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === editingId
          ? {
              ...post,
              title: title.trim(),
              content: content.trim()
            }
          : post
      )
    );

    setEditingId(null);
    setTitle("");
    setContent("");
  };

  const deletePost = (id) => {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== id)
    );
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
  };

  return (
    <section className="post-section">
      <div className="section-heading">
        <div>
          <p className="section-label">
            CONTENT MANAGEMENT
          </p>

          <h2>Posts</h2>
        </div>

        <span
          className={`access-pill ${
            isAdmin ? "admin" : "viewer"
          }`}
        >
          {isAdmin ? "Admin Controls" : "Read Only"}
        </span>
      </div>

      {isAdmin && (
        <div className="post-editor">
          <h3>
            {editingId
              ? "Edit Post"
              : "Create New Post"}
          </h3>

          <div className="post-form">
            <input
              type="text"
              placeholder="Post title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <textarea
              placeholder="Write your post..."
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
              rows="5"
            />

            <div className="editor-actions">
              {editingId ? (
                <>
                  <button
                    className="update-button"
                    onClick={updatePost}
                  >
                    Update Post
                  </button>

                  <button
                    className="cancel-button"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="create-button"
                  onClick={createPost}
                >
                  Create Post
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="posts-list">
        <div className="posts-header">
          <h3>Available Posts</h3>

          <span>
            {posts.length}{" "}
            {posts.length === 1 ? "post" : "posts"}
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="empty-posts">
            <div>📝</div>

            <h3>No posts available</h3>

            <p>
              {isAdmin
                ? "Create your first post."
                : "There are currently no posts to view."}
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <article
              className="post-card"
              key={post.id}
            >
              <div className="post-content">
                <div className="post-top">
                  <h3>{post.title}</h3>

                  <span>Published</span>
                </div>

                <p>{post.content}</p>
              </div>

              {isAdmin && (
                <div className="post-actions">
                  <button
                    className="edit-button"
                    onClick={() =>
                      startEdit(post)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-post-button"
                    onClick={() =>
                      deletePost(post.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default PostManager;