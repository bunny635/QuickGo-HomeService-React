import React from 'react';
import './CustomModal.css';
import { motion, AnimatePresence } from 'framer-motion';

const CustomModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="custom-modal-content"
      >
        <div className="modal-header">
          <h5>{title}</h5>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default CustomModal;