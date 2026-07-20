import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiUser, FiLogOut, FiLayout } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Check Login Status on Load
  useEffect(() => {
    const name = localStorage.getItem('user_name');
    const userRole = localStorage.getItem('user_role');
    if (name) {
      setUser(name);
      setRole(userRole);
    }
  }, []);

  // 2. Logout Logic
  const handleLogout = () => {
    localStorage.clear(); // Clears name and role
    setUser(null);
    setRole(null);
    toast.info("Logged out successfully");
    
    // Redirect to main landing page
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  const isActive = (path) => location.pathname === path ? "active-link" : "";

  return (
    <nav className="navbar-custom">
      <div className="container">
        {/* Logo Section */}
        <Link to="/" className="navbar-brand-custom">
          <img src="/weblogo.jpg" alt="QuickGo" className="nav-logo" />
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
          
          {/* --- DYNAMIC USER SECTION (The Red Box Logic) --- */}
          {user ? (
            <li className="user-nav-wrapper">
              {/* Show Dashboard Link ONLY for Admin and Provider */}
              {role !== 'user' && (
                <Link 
                  to={role === 'admin' ? '/admin-dashboard' : '/provider-dashboard'} 
                  className="dashboard-nav-link me-3"
                  onClick={() => setIsOpen(false)}
                >
                  <FiLayout className="me-1"/> Dashboard
                </Link>
              )}

              {/* User Name & Profile Link */}
              <div className="user-profile-box">
                <Link to="/profile" className="user-name-text" onClick={() => setIsOpen(false)}>
                  <FiUser className="me-1" /> {user}
                </Link>
                <button className="nav-logout-btn" onClick={handleLogout} title="Logout">
                  <FiLogOut />
                </button>
              </div>
            </li>
          ) : (
            <li className="auth-links">
              <Link to="/login" className="login-link">Login</Link>
              <span className="divider">|</span>
              <Link to="/register" className="register-link">Register</Link>
            </li>
          )}
          
          {/* Book Now Button (Hide if Admin/Provider) */}
          {role !== 'admin' && role !== 'provider' && (
            <li>
              <PrimaryButton text="Book Now" onClick={() => navigate('/services')} />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;