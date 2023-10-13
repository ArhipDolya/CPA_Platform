import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import './css/RegistrationForm.css';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    user_type: 'brand', // Default value
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/users/register/', formData);
      console.log(response.data);
      navigate('/login')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">User Type</label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="user_type_brand"
              name="user_type"
              value="brand"
              checked={formData.user_type === 'brand'}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="user_type_brand">
              Brand
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="user_type_influencer"
              name="user_type"
              value="influencer"
              checked={formData.user_type === 'influencer'}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="user_type_influencer">
              Influencer
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
