import React, { useState } from 'react';
import './Contact.css';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiPlus, FiMinus, FiInstagram, FiTwitter, FiFacebook, FiClock } from 'react-icons/fi';
import { toast } from 'react-toastify';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

const Contact = () => {
  // 1. Form State
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  
  // 2. FAQ State
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: "How quickly can I book a service?", a: "With QuickGo, you can book a verified home expert in under 60 seconds through our streamlined booking flow." },
    { q: "Are the experts background checked?", a: "Absolutely. Every cleaner and electrician on our platform undergoes a rigorous 3-step background and skills verification process." },
    { q: "What happens if I'm not satisfied?", a: "We offer a 7-day service warranty. If the job isn't done perfectly, we will send an expert back to fix it for free." }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    toast.success("Message Sent! Our team will get back to you within 24 hours.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact-page-container py-5">
      <div className="container">
        
        <div className="text-center mb-5">
          <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title">
            Connect With <span>QuickGo</span>
          </motion.h2>
          <p className="text-muted">Your luxury home care experience starts with a conversation.</p>
        </div>

        <div className="row g-5">
          {/* LEFT COLUMN: CONTACT INFO */}
          <div className="col-lg-5">
            <motion.div initial={{ x: -30 }} animate={{ x: 0 }} className="contact-glass-card info-card">
              <h4 className="text-gold mb-4">Contact Details</h4>
              
              <div className="info-row">
                <FiMail className="info-icon" />
                <div>
                  <h6>Email Support</h6>
                  <p>concierge@quickgo.com</p>
                </div>
              </div>

              <div className="info-row">
                <FiPhone className="info-icon" />
                <div>
                  <h6>Customer Hotline</h6>
                  <p>+91 98765 43210</p>
                </div>
              </div>

              <div className="info-row">
                <FiMapPin className="info-icon" />
                <div>
                  <h6>Registered Office</h6>
                  <p>Level 5, Imperial Business Park, Surat, 395004</p>
                </div>
              </div>

              <div className="info-row">
                <FiClock className="info-icon" />
                <div>
                  <h6>Working Hours</h6>
                  <p>Mon - Sat: 09:00 AM - 08:00 PM</p>
                </div>
              </div>

              <hr className="my-4 divider-gold" />
              
              <h5 className="text-white mb-3">Join our Community</h5>
              <div className="contact-social-links">
                <a href="#"><FiInstagram /></a>
                <a href="#"><FiTwitter /></a>
                <a href="#"><FiFacebook /></a>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <div className="col-lg-7">
            <motion.div initial={{ x: 30 }} animate={{ x: 0 }} className="contact-glass-card form-card">
              <h4 className="text-gold mb-4">Send an Inquiry</h4>
              <form onSubmit={handleSendMessage}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label-gold">Your Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="contact-input" placeholder="e.g. John Doe" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label-gold">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="contact-input" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label-gold">Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} className="contact-input" placeholder="e.g. Inquiry about Cleaning" />
                </div>
                <div className="mb-4">
                  <label className="form-label-gold">Detailed Message</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} className="contact-input" rows="5" placeholder="Tell us how we can assist you..."></textarea>
                </div>
                <PrimaryButton text={<span><FiSend className="me-2"/> Send Message</span>} type="submit" />
              </form>
            </motion.div>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="faq-area mt-5 pt-5">
          <h3 className="text-center text-gold mb-5">Frequently Asked Questions</h3>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {faqs.map((faq, index) => (
                <div key={index} className={`faq-box ${activeFaq === index ? 'faq-active' : ''}`} onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
                  <div className="faq-header">
                    <span>{faq.q}</span>
                    {activeFaq === index ? <FiMinus className="text-gold" /> : <FiPlus className="text-gold" />}
                  </div>
                  {activeFaq === index && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="faq-body">
                      {faq.a}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;