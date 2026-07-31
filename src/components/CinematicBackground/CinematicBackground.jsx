import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import './CinematicBackground.css';

// ==========================================
// 1. MOUSE INTERACTION (Ripples & Ambient Light)
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
// 2. PARTICLE ENGINE (Floating Gold Dust)
// ==========================================
const ParticleEngine = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 120 }).map((_, i) => {
      const size = Math.random() * 3 + 1;
      const tx = (Math.random() - 0.5) * 100; 
      const ty = (Math.random() - 0.5) * 100; 
      const duration = Math.random() * 4 + 4; 
      const delay = Math.random() * -20; 
      
      return {
        id: i,
        style: {
          width: `${size}px`, height: `${size}px`,
          '--tx': `${tx}vw`, '--ty': `${ty}vh`,
          animationDuration: `${duration}s`, animationDelay: `${delay}s`
        }
      };
    });
  }, []);

  return (
    <div className="particle-engine-container">
      {particles.map(p => (
        <div key={p.id} className="golden-particle cinematic-particle-anim" style={p.style} />
      ))}
    </div>
  );
};

// ==========================================
// 3. EAGLE ANIMATION (Logo Formation & Flight)
// ==========================================
const EagleAnimation = () => {
  return (
    <div className="eagle-animation-wrapper">
      {/* Update src to your actual uploaded eagle logo path (e.g., "/weblogo.jpg") */}
      <img 
        src="./weblogo.jpg" 
        alt="QuickGo Eagle" 
        className="premium-eagle-logo"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'block';
        }}
      />
      {/* Fallback SVG if image path is incorrect during dev */}
      <svg className="premium-eagle-fallback" viewBox="0 0 100 100" style={{ display: 'none' }}>
        <path fill="#D4AF37" d="M50 15 L75 40 Q85 30 95 20 Q80 50 60 60 L50 85 L40 60 Q20 50 5 20 Q15 30 25 40 Z" />
      </svg>
      
      <div className="eagle-particle-trail">
  {Array.from({ length: 15 }).map((_, i) => {
    // Generate the random coordinates here in JavaScript
    const randomX = (Math.random() - 0.5) * 40; // values between -20 and 20
    const randomY = (Math.random() - 0.5) * 40;
    
    return (
      <div 
        key={i} 
        className="trail-spark" 
        style={{ 
          '--delay': `${i * 0.1}s`,
          '--tx': `${randomX}px`,
          '--ty': `${randomY}px`
        }} 
      />
    );
  })}
  </div>
    </div>
  );
};

// ==========================================
// 4. LOGO REVEAL (Text Reveal)
// ==========================================
const LogoReveal = () => (
  <div className="logo-reveal-container">
    <h1 className="luxury-brand-title">Quick<span className="gold-highlight">Go</span></h1>
    <p className="luxury-brand-tagline">Your Time, Our Priority.</p>
  </div>
);

// ==========================================
// 5. FEATHER ANIMATION (Floating Feathers)
// ==========================================
const FeatherAnimation = () => {
  const feathers = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 90 + 5}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${Math.random() * 10 + 15}s`,
      scale: Math.random() * 0.5 + 0.5
    }));
  }, []);

  return (
    <div className="feather-container">
      {feathers.map(f => (
        <div 
          key={f.id} className="luxury-feather"
          style={{ left: f.left, animationDelay: f.delay, animationDuration: f.duration, transform: `scale(${f.scale})` }}
        >
          <svg viewBox="0 0 24 24" width="30" height="30">
            <path fill="rgba(212, 175, 55, 0.15)" d="M20.2,4.8c-1.3-1.3-3.1-2.1-5.1-2.1c-4.4,0-8.3,3.8-9.8,9.1c-0.2,0.8-0.8,1.4-1.6,1.6 c-0.6,0.2-1.3,0.1-1.8-0.3l-0.6-0.5c-0.4-0.4-0.6-1.1-0.3-1.6c0.8-1.5,1.2-3.1,1.2-4.9c0-1-0.2-1.9-0.4-2.8 C1.2,3.8,0.7,4.5,0.4,5.3c-1.1,3.2-0.5,6.9,1.7,9.6L1.2,16c-0.4,0.4-0.4,1,0,1.4s1,0.4,1.4,0l1.1-1.1c2.7,2.2,6.4,2.8,9.6,1.7 c0.8-0.3,1.5-0.8,2-1.4c-0.9-0.2-1.8-0.4-2.8-0.4c-1.8,0-3.4,0.4-4.9,1.2c0.5,0.3,1.2,0.1,1.6-0.3l-0.5-0.6 c-0.4-0.5-0.5-1.2-0.3-1.8C10.5,9.4,14.3,5.5,18.7,5.5C20.8,5.5,22.6,6.3,23.9,7.6C23.6,6.5,23,5.5,20.2,4.8z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

// ==========================================
// MAIN EXPORT (Master Container)
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
      <MouseInteraction />
      <ParticleEngine />
      <div className="cinematic-sequence-container">
        <EagleAnimation />
        <LogoReveal />
      </div>
      <FeatherAnimation />
    </motion.div>
  );
};

export default CinematicBackground;