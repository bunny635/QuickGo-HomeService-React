import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BookService.css';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiMapPin, FiArrowLeft, FiCheckCircle, FiChevronLeft, FiChevronRight, FiClock } from 'react-icons/fi';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import PaymentModal from '../../components/Payment/PaymentModal';

const BookService = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPayment, setShowPayment] = useState(false);

  const { service, provider } = location.state || {};

  useEffect(() => {
    if (!service || !provider) {
        toast.error("Please select a provider first.");
        navigate('/services');
    }
  }, [service, provider, navigate]);

  // Calendar & Availability State
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [availability, setAvailability] = useState({});
  const [address, setAddress] = useState("");

  // Pricing
  const providerFee = provider?.fee || 0;
  const platformFee = 49; 
  const gst = Math.round(providerFee * 0.18);
  const totalAmount = providerFee + platformFee + gst;

  // --- TEMPORARY DEMO LOGIC ---
  // "Temporary demo availability. Replace with backend API after integration."
  useEffect(() => {
    if (provider) {
        const generateDemoAvailability = () => {
            const data = {};
            const today = new Date();
            // Generate 60 days of fake availability
            for(let i=0; i<60; i++) {
                const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
                const dateStr = d.toISOString().split('T')[0];
                const dayOfWeek = d.getDay(); // 0 = Sun, 1 = Mon...

                if (dayOfWeek === 0) {
                    data[dateStr] = { status: 'grey', message: 'Holiday. Booking is unavailable.', slots: [] };
                } else if (dayOfWeek === 4) {
                    data[dateStr] = { status: 'red', message: 'Provider is unavailable on this date.', slots: [] };
                } else if (dayOfWeek === 2 || dayOfWeek === 6) {
                    data[dateStr] = { status: 'yellow', message: 'Limited availability.', slots: ['09:00 AM', '10:30 AM', '02:00 PM'] };
                } else {
                    data[dateStr] = { status: 'green', message: 'Available', slots: ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '04:30 PM'] };
                }
            }
            setAvailability(data);
            setSelectedDate(null);
            setSelectedTime("");
        };
        generateDemoAvailability();
    }
  }, [provider]);

  // Calendar Helpers
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dateStr = clickedDate.toISOString().split('T')[0];
    
    // Prevent clicking past dates
    if (clickedDate < new Date().setHours(0,0,0,0)) return;

    setSelectedDate(dateStr);
    setSelectedTime(""); // Reset time on new date
  };

  const handleProceedToPay = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !address) {
      toast.error("Please select a Date, Time slot, and enter your Address!");
      return;
    }
    setShowPayment(true);
  };

  // Compile final data for PaymentModal
  const finalBookingData = {
    serviceType: service?.title,
    serviceImage: service?.image,
    providerData: provider,
    date: selectedDate,
    time: selectedTime,
    address: address
  };

  if (!service || !provider) return null;

  return (
    <div className="booking-flow-container py-5">
      <div className="container pt-4">
        
        <button className="btn-back-link mb-4 text-gold bg-transparent border-0 d-flex align-items-center" onClick={() => navigate(-1)}>
          <FiArrowLeft className="me-2"/> Back to Provider Selection
        </button>

        <h2 className="section-title text-center mb-5">Select Schedule & <span>Book</span></h2>
        
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="booking-form-card">
              
              {/* Selected Provider Info */}
              <div className="d-flex align-items-center gap-3 mb-4 pb-4 border-bottom border-secondary">
                  <img src={provider.image} alt={provider.name} className="booking-prov-img" />
                  <div>
                      <h5 className="text-white mb-0">{provider.name}</h5>
                      <p className="text-muted small mb-0">{service.title}</p>
                  </div>
              </div>

              {/* CALENDAR LEGEND */}
              <div className="calendar-legend-box mb-4">
                  <div className="legend-item"><span className="legend-dot green"></span> Available</div>
                  <div className="legend-item"><span className="legend-dot yellow"></span> Half Day</div>
                  <div className="legend-item"><span className="legend-dot red"></span> Unavailable</div>
                  <div className="legend-item"><span className="legend-dot grey"></span> Holiday</div>
              </div>

              {/* INTERACTIVE CUSTOM CALENDAR */}
              <div className="custom-calendar-wrapper mb-4">
                <div className="calendar-header d-flex justify-content-between align-items-center mb-3">
                  <button type="button" className="cal-nav-btn" onClick={handlePrevMonth}><FiChevronLeft/></button>
                  <h5 className="text-white m-0 fw-bold">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h5>
                  <button type="button" className="cal-nav-btn" onClick={handleNextMonth}><FiChevronRight/></button>
                </div>
                
                <div className="calendar-days-header">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="cal-day-name">{d}</div>)}
                </div>

                <div className="calendar-grid">
                  {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} className="cal-cell empty"></div>)}
                  
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const cellDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                    const dateStr = cellDate.toISOString().split('T')[0];
                    const isPast = cellDate < new Date().setHours(0,0,0,0);
                    const status = isPast ? 'grey' : (availability[dateStr]?.status || 'grey');
                    const isSelected = selectedDate === dateStr;

                    return (
                      <motion.div 
                        key={day} 
                        whileHover={!isPast ? { scale: 1.1 } : {}}
                        className={`cal-cell status-${status} ${isSelected ? 'selected' : ''} ${isPast ? 'past-date' : ''}`}
                        onClick={() => handleDateClick(day)}
                        title={availability[dateStr]?.message}
                      >
                        {day}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* TIME SLOTS DISPLAY */}
              <AnimatePresence mode="wait">
                {selectedDate && (
                  <motion.div 
                    key={selectedDate}
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="time-slots-wrapper mb-4"
                  >
                    <h6 className="text-white mb-3 d-flex align-items-center"><FiClock className="text-gold me-2"/> Available Time Slots</h6>
                    
                    {availability[selectedDate]?.status === 'red' || availability[selectedDate]?.status === 'grey' ? (
                      <div className="alert-box-dark text-danger">
                        {availability[selectedDate]?.message}
                      </div>
                    ) : (
                      <div className="slots-grid">
                        {availability[selectedDate]?.slots.map(slot => (
                          <button 
                            key={slot} 
                            type="button"
                            className={`time-slot-btn ${selectedTime === slot ? 'active' : ''}`}
                            onClick={() => setSelectedTime(slot)}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    )}
                    {availability[selectedDate]?.status === 'yellow' && (
                        <p className="text-warning small mt-3 mb-0">Limited availability on this date.</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ADDRESS INPUT */}
              <div className="mb-2">
                <label className="form-label-custom"><FiMapPin className="me-2"/>Service Address</label>
                <textarea 
                    className="booking-input" rows="3" 
                    placeholder="Enter full address for the provider..." 
                    value={address} onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>

            </div>
          </div>
          
          {/* SUMMARY SIDEBAR */}
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
              
              <div className="mt-4">
                  <PrimaryButton 
                    text="Proceed to Payment" 
                    onClick={handleProceedToPay} 
                    disabled={!selectedDate || !selectedTime || !address} 
                  />
              </div>
              
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
            bookingData={finalBookingData} 
            totalAmount={totalAmount}
        />
      )}
    </div>
  );
};

export default BookService;