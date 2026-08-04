import React, { useState, useEffect } from 'react';
import './MyBookings.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiCalendar, FiClock, FiFileText, FiPrinter, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('quickgo_bookings')) || [];
    setBookings(savedData.reverse());
  }, []); 

  const filteredBookings = bookings.filter(item => {
    const matchesSearch = item.service?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.bookingId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewInvoice = (item) => {
    localStorage.setItem('quickgo_last_invoice', JSON.stringify(item));
    navigate('/invoice');
  };

  return (
    <div className="my-bookings-container py-5">
      <div className="container pt-4">
        
        <div className="row align-items-center mb-5">
          <div className="col-lg-6">
            <h2 className="text-white fw-bold display-5">My <span className="text-gold">Bookings</span></h2>
            <p className="text-muted">Manage your premium home service history.</p>
          </div>
          <div className="col-lg-6">
            <div className="booking-filters-wrapper">
              <div className="filter-search">
                <FiSearch className="icon-gold" />
                <input type="text" placeholder="Search ID or Service..." onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <div className="filter-dropdown">
                <FiFilter className="icon-gold" />
                <select onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="All">All Status</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <AnimatePresence>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((item, index) => (
                <div className="col-12 mb-4" key={index}>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="booking-glass-card">
                    <div className="row align-items-center g-4">
                      
                      <div className="col-lg-4 border-end-premium">
                        <div className="d-flex align-items-center gap-3 mb-3">
                          <img src={item.serviceImage} alt="Service" style={{width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover'}} />
                          <div>
                            <span className="text-muted x-small fw-bold">ID: {item.bookingId}</span>
                            <h5 className="text-white mb-0 mt-1">{item.service}</h5>
                          </div>
                        </div>
                        <span className={`badge-status ${item.status?.toLowerCase()}`}>
                            {item.status === 'Confirmed' ? <FiCheckCircle className="me-1"/> : <FiClock className="me-1"/>}
                            {item.status} • {item.date} {item.time}
                        </span>
                      </div>

                      <div className="col-lg-3 border-end-premium">
                         <div className="d-flex align-items-center gap-3">
                            <img src={item.providerImage} alt="Provider" style={{width: '50px', height: '50px', borderRadius: '50%', border: '2px solid var(--gold-accent)', objectFit: 'cover'}} />
                            <div>
                               <label className="text-muted x-small text-uppercase fw-bold mb-0">Assigned Provider</label>
                               <h6 className="text-white mb-0 mt-1" style={{fontSize: '14px'}}>{item.providerName}</h6>
                               <span className="text-gold small">{item.providerStatus || "Accepted"}</span>
                            </div>
                         </div>
                      </div>

                      <div className="col-lg-3 border-end-premium">
                        <label className="text-muted x-small text-uppercase fw-bold mb-2 d-block">Transaction Details</label>
                        <h4 className="text-gold mb-1">₹{item.amount?.toLocaleString()}</h4>
                        {item.paymentStatus === 'Paid' ? (
                            <span className="text-success small fw-bold"><FiCheckCircle className="me-1"/> PAID VIA {item.paymentMethod}</span>
                        ) : (
                            <span className="text-warning small fw-bold">PAYMENT PENDING</span>
                        )}
                        <div className="mt-1 x-small text-muted">ETA: {item.estimatedArrival}</div>
                      </div>

                      <div className="col-lg-2">
                        <div className="d-grid gap-2">
                           <button className="btn-action-premium gold" onClick={() => handleViewInvoice(item)}>
                             <FiFileText className="me-2"/> Invoice
                           </button>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5 border border-secondary rounded-4" style={{background: 'rgba(0,0,0,0.4)'}}>
                <FiFileText size={50} className="text-muted mb-3" />
                <h4 className="text-white">No Bookings Found</h4>
                <p className="text-muted">You haven't scheduled any services yet.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;