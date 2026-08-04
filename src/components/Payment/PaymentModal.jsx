import React, { useState, useEffect } from 'react';
import './PaymentModal.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCreditCard, FiSmartphone, FiGrid, FiArrowRight, FiCheckCircle, FiAlertCircle, FiLoader, FiRefreshCw, FiDownload, FiFileText } from 'react-icons/fi';
import { toast } from 'react-toastify';

const PaymentModal = ({ isOpen, onClose, bookingData, totalAmount }) => {
  const [step, setStep] = useState('summary'); 
  const [method, setMethod] = useState('upi');
  const [timer, setTimer] = useState(299);
  const [qrData, setQrData] = useState("");
  const [txnId, setTxnId] = useState("");
  const [cardData, setCardData] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = useState("");

  const providerFee = bookingData.providerData.fee;
  const platformFee = 49;
  const gst = Math.round(providerFee * 0.18);

  useEffect(() => {
    if (isOpen) {
      setTxnId("QG-TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase());
      refreshQR();
    }
  }, [isOpen]);

  useEffect(() => {
    let interval = null;
    if (isOpen && method === 'qr' && timer > 0 && step === 'method') {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, method, timer, step]);

  const refreshQR = () => {
    setTimer(299);
    setQrData(`quickgo-demo://payment/${Math.random().toString(36).substr(2, 9)}`);
  };

  const handleCardFormat = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    val = val.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardData({ ...cardData, number: val });
  };

  const handleExpiryFormat = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 3) val = val.substring(0, 2) + '/' + val.substring(2, 4);
    setCardData({ ...cardData, expiry: val });
  };

  /* 
   * TEMPORARY DEMO LOGIC
   * Replace with backend API after integration.
   */
  const executeTemporaryBookingLogic = (generatedTxnId) => {
    const bookingId = "BK-" + Math.floor(100000 + Math.random() * 900000);
    
    // 1. Create a Confirmed Booking Record with requested dummy data
    const newBooking = {
      bookingId: bookingId,
      transactionId: generatedTxnId,
      service: bookingData.serviceType,
      serviceImage: bookingData.serviceImage,
      providerName: bookingData.providerData.name,
      providerImage: bookingData.providerData.image,
      providerExperience: bookingData.providerData.exp,
      date: bookingData.date,
      time: bookingData.time,
      address: bookingData.address,
      amount: totalAmount,
      providerFee: providerFee,
      
      // Temporary status logic
      status: "Confirmed",         
      providerStatus: "Accepted",  
      serviceStatus: "Scheduled",
      paymentStatus: "Paid",
      paymentMethod: method.toUpperCase(),
      estimatedArrival: "Within 45 Minutes"
    };

    const existingBookings = JSON.parse(localStorage.getItem('quickgo_bookings')) || [];
    localStorage.setItem('quickgo_bookings', JSON.stringify([...existingBookings, newBooking]));

    // 2. Generate the Detailed Premium Invoice for the Invoice Page
    const invoicePacket = {
      ...newBooking,
      customerName: localStorage.getItem('user_name') || "Premium Customer",
      baseAmount: providerFee,
      tax: gst,
      platform: platformFee,
      total: totalAmount,
      issueDate: new Date().toLocaleDateString()
    };
    localStorage.setItem('quickgo_last_invoice', JSON.stringify(invoicePacket));
  };

  const handlePay = () => {
    if (method === 'upi' && !upiId.includes('@')) return toast.error("Please enter a valid UPI ID");
    if (method === 'card' && (cardData.number.length < 19 || cardData.expiry.length < 5 || cardData.cvv.length < 3)) {
        return toast.error("Please complete all card details");
    }

    setStep('processing');

    // 90% Success / 10% Failure Simulation
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1; 
      if (isSuccess) {
        executeTemporaryBookingLogic(txnId);
        setStep('success');
      } else {
        setStep('failure');
      }
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="gateway-overlay">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="gateway-card">
        <div className="gateway-head">
          <div className="d-flex align-items-center gap-2">
            <img src="/weblogo.jpg" alt="Logo" className="g-logo" />
            <div><h6 className="mb-0 text-white">QuickGo Secure Pay</h6><small className="text-muted">ID: {txnId}</small></div>
          </div>
          {step !== 'processing' && <button className="g-close" onClick={onClose}><FiX/></button>}
        </div>

        <AnimatePresence mode="wait">
          {step === 'summary' && (
            <motion.div key="summary" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="p-4">
              <h5 className="gold-label">Booking Summary</h5>
              <div className="summary-list mb-4">
                <div className="g-row"><span>Provider</span><strong className="text-white text-end">{bookingData.providerData.name}</strong></div>
                <div className="g-row"><span>Service</span><strong className="text-white">{bookingData.serviceType}</strong></div>
              </div>
              <h5 className="gold-label">Price Breakdown</h5>
              <div className="summary-list">
                  <div className="g-row"><span>Provider Fee</span><span>₹{providerFee}</span></div>
                  <div className="g-row"><span>GST (18%)</span><span>₹{gst}</span></div>
                  <div className="g-row"><span>Platform Fee</span><span>₹{platformFee}</span></div>
                  <hr className="gold-divider-thin my-2" />
                  <div className="g-row mt-2"><span className="text-white fw-bold">Grand Total</span><strong className="text-gold fs-5">₹{totalAmount}</strong></div>
              </div>
              <button className="btn-pay-now mt-4" onClick={() => setStep('method')}>Proceed to Payment <FiArrowRight className="ms-2"/></button>
            </motion.div>
          )}

          {step === 'method' && (
            <motion.div key="method" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="g-content">
              <div className="g-tabs">
                <button className={method === 'upi' ? 'active' : ''} onClick={() => setMethod('upi')}><FiSmartphone className="me-2"/> UPI</button>
                <button className={method === 'qr' ? 'active' : ''} onClick={() => { setMethod('qr'); refreshQR(); }}><FiGrid className="me-2"/> QR Code</button>
                <button className={method === 'card' ? 'active' : ''} onClick={() => setMethod('card')}><FiCreditCard className="me-2"/> Card</button>
              </div>
              
              <div className="p-4 method-container">
                {/* Method inputs identical to previous implementation */}
                {method === 'upi' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <label className="text-muted small mb-2 d-block">Select UPI App or Enter ID</label>
                        <div className="d-flex gap-2 mb-3 upi-apps">
                            <div className="upi-box">GPay</div><div className="upi-box">PhonePe</div>
                            <div className="upi-box">Paytm</div><div className="upi-box">BHIM</div>
                        </div>
                        <input type="text" placeholder="Enter UPI ID (e.g. username@okaxis)" className="g-input" value={upiId} onChange={(e)=>setUpiId(e.target.value)} />
                    </motion.div>
                )}
                
                {method === 'qr' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                        <div className="qr-wrapper bg-white p-3 rounded mx-auto d-inline-block position-relative">
                            {timer === 0 && <div className="qr-expired">Expired</div>}
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${qrData}`} style={{opacity: timer === 0 ? 0.2 : 1}} alt="Demo QR Code" />
                        </div>
                        <div className="mt-3">
                            <h4 className="text-gold mb-1">{Math.floor(timer / 60).toString().padStart(2, '0')}:{(timer % 60).toString().padStart(2, '0')}</h4>
                            <p className="small text-muted mb-2">Scan & Pay via any UPI App</p>
                            <button className="btn-link-gold p-0 text-decoration-none" onClick={refreshQR}><FiRefreshCw className="me-1"/> Generate New QR</button>
                        </div>
                    </motion.div>
                )}

                {method === 'card' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="digital-card-preview mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div className="card-chip-sim"></div><h6 className="card-brand-logo m-0 text-white fw-bold">Quick<span className="text-gold">Go</span> Pay</h6>
                            </div>
                            <div className="card-number-display">{cardData.number || "XXXX XXXX XXXX XXXX"}</div>
                            <div className="card-details-display d-flex justify-content-between mt-3">
                                <div className="card-holder text-start"><small>Card Holder</small><div className="text-truncate" style={{maxWidth: '150px'}}>{cardData.name || "YOUR NAME"}</div></div>
                                <div className="card-expires text-end"><small>Expires</small><div>{cardData.expiry || "MM/YY"}</div></div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <input type="text" placeholder="Cardholder Name" className="g-input mb-3" value={cardData.name} onChange={(e) => setCardData({...cardData, name: e.target.value.toUpperCase()})} />
                            <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="g-input mb-3" maxLength="19" onChange={handleCardFormat} value={cardData.number} />
                            <div className="d-flex gap-3">
                                <input type="text" placeholder="MM/YY" className="g-input w-50" maxLength="5" onChange={handleExpiryFormat} value={cardData.expiry} />
                                <input type="password" placeholder="CVV" className="g-input w-50" maxLength="3" onChange={(e) => setCardData({...cardData, cvv: e.target.value.replace(/\D/g, '')})} value={cardData.cvv} />
                            </div>
                        </div>
                    </motion.div>
                )}
                
                <button className="btn-pay-now mt-4" onClick={handlePay} disabled={method === 'qr' && timer === 0}>
                    Secure Pay ₹{totalAmount.toLocaleString()}
                </button>
              </div>
            </motion.div>
          )}

          {step === 'processing' && (
            <motion.div key="processing" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-5 text-center">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="text-gold mb-4 d-inline-block">
                <FiLoader size={60}/>
              </motion.div>
              <h4 className="text-white mb-2">Processing Payment...</h4>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-5 text-center">
              <FiCheckCircle size={70} className="text-success mb-4" />
              <h3 className="text-white mb-1">Payment Successful!</h3>
              <p className="text-muted small mb-4">Transaction ID: {txnId}</p>
              <div className="d-grid gap-3">
                <button className="btn-pay-now" onClick={() => window.location.href='/invoice'}><FiDownload className="me-2"/> Download Invoice</button>
                <button className="btn-secondary-outline" onClick={() => window.location.href='/my-bookings'}><FiFileText className="me-2"/> Go to My Bookings</button>
              </div>
            </motion.div>
          )}

          {step === 'failure' && (
            <motion.div key="failure" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-5 text-center">
              <FiAlertCircle size={70} className="text-danger mb-4" />
              <h3 className="text-white mb-1">Payment Failed</h3>
              <p className="text-muted small mb-4">Your transaction could not be processed.</p>
              <button className="btn-pay-now" onClick={() => setStep('method')}>Retry Payment</button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PaymentModal;