import React from 'react';
import { Link } from 'react-router-dom';
import './stylingHeader/navigation.css';

// Define a functional component called Navigation
const Navigation = () => {
  return (
    <nav className="navigation">
      {/* Create an unordered list for navigation pills */}
      <ul className="nav-pills">
        {/* Create a navigation pill for the Home link */}
        <li className="nav-pill">
          {/* Create a Link component for the Home link with a specified route */}
          <Link to="/" className="nav-link" >
            Home
          </Link>
        </li>
        {/* Create a navigation pill for the Applications link */}
        <li className="nav-pill">
          {/* Create a Link component for the Applications link with a specified route */}
          <Link to="/applications" className="nav-link" >
            Applications
          </Link>
        </li>
      </ul>
    </nav>
  );
};

// Export the Navigation component
export default Navigation;


