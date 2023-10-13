import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import './css/UpdateUser.css';

function UpdateUser({ userId }) {
  const [user, setUser] = useState({});
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [formData, setFormData] = useState({});
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

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (userIsAdmin && token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get(`http://localhost:8000/api/users/${userId}`, config)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
    }
  }, [userId, userIsAdmin]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userIsAdmin) {
      setErrorMessage('You do not have permission to update users.');
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
      const response = await axios.put(`http://localhost:8000/api/users/${userId}`, formData, config);
      setSuccessMessage('User updated successfully');
    } catch (error) {
      setErrorMessage('Error updating user: ' + error.message);
    }
  };

  return (
    <div className="update-user-container">
      <h2>Update User</h2>
      {userIsAdmin ? (
        <form className="user-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phone_number">Phone Number:</label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number || user.phone_number}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="balance">Balance:</label>
            <input
              type="text"
              id="balance"
              name="balance"
              value={formData.balance || user.balance}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="update-button">
            Update User
          </button>
        </form>
      ) : (
        <p className="error-message">You do not have permission to update users.</p>
      )}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default UpdateUser;
