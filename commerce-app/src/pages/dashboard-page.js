import React from "react";
import { useAuthContext } from "../state/authContext"; // Adjust the import path as necessary

function Dashboard() {
  const { user } = useAuthContext(); // Access user data from context

  return (
    <div id="Dashboard" className="dashboard-container">
      <h1>Dashboard</h1>
      <p>
        Welcome <strong>{user ? `${user.username}` : ""}</strong>.
      </p>
      <p>
        Your role is <strong>{user ? `${user.role}` : ""}</strong>.
      </p>
    </div>
  );
}

export default Dashboard;
