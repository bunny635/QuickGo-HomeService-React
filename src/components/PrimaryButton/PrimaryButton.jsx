import React from 'react';
import './PrimaryButton.css';
import { motion } from 'framer-motion';

const PrimaryButton = ({ text, onClick, type = "button", variant = "solid" }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type={type}
      className={`custom-btn ${variant === "outline" ? "btn-gold-outline" : "btn-gold-solid"}`}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};

export default PrimaryButton;