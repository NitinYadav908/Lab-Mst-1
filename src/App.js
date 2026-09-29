import React, { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Welcome to RoleAccess",
      content: "This is a sample post visible to both Admin and Viewer."
    }
  ]);

  const handleLogin = (username, role) => {
    setUser({
      username,
      role
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="app">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard
          user={user}
          posts={posts}
          setPosts={setPosts}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;