import React, { useState } from 'react';
import './Auth.css';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiPhone, FiMapPin, FiCheckCircle, FiUsers } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

const Register = () => {
  const navigate = useNavigate();

  // State for Role and Form Data
  const [role, setRole] = useState("user"); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // Registration Logic
  const handleRegister = (e) => {
    e.preventDefault();

    const { name, email, phone, address, password, confirmPassword, agreeTerms } = formData;

    // 1. Basic Validation
    if (!name || !email || !phone || !address || !password || !confirmPassword) {
      toast.error("Please fill in all mandatory fields!");
      return;
    }

    // 2. Password Match Check
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // 3. Terms Check
    if (!agreeTerms) {
      toast.error("You must agree to the Terms & Conditions");
      return;
    }

    // --- SIMULATED REGISTRATION SUCCESS ---
    // Saving to localStorage to mimic a session
    localStorage.setItem('user_name', name);
    localStorage.setItem('user_role', role);

    toast.success(`Account Created for ${name} as ${role.toUpperCase()}!`);

    // --- REDIRECTION BASED ON ROLE ---
    setTimeout(() => {
      if (role === "admin") {
        window.location.href = "/admin-dashboard";
      } else if (role === "provider") {
        window.location.href = "/provider-dashboard";
      } else {
        window.location.href = "/"; // Customer goes to Home
      }
    }, 1500);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-overlay"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card register-card"
      >
        <div className="text-center mb-4">
          <img src="/weblogo.jpg" alt="QuickGo" className="auth-logo" />
          <h2 className="auth-title mt-2">Join <span>QuickGo</span></h2>
          <p className="auth-subtitle text-muted">Register your portal account</p>
        </div>

        <form onSubmit={handleRegister}>
          {/* Role Selection Dropdown */}
          <div className="input-group-custom mb-3">
            <FiUsers className="input-icon" />
            <select 
              className="auth-input" 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">Register as Customer</option>
              <option value="provider">Register as Service Provider</option>
              <option value="admin">Register as Administrator</option>
            </select>
          </div>

          {/* Full Name */}
          <div className="input-group-custom mb-3">
            <FiUser className="input-icon" />
            <input 
              type="text" 
              name="name"
              placeholder="Full Name" 
              className="auth-input"
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="input-group-custom mb-3">
            <FiMail className="input-icon" />
            <input 
              type="email" 
              name="email"
              placeholder="Email ID" 
              className="auth-input"
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="input-group-custom mb-3">
            <FiPhone className="input-icon" />
            <input 
              type="number" 
              name="phone"
              placeholder="Phone Number" 
              className="auth-input"
              onChange={handleChange}
              required
            />
          </div>

          {/* Address */}
          <div className="input-group-custom mb-3">
            <FiMapPin className="input-icon" />
            <input 
              type="text" 
              name="address"
              placeholder="Your Full Address" 
              className="auth-input"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="input-group-custom mb-3">
            <FiLock className="input-icon" />
            <input 
              type="password" 
              name="password"
              placeholder="Create Password" 
              className="auth-input"
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="input-group-custom mb-3">
            <FiCheckCircle className="input-icon" />
            <input 
              type="password" 
              name="confirmPassword"
              placeholder="Confirm Password" 
              className="auth-input"
              onChange={handleChange}
              required
            />
          </div>

          {/* Terms & Conditions */}
          <div className="form-check mb-4 px-1 text-start">
            <input 
              type="checkbox" 
              name="agreeTerms"
              className="form-check-input custom-check" 
              id="terms"
              onChange={handleChange}
            />
            <label className="form-check-label text-muted small" htmlFor="terms">
              I agree to the <span className="text-gold">Terms & Conditions</span>
            </label>
          </div>

          <PrimaryButton text="Create Account" type="submit" />
        </form>

        <div className="text-center mt-4">
          <p className="text-muted small">
            Already have an account? <Link to="/login" className="auth-link-gold text-decoration-none">Login Here</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;