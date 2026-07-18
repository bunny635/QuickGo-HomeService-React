import React, { useState } from 'react';
import './PaymentModal.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCreditCard, FiSmartphone, FiArrowRight, FiCheckCircle, FiLoader } from 'react-icons/fi';

const PaymentModal = ({ isOpen, onClose, amount, onPaymentSuccess }) => {
  const [step, setStep] = useState('method'); // 'method', 'processing', 'success'

  const handlePay = () => {
    setStep('processing');
    // Simulate Network Delay
    setTimeout(() => {
      setStep('success');
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="payment-overlay">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        className="payment-card"
      >
        {/* Header */}
        <div className="payment-header">
          <img src="/weblogo.jpg" alt="QuickGo" className="payment-logo" />
          <div>
            <h5 className="mb-0">QuickGo Checkout</h5>
            <p className="small text-muted mb-0">Secure Payment Simulation</p>
          </div>
          <button className="close-x" onClick={onClose}>&times;</button>
        </div>

        {/* Step 1: Choose Method */}
        {step === 'method' && (
          <div className="payment-body">
            <div className="amount-banner">
              <span>Amount to Pay</span>
              <h3>₹{amount.toFixed(2)}</h3>
            </div>

            <div className="methods-list mt-4">
              <div className="method-item" onClick={handlePay}>
                <FiSmartphone className="icon" />
                <span>UPI / Google Pay / PhonePe</span>
                <FiArrowRight className="arrow" />
              </div>
              <div className="method-item" onClick={handlePay}>
                <FiCreditCard className="icon" />
                <span>Credit / Debit Card</span>
                <FiArrowRight className="arrow" />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Processing */}
        {step === 'processing' && (
          <div className="payment-body text-center py-5">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 1 }}
              className="loader-icon"
            >
              <FiLoader />
            </motion.div>
            <h5 className="mt-4">Processing Transaction...</h5>
            <p className="small text-muted">Please do not refresh the page.</p>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 'success' && (
          <div className="payment-body text-center py-5">
            <div className="success-icon">
              <FiCheckCircle />
            </div>
            <h4 className="mt-3 text-success">Payment Successful!</h4>
            <p className="small text-muted">Transaction ID: QG_TXN_{Math.floor(Math.random()*100000)}</p>
            <PrimaryButton text="Generate Invoice" onClick={onPaymentSuccess} />
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Simple Internal Primary Button specifically for the Modal
const PrimaryButton = ({ text, onClick }) => (
    <button className="btn-pay-confirm" onClick={onClick}>{text}</button>
);

export default PaymentModal;