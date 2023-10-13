import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import './css/UserList.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if the user is an admin
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('JWT token is missing or expired');
      setLoading(false);
      return;
    }

    try {
      const decodedToken = decodeToken(token);
      if (decodedToken && decodedToken.role === 'admin') {
        fetchUsers(token);
      } else {
        setError('You do not have permission to view this page.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      setLoading(false);
    }
  }, []);

  const decodeToken = (token) => {
    return jwtDecode(token);
  };

  const fetchUsers = (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get('http://localhost:8000/api/users/', config)
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching users: ' + error.message);
        setLoading(false);
      });
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      {loading ? (
        <p></p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
