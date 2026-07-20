import React, { useState } from 'react';
import './Auth.css';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight, FiUsers } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleLogin = (e) => {
    e.preventDefault();

    // --- HARDCODED CREDENTIALS LOGIC ---
    let isValid = false;
    let displayName = "";

    if (role === "user" && email === "user@quickgo.com" && password === "user123") {
      isValid = true;
      displayName = "Smit Ghoghari";
    } else if (role === "admin" && email === "admin@quickgo.com" && password === "admin123") {
      isValid = true;
      displayName = "Kavya Desai";
    } else if (role === "provider" && email === "provider@quickgo.com" && password === "provider123") {
      isValid = true;
      displayName = "Vinay Dharaiya";
    }

    if (isValid) {
      // Save details to simulated session
      localStorage.setItem('user_name', displayName);
      localStorage.setItem('user_role', role);

      toast.success(`Welcome ${displayName}! Accessing ${role} portal...`);

      // Redirect based on role
      setTimeout(() => {
        if (role === "admin") {
          window.location.href = "/admin-dashboard";
        } else if (role === "provider") {
          window.location.href = "/provider-dashboard";
        } else {
          window.location.href = "/"; // Customer goes Home
        }
      }, 1200);
    } else {
      toast.error("Invalid Credentials for " + role.toUpperCase());
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-overlay"></div>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card">
        <div className="text-center mb-4">
          <img src="/weblogo.jpg" alt="QuickGo" className="auth-logo" />
          <h2 className="auth-title mt-2">Quick<span>Go</span> Access</h2>
          <p className="auth-subtitle text-muted">Select your portal role</p>
        </div>

        <form onSubmit={handleLogin}>
          {/* Role Dropdown */}
          <div className="input-group-custom mb-3">
            <FiUsers className="input-icon" />
            <select className="auth-input" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">Customer Portal</option>
              <option value="provider">Service Provider Portal</option>
              <option value="admin">Administrator Portal</option>
            </select>
          </div>

          {/* Email */}
          <div className="input-group-custom mb-3">
            <FiMail className="input-icon" />
            <input 
              type="email" 
              placeholder="Email ID" 
              className="auth-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          {/* Password */}
          <div className="input-group-custom mb-4">
            <FiLock className="input-icon" />
            <input 
              type="password" 
              placeholder="Password" 
              className="auth-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <PrimaryButton text={<span>Sign In <FiArrowRight className="ms-2"/></span>} type="submit" />
        </form>

        <div className="text-center mt-4">
           <p className="text-muted small">Use your registered credentials to login.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;