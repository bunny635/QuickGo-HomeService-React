import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="footer-custom">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h4 className="brand-text">Quick<span>Go</span></h4>
            <p className="footer-desc">Your Time, Our Priority. Providing premium home services with trust and excellence.</p>
          </div>
          <div className="col-md-2 mb-4">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h5 className="footer-title">Services</h5>
            <ul className="footer-links">
              <li>Home Cleaning</li>
              <li>Electrical Works</li>
              <li>Plumbing</li>
              <li>Gardening</li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h5 className="footer-title">Contact Us</h5>
            <p className="contact-item"><FiMail className="me-2 text-gold" /> info@quickgo.com</p>
            <p className="contact-item"><FiPhone className="me-2 text-gold" /> +91 98765 43210</p>
            <p className="contact-item"><FiMapPin className="me-2 text-gold" /> Mumbai, India</p>
          </div>
        </div>
        <div className="footer-bottom text-center">
          <p>&copy; {new Date().getFullYear()} QuickGo. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;