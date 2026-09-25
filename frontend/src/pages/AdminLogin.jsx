import React, { useState } from "react";

const API_URL = "https://student-assistance-six.vercel.app";

function AdminLogin({ goTo, setAdminAuthenticated }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Incorrect admin password."
        );

        return;
      }

      sessionStorage.setItem(
        "adminAuthenticated",
        "true"
      );

      setAdminAuthenticated(true);
      setPassword("");

      goTo("admin");

    } catch (error) {
      console.error("ADMIN LOGIN ERROR:", error);

      setError(
        "Cannot connect to the server. Please make sure the backend is running."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-login-logo">
          🎓
        </div>

        <p className="admin-login-label">
          STUDENT SERVICES
        </p>

        <h1>
          Administrator Sign In
        </h1>

        <p className="admin-login-description">
          Restricted access to student assistance
          administration records.
        </p>

        <form onSubmit={handleSubmit}>

          <label htmlFor="adminPassword">
            Administrator Password
          </label>

          <div className="admin-password-field">

            <input
              id="adminPassword"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter administrator password"
              required
            />

            <button
              type="button"
              className="admin-password-toggle"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? "🙈" : "👁️"}
            </button>

          </div>

          {error && (
            <p className="admin-login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading
              ? "Verifying..."
              : "Sign In"}
          </button>

        </form>

        <button
          type="button"
          className="admin-back-button"
          onClick={() => goTo("welcome")}
        >
          ← Back to Student Portal
        </button>

        <div className="admin-login-note">
          🔒 Authorized administration access only
        </div>

      </div>

    </main>
  );
}

export default AdminLogin;