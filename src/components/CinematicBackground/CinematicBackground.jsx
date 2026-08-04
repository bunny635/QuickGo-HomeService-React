import React, { useEffect, useState, useMemo, useRef } from 'react';
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
      
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== newRipple.id)), 1000);
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
// 2. RANDOM GOLDEN DOTS ENGINE
// ==========================================
const GoldenDotsLayer = () => {
  const dots = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, 
      y: Math.random() * 100, 
      size: Math.random() * 3 + 1, // Sizes between 1px and 4px
      delay: Math.random() * 5, 
      duration: Math.random() * 4 + 2, 
    }));
  }, []);

  return (
    <div className="golden-dots-container">
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="random-golden-dot"
          style={{
            left: `${dot.x}vw`, top: `${dot.y}vh`,
            width: `${dot.size}px`, height: `${dot.size}px`,
            animationDelay: `${dot.delay}s`, animationDuration: `${dot.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

// ==========================================
// 3. BULLETPROOF INTERACTIVE WATERCOLOR BUBBLES
// ==========================================
const Bubble = ({ data, mousePos }) => {
  const bubbleRef = useRef(null);
  const [isBursting, setIsBursting] = useState(false);
  const [scatterPos, setScatterPos] = useState({ x: 0, y: 0 });

  const popBubble = () => {
    if (isBursting) return;
    setIsBursting(true);
    
    // Calculate a violent, random watercolor splash direction
    const dirX = Math.random() > 0.5 ? 1 : -1;
    const dirY = Math.random() > 0.5 ? 1 : -1;
    
    setScatterPos({
      x: dirX * (Math.random() * 12 + 15),
      y: dirY * (Math.random() * 12 + 15)
    });

    // Respawn the bubble seamlessly after the watercolor dissolves
    setTimeout(() => {
      setIsBursting(false);
      setScatterPos({ x: 0, y: 0 });
    }, 1200);
  };

  // MATHEMATICAL COLLISION DETECTION
  // This completely ignores CSS layering. If your mouse crosses the bubble's screen coordinates, it pops!
  useEffect(() => {
    if (isBursting || !bubbleRef.current) return;
    const rect = bubbleRef.current.getBoundingClientRect();
    
    // Adding a 15px invisible hitbox buffer around the bubble to make it easier to pop
    if (
      mousePos.x >= rect.left - 15 && mousePos.x <= rect.right + 15 &&
      mousePos.y >= rect.top - 15 && mousePos.y <= rect.bottom + 15
    ) {
      popBubble();
    }
  }, [mousePos, isBursting]);

  return (
    <motion.div
      ref={bubbleRef}
      className={`interactive-bubble ${isBursting ? 'watercolor-burst' : ''}`}
      initial={{ x: `${data.x}vw`, y: `${data.y}vh` }}
      animate={
        isBursting
          ? { 
              x: `${data.x + scatterPos.x}vw`,
              y: `${data.y + scatterPos.y}vh`,
              scale: [1, 3.5, 4.5], // Massively expands like paint in water
              opacity: [0.9, 0.8, 0] // Fades out into the background
            }
          : { 
              x: [`${data.x}vw`, `${data.x + 4}vw`, `${data.x - 4}vw`, `${data.x}vw`],
              y: [`${data.y}vh`, `${data.y - 12}vh`, `${data.y + 6}vh`, `${data.y}vh`],
              scale: [1, 1.05, 1],
              opacity: 0.75
            }
      }
      transition={{
        duration: isBursting ? 0.9 : data.duration, // Fast burst vs Slow peaceful float
        ease: isBursting ? "easeOut" : "easeInOut",
        repeat: isBursting ? 0 : Infinity // Stops repeating while bursting
      }}
      onClick={popBubble} // Fallback for clicking
      style={{
        width: `${data.size}px`,
        height: `${data.size}px`,
      }}
    />
  );
};

const InteractiveBubblesLayer = ({ mousePos }) => {
  const bubbles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 95, 
      y: Math.random() * 95, 
      size: Math.random() * 50 + 35, // Random sizes between 35px and 85px
      duration: Math.random() * 18 + 12, 
    }));
  }, []);

  return (
    <div className="interactive-bubbles-container">
      {bubbles.map((b) => (
        <Bubble key={b.id} data={b} mousePos={mousePos} />
      ))}
    </div>
  );
};

// ==========================================
// MAIN EXPORT
// ==========================================
const CinematicBackground = () => {
  // Global Mouse Tracker State
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    let rafId;
    const handleGlobalMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };
    
    window.addEventListener('mousemove', handleGlobalMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleGlobalMove);
  }, []);

  return (
    <motion.div 
      className="cinematic-background-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <div className="pure-black-overlay" />
      <MouseInteraction />
      <GoldenDotsLayer />
      <InteractiveBubblesLayer mousePos={mousePos} />
    </motion.div>
  );
};

export default CinematicBackground;