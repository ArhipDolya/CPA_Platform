import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

import "./css/GetAdminOffer.css";

function GetAdminOffer({ offer_id }) {
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
      .get(`http://localhost:8000/api/admin_offers/${offer_id}/`, config)
      .then((response) => {
        setOffer(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching the offer: " + error.message);
        setLoading(false);
      });
  }, [offer_id]);

  return (
    <div className="get-offer-container">
      <h2>Get Offer</h2>
      {loading && <p>Loading offer...</p>}
      {error && <p className="error-message">{error}</p>}
      {offer && (
        <div className="offer-details">
          <h3>{offer.title}</h3>
          <p>ID: {offer.id}</p>
          <p>Active: {offer.is_active ? "Yes" : "No"}</p>
          <p>Description: {offer.description}</p>
          <p>Price: {offer.price}</p>
          <p>Payout: {offer.payout}</p>
          <p>Creation Date: {offer.creation_date}</p>
          <p>VIP: {offer.is_vip ? "Yes" : "No"}</p>
          <p>Category: {offer.category}</p>
          <p>Brand: {offer.brand}</p>
        </div>
      )}
    </div>
  );
}

export default GetAdminOffer;
