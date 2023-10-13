import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import './css/CreateAdminOffer.css';

function CreateAdminOffer() {
  const [formData, setFormData] = useState({
    is_active: true,
    title: '',
    description: '',
    price: '',
    payout: '',
    is_vip: true,
    category: 0,
    brand: 0,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if a valid JWT token exists in localStorage
    const token = localStorage.getItem('accessToken');

    if (token) {
      // Decode the JWT token to check its contents
      const decodedToken = jwtDecode(token);

      if (decodedToken && decodedToken.role === 'admin') {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin) {
      setErrorMessage('You do not have permission to create admin offers.');
      return;
    }

    const token = localStorage.getItem('accessToken');

    if (!token) {
      setErrorMessage('JWT token is missing or expired');
      return;
    }

    // Make the POST request to create the admin offer with JWT token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post('http://localhost:8000/api/admin_offers/', formData, config);

      if (response.status === 201) {
        // Offer created successfully
        setSuccessMessage('Admin offer created successfully');
        setFormData({
          is_active: true,
          title: '',
          description: '',
          price: '',
          payout: '',
          is_vip: true,
          category: 0,
          brand: 0,
        });
      } else {
        setErrorMessage('Error creating admin offer');
      }
    } catch (error) {
      setErrorMessage('Error creating admin offer: ' + error.message);
    }
  };

  return (
    <div className="create-admin-offer-container">
      <h2>Create Admin Offer</h2>
      <form className="admin-offer-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="payout">Payout:</label>
          <input
            type="number"
            id="payout"
            name="payout"
            value={formData.payout}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="0">Category 1</option>
          </select>
        </div>
        <div>
          <label htmlFor="brand">Brand:</label>
          <select
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          >
            <option value="0">Brand 1</option>
          </select>
        </div>
        <div>
          <label htmlFor="is_vip">Is VIP:</label>
          <input
            type="checkbox"
            id="is_vip"
            name="is_vip"
            checked={formData.is_vip}
            onChange={handleCheckboxChange}
          />
        </div>
        <button type="submit" className="create-button">
          Create Admin Offer
        </button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default CreateAdminOffer;
