import React, { useState, useEffect } from 'react';
import './History.css';
import { motion } from 'framer-motion';
import { FiClock, FiCreditCard, FiUser, FiCheckCircle, FiShield, FiFileText } from 'react-icons/fi';
import { Navigate } from 'react-router-dom';

const History = () => {
  const [history, setHistory] = useState([]);
  const user = localStorage.getItem('user_name');

  // Protection Logic: If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    // Load all bookings from our local "Database"
    const data = JSON.parse(localStorage.getItem('quickgo_bookings')) || [];
    setHistory(data);
  }, []);

  return (
    <div className="history-page-wrapper py-5">
      <div className="container">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-start mb-5">
          <h2 className="section-title">My Service <span>Activity</span></h2>
          <p className="text-muted">Review your past bookings, payments, and assigned professionals.</p>
        </motion.div>

        {history.length > 0 ? (
          <div className="history-list">
            {history.map((item, index) => (
              <motion.div 
                initial={{ x: -20, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }} 
                transition={{ delay: index * 0.1 }}
                className="history-item-card mb-4" 
                key={index}
              >
                <div className="row align-items-center g-3">
                  
                  {/* 1. SERVICE DETAILS */}
                  <div className="col-lg-3 border-end-gold">
                    <div className="d-flex align-items-center">
                      <div className="history-icon-box"><FiFileText /></div>
                      <div>
                        <h6 className="mb-0 text-white">{item.service}</h6>
                        <small className="text-gold">{item.bookingId}</small>
                      </div>
                    </div>
                    <p className="mt-2 mb-0 small text-muted"><FiClock className="me-1"/> {item.bookedAt}</p>
                  </div>

                  {/* 2. PAYMENT HISTORY */}
                  <div className="col-lg-3 border-end-gold">
                    <h6 className="small text-muted text-uppercase mb-2">Payment Info</h6>
                    <div className="d-flex align-items-center">
                      <FiCreditCard className="text-gold me-2" />
                      <span className="fw-bold text-white">₹{item.amount.toFixed(2)}</span>
                    </div>
                    <span className="status-badge-success mt-2"><FiCheckCircle className="me-1"/> Paid via Razorpay</span>
                  </div>

                  {/* 3. PROVIDER HISTORY */}
                  <div className="col-lg-3 border-end-gold">
                    <h6 className="small text-muted text-uppercase mb-2">Service Professional</h6>
                    <div className="d-flex align-items-center">
                      <div className="provider-mini-avatar me-2"><FiUser /></div>
                      <div>
                        <p className="mb-0 text-white small fw-bold">{item.provider}</p>
                        <p className="mb-0 x-small text-muted"><FiShield className="me-1"/> Background Verified</p>
                      </div>
                    </div>
                  </div>

                  {/* 4. FINAL STATUS */}
                  <div className="col-lg-3 text-lg-center">
                    <h6 className="small text-muted text-uppercase mb-2">Order Status</h6>
                    <div className="status-indicator">
                        <span className="dot-blink"></span> {item.status}
                    </div>
                    <button className="btn-rebook-link mt-2">View Full Summary</button>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="empty-history text-center py-5">
            <FiFileText size={50} className="text-muted mb-3" />
            <h4 className="text-white">No Activity Found</h4>
            <p className="text-muted">Your service history will appear here once you make a booking.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;