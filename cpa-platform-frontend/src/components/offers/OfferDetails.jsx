import React, { useState, useEffect } from "react";
import axios from "axios";

import './css/OfferDetails.css'


function OfferDetails({ offerId }) {
    const [offer, setOffer] = useState(null);
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
        .get(`http://localhost:8000/api/offers/${offerId}`, config)
        .then((response) => {
          setOffer(response.data);
        })
        .catch((error) => {
          setErrorMessage("Error fetching offer: " + error.message);
        });
    }, [offerId]);
  
    if (errorMessage) {
      return <div>{errorMessage}</div>;
    }
  
    if (!offer) {
      return <div></div>;
    }
  
    return (
    <div className="offer-details-container">
        <h2>{offer.title}</h2>
        <p>Category: {offer.category}</p>
        <p>Description: {offer.description}</p>
        <p>
          Is Active:{" "}
          <span className={offer.is_active ? "active-label" : "inactive-label"}>
            {offer.is_active ? "Yes" : "No"}
          </span>
        </p>
        <p>Payout: {offer.payout}</p>
        <p>Price: {offer.price}</p>
        <p>Creation Date: {offer.creation_date}</p>
        <p>
          Is VIP:{" "}
          <span className={offer.is_vip ? "active-label" : "inactive-label"}>
            {offer.is_vip ? "Yes" : "No"}
          </span>
        </p>
    </div>
    );
  }
  
  export default OfferDetails;