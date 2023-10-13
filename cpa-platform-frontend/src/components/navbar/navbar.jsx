import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './navbar.css'


function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        
        <nav>
            <Link to="/" className="title">
              CPA Platform
            </Link>
            <div className="menu" onClick={() => {
              setMenuOpen(!menuOpen);
            }}>
            <span></span>
            <span></span>
            <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
              <li>
                <NavLink to="/create-offer">Offer</NavLink>
              </li>
              <li>
                <NavLink to='/offers-list'>Offers</NavLink>
              </li>
              <li>
                <NavLink to="/register">Registration</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/user-profile">User Profile</NavLink>
              </li>
            </ul>
        </nav>
        
    );
}

export default Navbar;
