import React, { useState } from "react";

const API_URL = "https://student-assistance-six.vercel.app";

function Register({ goTo, setRegisteredUser }) {
  const [form, setForm] = useState({
    name: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setError("");
  }

  // Password requirements
  const passwordRequirements = {
    length: form.password.length >= 8,
    uppercase: /[A-Z]/.test(form.password),
    lowercase: /[a-z]/.test(form.password),
    number: /[0-9]/.test(form.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(form.password)
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!passwordRequirements.length) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!passwordRequirements.uppercase) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!passwordRequirements.lowercase) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    if (!passwordRequirements.number) {
      setError("Password must contain at least one number.");
      return;
    }

    if (!passwordRequirements.special) {
      setError("Password must contain at least one special character.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/register`, {
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
        setError(data.message || "Registration failed.");
        return;
      }

      const user = {
        name: form.name
      };

      setRegisteredUser(user);

      localStorage.setItem(
        "passcheckerUser",
        JSON.stringify(user)
      );

      setForm({
        name: "",
        password: "",
        confirmPassword: ""
      });

      setShowPassword(false);
      setShowConfirmPassword(false);

      goTo("login");

    } catch {
      setError(
        "Cannot connect to the server. Please try again."
      );
    }
  }

  return (
    <main className="page">
      <div className="card">

        <button
          type="button"
          className="back-button"
          onClick={() => goTo("welcome")}
        >
          ← Back
        </button>

        <div className="form-header">

          <div className="small-logo">
            🎓
          </div>

          <p className="portal-label">
            STUDENT SERVICES
          </p>

          <h1>Create Account</h1>

          <p className="subtitle">
            Register to access the Student Assistance Portal.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <label htmlFor="name">
            Full Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="password">
            Password
          </label>

          <div className="password-field">

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? "🙈" : "👁️"}
            </button>

          </div>

          {/* PASSWORD REQUIREMENTS */}

          <div className="requirements">

            <p className="requirements-title">
              Password requirements
            </p>

            <div className="requirements-list">

              <span
                className={
                  passwordRequirements.length
                    ? "requirement valid"
                    : "requirement"
                }
              >
                ✓ 8+ characters
              </span>

              <span
                className={
                  passwordRequirements.uppercase
                    ? "requirement valid"
                    : "requirement"
                }
              >
                ✓ Uppercase
              </span>

              <span
                className={
                  passwordRequirements.lowercase
                    ? "requirement valid"
                    : "requirement"
                }
              >
                ✓ Lowercase
              </span>

              <span
                className={
                  passwordRequirements.number
                    ? "requirement valid"
                    : "requirement"
                }
              >
                ✓ Number
              </span>

              <span
                className={
                  passwordRequirements.special
                    ? "requirement valid"
                    : "requirement"
                }
              >
                ✓ Special character
              </span>

            </div>

          </div>

          <label htmlFor="confirmPassword">
            Confirm Password
          </label>

          <div className="password-field">

            <input
              id="confirmPassword"
              name="confirmPassword"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              aria-label={
                showConfirmPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>

          </div>

          {error && (
            <p className="error-text">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="register-button"
          >
            Create Student Account
          </button>

        </form>

        <div className="switch-page">

          <span>
            Already have an account?
          </span>

          <button
            type="button"
            onClick={() => goTo("login")}
          >
            Login
          </button>

        </div>

      </div>
    </main>
  );
}

export default Register;