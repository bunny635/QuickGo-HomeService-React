import React, { useState } from 'react';
import './Auth.css';
import CinematicBackground from '../../components/CinematicBackground/CinematicBackground'; 
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight, FiUsers, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  // Interaction States for the Invisible Guardian Eagles
  const [isPwdFocused, setIsPwdFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    let isValid = false;
    let displayName = "";

    // 1. HARDCODED PRESENTATION ACCOUNTS (Not stored in JSON)
    if (role === "admin" && email === "admin@quickgo.com" && password === "admin123") {
      isValid = true; 
      displayName = "System Admin";
    } 
    else if (role === "user" && email === "user@quickgo.com" && password === "user123") {
      isValid = true; 
      displayName = "Demo User";
    } 
    else if (role === "provider" && email === "provider@quickgo.com" && password === "provider123") {
      isValid = true; 
      displayName = "Demo Provider";
    } 
    // 2. STRICT REGISTRATION CHECK (Reads from JSON Database)
    else {
      const existingUsers = JSON.parse(localStorage.getItem('quickgo_users')) || [];
      const foundUser = existingUsers.find(u => u.email === email && u.password === password && u.role === role);
      
      if (foundUser) {
        isValid = true;
        displayName = foundUser.name;
      }
    }

    if (isValid) {
      localStorage.setItem('user_name', displayName);
      localStorage.setItem('user_role', role);
      toast.success(`Welcome ${displayName}!`);
      
      setTimeout(() => {
        if (role === "admin") {
          window.location.href = "/admin-dashboard";
        } else if (role === "provider") {
          window.location.href = "/provider-dashboard";
        } else {
          window.location.href = "/";
        }
      }, 2000);
    } else {
      toast.error("Account not found or Invalid Credentials! Please register first.");
    }
  };

  return (
    <div className="auth-page-container">
      {/* Passing states to our hidden eagle guardians */}
      <CinematicBackground 
        passwordFocused={isPwdFocused} 
        passwordVisible={showPassword} 
      />

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
              <input 
                type="email" 
                placeholder="Email ID" 
                className="auth-input" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>

            <div className="input-group-custom mb-4" style={{ position: 'relative' }}>
              <FiLock className="input-icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                className="auth-input" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                onFocus={() => setIsPwdFocused(true)}
                onBlur={() => setIsPwdFocused(false)}
                required 
                style={{ paddingRight: '45px' }}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: '#D4AF37', fontSize: '18px', cursor: 'pointer', zIndex: 10
                }}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
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