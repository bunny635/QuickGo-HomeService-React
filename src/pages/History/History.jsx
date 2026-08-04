import React, { useState, useEffect } from 'react';
import './History.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiCreditCard, FiCheckCircle, FiShield, FiFileText, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { Navigate, useNavigate } from 'react-router-dom';

const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const user = localStorage.getItem('user_name');

  // Protection Logic: If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    // Load all bookings from our local "Database" and reverse to show newest first
    const data = JSON.parse(localStorage.getItem('quickgo_bookings')) || [];
    setHistory(data.reverse());
  }, []);

  const handleViewInvoice = (item) => {
    // Reconstruct invoice packet for the selected history item
    const invoicePacket = {
        txnId: item.transactionId || ("QG-TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase()),
        bookingId: item.bookingId || "BK-DEMO",
        customerName: user,
        service: item.service || item.serviceType,
        date: item.date,
        time: item.time,
        address: item.address || "Saved Location",
        baseAmount: item.providerFee || (item.amount - 49) / 1.18,
        tax: item.providerFee ? Math.round(item.providerFee * 0.18) : 0,
        platform: 49,
        total: item.amount,
        method: item.paymentMethod || "ONLINE",
        providerName: item.providerName || "Premium Expert",
        providerImage: item.providerImage || "/avatar3.jpg",
        providerExperience: item.providerExperience || "Verified",
        estimatedArrival: item.estimatedArrival || "Completed"
    };
    localStorage.setItem('quickgo_last_invoice', JSON.stringify(invoicePacket));
    navigate('/invoice');
  };

  return (
    <div className="history-page-wrapper py-5">
      <div className="container pt-4">
        
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-start mb-5">
          <h2 className="text-white fw-bold display-5">Service <span>History</span></h2>
          <p className="text-muted">Review your past bookings, payments, and assigned professionals.</p>
        </motion.div>

        {history.length > 0 ? (
          <div className="history-list">
            <AnimatePresence>
              {history.map((item, index) => (
                <motion.div 
                  initial={{ x: -20, opacity: 0 }} 
                  animate={{ x: 0, opacity: 1 }} 
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  className="history-item-card mb-4" 
                  key={index}
                >
                  <div className="row align-items-center g-4">
                    
                    {/* 1. SERVICE DETAILS */}
                    <div className="col-lg-4 border-end-gold">
                      <div className="d-flex align-items-center gap-3">
                        <img src={item.serviceImage || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=200'} alt="Service" className="history-img" />
                        <div>
                          <span className="text-muted x-small fw-bold">ID: {item.bookingId}</span>
                          <h5 className="mb-1 text-white fw-bold">{item.service}</h5>
                          <p className="mb-0 small text-muted"><FiCalendar className="me-1"/> {item.date} | {item.time}</p>
                        </div>
                      </div>
                    </div>

                    {/* 2. PROVIDER HISTORY */}
                    <div className="col-lg-3 border-end-gold">
                      <label className="text-muted x-small text-uppercase fw-bold mb-2 d-block">Service Professional</label>
                      <div className="d-flex align-items-center gap-2">
                        <img src={item.providerImage || '/avatar3.jpg'} alt="Provider" className="provider-mini-avatar" />
                        <div>
                          <p className="mb-0 text-white small fw-bold">{item.providerName || item.provider}</p>
                          <p className="mb-0 x-small text-gold"><FiShield className="me-1"/> {item.providerExperience || 'Verified'}</p>
                        </div>
                      </div>
                    </div>

                    {/* 3. PAYMENT HISTORY */}
                    <div className="col-lg-3 border-end-gold">
                      <label className="text-muted x-small text-uppercase fw-bold mb-2 d-block">Payment Info</label>
                      <div className="d-flex align-items-center mb-1">
                        <FiCreditCard className="text-gold me-2" />
                        <span className="fw-bold text-white fs-5">₹{item.amount?.toLocaleString()}</span>
                      </div>
                      <span className="status-badge-success"><FiCheckCircle className="me-1"/> Paid via {item.paymentMethod || 'Online'}</span>
                    </div>

                    {/* 4. FINAL STATUS & ACTION */}
                    <div className="col-lg-2 text-lg-center">
                      <label className="text-muted x-small text-uppercase fw-bold mb-2 d-block">Order Status</label>
                      <div className="status-indicator mb-3">
                          <span className="dot-blink"></span> {item.status || 'Completed'}
                      </div>
                      <button className="btn-rebook-link" onClick={() => handleViewInvoice(item)}>
                        View Invoice <FiArrowRight className="ms-1"/>
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="empty-history text-center py-5 border border-secondary rounded-4" style={{background: 'rgba(0,0,0,0.4)'}}>
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