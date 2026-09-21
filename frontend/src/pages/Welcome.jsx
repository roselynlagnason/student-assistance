import React from "react";

function Welcome({ goTo }) {
  return (
    <main className="welcome-page">

      {/* TOP BAR */}

      <div className="welcome-topbar">
        <div>
          STUDENT SERVICES
        </div>

        <div>
          PANGLAO, BOHOL
        </div>
      </div>


      {/* MAIN CONTAINER */}

      <div className="welcome-card">

        {/* PORTAL HEADER */}

        <header className="welcome-header">

          <div className="logo-circle">
            🎓
          </div>

          <div className="portal-heading">

            <div className="portal-office">
              STUDENT SERVICES OFFICE
            </div>

            <h1>
              Student Assistance Portal
            </h1>

            <div className="welcome-subtitle">
              Student Financial Assistance Services
            </div>

          </div>

        </header>


        {/* PAGE INTRODUCTION */}

        <div className="welcome-introduction">

          <div>

            <div className="welcome-label">
              FINANCIAL ASSISTANCE PROGRAM
            </div>

            <h2>
              Student Cash Assistance
            </h2>

            <p>
              An online student assistance service for
              eligible students in Panglao, Bohol.
            </p>

          </div>

          <div className="reference-box">

            <span>
              SERVICE TYPE
            </span>

            <strong>
              Online Application
            </strong>

            <small>
              Student Services Portal
            </small>

          </div>

        </div>


        {/* MAIN CONTENT */}

        <div className="welcome-main">

          {/* LEFT CONTENT */}

          <section className="welcome-information">

            <div className="section-heading">

              <span className="section-number">
                01
              </span>

              <div>
                <h2>
                  Program Information
                </h2>

                <p>
                  Information about the student assistance
                  application service.
                </p>
              </div>

            </div>


            <div className="announcement-box">

              <div className="announcement-row">
                <span>Program</span>

                <span>
                  Student Cash Assistance
                </span>
              </div>

              <div className="announcement-row">
                <span>Service Area</span>

                <span>
                  Panglao, Bohol
                </span>
              </div>

              <div className="announcement-row">
                <span>Application Method</span>

                <span>
                  Online Submission
                </span>
              </div>

              <div className="announcement-row">
                <span>Assistance Type</span>

                <span>
                  Educational Financial Support
                </span>
              </div>

              <div className="announcement-row">
                <span>Processing</span>

                <span>
                  Online Application Review
                </span>
              </div>

            </div>


            {/* IMPORTANT NOTICE */}

            <div className="program-notice">

              <div className="notice-icon">
                !
              </div>

              <div>

                <strong>
                  Important Information
                </strong>

                <p>
                  Applicants are requested to provide
                  complete and accurate information when
                  submitting their application.
                </p>

              </div>

            </div>


            {/* ASSISTANCE AREA */}

            <div className="panglao-assistance">

              <div className="assistance-icon">
                📍
              </div>

              <div>

                <strong>
                  Assistance for Panglao Students
                </strong>

                <p>
                  This portal provides an online channel
                  for students to submit their information
                  for financial assistance consideration.
                </p>

              </div>

            </div>

          </section>


          {/* RIGHT SIDE */}

          <aside className="welcome-account">

            <div className="account-header">

              <div className="account-icon">
                👤
              </div>

              <div>

                <span>
                  STUDENT PORTAL
                </span>

                <strong>
                  Account Access
                </strong>

              </div>

            </div>


            <div className="account-divider" />


            <p className="account-description">
              Create a student account or log in to an
              existing account to access the online
              assistance application.
            </p>


            <button
              className="get-started-btn"
              onClick={() => goTo("register")}
            >
              CREATE STUDENT ACCOUNT
            </button>


            <div className="welcome-login">

              <span>
                Already registered?
              </span>

              <button
                type="button"
                onClick={() => goTo("login")}
              >
                Log In
              </button>

            </div>


            <div className="account-note">

              <span>
                🔒
              </span>

              <p>
                Account access is required before
                submitting an application.
              </p>

            </div>

          </aside>

        </div>


        {/* HOW IT WORKS */}

        <section className="application-steps">

          <div className="section-heading">

            <span className="section-number">
              02
            </span>

            <div>
              <h2>
                How to Apply
              </h2>

              <p>
                Follow these steps to submit your application.
              </p>
            </div>

          </div>


          <div className="steps-grid">

            <div className="step-item">

              <span className="step-number">
                1
              </span>

              <div>
                <strong>
                  Create an Account
                </strong>

                <p>
                  Register your student portal account.
                </p>
              </div>

            </div>


            <div className="step-item">

              <span className="step-number">
                2
              </span>

              <div>
                <strong>
                  Complete the Form
                </strong>

                <p>
                  Provide the required student and
                  financial information.
                </p>
              </div>

            </div>


            <div className="step-item">

              <span className="step-number">
                3
              </span>

              <div>
                <strong>
                  Submit Application
                </strong>

                <p>
                  Review your information and submit
                  your application online.
                </p>
              </div>

            </div>

          </div>

        </section>


        {/* FOOTER */}

        <footer className="welcome-footer">

          <div>
            Student Assistance Portal
            <span> • </span>
            Panglao, Bohol
          </div>

          <div>
            Student Services
          </div>

        </footer>


        <div className="demo-notice">
          Academic Project Demonstration
        </div>

      </div>

    </main>
  );
}

export default Welcome;