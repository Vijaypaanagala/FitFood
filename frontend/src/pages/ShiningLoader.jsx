import React from 'react';
import '../styles/ShiningLoader.css' // Import the CSS file for loader styling

function ShiningLoader({ count = 10, height = 150, className = '' }) {
  return (
    <div className={`shining-loader-container ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          className="loader-box"
          key={index}
          style={{ height: `${height}px` }} // Dynamic height for the loader box
        ></div>
      ))}
    </div>
  );
}

export default ShiningLoader;
