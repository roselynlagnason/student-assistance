import React, { useState } from "react";

const API_URL = "https://student-assistance-six.vercel.app";

function Login({ goTo, setLoggedInUser }) {
  const [form, setForm] = useState({
    name: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name: form.name,
          password: form.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid name or password.");
        return;
      }

      // Save logged-in user
      setLoggedInUser(data.user);

      localStorage.setItem(
        "passcheckerLoggedIn",
        "true"
      );

      localStorage.setItem(
        "passcheckerUser",
        JSON.stringify(data.user)
      );

      // Clear form
      setForm({
        name: "",
        password: ""
      });

      setShowPassword(false);

      // Go to dashboard
      goTo("dashboard");

    } catch (error) {
      setError(
        "Cannot connect to the server. Please make sure the backend is running."
      );
    }
  }

  return (
    <main className="page">

      <div className="card login-card">

        {/* BACK */}

        <button
          type="button"
          className="back-button"
          onClick={() => goTo("welcome")}
        >
          ← Back
        </button>


        {/* HEADER */}

        <div className="form-header">

          <div className="small-logo">
            🎓
          </div>

          <p className="portal-label">
            STUDENT SERVICES
          </p>

          <h1>
            Welcome Back
          </h1>

          <p className="subtitle">
            Login to continue to your student portal.
          </p>

        </div>


        {/* LOGIN FORM */}

        <form onSubmit={handleSubmit}>

          {/* NAME */}

          <label htmlFor="loginName">
            Full Name
          </label>

          <input
            id="loginName"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your registered name"
            autoComplete="name"
            required
          />


          {/* PASSWORD */}

          <label htmlFor="loginPassword">
            Password
          </label>

          <div className="password-field">

            <input
              id="loginPassword"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

            <button
  type="button"
  className="password-toggle"
  onClick={() => setShowPassword(!showPassword)}
  aria-label={showPassword ? "Hide password" : "Show password"}
>
  {showPassword ? "○" : "◉"}
</button>

          </div>


          {/* ERROR */}

          {error && (
            <p className="error-text">
              {error}
            </p>
          )}


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="register-button"
          >
            Login to Portal
          </button>

        </form>


        {/* REGISTER */}

        <div className="switch-page">

          <span>
            Don't have an account?
          </span>

          <button
            type="button"
            onClick={() => goTo("register")}
          >
            Create Account
          </button>

        </div>

      </div>

    </main>
  );
}

export default Login;