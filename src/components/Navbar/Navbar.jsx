import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to check active link
  const isActive = (path) => location.pathname === path ? "active-link" : "";

  return (
    <nav className="navbar-custom">
      <div className="container">
        {/* Brand Logo & Name */}
        <Link to="/" className="navbar-brand-custom">
          <img src="/weblogo.jpg" alt="QuickGo Logo" className="nav-logo" />
          <span className="brand-text">Quick<span>Go</span></span>
        </Link>

        {/* Mobile Toggle */}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><Link to="/" className={isActive('/')} onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/about" className={isActive('/about')} onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/services" className={isActive('/services')} onClick={() => setIsOpen(false)}>Services</Link></li>
          <li><Link to="/contact" className={isActive('/contact')} onClick={() => setIsOpen(false)}>Contact</Link></li>
          
          <li className="auth-links">
            <Link to="/login" className="login-link">Login</Link>
            <span className="divider">|</span>
            <Link to="/register" className="register-link">Register</Link>
          </li>
          
          <li>
            <PrimaryButton text="Book Now" onClick={() => navigate('/services')} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;