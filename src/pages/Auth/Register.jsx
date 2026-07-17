import React, { useState } from 'react';
import './Auth.css';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiPhone, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

const Register = () => {
  const navigate = useNavigate();

  // State for Form Fields
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

  // Validation & Submit
  const handleRegister = (e) => {
    e.preventDefault();

    const { name, email, phone, address, password, confirmPassword, agreeTerms } = formData;

    // 1. Check for empty fields
    if (!name || !email || !phone || !address || !password || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    // 2. Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Invalid email format!");
      return;
    }

    // 3. Phone Validation (Simple 10 digit check)
    if (phone.length < 10) {
      toast.error("Please enter a valid 10-digit phone number!");
      return;
    }

    // 4. Password Length check
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    // 5. Match Passwords
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // 6. Terms Checkbox
    if (!agreeTerms) {
      toast.error("Please agree to the Terms & Conditions");
      return;
    }

    // SUCCESS
    toast.success("Account created successfully! Please login.");
    navigate('/login');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-overlay"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card register-card"
      >
        <div className="text-center mb-4">
          <h2 className="auth-title">Join <span>QuickGo</span></h2>
          <p className="auth-subtitle">Create your account for premium services.</p>
        </div>

        <form onSubmit={handleRegister}>
          {/* Full Name */}
          <div className="input-group-custom mb-3">
            <FiUser className="input-icon" />
            <input 
              type="text" 
              name="name"
              placeholder="Full Name" 
              className="auth-input"
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="input-group-custom mb-3">
            <FiMail className="input-icon" />
            <input 
              type="email" 
              name="email"
              placeholder="Email Address" 
              className="auth-input"
              onChange={handleChange}
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
            />
          </div>

          {/* Terms & Conditions */}
          <div className="form-check mb-4 px-1">
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
            Already have an account? <Link to="/login" className="auth-link-gold">Login Here</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;