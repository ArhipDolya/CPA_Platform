import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

import "./css/EditAdminOffer.css";


function EditAdminOffer({ offer_id }) {
  const [formData, setFormData] = useState({
    is_active: true,
    title: "",
    description: "",
    price: "",
    payout: "",
    is_vip: true,
    category: 0,
    brand: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check if a valid JWT token exists in localStorage
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("JWT token is missing or expired");
      setLoading(false);
      return;
    }

    const decodedToken = jwtDecode(token);

    if (!decodedToken) {
      setError("Invalid JWT token");
      setLoading(false);
      return;
    }

    // Check if the user is an admin
    if (!decodedToken.role === "admin") {
      setError("User is not an admin");
      setLoading(false);
      return;
    }

    // Make the PUT request to edit the offer by ID with JWT token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(`http://localhost:8000/api/admin_offers/${offer_id}/`, formData, config)
      .then(() => {
        setSuccess(true);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error editing the offer: " + error.message);
        setLoading(false);
      });
  }, [formData, offer_id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="edit-offer-container">
      <h2>Edit Offer</h2>
      <form className="edit-offer-form">
        <div>
          <label htmlFor="is_active">Active:</label>
          <input
            type="checkbox"
            id="is_active"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="payout">Payout:</label>
          <input
            type="text"
            id="payout"
            name="payout"
            value={formData.payout}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="is_vip">VIP:</label>
          <input
            type="checkbox"
            id="is_vip"
            name="is_vip"
            checked={formData.is_vip}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="number"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="brand">Brand:</label>
          <input
            type="number"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="edit-button">
          Edit Offer
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {success && <p className="success-message">Offer edited successfully.</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default EditAdminOffer;
