import React, { useState, useEffect } from 'react';
import './PaymentModal.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, FiCreditCard, FiSmartphone, FiGrid, FiArrowRight, 
  FiCheckCircle, FiAlertCircle, FiLoader, FiRefreshCw 
} from 'react-icons/fi';
import { toast } from 'react-toastify';

const PaymentModal = ({ isOpen, onClose, amount, bookingData }) => {
  const [step, setStep] = useState('summary'); 
  const [method, setMethod] = useState('upi');
  const [timer, setTimer] = useState(299);
  const [txnId, setTxnId] = useState("");
  const [cardData, setCardData] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = useState("");

  const platformFee = 45;
  const gst = amount * 0.18;
  const totalAmount = amount + platformFee + gst;

  useEffect(() => {
    let interval = null;
    if (isOpen && method === 'qr' && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, method, timer]);

  const handleCardFormat = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    val = val.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardData({ ...cardData, number: val });
  };

  const updateDatabase = (generatedId) => {
    // 1. Update global bookings list
    const bookings = JSON.parse(localStorage.getItem('quickgo_bookings')) || [];
    const updated = bookings.map(b => {
      if (b.service === bookingData.serviceType && b.status === "Pending") {
        return { ...b, status: "Confirmed", transactionId: generatedId, paymentStatus: "Paid" };
      }
      return b;
    });
    localStorage.setItem('quickgo_bookings', JSON.stringify(updated));

    // 2. THE FIX: Create the Direct Invoice Packet
    const invoicePacket = {
      bookingId: "BK-" + Math.floor(100000 + Math.random() * 900000),
      txnId: generatedId,
      customerName: localStorage.getItem('user_name') || "Customer",
      service: bookingData.serviceType,
      date: new Date().toLocaleDateString(),
      address: bookingData.address || "Surat, Gujarat",
      baseAmount: amount,
      tax: gst,
      platform: platformFee,
      total: totalAmount,
      method: method.toUpperCase()
    };
    localStorage.setItem('quickgo_last_invoice', JSON.stringify(invoicePacket));

    // 3. Add to Payment History
    const history = JSON.parse(localStorage.getItem('quickgo_payments')) || [];
    localStorage.setItem('quickgo_payments', JSON.stringify([invoicePacket, ...history]));
  };

  const handlePay = () => {
    if (method === 'upi' && !upiId.includes('@')) return toast.error("Invalid UPI ID");
    setStep('processing');
    const newTxnId = "QG-TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    setTxnId(newTxnId);

    setTimeout(() => {
      updateDatabase(newTxnId);
      setStep('success');
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="gateway-overlay">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="gateway-card">
        <div className="gateway-head">
          <div className="d-flex align-items-center gap-2">
            <img src="/weblogo.jpg" alt="Logo" className="g-logo" />
            <div><h6 className="mb-0 text-white">QuickGo Secure Pay</h6><small className="text-muted">ID: {txnId || '---'}</small></div>
          </div>
          {step !== 'processing' && <button className="g-close" onClick={onClose}><FiX/></button>}
        </div>

        {step === 'summary' && (
          <div className="p-4">
            <h5 className="gold-label">Booking Summary</h5>
            <div className="summary-list">
              <div className="g-row"><span>Service</span><strong>{bookingData.serviceType}</strong></div>
              <div className="g-row"><span>Schedule</span><strong>{bookingData.date} | {bookingData.time}</strong></div>
            </div>
            <h5 className="gold-label mt-4">Pricing</h5>
            <div className="summary-list">
                <div className="g-row"><span>Total Payable</span><strong className="text-gold">₹{totalAmount.toLocaleString()}</strong></div>
            </div>
            <button className="btn-pay-now mt-4" onClick={() => setStep('method')}>Choose Payment Method <FiArrowRight/></button>
          </div>
        )}

        {step === 'method' && (
          <div className="g-content">
            <div className="g-tabs">
              <button className={method === 'upi' ? 'active' : ''} onClick={() => setMethod('upi')}><FiSmartphone/> UPI</button>
              <button className={method === 'qr' ? 'active' : ''} onClick={() => setMethod('qr')}><FiGrid/> QR</button>
              <button className={method === 'card' ? 'active' : ''} onClick={() => setMethod('card')}><FiCreditCard/> Card</button>
            </div>
            <div className="p-4">
              {method === 'upi' && <input type="text" placeholder="Enter UPI ID (e.g. smit@okaxis)" className="g-input" onChange={(e)=>setUpiId(e.target.value)} />}
              {method === 'qr' && <div className="text-center"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=pay-${totalAmount}`} className="bg-white p-2 rounded" alt="QR" /><p className="small text-muted mt-2">Scan & Pay via any app</p></div>}
              {method === 'card' && <input type="text" placeholder="Card Number" className="g-input" onChange={handleCardFormat} value={cardData.number} />}
              <button className="btn-pay-now mt-4" onClick={handlePay}>Secure Pay ₹{totalAmount.toLocaleString()}</button>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="p-5 text-center">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="text-gold mb-4"><FiLoader size={50}/></motion.div>
            <h4 className="text-white">Authorizing Payment...</h4>
          </div>
        )}

        {step === 'success' && (
          <div className="p-5 text-center">
            <FiCheckCircle size={60} className="text-success mb-3" />
            <h3 className="text-white">Paid Successfully!</h3>
            <button className="btn-pay-now mt-4" onClick={() => window.location.href='/invoice/latest'}>Generate Digital Invoice</button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentModal;