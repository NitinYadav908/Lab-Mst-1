import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const login = (role) => {
    if (username.trim() === "") {
      setError("Please enter your username.");
      return;
    }

    setError("");
    onLogin(username.trim(), role);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="brand-icon">
          🔐
        </div>

        <h1>Role-Based Login</h1>

        <p className="subtitle">
          Sign in and access your personalized dashboard
        </p>

        <div className="form-group">
          <label>Username</label>

          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="login-buttons">
          <button
            className="admin-login"
            onClick={() => login("Admin")}
          >
            Login as Admin
          </button>

          <button
            className="viewer-login"
            onClick={() => login("Viewer")}
          >
            Login as Viewer
          </button>
        </div>

        <div className="login-info">
          <span>Admin</span>
          <span>Full access</span>
        </div>

        <div className="login-info">
          <span>Viewer</span>
          <span>Read-only access</span>
        </div>
      </div>
    </div>
  );
}

export default Login;