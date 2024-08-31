import React from 'react';
import './loader.css'; // CSS file for styling

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="pokeball"></div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default Loader;
