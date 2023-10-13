import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

import "./css/AdminOffers.css";

function AdminOffers() {
  const [adminOffers, setAdminOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if a valid JWT token exists in localStorage
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("JWT token is missing or expired");
      setLoading(false);
      return;
    }

    // Decode the JWT token to check its contents
    const decodedToken = jwtDecode(token);

    if (!decodedToken) {
      setError("Invalid JWT token");
      setLoading(false);
      return;
    }

    // Check if the user is an admin (adjust the role field according to your token structure)
    if (!decodedToken.role === "admin") {
      setError("User is not an admin");
      setLoading(false);
      return;
    }

    // Make the GET request to fetch admin offers with JWT token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get("http://localhost:8000/api/admin_offers/", config)
      .then((response) => {
        setAdminOffers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching admin offers: " + error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="admin-offer-container">
      <h2>Admin Offers</h2>
      {loading && <p>Loading admin offers...</p>}
      {error && <p className="error-message">{error}</p>}
      {adminOffers.length === 0 ? (
        <p>No admin offers available.</p>
      ) : (
        <ul className="admin-offer-list">
          {adminOffers.map((offer) => (
            <li key={offer.id} className="admin-offer-item">
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminOffers;
