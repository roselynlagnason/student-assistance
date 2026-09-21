import React from "react";

function PrankResult({ goTo, loggedInUser }) {
  return (
    <main className="prank-page">

      {/* TOP INSTITUTIONAL BAR */}
      <div className="prank-topbar">
        STUDENT SERVICES &nbsp;•&nbsp; PANGLAO, BOHOL
      </div>

      {/* HEADER */}
      <header className="prank-header">

        <div className="prank-brand">

          <div className="prank-brand-icon">
            🎓
          </div>

          <div>
            <strong>
              Student Assistance Portal
            </strong>

            <span>
              Student Financial Assistance Services
            </span>
          </div>

        </div>

        <div className="result-reference">
          Application Result
        </div>

      </header>


      {/* RESULT CONTENT */}
      <section className="prank-content">

        <div className="result-breadcrumb">
          Student Services &nbsp;›&nbsp; Financial Assistance
          &nbsp;›&nbsp; Application Result
        </div>


        {/* MAIN RESULT CARD */}
        <div className="official-result-card">

          <div className="result-status">

            <div className="status-check">
              ✓
            </div>

            <div>
              <span>
                APPLICATION STATUS
              </span>

              <strong>
                PROCESSED
              </strong>
            </div>

          </div>


          <div className="result-heading">

            <p>
              STUDENT FINANCIAL ASSISTANCE
            </p>

            <h1>
              Application Result
            </h1>

            <p>
              Dear <strong>{loggedInUser?.name || "Student"}</strong>,
              your financial assistance application has been
              successfully processed.
            </p>

          </div>


          {/* APPLICATION SUMMARY */}
          <div className="application-summary">

            <div>
              <span>
                APPLICANT
              </span>

              <strong>
                {loggedInUser?.name || "Student"}
              </strong>
            </div>

            <div>
              <span>
                APPLICATION TYPE
              </span>

              <strong>
                Student Financial Assistance
              </strong>
            </div>

            <div>
              <span>
                APPLICATION STATUS
              </span>

              <strong className="processed-text">
                Processed
              </strong>
            </div>

          </div>


          {/* FINANCIAL RESULT */}
          <div className="financial-result">

            <div className="financial-title">
              Financial Assistance Assessment
            </div>


            <div className="financial-row">

              <div>
                <span>
                  Financial Assistance
                </span>

                <small>
                  Approved assistance amount
                </small>
              </div>

              <strong className="approved-amount">
                ₱50,000.00
              </strong>

            </div>


            <div className="financial-row">

              <div>
                <span>
                  Actual Cash Release
                </span>

                <small>
                  Amount available for release
                </small>
              </div>

              <strong>
                ₱0.00
              </strong>

            </div>

          </div>


          {/* SERIOUS REASON */}
          <div className="assessment-box">

            <div className="assessment-icon">
              ℹ
            </div>

            <div>

              <strong>
                Assessment Remarks
              </strong>

              <p>
                The applicant has been approved for
                financial assistance in accordance with
                the submitted application.
              </p>

            </div>

          </div>


          {/* THE REVEAL */}
          <div className="prank-reveal">

            <div className="prank-confetti">
              🎉 &nbsp; 🎊 &nbsp; 😂
            </div>

            <div className="prank-stamp">
              PRANK
            </div>

            <p className="prank-reveal-label">
              OFFICIAL NOTICE
            </p>

            <h2>
              WAIT... THERE'S A PROBLEM. 😭
            </h2>

            <p className="prank-main-text">
              You have been approved for
              <strong> ₱50,000.00 </strong>
              worth of financial assistance...
            </p>

            <div className="zero-box">

              <span>
                ACTUAL CASH RELEASE
              </span>

              <strong>
                ₱0.00
              </strong>

            </div>


            <div className="funny-reason">

              <div className="funny-emoji">
                🥲
              </div>

              <div>

                <strong>
                  Reason for Non-Release
                </strong>

                <p>
                  You have already been financially
                  assisted by your friends' emotional
                  support.
                </p>

              </div>

            </div>


            <div className="final-joke">

              <div className="laugh-icon">
                😂
              </div>

              <h3>
                IT'S A PRANK!
              </h3>

              <p>
                CONGRATULATIONS! 🎓
              </p>

              <p>
                You just went through an entire
                financial assistance application process
                for absolutely nothing.
              </p>

              <strong>
                ₱50,000 in the system.
                <br />
                ₱0.00 in your wallet.
                <br />
                100% emotional damage. 💀
              </strong>

            </div>


            <div className="friend-support">

              💜 <strong>Good news:</strong>
              Your friends are here to provide unlimited
              emotional support.
              <br />

              <span>
                Unfortunately, emotional support is
                non-transferable and cannot be withdrawn
                from an ATM.
              </span>

            </div>

          </div>


          {/* FOOTER ACTIONS */}
          <div className="result-actions">

            <button
              className="back-dashboard-button"
              onClick={() => goTo("dashboard")}
            >
              ← Back to Student Portal
            </button>

          </div>

        </div>


        <div className="prank-footer">
          Student Assistance Portal • Panglao, Bohol
        </div>

      </section>

    </main>
  );
}

export default PrankResult;