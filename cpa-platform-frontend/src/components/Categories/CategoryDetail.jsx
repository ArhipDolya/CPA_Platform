import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './css/CategoryDetail.css';

function CategoryDetail({ categoryId }) {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        // Get the JWT token from local storage
        const token = localStorage.getItem('accessToken');

        if (!token) {
          // Handle the case where the token is missing or expired
          console.error('JWT token is missing or expired');
          setLoading(false);
          return;
        }

        // Include the token in the request headers
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`http://localhost:8000/api/categories/${categoryId}/`, config);

        if (response.status === 200) {
          setCategory(response.data);
        } else if (response.status === 403) {
          // Handle the case where the user is not authorized (403 Forbidden)
          setForbidden(true);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching category:', error);
        if (error.response && error.response.status === 404) {
          setNotFound(true);
        }
        setLoading(false);
      }
    };

    fetchCategory();

  }, [categoryId]);

  return (
    <div className="category-detail-container">
      <h2>Category Detail</h2>
      {loading ? (
        <p>Loading category...</p>
      ) : forbidden ? (
        <p>You do not have permission to view this category.</p>
      ) : notFound ? (
        <p>Category not found.</p>
      ) : category ? (
        <div className="category-info">
          <h3>{category.title}</h3>
        </div>
      ) : null}
    </div>
  );
}

export default CategoryDetail;
