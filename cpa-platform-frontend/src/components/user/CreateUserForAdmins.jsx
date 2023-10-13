// CreateAdminAccount.jsx

import React, { useState } from 'react';
import axios from 'axios';

import './css/CreateUserForAdmins.css';

function CreateAdminAccount() {
  const [formData, setFormData] = useState({
    password: '',
    email: '',
    phone_number: '',
    balance: '',
    is_staff: true,
    is_superuser: true,
    user_type: 'brand',
    telegram_username: '',
    brand_name: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the JWT token from local storage
    const token = localStorage.getItem('accessToken');

    if (!token) {
      setErrorMessage('JWT token is missing or expired');
      return;
    }

    // Include the token in the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post('http://localhost:8000/api/users/', formData, config);
      setSuccessMessage('Admin account created successfully');
    } catch (error) {
      setErrorMessage('Error creating admin account: ' + error.message);
    }
  };

  return (
    <div className="create-admin-account-container">
      <h2>Create User For Admins</h2>
      <form className="admin-account-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
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
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="balance">Balance:</label>
          <input
            type="number"
            id="balance"
            name="balance"
            value={formData.balance}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="telegram_username">Telegram Username:</label>
          <input
            type="text"
            id="telegram_username"
            name="telegram_username"
            value={formData.telegram_username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="brand_name">Brand Name:</label>
          <input
            type="text"
            id="brand_name"
            name="brand_name"
            value={formData.brand_name}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="create-button">
          Create Account
        </button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default CreateAdminAccount;
