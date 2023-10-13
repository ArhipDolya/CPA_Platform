import React, { useState, useEffect } from "react";
import axios from "axios";

import './css/DeleteOffer.css'


function DeleteOffer({ offerId }) {
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

    const deleteOffer = async () => {
      try {
        const response = await axios.delete(`http://localhost:8000/api/offers/${offerId}`, config);

        if (response.status === 200) {
          setSuccessMessage("Offer deleted successfully");
        } else {
          setErrorMessage("Error deleting offer");
        }
      } catch (error) {
        setErrorMessage("Error deleting offer: " + error.message);
      }
    };

    deleteOffer();
  }, [offerId]);

  return (
    <div className="delete-offer-container">
      <h2>Delete Offer</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default DeleteOffer;
