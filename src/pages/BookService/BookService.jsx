import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './BookService.css';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiCalendar, FiClock, FiMapPin, FiUser, FiArrowLeft ,FiCheckCircle} from 'react-icons/fi';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import PaymentModal from '../../components/Payment/PaymentModal';

const BookService = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPayment, setShowPayment] = useState(false);

  // Retrieve service and provider data passed from Services.jsx
  const { service, provider } = location.state || {};

  useEffect(() => {
    if (!service || !provider) {
        toast.error("Please select a provider first.");
        navigate('/services');
    }
  }, [service, provider, navigate]);

  const [formData, setFormData] = useState({
    serviceType: service?.title || "",
    serviceImage: service?.image || "",
    providerData: provider || null,
    date: "",
    time: "",
    address: ""
  });

  // Dynamic Pricing Calculation
  const providerFee = provider?.fee || 0;
  const platformFee = 49; 
  const gst = Math.round(providerFee * 0.18);
  const totalAmount = providerFee + platformFee + gst;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleProceedToPay = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.time || !formData.address) {
      toast.error("Please fill in all mandatory fields!");
      return;
    }
    setShowPayment(true);
  };

  if (!service || !provider) return null;

  return (
    <div className="booking-flow-container py-5">
      <div className="container pt-4">
        
        <button className="btn-back-link mb-4 text-gold d-flex align-items-center bg-transparent border-0" onClick={() => navigate('/services')}>
          <FiArrowLeft className="me-2"/> Back to Providers
        </button>

        <h2 className="section-title text-center mb-5">Finalize Your <span>Booking</span></h2>
        
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="booking-form-card">
              
              <div className="d-flex align-items-center gap-3 mb-4 pb-4 border-bottom border-secondary">
                  <img src={provider.image} alt={provider.name} style={{width:'60px', height:'60px', borderRadius:'50%', border:'2px solid var(--gold-accent)', objectFit:'cover'}} />
                  <div>
                      <h5 className="text-white mb-0">{provider.name}</h5>
                      <p className="text-muted small mb-0">{service.title}</p>
                  </div>
              </div>

              <form onSubmit={handleProceedToPay}>
                <div className="row mb-4">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label className="form-label-custom"><FiCalendar className="me-2"/>Service Date</label>
                    <input type="date" name="date" className="booking-input" onChange={handleChange} min={new Date().toISOString().split("T")[0]} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label-custom"><FiClock className="me-2"/>Time Slot</label>
                    <select name="time" className="booking-input" onChange={handleChange}>
                      <option value="">Select Slot</option>
                      <option value="09:00 AM">09:00 AM - 11:00 AM</option>
                      <option value="12:00 PM">12:00 PM - 02:00 PM</option>
                      <option value="03:00 PM">03:00 PM - 05:00 PM</option>
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
              <h5 className="text-gold text-center mb-4">Booking Summary</h5>
              
              <div className="summary-item"><span>Provider Fee</span><span className="text-white">₹{providerFee}</span></div>
              <div className="summary-item"><span>GST (18%)</span><span className="text-white">₹{gst}</span></div>
              <div className="summary-item"><span>Platform Fee</span><span className="text-white">₹{platformFee}</span></div>
              
              <hr className="border-secondary my-3" />
              
              <div className="summary-item total-row">
                  <span className="fw-bold text-white">Grand Total</span>
                  <span className="text-gold fw-bold">₹{totalAmount}</span>
              </div>
              
              <div className="mt-4"><PrimaryButton text="Proceed to Payment" onClick={handleProceedToPay} /></div>
              
              <div className="booking-safety-badge mt-4">
                 <FiCheckCircle className="text-success me-1"/> 100% Secure Payment. 
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPayment && (
        <PaymentModal 
            isOpen={showPayment} 
            onClose={() => setShowPayment(false)} 
            bookingData={formData} 
            totalAmount={totalAmount}
        />
      )}
    </div>
  );
};

export default BookService;