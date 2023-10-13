import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

import "./css/CreateOffer.css";

function CreateOffer() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: 1,
    payout: "",
    price: "",
  });

  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch categories when the component mounts
    const token = localStorage.getItem("accessToken"); // Get the JWT token from localStorage

    if (!token) {
        console.error("JWT token is missing.");
        return;
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
        },
    };

    console.log("Token:", token);

    axios.get('http://localhost:8000/api/categories/', config)
        .then((response) => {
            setCategories(response.data);
        })
        .catch((error) => {
            console.error('Error fetching categories:', error);
        });
    }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if a valid JWT token exists in localStorage
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setErrorMessage("JWT token is missing or expired");
      return;
    }

    // Decode the JWT token to check its contents
    const decodedToken = jwtDecode(token);

    if (!decodedToken) {
      setErrorMessage("Invalid JWT token");
      return;
    }

    // Make the POST request to create the offer with JWT token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post("http://localhost:8000/api/offers/", formData, config)
      .then((response) => {
        if (response.status === 201) {
          setSuccessMessage("Offer created successfully");
          setFormData({
            title: "",
            description: "",
            category: 1,
            payout: "",
            price: "",
          });
        } else {
          setErrorMessage("Error creating offer");
        }
      })
      .catch((error) => {
        setErrorMessage("Error creating offer: " + error.message);
      });
  };

  return (
    <div className="create-offer-container">
      <h2>Create Offer</h2>
      <form className="offer-form" onSubmit={handleSubmit}>
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
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
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
        <button type="submit" className="create-button">
          Create Offer
        </button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default CreateOffer;

