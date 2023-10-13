import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import './css/UpdateCategory.css';

function UpdateCategory({ categoryId }) {
  const [category, setCategory] = useState({
    title: '',
  });

  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check if the user is an admin
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.role === 'admin') {
          setUserIsAdmin(true);
        }
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Fetch the category
    const token = localStorage.getItem('accessToken');

    if (userIsAdmin && token) {
      // Include the token in the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get(`http://localhost:8000/api/categories/${categoryId}/`, config)
        .then((response) => {
          setCategory(response.data);
        })
        .catch((error) => {
          console.error('Error fetching category:', error);
        });
    }
  }, [categoryId, userIsAdmin]);

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userIsAdmin) {
      setErrorMessage('You do not have permission to update categories.');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        setErrorMessage('JWT token is missing or expired');
        setLoading(false);
        return;
      }

      // Include the token in the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(`http://localhost:8000/api/categories/${categoryId}/`, category, config);

      if (response.status === 200) {
        setSuccessMessage('Category updated successfully');
      } else {
        setErrorMessage('Error updating category.');
      }
    } catch (error) {
      setErrorMessage('Error updating category: ' + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="update-category-container">
      <h2>Update Category</h2>
      {userIsAdmin ? (
        <form className="category-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={category.title}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="update-button" disabled={loading}>
            {loading ? 'Updating...' : 'Update Category'}
          </button>
        </form>
      ) : (
        <p className="error-message">You do not have permission to update categories.</p>
      )}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default UpdateCategory;
