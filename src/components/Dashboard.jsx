import React from "react";
import PostManager from "./PostManager";

function Dashboard({
  user,
  posts,
  setPosts,
  onLogout
}) {
  const isAdmin = user.role === "Admin";

  return (
    <div className="dashboard-page">
      <nav className="navbar">
        <div className="nav-brand">
          <span className="nav-logo">🔐</span>
          RoleAccess
        </div>

        <div className="nav-right">
          <span className="nav-role">
            {user.role}
          </span>

          <button
            className="logout-button"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-container">
        <div className="welcome-card">
          <div className="profile-circle">
            {user.username.charAt(0).toUpperCase()}
          </div>

          <div className="welcome-content">
            <p className="welcome-label">
              WELCOME BACK
            </p>

            <h1>
              Welcome, {user.username}
            </h1>

            <span
              className={`role-badge ${
                isAdmin ? "admin" : "viewer"
              }`}
            >
              {user.role}
            </span>
          </div>
        </div>

        <div className="content-grid">
          <div className="access-card">
            <div className="card-icon">
              {isAdmin ? "⚡" : "👁️"}
            </div>

            <h2>
              {isAdmin
                ? "Administrator Access"
                : "Viewer Access"}
            </h2>

            <p>
              {isAdmin
                ? "You can create, view, edit and delete posts."
                : "You have read-only access and can only view posts."}
            </p>

            <div className="permission-list">
              <div>
                <span>✓</span> View Posts
              </div>

              <div>
                <span>{isAdmin ? "✓" : "×"}</span>
                Create Posts
              </div>

              <div>
                <span>{isAdmin ? "✓" : "×"}</span>
                Edit Posts
              </div>

              <div>
                <span>{isAdmin ? "✓" : "×"}</span>
                Delete Posts
              </div>
            </div>
          </div>

          <div className="account-card">
            <h2>Account Information</h2>

            <div className="info-row">
              <span>Username</span>
              <strong>{user.username}</strong>
            </div>

            <div className="info-row">
              <span>Role</span>
              <strong>{user.role}</strong>
            </div>

            <div className="info-row">
              <span>Access Level</span>
              <strong>
                {isAdmin ? "Full Access" : "Read Only"}
              </strong>
            </div>

            <div className="info-row">
              <span>Status</span>
              <strong className="active-status">
                ● Active
              </strong>
            </div>
          </div>
        </div>

        <PostManager
          role={user.role}
          posts={posts}
          setPosts={setPosts}
        />
      </main>
    </div>
  );
}

export default Dashboard;