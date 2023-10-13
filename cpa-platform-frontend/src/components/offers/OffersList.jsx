import React, { useState, useEffect } from "react";
import axios from "axios";

import './css/OffersList.css'

function OffersList() {
  const [offers, setOffers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Check if a valid JWT token exists in localStorage
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setErrorMessage("JWT token is missing or expired");
      return;
    }

    // Make the GET request to fetch all offers with JWT token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios   
      .get("http://localhost:8000/api/offers/", config)
      .then((response) => {
        setOffers(response.data);
      })
      .catch((error) => {
        setErrorMessage("Error fetching offers: " + error.message);
      });
  }, []);

  return (
    <div className="offers-list-container">
      <h2>Offers List</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {offers.length === 0 ? (
        <p>No offers available.</p>
      ) : (
        <ul>
          {offers.map((offer, index) => (
            <li key={index}>
              <strong>Title:</strong> {offer.title}
              <br />
              <strong>Category:</strong> {offer.category}
              <br />
              <strong>Is Active:</strong>{" "}
              <span className={offer.is_active ? "is-active-yes" : "is-active-no"}>
                {offer.is_active ? "Yes" : "No"}
              </span>
              <br />
              <strong>Payout:</strong> {offer.payout}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OffersList;
