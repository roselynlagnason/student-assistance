import React from "react";

function Welcome({ goTo }) {
  return (
    <main className="welcome-page">

      {/* TOP BAR */}
      <div className="welcome-topbar">
        <div>STUDENT SERVICES</div>
        <div>PANGLAO, BOHOL</div>
      </div>

      <div className="welcome-card">

        {/* HEADER */}
        <header className="welcome-header">
          <div className="logo-circle">🎓</div>

          <div className="portal-heading">
            <div className="portal-office">
              STUDENT SERVICES OFFICE
            </div>

            <h1>Student Cash Assistance Portal</h1>

            <div className="welcome-subtitle">
              Financial Assistance Services
            </div>
          </div>
        </header>

        {/* INTRODUCTION */}
        <div className="welcome-introduction">
          <div>
            <h2>Student Cash Assistance</h2>

            <p>
              Online financial assistance for eligible students
              with education-related expenses.
            </p>
          </div>

          <div className="reference-box">
            <span>APPLICATION STATUS</span>
            <strong>Applications Open</strong>
            <small>Online Application</small>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="welcome-main">

          {/* PROGRAM INFORMATION */}
          <section className="welcome-information">

            <div className="section-heading">
              <span className="section-number">01</span>

              <div>
                <h2>Program Information</h2>
                <p>Quick overview of the assistance program.</p>
              </div>
            </div>

            <div className="announcement-box">

              <div className="announcement-row">
                <span>Program</span>
                <span>Student Cash Assistance</span>
              </div>

              <div className="announcement-row">
                <span>Service Area</span>
                <span>Panglao, Bohol</span>
              </div>

              <div className="announcement-row">
                <span>Application</span>
                <span>Online</span>
              </div>

              <div className="announcement-row">
                <span>Purpose</span>
                <span>Education Expenses</span>
              </div>

            </div>

            <div className="panglao-assistance">

              <div className="assistance-icon">
                ✓
              </div>

              <div>
                <strong>Eligibility</strong>

                <p>
                  Intended for students who need financial
                  support for education-related expenses.
                </p>
              </div>

            </div>

          </section>

          {/* ACCOUNT ACCESS */}
          <aside className="welcome-account">

            <div className="account-header">

              <div className="account-icon">
                👤
              </div>

              <div>
                <span>STUDENT PORTAL</span>
                <strong>Account Access</strong>
              </div>

            </div>

            <div className="account-divider" />

            <p className="account-description">
              Create an account or sign in to start your application.
            </p>

            <button
              className="get-started-btn"
              onClick={() => goTo("register")}
            >
              Sign Up
            </button>

            <div className="welcome-login">
              <span>Already have an account?</span>

              <button
                type="button"
                onClick={() => goTo("login")}
              >
                Log In
              </button>
            </div>

            <div className="account-note">
              <span>🔒</span>

              <p>
                A registered account is required to apply.
              </p>
            </div>

          </aside>

        </div>

        {/* APPLICATION PROCESS */}
        <section className="application-steps">

          <div className="section-heading">
            <span className="section-number">02</span>

            <div>
              <h2>Application Process</h2>
              <p>Complete these three simple steps.</p>
            </div>
          </div>

          <div className="steps-grid">

            <div className="step-item">
              <span className="step-number">1</span>

              <div>
                <strong>Create an Account</strong>
                <p>Register your student account.</p>
              </div>
            </div>

            <div className="step-item">
              <span className="step-number">2</span>

              <div>
                <strong>Complete the Application</strong>
                <p>Enter your academic and financial information.</p>
              </div>
            </div>

            <div className="step-item">
              <span className="step-number">3</span>

              <div>
                <strong>Submit for Review</strong>
                <p>Check your information and submit.</p>
              </div>
            </div>

          </div>

        </section>

        {/* FOOTER */}
        <footer className="welcome-footer">

          <div>
            Student Cash Assistance Portal
            <span> • </span>
            Panglao, Bohol
          </div>

          <div>
            Student Services
          </div>

        </footer>

        {/* ADMIN ACCESS */}
        <div className="admin-access-link">

          <button
            type="button"
            onClick={() => goTo("adminLogin")}
          >
            Administrator Access
          </button>

        </div>

      </div>

    </main>
  );
}

export default Welcome;