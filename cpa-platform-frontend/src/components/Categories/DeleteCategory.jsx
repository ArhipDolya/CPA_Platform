import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import './css/DeleteCategory.css';

function DeleteCategory({ categoryId }) {
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
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

  const handleDelete = async () => {
    if (!userIsAdmin) {
      setErrorMessage('You do not have permission to delete categories.');
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

      const response = await axios.delete(`http://localhost:8000/api/categories/${categoryId}/`, config);

      if (response.status === 204) {
        setSuccessMessage('Category deleted successfully');
      }
    } catch (error) {
      setErrorMessage('Error deleting category: ' + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="delete-category-container">
      <h2>Delete Category</h2>
      {userIsAdmin ? (
        <>
          <p>Are you sure you want to delete this category?</p>
          <button className="delete-button" onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Category'}
          </button>
        </>
      ) : (
        <p className="error-message">You do not have permission to delete categories.</p>
      )}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default DeleteCategory;
