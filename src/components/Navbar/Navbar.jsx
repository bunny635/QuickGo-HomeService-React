import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiUser, FiLogOut, FiLayout, FiClock } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Monitor Login Session from LocalStorage
  useEffect(() => {
    const name = localStorage.getItem('user_name');
    const userRole = localStorage.getItem('user_role');
    if (name) {
      setUser(name);
      setRole(userRole);
    }
  }, []);

  // 2. Comprehensive Logout Logic
  const handleLogout = () => {
    localStorage.clear(); // Clears user_name, user_role, and bookings
    setUser(null);
    setRole(null);
    toast.info("Session ended. Returning to main page.");
    
    // Force a full refresh to the landing page to reset all states
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  // Helper to highlight active page
  const isActive = (path) => location.pathname === path ? "active-link" : "";

  return (
    <nav className="navbar-custom">
      <div className="container">
        
        {/* BRAND LOGO */}
        <Link to="/" className="navbar-brand-custom">
          <img src="/weblogo.jpg" alt="QuickGo" className="nav-logo" />
          <span className="brand-text">Quick<span>Go</span></span>
        </Link>

        {/* MOBILE TOGGLE ICON */}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </div>

        {/* NAVIGATION LINKS */}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><Link to="/" className={isActive('/')} onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/about" className={isActive('/about')} onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/services" className={isActive('/services')} onClick={() => setIsOpen(false)}>Services</Link></li>
          <li><Link to="/contact" className={isActive('/contact')} onClick={() => setIsOpen(false)}>Contact</Link></li>
          
          {/* --- LOGGED IN USER SECTION --- */}
          {user ? (
            <li className="user-nav-wrapper">
              
              {/* 1. History Link (For all logged-in users to track activity) */}
              <Link to="/history" className={`nav-history-link ${isActive('/history')}`} onClick={() => setIsOpen(false)}>
                <FiClock className="me-1"/> History
              </Link>

              {/* 2. Role-Based Dashboard Link (Admin/Provider only) */}
              {role !== 'user' && (
                <Link 
                  to={role === 'admin' ? '/admin-dashboard' : '/provider-dashboard'} 
                  className="dashboard-nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  <FiLayout className="me-1"/> {role === 'admin' ? 'Admin' : 'Provider'}
                </Link>
              )}

              {/* 3. User Identity and Logout */}
              <div className="user-profile-box">
                <Link to="/profile" className="user-name-text" onClick={() => setIsOpen(false)}>
                  <FiUser className="me-1" /> {user}
                </Link>
                <button className="nav-logout-btn" onClick={handleLogout} title="Sign Out">
                  <FiLogOut />
                </button>
              </div>

            </li>
          ) : (
            /* --- LOGGED OUT / GUEST SECTION --- */
            <li className="auth-links">
              <Link to="/login" className="login-link">Login</Link>
              <span className="divider">|</span>
              <Link to="/register" className="register-link">Register</Link>
            </li>
          )}
          
          {/* GLOBAL BOOKING BUTTON (Hidden for Admin/Provider to avoid confusion) */}
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