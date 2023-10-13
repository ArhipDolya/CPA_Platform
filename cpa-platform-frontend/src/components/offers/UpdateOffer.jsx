import React, { useState, useEffect } from "react";
import axios from "axios";

import './css/UpdateOffer.css'

function UpdateOffer({ offerId }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    payout: "",
    price: "",
    is_vip: true,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setErrorMessage("JWT token is missing or expired");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`http://localhost:8000/api/offers/${offerId}/`, config)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        setErrorMessage("Error fetching offer details: " + error.message);
      });
  }, [offerId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setErrorMessage("JWT token is missing or expired");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(`http://localhost:8000/api/offers/${offerId}/`, formData, config)
      .then((response) => {
        if (response.status === 200) {
          setSuccessMessage("Offer updated successfully");
        }
      })
      .catch((error) => {
        setErrorMessage("Error updating offer: " + error.message);
      });
  };

  return (
    <div className="update-offer-container">
      <h2>Update Offer</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form className="offer-form" onSubmit={handleSubmit}>
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
          <label htmlFor="is_vip">Is VIP:</label>
          <input
            type="checkbox"
            id="is_vip"
            name="is_vip"
            checked={formData.is_vip}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="update-button">
          Update Offer
        </button>
      </form>
    </div>
  );
}

export default UpdateOffer;
