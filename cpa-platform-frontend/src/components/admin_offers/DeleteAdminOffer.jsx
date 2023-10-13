import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

import "./css/DeleteAdminOffer.css";


function DeleteAdminOffer({ offerId }) {
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

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`http://localhost:8000/api/admin_offers/${offerId}/`, config)
      .then(() => {
        setSuccess(true);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error deleting the offer: " + error.message);
        setLoading(false);
      });
  }, [offerId]);

  return (
    <div className="delete-offer-container">
      <h2>Delete Offer</h2>
      {loading && <p>Deleting offer...</p>}
      {success && <p className="success-message">Offer deleted successfully.</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default DeleteAdminOffer;
