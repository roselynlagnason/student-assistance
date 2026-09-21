import React, { useState } from "react";

import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrankResult from "./pages/PrankResult";

function App() {
  const [page, setPage] = useState("welcome");

  const [registeredUser, setRegisteredUser] = useState(() => {
    const savedUser = localStorage.getItem("passcheckerUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loggedInUser, setLoggedInUser] = useState(null);

  function goTo(pageName) {
    setPage(pageName);
  }

  if (page === "welcome") {
    return <Welcome goTo={goTo} />;
  }

  if (page === "register") {
    return (
      <Register
        goTo={goTo}
        setRegisteredUser={setRegisteredUser}
      />
    );
  }

  if (page === "login") {
    return (
      <Login
        goTo={goTo}
        setLoggedInUser={setLoggedInUser}
      />
    );
  }

  if (page === "dashboard") {
    return (
      <Dashboard
        goTo={goTo}
        loggedInUser={loggedInUser || registeredUser}
      />
    );
  }

  if (page === "prank") {
    return (
      <PrankResult
        goTo={goTo}
        loggedInUser={loggedInUser || registeredUser}
      />
    );
  }

  return null;
}

export default App;