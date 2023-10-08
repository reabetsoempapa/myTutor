import React from 'react';
import './stylingHeader/backButton.css';
import { useNavigate } from 'react-router-dom';

// Define a functional component called FloatingBackButton
const FloatingBackButton = () => {
  // Access the useNavigate function from react-router-dom
  const navigate = useNavigate();

  // Render a button that, when clicked, calls navigate(-1) to go back
  return (
    <button onClick={() => navigate(-1)} className="floating-back-button">
      {/* Display a left arrow and the text "Back" */}
      &#8592; Back
    </button>
  );
};

// Export the FloatingBackButton component
export default FloatingBackButton;


