import React, { useState, useEffect } from 'react';
import './MyBookings.css';
import { motion } from 'framer-motion';
import { FiUser, FiCalendar, FiDollarSign, FiHash, FiClock } from 'react-icons/fi';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch from LocalStorage
    const savedData = JSON.parse(localStorage.getItem('quickgo_bookings')) || [];
    setBookings(savedData);
  }, []);

  return (
    <div className="my-bookings-page py-5">
      <div className="container">
        <h2 className="section-title text-start mb-5">Booking <span>History</span></h2>
        
        {bookings.length > 0 ? (
          <div className="row">
            {bookings.map((item, index) => (
              <div className="col-lg-6 mb-4" key={index}>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="booking-history-card">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <span className="bk-id"><FiHash/> {item.bookingId}</span>
                      <h4 className="mt-2 text-white">{item.service}</h4>
                    </div>
                    <span className="bk-status">● {item.status}</span>
                  </div>

                  <div className="bk-details-grid mt-4">
                    <div className="bk-detail"><FiUser className="text-gold me-2"/> <span>Provider:</span> {item.provider}</div>
                    <div className="bk-detail"><FiCalendar className="text-gold me-2"/> <span>Date:</span> {item.date}</div>
                    <div className="bk-detail"><FiClock className="text-gold me-2"/> <span>Time:</span> {item.time}</div>
                    <div className="bk-detail"><FiDollarSign className="text-gold me-2"/> <span>Paid:</span> ₹{item.amount.toFixed(2)}</div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <h4 className="text-muted">No services booked yet.</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;