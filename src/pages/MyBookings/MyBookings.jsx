import React, { useState } from 'react';
import './MyBookings.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiCalendar, FiUser, FiDollarSign, FiHash, FiXCircle, FiEye } from 'react-icons/fi';
import { toast } from 'react-toastify';

const MyBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // 1. Mock Data for User Bookings
  const [bookings, setBookings] = useState([
    {
      id: "QG-8821",
      service: "Home Cleaning",
      provider: "Premium Clean Squad",
      date: "Oct 24, 2023",
      amount: 295.00,
      status: "Pending"
    },
    {
      id: "QG-7712",
      service: "Electrician Service",
      provider: "Volt Masters",
      date: "Oct 20, 2023",
      amount: 118.00,
      status: "Completed"
    },
    {
      id: "QG-5541",
      service: "Garden Cleaning",
      provider: "Green Thumb Pros",
      date: "Oct 15, 2023",
      amount: 177.00,
      status: "Cancelled"
    }
  ]);

  // 2. Filter Logic
  const filteredBookings = bookings.filter(item => {
    const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // 3. Cancel Action
  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      const updated = bookings.map(b => b.id === id ? { ...b, status: "Cancelled" } : b);
      setBookings(updated);
      toast.info(`Booking ${id} has been cancelled.`);
    }
  };

  return (
    <div className="my-bookings-container py-5">
      <div className="container">
        
        {/* Header and Controls */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <h2 className="section-title text-start">My <span>Bookings</span></h2>
            <p className="text-muted">Manage and track your service history.</p>
          </div>
          <div className="col-md-6">
            <div className="booking-controls">
              <div className="search-box">
                <FiSearch className="icon" />
                <input 
                  type="text" 
                  placeholder="Search ID or Provider..." 
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="filter-box">
                <FiFilter className="icon" />
                <select onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="row">
          <AnimatePresence>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <div className="col-lg-6 mb-4" key={booking.id}>
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="booking-card"
                  >
                    <div className="booking-card-header">
                      <div className="d-flex align-items-center">
                        <div className="id-tag"><FiHash className="me-1"/> {booking.id}</div>
                        <span className={`status-badge ${booking.status.toLowerCase()}`}>
                          {booking.status}
                        </span>
                      </div>
                      <h4 className="mt-3 mb-1 text-white">{booking.service}</h4>
                    </div>

                    <div className="booking-card-body mt-3">
                      <div className="row g-3">
                        <div className="col-6">
                          <p className="info-label"><FiUser className="me-2"/>Provider</p>
                          <p className="info-value">{booking.provider}</p>
                        </div>
                        <div className="col-6">
                          <p className="info-label"><FiCalendar className="me-2"/>Date</p>
                          <p className="info-value">{booking.date}</p>
                        </div>
                        <div className="col-6">
                          <p className="info-label"><FiDollarSign className="me-2"/>Total Amount</p>
                          <p className="info-value text-gold">${booking.amount.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="booking-card-footer mt-4">
                      <button className="btn-action-view">
                        <FiEye className="me-2" /> Details
                      </button>
                      
                      {booking.status === "Pending" && (
                        <button 
                          className="btn-action-cancel"
                          onClick={() => handleCancel(booking.id)}
                        >
                          <FiXCircle className="me-2" /> Cancel
                        </button>
                      )}
                    </div>
                  </motion.div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <h3 className="text-muted">No bookings found.</h3>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;