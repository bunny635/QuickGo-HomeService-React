import React, { useState } from 'react';
import './Auth.css';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

const Login = () => {
  const navigate = useNavigate();

  // 1. State for Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // 2. Validation Logic
  const handleLogin = (e) => {
    e.preventDefault();

    // Basic Validation
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email Regex Pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // Simulated Success
    toast.success("Login Successful! Welcome to QuickGo.");
    navigate('/'); // Redirect to Home
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-overlay"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card"
      >
        {/* Logo and Brand */}
        <div className="text-center mb-4">
          <img src="/weblogo.jpg" alt="QuickGo" className="auth-logo" />
          <h2 className="auth-title mt-2">Welcome <span>Back</span></h2>
          <p className="auth-subtitle">Your Time, Our Priority.</p>
        </div>

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="input-group-custom mb-3">
            <FiMail className="input-icon" />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
            />
          </div>

          {/* Password Input */}
          <div className="input-group-custom mb-3">
            <FiLock className="input-icon" />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
            />
          </div>

          {/* Helpers: Remember & Forgot */}
          <div className="d-flex justify-content-between align-items-center mb-4 px-1">
            <div className="form-check">
              <input 
                type="checkbox" 
                className="form-check-input custom-check" 
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label className="form-check-label text-muted small" htmlFor="remember">Remember Me</label>
            </div>
            <Link to="#" className="forgot-link">Forgot Password?</Link>
          </div>

          {/* Submit Button */}
          <div className="w-100 mb-3">
            <PrimaryButton text="Login to QuickGo" type="submit" />
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-muted small">
            Don't have an account? <Link to="/register" className="auth-link-gold">Register Now</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;