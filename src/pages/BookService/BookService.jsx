import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookService.css';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiCalendar, FiClock, FiMapPin, FiEdit3 } from 'react-icons/fi';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import PaymentModal from '../../components/Payment/PaymentModal';

const BookService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);

  const [formData, setFormData] = useState({
    serviceType: id === "1" ? "Home Cleaning" : id === "2" ? "Garden Cleaning" : "Electrician",
    date: "",
    time: "",
    address: "",
    notes: ""
  });

  const [basePrice, setBasePrice] = useState(15000);
  const tax = basePrice * 0.18; 
  const totalAmount = basePrice + tax;

  useEffect(() => {
    if (formData.serviceType === "Home Cleaning") setBasePrice(15000);
    else if (formData.serviceType === "Garden Cleaning") setBasePrice(8000);
    else setBasePrice(500);
  }, [formData.serviceType]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedToPay = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.time || !formData.address) {
      toast.error("Please fill in all mandatory fields!");
      return;
    }
    setShowPayment(true);
  };

  // --- CRITICAL LOGIC: SAVING TO HISTORY ---
  const handleFinalSuccess = () => {
    const newBooking = {
      bookingId: "QG-" + Math.floor(Math.random() * 900000),
      service: formData.serviceType,
      date: formData.date,
      time: formData.time,
      address: formData.address,
      amount: totalAmount,
      status: "Pending",
      provider: "QuickGo Premium Team", // Assigned automatically
      bookedAt: new Date().toLocaleString()
    };

    // Save to LocalStorage "Database"
    const existing = JSON.parse(localStorage.getItem('quickgo_bookings')) || [];
    existing.unshift(newBooking); // Add new booking to the top
    localStorage.setItem('quickgo_bookings', JSON.stringify(existing));

    navigate('/invoice');
  };

  return (
    <div className="booking-flow-container py-5">
      <div className="container">
        <h2 className="section-title text-center mb-5">Finalize Your <span>Booking</span></h2>
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="booking-form-card">
              <form onSubmit={handleProceedToPay}>
                <div className="mb-4">
                  <label className="form-label-custom">Selected Service</label>
                  <select name="serviceType" className="booking-input" value={formData.serviceType} onChange={handleChange}>
                    <option value="Home Cleaning">Home Cleaning</option>
                    <option value="Garden Cleaning">Garden Cleaning</option>
                    <option value="Electrician">Electrician Service</option>
                  </select>
                </div>
                <div className="row mb-4">
                  <div className="col-md-6 mb-3">
                    <label className="form-label-custom"><FiCalendar className="me-2"/>Date</label>
                    <input type="date" name="date" className="booking-input" onChange={handleChange} min={new Date().toISOString().split("T")[0]} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label-custom"><FiClock className="me-2"/>Time Slot</label>
                    <select name="time" className="booking-input" onChange={handleChange}>
                      <option value="">Select Slot</option>
                      <option value="09:00 AM">09:00 AM - 11:00 AM</option>
                      <option value="02:00 PM">02:00 PM - 04:00 PM</option>
                      <option value="04:00 PM">04:00 PM - 06:00 PM</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="form-label-custom"><FiMapPin className="me-2"/>Service Address</label>
                  <textarea name="address" className="booking-input" rows="3" placeholder="Full address for the provider..." onChange={handleChange}></textarea>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="summary-card">
              <h5 className="text-gold text-center">Summary</h5>
              <div className="summary-item mt-4"><span>Service</span><span>{formData.serviceType}</span></div>
              <div className="summary-item"><span>Total Amount</span><span className="text-gold fw-bold">₹{totalAmount.toFixed(2)}</span></div>
              <div className="mt-4"><PrimaryButton text="Pay & Confirm" onClick={handleProceedToPay} /></div>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal 
        isOpen={showPayment} 
        onClose={() => setShowPayment(false)}
        amount={totalAmount}
        onPaymentSuccess={handleFinalSuccess} 
      />
    </div>
  );
};

export default BookService;