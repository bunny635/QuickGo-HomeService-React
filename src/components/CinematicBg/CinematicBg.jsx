import React, { useMemo, useState } from 'react';
import './CinematicBg.css';

const CinematicBg = () => {
  const [ripples, setRipples] = useState([]);

  // 1. Ambient Background Particles
  const particles = useMemo(() => 
    [...Array(40)].map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      delay: Math.random() * 5 + "s",
      size: Math.random() * 3 + 1 + "px",
      duration: 10 + Math.random() * 5 + "s"
    })), []);

  // 2. Click Interaction Logic
  const handleBackgroundClick = (e) => {
    const newRipple = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY
    };
    setRipples((prev) => [...prev, newRipple]);
    // Clean up ripples after animation finishes
    setTimeout(() => {
      setRipples((prev) => prev.filter(r => r.id !== newRipple.id));
    }, 1000);
  };

  return (
    <div className="cinematic-bg-root" onClick={handleBackgroundClick}>
      
      {/* Interaction Layer: Ripples */}
      {ripples.map(ripple => (
        <div key={ripple.id} className="click-ripple" style={{ left: ripple.x, top: ripple.y }} />
      ))}

      {/* Layer 1: Ambient Drifting Particles */}
      <div className="ambient-layer">
        {particles.map((p) => (
          <div key={p.id} className="glow-particle" style={{ left: p.left, top: p.top, width: p.size, height: p.size, animationDelay: p.delay, animationDuration: p.duration }} />
        ))}
      </div>

      {/* Layer 2: The Main Cinematic Eagle-to-Logo Sequence */}
      <div className="sequence-container">
        <div className="eagle-wrapper">
          <svg viewBox="0 0 200 200" className="eagle-svg">
            {/* THIS IS THE LOGO'S EXACT EAGLE SILHOUETTE PROFILE */}
            <path 
              className="eagle-stroke" 
              d="M40,100 C40,70 60,50 100,50 C125,50 145,65 155,85 L180,95 L155,105 C160,125 145,145 110,150 C80,155 50,140 40,110 L55,100 L40,100 Z M135,85 A4,4 0 1,1 127,85 A4,4 0 1,1 135,85" 
              fill="none" 
              stroke="#D4AF37" 
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="logo-reveal-box">
           <h1 className="cinematic-logo-text">Quick<span>Go</span></h1>
           <p className="cinematic-tagline">Your Time, Our Priority.</p>
        </div>
      </div>

      {/* Layer 3: Occasional Floating Feathers */}
      <div className="feather-layer">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="floating-feather" style={{ left: (i * 25 + 10) + "%", animationDelay: i * 4 + "s" }}>
            <svg width="20" height="40" viewBox="0 0 20 40">
              <path d="M10,0 C15,10 18,25 10,40 C2,25 5,10 10,0" fill="#D4AF37" opacity="0.15" />
            </svg>
          </div>
        ))}
      </div>

    </div>
  );
};

export default CinematicBg;