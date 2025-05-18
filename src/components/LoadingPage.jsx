import React from 'react';
import './LoadingPage.css';

const LoadingPage = () => (
  <div className="loading-page">
    <div className="loading-logo">
      <span role="img" aria-label="fashion">🦄</span>
      <div className="loading-title">Fashion Splash</div>
    </div>
    <div className="spinner"></div>
    <div className="loading-text">Loading, please wait...</div>
  </div>
);

export default LoadingPage; 