import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookService.css';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiCalendar, FiClock, FiMapPin, FiEdit3, FiCheckCircle } from 'react-icons/fi';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import PaymentModal from '../../components/Payment/PaymentModal';

const BookService = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Modal State
  const [showPayment, setShowPayment] = useState(false);

  // 2. Form State
  const [formData, setFormData] = useState({
    serviceType: id === "1" ? "Home Cleaning" : id === "2" ? "Garden Cleaning" : "Electrician",
    date: "",
    time: "",
    address: "",
    notes: ""
  });

  // 3. Price Logic (Updated to Rupee Values)
  const [basePrice, setBasePrice] = useState(15000);
  const tax = basePrice * 0.18; 
  const totalAmount = basePrice + tax;

  // Update price based on selected service
  useEffect(() => {
    if (formData.serviceType === "Home Cleaning") setBasePrice(15000);
    else if (formData.serviceType === "Garden Cleaning") setBasePrice(8000);
    else setBasePrice(500);
  }, [formData.serviceType]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 4. Handle "Proceed to Pay"
  const handleProceedToPay = (e) => {
    e.preventDefault();
    const { date, time, address } = formData;

    if (!date || !time || !address) {
      toast.error("Please fill in all mandatory fields!");
      return;
    }

    // Open the Fake Razorpay Modal
    setShowPayment(true);
  };

  return (
    <div className="booking-flow-container py-5">
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="section-title text-center mb-5"
        >
          Secure Your <span>Service Slot</span>
        </motion.h2>

        <div className="row g-4">
          {/* LEFT: FORM SECTION */}
          <div className="col-lg-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }}
              className="booking-form-card"
            >
              <form onSubmit={handleProceedToPay}>
                <h5 className="mb-4 text-gold border-bottom pb-2">Booking Details</h5>
                
                <div className="mb-4">
                  <label className="form-label-custom">Select Service</label>
                  <select 
                    name="serviceType" 
                    className="booking-input" 
                    value={formData.serviceType}
                    onChange={handleChange}
                  >
                    <option value="Home Cleaning">Home Cleaning</option>
                    <option value="Garden Cleaning">Garden Cleaning</option>
                    <option value="Electrician">Electrician Service</option>
                  </select>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label className="form-label-custom"><FiCalendar className="me-2"/>Preferred Date</label>
                    <input 
                      type="date" 
                      name="date" 
                      className="booking-input" 
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]} 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label-custom"><FiClock className="me-2"/>Preferred Time</label>
                    <select name="time" className="booking-input" onChange={handleChange}>
                      <option value="">Select a Slot</option>
                      <option value="09:00 AM">09:00 AM - 11:00 AM</option>
                      <option value="12:00 PM">12:00 PM - 02:00 PM</option>
                      <option value="03:00 PM">03:00 PM - 05:00 PM</option>
                      <option value="06:00 PM">06:00 PM - 08:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label-custom"><FiMapPin className="me-2"/>Service Address</label>
                  <textarea 
                    name="address" 
                    className="booking-input" 
                    rows="3" 
                    placeholder="Enter full address..."
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="form-label-custom"><FiEdit3 className="me-2"/>Special Instructions (Optional)</label>
                  <textarea 
                    name="notes" 
                    className="booking-input" 
                    rows="2" 
                    placeholder="e.g., Please bring a tall ladder..."
                    onChange={handleChange}
                  ></textarea>
                </div>
              </form>
            </motion.div>
          </div>

          {/* RIGHT: SUMMARY SIDEBAR */}
          <div className="col-lg-4">
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }}
              className="summary-card"
            >
              <h5 className="mb-4 text-gold text-center">Booking Summary</h5>
              
              <div className="summary-item">
                <span>Service</span>
                <span className="text-white">{formData.serviceType}</span>
              </div>
              <div className="summary-item">
                <span>Date</span>
                <span className="text-white">{formData.date || "Not Selected"}</span>
              </div>
              <div className="summary-item border-bottom pb-3">
                <span>Time</span>
                <span className="text-white">{formData.time || "Not Selected"}</span>
              </div>

              <div className="price-details mt-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Base Price</span>
                  <span className="text-white">₹{basePrice.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">GST (18%)</span>
                  <span className="text-white">₹{tax.toFixed(2)}</span>
                </div>
                <hr className="bg-secondary"/>
                <div className="d-flex justify-content-between total-row">
                  <span className="fw-bold text-gold">Total Amount</span>
                  <span className="fw-bold text-gold">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4">
                <PrimaryButton text="Confirm & Pay" onClick={handleProceedToPay} />
              </div>

              <div className="booking-safety-badge mt-3">
                <FiCheckCircle className="text-success me-2" /> Verified Professionals Only
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* PAYMENT MODAL COMPONENT */}
      <PaymentModal 
        isOpen={showPayment} 
        onClose={() => setShowPayment(false)}
        amount={totalAmount}
        onPaymentSuccess={() => navigate('/invoice')} 
      />
    </div>
  );
};

export default BookService;