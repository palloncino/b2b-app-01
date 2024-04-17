import React from "react";
import { useAuthContext } from "../../state/authContext";
import { Typography, Paper, Grid } from "@mui/material"; // Import Material-UI components

function UserManagement() {
  const { user } = useAuthContext();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">User Management</Typography>
        <Typography variant="body1">
          Welcome to the User Management page. Here you can manage user details
          and permissions.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">User Details</Typography>
        {user ? (
          <>
            <Typography variant="body1">
              <strong>Username:</strong> {user.username}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1">
              <strong>Role:</strong> {user.role}
            </Typography>
            {/* Include additional user details here */}
          </>
        ) : (
          <Typography variant="body1">No user data available.</Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default UserManagement;
