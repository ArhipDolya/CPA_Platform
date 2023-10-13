import React, { useState, useEffect } from "react";
import axios from "axios";

import './css/CategoriesList.css';

function CategoriesList() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch categories when the component mounts
        const token = localStorage.getItem("accessToken"); // Get the JWT token from localStorage

        if (!token) {
            console.error("JWT token is missing.");
            setLoading(false);
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
            },
        };

        axios.get('http://localhost:8000/api/categories/', config)
            .then((response) => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="categories-list-container">
            <h2>Categories List</h2>
            {loading ? (
                <p>Loading categories...</p>
            ) : categories.length === 0 ? (
                <p>No categories available.</p>
            ) : (
                <ul className="category-list">
                    {categories.map((category, index) => (
                        <li key={index} className="category-item">
                            {category.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CategoriesList;
