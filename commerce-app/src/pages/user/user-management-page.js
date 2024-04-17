import React from 'react';
import { useAuthContext } from '../../state/authContext';

function UserManagement() {
  const { user } = useAuthContext();

  return (
    <div>
      {user ? (
        <div>
          <h2>User Details</h2>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
}

export default UserManagement;
