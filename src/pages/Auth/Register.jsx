import React, { useState } from 'react';
import './Auth.css';
import CinematicBg from '../../components/CinematicBg/CinematicBg'; 
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiPhone, FiCheckCircle, FiUsers, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

const Register = () => {
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", confirmPassword: "", agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    if (!formData.agreeTerms) {
      return toast.error("Please agree to the Terms & Conditions");
    }

    localStorage.setItem('user_name', formData.name);
    localStorage.setItem('user_role', role);
    toast.success(`Account created for ${formData.name}!`);

    setTimeout(() => {
      window.location.href = role === "admin" ? "/admin-dashboard" : role === "provider" ? "/provider-dashboard" : "/";
    }, 2000);
  };

  return (
    <div className="auth-page-container">
      {/* BACKGROUND LAYER */}
      <CinematicBg />

      {/* FORM LAYER */}
      <div className="auth-wrapper">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card register-card"
        >
          <div className="text-center mb-4">
            <img src="/weblogo.jpg" alt="QuickGo" className="auth-logo" />
            <h2 className="auth-title mt-2">Join <span>QuickGo</span></h2>
            <p className="auth-subtitle text-muted small">Create your premium portal account</p>
          </div>

          <form onSubmit={handleRegister}>
            <div className="input-group-custom mb-3">
              <FiUsers className="input-icon" />
              <select className="auth-input" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">Register as Customer</option>
                <option value="provider">Register as Service Provider</option>
                <option value="admin">Register as Administrator</option>
              </select>
            </div>

            <div className="input-group-custom mb-3">
              <FiUser className="input-icon" />
              <input type="text" name="name" placeholder="Full Name" className="auth-input" onChange={handleChange} required />
            </div>

            <div className="input-group-custom mb-3">
              <FiMail className="input-icon" />
              <input type="email" name="email" placeholder="Email ID" className="auth-input" onChange={handleChange} required />
            </div>

            <div className="input-group-custom mb-3">
              <FiLock className="input-icon" />
              <input type="password" name="password" placeholder="Create Password" className="auth-input" onChange={handleChange} required />
            </div>

            <div className="input-group-custom mb-3">
              <FiCheckCircle className="input-icon" />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" className="auth-input" onChange={handleChange} required />
            </div>

            <div className="form-check mb-4 px-1 text-start">
              <input type="checkbox" name="agreeTerms" className="form-check-input custom-check" id="terms" onChange={handleChange} />
              <label className="form-check-label text-muted small ms-2" htmlFor="terms">
                I agree to the <span className="text-gold">Terms & Conditions</span>
              </label>
            </div>

            <PrimaryButton text={<span>Get Started <FiArrowRight className="ms-2"/></span>} type="submit" />
          </form>

          <div className="text-center mt-4">
            <p className="text-muted small">
              Already a member? <Link to="/login" className="auth-link-gold text-decoration-none ms-1">Login here</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;