import React, { useState, useEffect } from 'react';
import './MyBookings.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, FiFilter, FiCalendar, FiUser, FiHash, 
  FiCheckCircle, FiXCircle, FiClock, FiFileText, FiPrinter 
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // 1. Sync with our LocalStorage Database
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('quickgo_bookings')) || [];
    setBookings(savedData);
  }, []);

  // 2. Filter Logic
  const filteredBookings = bookings.filter(item => {
    const matchesSearch = item.service.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.bookingId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // 3. Bridge logic to view a specific invoice
  const handleViewInvoice = (item) => {
    const invoicePacket = {
        bookingId: item.bookingId,
        txnId: item.transactionId || "TXN-INTERNAL",
        customerName: localStorage.getItem('user_name') || "Customer",
        service: item.service,
        date: item.date,
        address: item.address || "Saved Location",
        baseAmount: item.amount / 1.18,
        tax: item.amount - (item.amount / 1.18),
        platform: 45,
        total: item.amount,
        method: "ONLINE"
    };
    localStorage.setItem('quickgo_last_invoice', JSON.stringify(invoicePacket));
    navigate('/invoice');
  };

  return (
    <div className="my-bookings-container py-5">
      <div className="container">
        
        {/* HEADER & CONTROLS */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-6">
            <h2 className="section-title text-start">My <span>Service Bookings</span></h2>
            <p className="text-muted">Manage your premium home service history and track providers.</p>
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

        {/* BOOKINGS LIST */}
        <div className="row">
          <AnimatePresence>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((item, index) => (
                <div className="col-12 mb-4" key={index}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="booking-glass-card"
                  >
                    <div className="row align-items-center g-4">
                      
                      {/* Section 1: Service Main */}
                      <div className="col-lg-3 border-end-premium">
                        <div className="d-flex align-items-center">
                          <div className="service-icon-circle"><FiFileText /></div>
                          <div>
                            <span className="text-muted x-small fw-bold">{item.bookingId}</span>
                            <h5 className="text-white mb-0 mt-1">{item.service}</h5>
                          </div>
                        </div>
                        <div className="mt-3">
                           <span className={`badge-status ${item.status.toLowerCase()}`}>
                             {item.status === 'Confirmed' ? <FiCheckCircle className="me-1"/> : <FiClock className="me-1"/>}
                             {item.status}
                           </span>
                        </div>
                      </div>

                      {/* Section 2: Details */}
                      <div className="col-lg-3 border-end-premium">
                        <div className="detail-row"><FiCalendar className="text-gold me-2"/> <span>Date:</span> {item.date}</div>
                        <div className="detail-row"><FiClock className="text-gold me-2"/> <span>Time:</span> {item.time}</div>
                        <div className="detail-row"><FiUser className="text-gold me-2"/> <span>Provider:</span> {item.provider || 'Assigning...'}</div>
                      </div>

                      {/* Section 3: Payment Info */}
                      <div className="col-lg-3 border-end-premium">
                        <label className="text-muted x-small text-uppercase fw-bold mb-2 d-block">Transaction Details</label>
                        <h4 className="text-gold mb-1">₹{item.amount.toLocaleString()}</h4>
                        <span className="text-success small fw-bold"><FiCheckCircle className="me-1"/> PAID SUCCESSFUL</span>
                        <div className="mt-1 x-small text-muted">TXN: {item.transactionId || '---'}</div>
                      </div>

                      {/* Section 4: Actions */}
                      <div className="col-lg-3">
                        <div className="d-grid gap-2">
                           <button className="btn-action-premium gold" onClick={() => handleViewInvoice(item)}>
                             <FiFileText className="me-2"/> View Invoice
                           </button>
                           <button className="btn-action-premium outline" onClick={() => window.print()}>
                             <FiPrinter className="me-2"/> Print Bill
                           </button>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
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