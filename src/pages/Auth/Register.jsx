import React, { useState } from 'react';
import './Auth.css';
import CinematicBackground from '../../components/CinematicBackground/CinematicBackground'; 
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiCheckCircle, FiUsers, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

const Register = () => {
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", confirmPassword: "", agreeTerms: false
  });

  // Interaction States for the Invisible Eagle Background
  const [pwdFocused, setPwdFocused] = useState(false);
  const [confirmPwdFocused, setConfirmPwdFocused] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const isAnyPasswordFocused = pwdFocused || confirmPwdFocused;
  const isAnyPasswordVisible = (pwdFocused && showPwd) || (confirmPwdFocused && showConfirmPwd);

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

    const existingUsers = JSON.parse(localStorage.getItem('quickgo_users')) || [];
    const userExists = existingUsers.find(u => u.email === formData.email);
    if (userExists) {
      return toast.error("Email is already registered! Please login.");
    }

    const newUser = {
      name: formData.name, email: formData.email, password: formData.password, role: role
    };

    existingUsers.push(newUser);
    localStorage.setItem('quickgo_users', JSON.stringify(existingUsers));
    localStorage.setItem('user_name', formData.name);
    localStorage.setItem('user_role', role);
    toast.success(`Account created for ${formData.name}!`);

    setTimeout(() => {
      window.location.href = role === "provider" ? "/provider-dashboard" : "/";
    }, 2000);
  };

  return (
    <div className="auth-page-container">
      <CinematicBackground 
        passwordFocused={isAnyPasswordFocused} 
        passwordVisible={isAnyPasswordVisible} 
      />

      <div className="auth-wrapper">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
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

            <div className="input-group-custom mb-3" style={{ position: 'relative' }}>
              <FiLock className="input-icon" />
              <input 
                type={showPwd ? "text" : "password"} 
                name="password" placeholder="Create Password" 
                className="auth-input" onChange={handleChange} required 
                onFocus={() => setPwdFocused(true)} onBlur={() => setPwdFocused(false)}
                style={{ paddingRight: '45px' }}
              />
              <button 
                type="button" onClick={() => setShowPwd(!showPwd)}
                style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#D4AF37', fontSize: '18px', cursor: 'pointer', zIndex: 10 }}
              >
                {showPwd ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <div className="input-group-custom mb-3" style={{ position: 'relative' }}>
              <FiCheckCircle className="input-icon" />
              <input 
                type={showConfirmPwd ? "text" : "password"} 
                name="confirmPassword" placeholder="Confirm Password" 
                className="auth-input" onChange={handleChange} required 
                onFocus={() => setConfirmPwdFocused(true)} onBlur={() => setConfirmPwdFocused(false)}
                style={{ paddingRight: '45px' }}
              />
              <button 
                type="button" onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#D4AF37', fontSize: '18px', cursor: 'pointer', zIndex: 10 }}
              >
                {showConfirmPwd ? <FiEyeOff /> : <FiEye />}
              </button>
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