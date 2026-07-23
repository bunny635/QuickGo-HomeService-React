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

  useEffect(() => {
    const name = localStorage.getItem('user_name');
    const userRole = localStorage.getItem('user_role');
    if (name) {
      setUser(name);
      setRole(userRole);
    } else {
      setUser(null);
      setRole(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setRole(null);
    toast.info("Logged out successfully");
    window.location.href = "/";
  };

  const isActive = (path) => location.pathname === path ? "active-link" : "";

  return (
    <nav className="navbar-custom">
      <div className="container">
        <Link to="/" className="navbar-brand-custom">
          <img src="/weblogo.jpg" alt="QuickGo" className="nav-logo" />
          <span className="brand-text">Quick<span>Go</span></span>
        </Link>

        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </div>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><Link to="/" className={isActive('/')} onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/about" className={isActive('/about')} onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/services" className={isActive('/services')} onClick={() => setIsOpen(false)}>Services</Link></li>
          <li><Link to="/contact" className={isActive('/contact')} onClick={() => setIsOpen(false)}>Contact</Link></li>
          
          {user ? (
            <li className="user-nav-wrapper">
              {role !== 'user' && role && (
                <Link to={role === 'admin' ? '/admin-dashboard' : '/provider-dashboard'} className="dashboard-nav-link" onClick={() => setIsOpen(false)}>
                  <FiLayout className="me-1"/> Dashboard
                </Link>
              )}
              <div className="user-profile-pill">
                <Link to="/profile" className="user-name-text" onClick={() => setIsOpen(false)}>
                  <FiUser className="me-1" /> {user}
                </Link>
                <button className="nav-logout-btn" onClick={handleLogout}><FiLogOut /></button>
              </div>
            </li>
          ) : (
            <li className="auth-links">
              <Link to="/login" className="login-link">Login</Link>
              <span className="divider">|</span>
              <Link to="/register" className="register-link">Register</Link>
            </li>
          )}
          
          {role !== 'admin' && role !== 'provider' && (
            <li><PrimaryButton text="Book Now" onClick={() => navigate('/services')} /></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;