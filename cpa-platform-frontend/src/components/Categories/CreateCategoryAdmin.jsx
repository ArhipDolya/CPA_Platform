import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import './css/CreateCategory.css';

function CreateCategory() {
  const [category, setCategory] = useState({
    title: '',
  });

  const [userIsAdmin, setUserIsAdmin] = useState(false);

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

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userIsAdmin) {
      console.error('You do not have permission to create categories.');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('JWT token is missing or expired');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post('http://localhost:8000/api/categories/', category, config);
      console.log('Category created:', response.data);

      setCategory({
        title: '',
      });
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <div className="create-category-container">
      <h2>Create New Category</h2>
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
          <button type="submit" className="create-button">
            Create Category
          </button>
        </form>
      ) : (
        <p>You do not have permission to create categories.</p>
      )}
    </div>
  );
}

export default CreateCategory;
