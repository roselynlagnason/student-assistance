import React from "react";

function Welcome({ goTo }) {
  return (
    <main className="welcome-page">

      {/* =================================================
          TOP BAR
      ================================================= */}

      <div className="welcome-topbar">

        <div>
          STUDENT SERVICES
        </div>

        <div>
          PANGLAO, BOHOL
        </div>

      </div>


      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div className="welcome-card">

        {/* =================================================
            PORTAL HEADER
        ================================================= */}

        <header className="welcome-header">

          <div className="logo-circle">
            🎓
          </div>

          <div className="portal-heading">

            <div className="portal-office">
              STUDENT SERVICES OFFICE
            </div>

            <h1>
              Student Cash Assistance Portal
            </h1>

            <div className="welcome-subtitle">
              Student Financial Assistance Services
            </div>

          </div>

        </header>


        {/* =================================================
            PROGRAM INTRODUCTION
        ================================================= */}

        <div className="welcome-introduction">

          <div>

            <div className="welcome-label">
              STUDENT FINANCIAL ASSISTANCE
            </div>

            <h2>
              Student Cash Assistance
            </h2>

            <p>
              An online application service designed to
              assist eligible students with education-related
              financial needs.
            </p>

          </div>


          <div className="reference-box">

            <span>
              APPLICATION STATUS
            </span>

            <strong>
              Applications Open
            </strong>

            <small>
              Online application and submission
            </small>

          </div>

        </div>


        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="welcome-main">

          {/* =================================================
              LEFT INFORMATION
          ================================================= */}

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
                  Review the assistance program before
                  submitting an application.
                </p>

              </div>

            </div>


            {/* PROGRAM DETAILS */}

            <div className="announcement-box">

              <div className="announcement-row">

                <span>
                  Program
                </span>

                <span>
                  Student Cash Assistance
                </span>

              </div>


              <div className="announcement-row">

                <span>
                  Service Area
                </span>

                <span>
                  Panglao, Bohol
                </span>

              </div>


              <div className="announcement-row">

                <span>
                  Application Method
                </span>

                <span>
                  Online Application
                </span>

              </div>


              <div className="announcement-row">

                <span>
                  Assistance Purpose
                </span>

                <span>
                  Education-Related Expenses
                </span>

              </div>


              <div className="announcement-row">

                <span>
                  Processing
                </span>

                <span>
                  Application Review
                </span>

              </div>

            </div>


            {/* =================================================
                IMPORTANT INFORMATION
            ================================================= */}

            <div className="program-notice">

              <div className="notice-icon">
                !
              </div>

              <div>

                <strong>
                  Before You Apply
                </strong>

                <p>
                  Applicants should provide complete and
                  accurate information. Submitted applications
                  may be reviewed based on the information
                  provided by the applicant.
                </p>

              </div>

            </div>


            {/* =================================================
                ELIGIBILITY INFORMATION
            ================================================= */}

            <div className="panglao-assistance">

              <div className="assistance-icon">
                ✓
              </div>

              <div>

                <strong>
                  Student Assistance Eligibility
                </strong>

                <p>
                  The application is intended for students
                  who require financial support for
                  education-related expenses. Applicants
                  should provide current academic and
                  financial information when completing the
                  application.
                </p>

              </div>

            </div>


            {/* =================================================
                APPLICATION REQUIREMENTS
            ================================================= */}

            <div className="panglao-assistance">

              <div className="assistance-icon">
                📄
              </div>

              <div>

                <strong>
                  Information Required
                </strong>

                <p>
                  Applicants may be asked to provide basic
                  student information, school details,
                  financial information, and a brief statement
                  explaining their need for assistance.
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              ACCOUNT ACCESS
          ================================================= */}

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
              Sign in to an existing student account or
              create a new account to begin your application.
            </p>


            <button
              className="get-started-btn"
              onClick={() => goTo("register")}
            >
              CREATE STUDENT ACCOUNT
            </button>


            <div className="welcome-login">

              <span>
                Already have an account?
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
                You must have a registered account before
                submitting an assistance application.
              </p>

            </div>

          </aside>

        </div>


        {/* =================================================
            HOW TO APPLY
        ================================================= */}

        <section className="application-steps">

          <div className="section-heading">

            <span className="section-number">
              02
            </span>

            <div>

              <h2>
                Application Process
              </h2>

              <p>
                Follow the steps below to complete your
                student assistance application.
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
                  Register using your name and create
                  your student portal password.
                </p>

              </div>

            </div>


            <div className="step-item">

              <span className="step-number">
                2
              </span>

              <div>

                <strong>
                  Complete the Application
                </strong>

                <p>
                  Enter your academic, contact, and
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
                  Submit for Review
                </strong>

                <p>
                  Review the information you provided
                  before submitting your application.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =================================================
            FOOTER
        ================================================= */}

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


        {/* =================================================
            PROJECT DISCLOSURE
        ================================================= */}

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

