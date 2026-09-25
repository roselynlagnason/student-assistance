import React, { useEffect, useState } from "react";

const API_URL = "https://student-assistance-six.vercel.app";

function Admin({ goTo }) {
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("applications");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingUserId, setDeletingUserId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [applicationsResponse, usersResponse] =
        await Promise.all([
          fetch(`${API_URL}/api/admin/applications`),
          fetch(`${API_URL}/api/admin/users`)
        ]);

      const applicationsData =
        await applicationsResponse.json();

      const usersData =
        await usersResponse.json();

      if (!applicationsResponse.ok) {
        throw new Error(
          applicationsData.message ||
            "Failed to load applications."
        );
      }

      if (!usersResponse.ok) {
        throw new Error(
          usersData.message ||
            "Failed to load users."
        );
      }

      setApplications(applicationsData);
      setUsers(usersData);

    } catch (error) {
      console.error("ADMIN ERROR:", error);

      setError(
        "Unable to load records. Make sure the backend is running."
      );

    } finally {
      setLoading(false);
    }
  }


  // =========================================================
  // FORMAT MONEY
  // =========================================================

  function formatMoney(value) {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "—";
    }

    return `₱${Number(value).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }


  // =========================================================
  // FORMAT DATE
  // =========================================================

  function formatDate(value) {
    if (!value) {
      return "—";
    }

    return new Date(value).toLocaleString("en-PH", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }


  // =========================================================
  // FILTER APPLICATIONS
  // =========================================================

  const filteredApplications = applications.filter(
    (application) => {

      const searchableText = `
        ${application.name}
        ${application.student_id}
        ${application.course}
        ${application.year_level}
        ${application.school}
        ${application.contact_number}
      `.toLowerCase();

      return searchableText.includes(
        search.toLowerCase()
      );
    }
  );


  // =========================================================
  // FILTER USERS
  // =========================================================

  const filteredUsers = users.filter((user) =>
    user.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  // =========================================================
  // UI
  // =========================================================


 async function handleDeleteUser(userId, userName) {
  const confirmed = window.confirm(
    `Delete the account for "${userName}"?\n\nThis will also delete all applications submitted by this user.`
  );

  if (!confirmed) {
    return;
  }

  try {
    setDeletingUserId(userId);
    setError("");

    const response = await fetch(
      `${API_URL}/api/admin/users/${userId}`,
      {
        method: "DELETE"
      }
    );

    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      console.error("SERVER RETURNED:", text);

      throw new Error(
        "The server did not return a valid response. Make sure the backend is running on port 5000 and the DELETE route exists."
      );
    }

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to delete user."
      );
    }

    await loadData();

    setSelectedApplication(null);

  } catch (error) {
    console.error("DELETE USER ERROR:", error);

    setError(
      error.message || "Failed to delete user."
    );

  } finally {
    setDeletingUserId(null);
  }
}

  return (
    <main className="admin-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="admin-header">

        <div className="admin-brand">

          <div className="admin-brand-icon">
            🎓
          </div>

          <div>

            <div className="admin-brand-title">
              Student Cash Assistance
            </div>

            <div className="admin-brand-subtitle">
              Administration Portal
            </div>

          </div>

        </div>


        <div className="admin-header-actions">

          <button
            type="button"
            className="admin-refresh-button"
            onClick={loadData}
          >
            ↻ Refresh
          </button>

<button
  type="button"
  className="admin-exit-button"
  onClick={() => {
    const confirmed = window.confirm(
      "Are you sure you want to log out of the Administrator Portal?"
    );

    if (!confirmed) {
      return;
    }

    sessionStorage.removeItem(
      "adminAuthenticated"
    );

    goTo("adminLogin");
  }}
>
  Log Out
</button>

        </div>

      </header>


      {/* =================================================
          MAIN
      ================================================= */}

      <section className="admin-container">

        {/* PAGE HEADING */}

        <div className="admin-heading">

          <div>

            <p className="admin-eyebrow">
              ADMINISTRATION
            </p>

            <h1>
              Student Assistance Records
            </h1>

            <p>
              Review registered student accounts and
              submitted assistance applications.
            </p>

          </div>

        </div>


        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <div className="admin-summary-grid">

          <div className="admin-summary-card">

            <div className="summary-icon">
              👤
            </div>

            <div>

              <span>
                REGISTERED USERS
              </span>

              <strong>
                {users.length}
              </strong>

            </div>

          </div>


          <div className="admin-summary-card">

            <div className="summary-icon">
              📄
            </div>

            <div>

              <span>
                APPLICATIONS
              </span>

              <strong>
                {applications.length}
              </strong>

            </div>

          </div>


          <div className="admin-summary-card">

            <div className="summary-icon">
              🕒
            </div>

            <div>

              <span>
                LATEST APPLICATION
              </span>

              <strong>
                {applications.length > 0
                  ? `#${applications[0].id}`
                  : "—"}
              </strong>

            </div>

          </div>

        </div>


        {/* =================================================
            TABS
        ================================================= */}

        <div className="admin-tab-bar">

          <button
            type="button"
            className={
              activeTab === "applications"
                ? "admin-tab active"
                : "admin-tab"
            }
            onClick={() => {
              setActiveTab("applications");
              setSearch("");
              setSelectedApplication(null);
            }}
          >
            Applications
          </button>


          <button
            type="button"
            className={
              activeTab === "users"
                ? "admin-tab active"
                : "admin-tab"
            }
            onClick={() => {
              setActiveTab("users");
              setSearch("");
              setSelectedApplication(null);
            }}
          >
            Registered Users
          </button>

        </div>


        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="admin-tools">

          <div className="admin-search">

            <span>
              🔎
            </span>

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder={
                activeTab === "applications"
                  ? "Search by name, student ID, course, or school..."
                  : "Search registered users..."
              }
            />

          </div>


          <div className="admin-result-count">

            {activeTab === "applications"
              ? `${filteredApplications.length} application(s)`
              : `${filteredUsers.length} user(s)`}

          </div>

        </div>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="admin-error">
            {error}
          </div>
        )}


        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (

          <div className="admin-loading-card">
            Loading records...
          </div>

        ) : activeTab === "applications" ? (

          /* =================================================
             APPLICATIONS
          ================================================= */

          <div className="application-list">

            {filteredApplications.length === 0 ? (

              <div className="admin-empty-card">

                <div className="empty-icon">
                  📄
                </div>

                <h3>
                  No applications found
                </h3>

                <p>
                  Submitted applications will appear here.
                </p>

              </div>

            ) : (

              filteredApplications.map(
                (application) => {

                  const isOpen =
                    selectedApplication?.id ===
                    application.id;

                  return (
                    <article
                      className={
                        isOpen
                          ? "application-card open"
                          : "application-card"
                      }
                      key={application.id}
                    >

                      {/* APPLICATION SUMMARY */}

                      <div className="application-card-header">

                        <div>

                          <span className="application-number">
                            APPLICATION #{application.id}
                          </span>

                          <h2>
                            {application.name}
                          </h2>

                          <p>
                            Submitted{" "}
                            {formatDate(
                              application.created_at
                            )}
                          </p>

                        </div>


                        <button
                          type="button"
                          className="details-button"
                          onClick={() =>
                            setSelectedApplication(
                              isOpen
                                ? null
                                : application
                            )
                          }
                        >
                          {isOpen
                            ? "Hide Details"
                            : "View Details"}
                        </button>

                      </div>


                      {/* QUICK DETAILS */}

                      <div className="application-quick-grid">

                        <div>

                          <span>
                            Student ID
                          </span>

                          <strong>
                            {application.student_id}
                          </strong>

                        </div>


                        <div>

                          <span>
                            Course / Program
                          </span>

                          <strong>
                            {application.course}
                          </strong>

                        </div>


                        <div>

                          <span>
                            Year Level
                          </span>

                          <strong>
                            {application.year_level}
                          </strong>

                        </div>


                        <div>

                          <span>
                            School / Institution
                          </span>

                          <strong>
                            {application.school}
                          </strong>

                        </div>

                      </div>


                      {/* FULL DETAILS */}

                      {isOpen && (

                        <div className="application-details">

                          <div className="details-section">

                            <h3>
                              Personal and Academic Information
                            </h3>

                            <div className="details-grid">

                              <div className="detail-item">

                                <span>
                                  Full Name
                                </span>

                                <strong>
                                  {application.name}
                                </strong>

                              </div>


                              <div className="detail-item">

                                <span>
                                  Student ID
                                </span>

                                <strong>
                                  {application.student_id}
                                </strong>

                              </div>


                              <div className="detail-item">

                                <span>
                                  Course / Program
                                </span>

                                <strong>
                                  {application.course}
                                </strong>

                              </div>


                              <div className="detail-item">

                                <span>
                                  Year Level
                                </span>

                                <strong>
                                  {application.year_level}
                                </strong>

                              </div>


                              <div className="detail-item">

                                <span>
                                  School / Institution
                                </span>

                                <strong>
                                  {application.school}
                                </strong>

                              </div>


                              <div className="detail-item">

                                <span>
                                  Contact Number
                                </span>

                                <strong>
                                  {application.contact_number}
                                </strong>

                              </div>


                              <div className="detail-item detail-full">

                                <span>
                                  Current Address
                                </span>

                                <strong>
                                  {application.address}
                                </strong>

                              </div>

                            </div>

                          </div>


                          <div className="details-section">

                            <h3>
                              Financial Information
                            </h3>

                            <div className="details-grid">

                              <div className="detail-item">

                                <span>
                                  Monthly Allowance
                                </span>

                                <strong>
                                  {formatMoney(
                                    application.allowance
                                  )}
                                </strong>

                              </div>


                              <div className="detail-item">

                                <span>
                                  Monthly Expenses
                                </span>

                                <strong>
                                  {formatMoney(
                                    application.expenses
                                  )}
                                </strong>

                              </div>


                              <div className="detail-item">

                                <span>
                                  Household Monthly Income
                                </span>

                                <strong>
                                  {formatMoney(
                                    application.household_income
                                  )}
                                </strong>

                              </div>

                            </div>

                          </div>


                          <div className="details-section">

                            <h3>
                              Reason for Assistance
                            </h3>

                            <div className="reason-display">
                              {application.reason}
                            </div>

                          </div>


                          <div className="application-meta">

                            <div>

                              <span>
                                Application ID
                              </span>

                              <strong>
                                #{application.id}
                              </strong>

                            </div>


                            <div>

                              <span>
                                User Account ID
                              </span>

                              <strong>
                                #{application.user_id}
                              </strong>

                            </div>


                            <div>

                              <span>
                                Submitted
                              </span>

                              <strong>
                                {formatDate(
                                  application.created_at
                                )}
                              </strong>

                            </div>

                          </div>

                        </div>

                      )}

                    </article>
                  );
                }
              )

            )}

          </div>

        ) : (

          /* =================================================
             REGISTERED USERS
          ================================================= */

          <div className="users-table-card">

            {filteredUsers.length === 0 ? (

              <div className="admin-empty-card">

                <div className="empty-icon">
                  👤
                </div>

                <h3>
                  No users found
                </h3>

              </div>

            ) : (

            <div className="table-wrapper">

  <table className="admin-users-table">

    <thead>

      <tr>

        <th>
          ID
        </th>

        <th>
          Registered Name
        </th>

        <th>
          Password
        </th>

        <th>
          Action
        </th>

      </tr>

    </thead>

    <tbody>

      {filteredUsers.map((user) => (

        <tr key={user.id}>

          <td>
            #{user.id}
          </td>

          <td>
            <strong>
              {user.name}
            </strong>
          </td>

          <td className="password-cell">
            {user.password}
          </td>

          <td>

            <button
              type="button"
              className="delete-user-button"
              onClick={() =>
                handleDeleteUser(
                  user.id,
                  user.name
                )
              }
              disabled={
                deletingUserId === user.id
              }
            >
              {deletingUserId === user.id
                ? "Deleting..."
                : "Delete"}
            </button>

          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

            )}

          </div>

        )}

      </section>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="admin-footer">
        Student Cash Assistance • Administration Portal
      </footer>

    </main>
  );
}

export default Admin;