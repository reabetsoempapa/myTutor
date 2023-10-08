import React from 'react';
import './styling/LoadingPage.css';

const LoadingPage = ({ elementBeingLoaded }) => {
  return (
    <div className="loading-page">
      <div className="loading-content">
      <div className="loading-spinner"></div>
        <p>Loading {elementBeingLoaded}...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
