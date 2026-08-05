import React from 'react';
import './CinematicBackground.css';

const CinematicBackground = () => {
  return (
    <div className="cinematic-background-root">
      {/* The static background image */}
      <div className="static-eagle-bg" />
      
      {/* Dark vignette overlay to ensure text readability on the cards */}
      <div className="cinematic-dark-overlay" />
    </div>
  );
};

export default CinematicBackground;