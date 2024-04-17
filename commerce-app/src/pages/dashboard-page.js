import React from "react";
import { useAuthContext } from "../state/authContext"; // Adjust the import path as necessary

function Dashboard() {
  const { user } = useAuthContext(); // Access user data from context

  return (
    <div id="Dashboard" className="dashboard-container">
      <h1>Dashboard</h1>
      <p>
        Welcome to the Dashboard{user ? `, ${user.username}` : ""}. Here you can quickly access all key areas of the application.
      </p>
    </div>
  );
}

export default Dashboard;
