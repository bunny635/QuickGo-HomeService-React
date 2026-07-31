import React, { useState } from 'react';
import './Auth.css';
import CinematicBackground from '../../components/CinematicBackground/CinematicBackground'; 
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleLogin = (e) => {
    e.preventDefault();

    let isValid = false;
    let displayName = "";

    // Presentation Credentials Logic
    if (role === "user" && email === "user@quickgo.com" && password === "user123") {
      isValid = true; displayName = "Smit Ghoghari";
    } else if (role === "admin" && email === "admin@quickgo.com" && password === "admin123") {
      isValid = true; displayName = "System Admin";
    } else if (role === "provider" && email === "provider@quickgo.com" && password === "provider123") {
      isValid = true; displayName = "Pro Service Team";
    }

    if (isValid) {
      localStorage.setItem('user_name', displayName);
      localStorage.setItem('user_role', role);
      toast.success(`Welcome ${displayName}!`);
      
      setTimeout(() => {
        window.location.href = role === "admin" ? "/admin-dashboard" : role === "provider" ? "/provider-dashboard" : "/";
      }, 2000);
    } else {
      toast.error("Invalid credentials for the selected portal.");
    }
  };

  return (
    <div className="auth-page-container">
      {/* BACKGROUND LAYER */}
      <CinematicBackground />

      {/* FORM LAYER */}
      <div className="auth-wrapper">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8 }}
          className="glass-card"
        >
          <div className="text-center mb-4">
            <img src="/weblogo.jpg" alt="QuickGo" className="auth-logo" />
            <h2 className="auth-title mt-2">Quick<span>Go</span> Access</h2>
            <p className="auth-subtitle text-muted small">Choose your portal role to sign in</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="input-group-custom mb-3">
              <FiUsers className="input-icon" />
              <select className="auth-input" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User Portal</option>
                <option value="provider">Service Provider Portal</option>
                <option value="admin">Administrator Portal</option>
              </select>
            </div>

            <div className="input-group-custom mb-3">
              <FiMail className="input-icon" />
              <input type="email" placeholder="Email ID" className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="input-group-custom mb-4">
              <FiLock className="input-icon" />
              <input type="password" placeholder="Password" className="auth-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <PrimaryButton text={<span>Sign In <FiArrowRight className="ms-2"/></span>} type="submit" />
          </form>

          <div className="text-center mt-4">
             <p className="text-muted small">
               Don't have an account? <Link to="/register" className="auth-link-gold text-decoration-none ms-1">Register here</Link>
             </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;