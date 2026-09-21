import React, { useState } from "react";

function Dashboard({ goTo, loggedInUser }) {
  const [form, setForm] = useState({
    studentId: "",
    course: "",
    yearLevel: "",
    school: "",
    contactNumber: "",
    address: "",
    allowance: "",
    expenses: "",
    householdIncome: "",
    reason: ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    localStorage.setItem(
      "studentApplication",
      JSON.stringify(form)
    );

    goTo("prank");
  }

  function handleLogout() {
    localStorage.removeItem("passcheckerLoggedIn");
    localStorage.removeItem("passcheckerUser");

    goTo("login");
  }

  return (
    <main className="dashboard-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="dashboard-topbar">
        STUDENT SERVICES &nbsp;•&nbsp; PANGLAO, BOHOL
      </div>

      <header className="portal-header">

        <div className="portal-brand">

          <div className="brand-icon">
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

        <div className="header-right">

          <span className="logged-user">
            {loggedInUser?.name || "Student"}
          </span>

          <button
            className="header-logout"
            onClick={handleLogout}
          >
            Log Out
          </button>

        </div>

      </header>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <section className="dashboard-container">

        {/* PAGE TITLE */}

        <div className="dashboard-heading">

          <p className="portal-label">
            STUDENT FINANCIAL ASSISTANCE
          </p>

          <h1>
            Student Assistance Application
          </h1>

          <p>
            Please complete the application form below and
            provide the required information for your
            student assistance request.
          </p>

        </div>


        {/* =================================================
            IMPORTANT NOTICE
        ================================================= */}

        <div className="application-notice">

          <div className="notice-icon">
            !
          </div>

          <div>

            <strong>
              Application Notice
            </strong>

            <p>
              Please ensure that all information provided
              in this application is complete and accurate.
              Incomplete information may affect the
              processing of your application.
            </p>

          </div>

        </div>


        {/* =================================================
            APPLICATION FORM
        ================================================= */}

        <form
          className="assistance-form"
          onSubmit={handleSubmit}
        >

          {/* ===============================
              SECTION 1
          =============================== */}

          <section className="application-section">

            <div className="section-header">

              <div className="section-number">
                1
              </div>

              <div>
                <h2>
                  Personal and Academic Information
                </h2>

                <p>
                  Provide your current student information.
                </p>
              </div>

            </div>


            <div className="form-grid">

              <div className="form-group">

                <label>
                  Student ID
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="studentId"
                  value={form.studentId}
                  onChange={handleChange}
                  placeholder="Enter student ID"
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  value={loggedInUser?.name || ""}
                  readOnly
                  className="readonly-input"
                />

                <small>
                  Registered account name
                </small>

              </div>


              <div className="form-group">

                <label>
                  Course / Program
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  placeholder="e.g. BS Information Technology"
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Year Level
                  <span>*</span>
                </label>

                <select
                  name="yearLevel"
                  value={form.yearLevel}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select year level
                  </option>

                  <option value="1st Year">
                    1st Year
                  </option>

                  <option value="2nd Year">
                    2nd Year
                  </option>

                  <option value="3rd Year">
                    3rd Year
                  </option>

                  <option value="4th Year">
                    4th Year
                  </option>

                </select>

              </div>


              <div className="form-group">

                <label>
                  School / Institution
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="school"
                  value={form.school}
                  onChange={handleChange}
                  placeholder="Enter school or institution"
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Contact Number
                  <span>*</span>
                </label>

                <input
                  type="tel"
                  name="contactNumber"
                  value={form.contactNumber}
                  onChange={handleChange}
                  placeholder="09XXXXXXXXX"
                  required
                />

              </div>


              <div className="form-group full-width">

                <label>
                  Current Address
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter your current address"
                  required
                />

              </div>

            </div>

          </section>


          {/* ===============================
              SECTION 2
          =============================== */}

          <section className="application-section">

            <div className="section-header">

              <div className="section-number">
                2
              </div>

              <div>
                <h2>
                  Financial Information
                </h2>

                <p>
                  Provide an estimate of your current
                  financial situation.
                </p>
              </div>

            </div>


            <div className="form-grid">

              <div className="form-group">

                <label>
                  Monthly Allowance
                  <span>*</span>
                </label>

                <div className="money-field">

                  <span>
                    ₱
                  </span>

                  <input
                    type="number"
                    name="allowance"
                    value={form.allowance}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    required
                  />

                </div>

              </div>


              <div className="form-group">

                <label>
                  Estimated Monthly Expenses
                  <span>*</span>
                </label>

                <div className="money-field">

                  <span>
                    ₱
                  </span>

                  <input
                    type="number"
                    name="expenses"
                    value={form.expenses}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    required
                  />

                </div>

              </div>


              <div className="form-group">

                <label>
                  Estimated Household Monthly Income
                </label>

                <div className="money-field">

                  <span>
                    ₱
                  </span>

                  <input
                    type="number"
                    name="householdIncome"
                    value={form.householdIncome}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                  />

                </div>

              </div>

            </div>

          </section>


          {/* ===============================
              SECTION 3
          =============================== */}

          <section className="application-section">

            <div className="section-header">

              <div className="section-number">
                3
              </div>

              <div>
                <h2>
                  Reason for Assistance
                </h2>

                <p>
                  Briefly explain your reason for requesting
                  financial assistance.
                </p>
              </div>

            </div>


            <div className="form-group">

              <label>
                Statement of Need
                <span>*</span>
              </label>

              <textarea
                name="reason"
                value={form.reason}
                onChange={handleChange}
                placeholder="Please provide a brief explanation of your current financial situation and why you are requesting assistance."
                rows="6"
                required
              />

              <small>
                Please provide a clear and concise explanation.
              </small>

            </div>

          </section>


          {/* =================================================
              DECLARATION
          ================================================= */}

          <div className="declaration-box">

            <div className="declaration-check">
              ✓
            </div>

            <div>

              <strong>
                Applicant Declaration
              </strong>

              <p>
                I certify that the information provided in
                this application is complete and accurate to
                the best of my knowledge.
              </p>

            </div>

          </div>


          {/* =================================================
              FORM FOOTER
          ================================================= */}

          <div className="application-footer">

            <div>

              <p className="required-note">
                <span>*</span> Required fields
              </p>

              <p className="privacy-note">
                Please review your information before
                submitting this application.
              </p>

            </div>


            <button
              type="submit"
              className="submit-button"
            >
              Submit Application
            </button>

          </div>

        </form>


        {/* FOOTER */}

        <div className="dashboard-footer">

          Student Assistance Portal
          &nbsp;•&nbsp;
          Panglao, Bohol

        </div>

      </section>

    </main>
  );
}

export default Dashboard;