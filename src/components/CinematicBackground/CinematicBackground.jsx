import React, { useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import './CinematicBackground.css';

// ==========================================
// 1. MOUSE INTERACTION (Background Ripples)
// ==========================================
const MouseInteraction = () => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };

    const handleClick = (e) => {
      if (['INPUT', 'BUTTON', 'A', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return; 
      
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="mouse-interaction-layer">
      <div className="ambient-mouse-glow" />
      {ripples.map(ripple => (
        <div key={ripple.id} className="golden-ripple" style={{ left: ripple.x, top: ripple.y }} />
      ))}
    </div>
  );
};

// ==========================================
// 2. INTERACTIVE RAINBOW BUBBLES
// ==========================================
const Bubble = ({ data }) => {
  const [isBursting, setIsBursting] = useState(false);
  const [scatterPos, setScatterPos] = useState({ x: 0, y: 0 });

  const popBubble = () => {
    if (isBursting) return;
    setIsBursting(true);
    
    // Calculate a violent scatter direction (randomly flies away 15vw-30vw)
    const dirX = Math.random() > 0.5 ? 1 : -1;
    const dirY = Math.random() > 0.5 ? 1 : -1;
    
    setScatterPos({
      x: dirX * (Math.random() * 15 + 15),
      y: dirY * (Math.random() * 15 + 15)
    });

    // Respawn the bubble seamlessly after it finishes exploding
    setTimeout(() => {
      setIsBursting(false);
      setScatterPos({ x: 0, y: 0 });
    }, 1500);
  };

  return (
    <motion.div
      className={`interactive-bubble ${isBursting ? 'rainbow-burst' : ''}`}
      initial={{ x: `${data.x}vw`, y: `${data.y}vh` }}
      animate={{
        // During burst, add the scatter offset; otherwise, float peacefully
        x: isBursting ? `${data.x + scatterPos.x}vw` : [`${data.x}vw`, `${data.x + 4}vw`, `${data.x - 4}vw`, `${data.x}vw`],
        y: isBursting ? `${data.y + scatterPos.y}vh` : [`${data.y}vh`, `${data.y - 12}vh`, `${data.y + 6}vh`, `${data.y}vh`],
        // Array triggers keyframes: [normal -> massive explosion -> vanish]
        scale: isBursting ? [1, 2.8, 0] : [1, 1.05, 1],
        opacity: isBursting ? [1, 1, 0] : 0.85,
      }}
      transition={
        isBursting
          ? { duration: 0.5, ease: "easeOut" } // Fast, punchy explosion
          : { duration: data.duration, repeat: Infinity, ease: "easeInOut" } // Slow floating
      }
      onMouseEnter={popBubble}
      onTouchStart={popBubble} // Added for mobile support
      style={{
        width: `${data.size}px`,
        height: `${data.size}px`,
      }}
    />
  );
};

// PORTAL LAYER: Escapes the z-index trap to float IN FRONT of the login form
const InteractiveBubblesLayer = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bubbles = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: Math.random() * 95, 
      y: Math.random() * 95, 
      size: Math.random() * 60 + 30, // Realistic variable sizes
      duration: Math.random() * 18 + 12, 
    }));
  }, []);

  if (!mounted) return null;

  // Render bubbles into document.body so they catch mouse hovers perfectly
  return createPortal(
    <div className="interactive-bubbles-container">
      {bubbles.map((b) => (
        <Bubble key={b.id} data={b} />
      ))}
    </div>,
    document.body
  );
};

// ==========================================
// 3. BACKGROUND EFFECTS
// ==========================================
const AmbientBackground = () => (
  <div className="ambient-background-layer">
    <div className="bg-glow-orb orb-1" />
    <div className="bg-glow-orb orb-2" />
  </div>
);

// ==========================================
// MAIN EXPORT
// ==========================================
const CinematicBackground = () => {
  return (
    <motion.div 
      className="cinematic-background-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <div className="cinematic-gradient-overlay" />
      <AmbientBackground />
      <MouseInteraction />
      <InteractiveBubblesLayer />
    </motion.div>
  );
};

export default CinematicBackground;