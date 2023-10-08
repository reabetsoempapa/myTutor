import React from 'react';
import './stylingHeader/HeaderStyles.css';
import { Link } from 'react-router-dom';

// Define a functional component called Header
const Header = () => {
  return (
    <div>
      {/* Create a navigation bar */}
      <nav className="navbar">
        <div className="navbar-logo">
          {/* Create a link to the home page */}
          <Link to={'/'}>
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/University_of_Cape_Town_logo.svg/1200px-University_of_Cape_Town_logo.svg.png" alt="MyTutor Logo" />
          </Link>
          <span>MyTutor App</span>
        </div>
        <div className="navbar-buttons">
          {/* Create a profile button */}
          <button className="round-button profile-button">
            <img src="https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg" alt="Profile" />
          </button>
          {/* Display the username if available in sessionStorage */}
          <div>{sessionStorage.getItem('username') ? sessionStorage.getItem('username').split("@")[0] : ""}</div>
          {/* Create a log out button */}
          <button className="round-button logout-button" onClick={() => { sessionStorage.removeItem('logged'); window.location.reload(); }}>Log Out</button>
        </div>
      </nav>
    </div>
  );
};

// Export the Header component
export default Header;
