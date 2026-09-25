import React, { useState } from "react";

import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrankResult from "./pages/PrankResult";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

function App() {
  const [page, setPage] = useState("welcome");

  const [registeredUser, setRegisteredUser] = useState(() => {
    const savedUser = localStorage.getItem(
      "passcheckerUser"
    );

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const [loggedInUser, setLoggedInUser] =
    useState(null);

  const [adminAuthenticated, setAdminAuthenticated] =
    useState(() => {
      return (
        sessionStorage.getItem(
          "adminAuthenticated"
        ) === "true"
      );
    });


  function goTo(pageName) {
    setPage(pageName);
  }


  // =========================================================
  // WELCOME
  // =========================================================

  if (page === "welcome") {
    return (
      <Welcome
        goTo={goTo}
      />
    );
  }


  // =========================================================
  // REGISTER
  // =========================================================

  if (page === "register") {
    return (
      <Register
        goTo={goTo}
        setRegisteredUser={setRegisteredUser}
      />
    );
  }


  // =========================================================
  // LOGIN
  // =========================================================

  if (page === "login") {
    return (
      <Login
        goTo={goTo}
        setLoggedInUser={setLoggedInUser}
      />
    );
  }


  // =========================================================
  // DASHBOARD
  // =========================================================

  if (page === "dashboard") {
    return (
      <Dashboard
        goTo={goTo}
        loggedInUser={
          loggedInUser || registeredUser
        }
      />
    );
  }


  // =========================================================
  // PRANK RESULT
  // =========================================================

  if (page === "prank") {
    return (
      <PrankResult
        goTo={goTo}
        loggedInUser={
          loggedInUser || registeredUser
        }
      />
    );
  }


  // =========================================================
  // ADMIN LOGIN
  // =========================================================

  if (page === "adminLogin") {
    return (
      <AdminLogin
        goTo={goTo}
        setAdminAuthenticated={
          setAdminAuthenticated
        }
      />
    );
  }


  // =========================================================
  // ADMIN DASHBOARD
  // =========================================================

  if (page === "admin") {

    if (!adminAuthenticated) {
      return (
        <AdminLogin
          goTo={goTo}
          setAdminAuthenticated={
            setAdminAuthenticated
          }
        />
      );
    }

    return (
      <Admin
        goTo={goTo}
      />
    );
  }


  // =========================================================
  // FALLBACK
  // =========================================================

  return (
    <Welcome
      goTo={goTo}
    />
  );
}

export default App;