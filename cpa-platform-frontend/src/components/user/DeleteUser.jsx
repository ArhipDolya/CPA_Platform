import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import './css/DeleteUser.css';

function DeleteUser({ userId }) {
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.role === 'admin') {
          setUserIsAdmin(true);
        }
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    }
  }, []);

  const handleDelete = async () => {
    if (!userIsAdmin) {
      setErrorMessage('You do not have permission to delete users.');
      return;
    }

    const token = localStorage.getItem('accessToken');

    if (!token) {
      setErrorMessage('JWT token is missing or expired');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(`http://localhost:8000/api/users/${userId}`, config);
      setSuccessMessage('User deleted successfully');
    } catch (error) {
      setErrorMessage('Error deleting user: ' + error.message);
    }
  };

  return (
    <div className="delete-user-container">
      <h2>Delete User</h2>
      {userIsAdmin ? (
        <div>
          <p>Are you sure you want to delete this user?</p>
          <button onClick={handleDelete} className="delete-button">
            Delete User
          </button>
        </div>
      ) : (
        <p className="error-message">You do not have permission to delete users.</p>
      )}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default DeleteUser;
