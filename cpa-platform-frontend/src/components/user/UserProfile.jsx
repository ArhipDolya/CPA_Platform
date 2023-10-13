import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/UserProfile.css'


function UserProfile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to get the JWT token from local storage
    const getAccessToken = () => {
      return localStorage.getItem('accessToken');
    };

    // Function to fetch user information
    const fetchUserInfo = async () => {
      const accessToken = getAccessToken();

      if (!accessToken) {
        // Handle the case when the token is not available
        setError('Authentication credentials were not provided.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/users/me/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // Set the user data in the state
        setUser(response.data);
      } catch (error) {
        console.error('Error getting user information:', error);
      }
    };

    // Call the function to fetch user information when the component mounts
    fetchUserInfo();
  }, []);

  if (error) {
    return (
      <div className="container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return <div></div>;
  }

  // Render the user information
  return (
    <div className="container">
      <h2>User Profile</h2>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>User Type:</strong> {user.user_type}
      </div>
    </div>
  );
}

export default UserProfile;
