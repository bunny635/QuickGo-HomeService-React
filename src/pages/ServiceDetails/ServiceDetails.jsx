import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ServiceDetails.css';
import { motion } from 'framer-motion';
import { FaStar, FaCheckCircle, FaTools, FaClock } from 'react-icons/fa';
import { FiArrowLeft, FiShield, FiAward, FiPhoneCall } from 'react-icons/fi';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  // EXACT DYNAMIC DATA SOURCE
  const servicesData = {
    "1": {
      id: "1", title: "Professional Home Cleaning", rating: 4.8, image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070",
      description: "Our premium home cleaning service is designed for high-end luxury residences. We provide a deep-cleaning solution that covers every corner of your home, ensuring a germ-free and sparkling environment.",
      includes: ["Deep Mopping & Dusting", "Kitchen Sanitization", "Bathroom Scrubbing", "Glass & Mirror Polishing"],
      duration: "4-6 Hours",
      guarantee: "100% Satisfaction or Re-clean",
      providers: [
        { id: 'p_1', fee: 699 },
        { id: 'p_2', fee: 749 }
      ]
    },
    "2": {
      id: "2", title: "Garden Cleaning & Care", rating: 4.5, image: "https://images.unsplash.com/photo-1416879598555-22008713bd78?q=80&w=2070",
      description: "Revitalize your outdoor sanctuary. Our expert gardening team handles everything from precision lawn mowing and hedge trimming to soil fertilization and debris removal.",
      includes: ["Lawn Mowing & Edging", "Hedge & Shrub Trimming", "Organic Fertilizing", "Weed Control"],
      duration: "3-5 Hours",
      guarantee: "Eco-friendly Disposal Included",
      providers: [
        { id: 'p_3', fee: 899 },
        { id: 'p_4', fee: 799 }
      ]
    },
    "3": {
      id: "3", title: "Certified Electrician Service", rating: 4.9, image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2070",
      description: "Fast and safe electrical repairs by certified senior professionals. Whether it's complex wiring, appliance installation, or routine audits, we ensure safety.",
      includes: ["Safety Circuit Audit", "Switchboard Repairs", "Appliance Installation", "Wiring Upgrades"],
      duration: "1-3 Hours",
      guarantee: "90-Day Service Warranty",
      providers: [
        { id: 'p_5', fee: 599 },
        { id: 'p_6', fee: 649 }
      ]
    }
  };

  useEffect(() => {
    if (servicesData[id]) setService(servicesData[id]);
  }, [id]);

  if (!service) return <div className="p-5 text-center text-white"><h2>Loading...</h2></div>;

  // Calculate Starting Price dynamically from provider data
  const startingPrice = Math.min(...service.providers.map(p => p.fee));

  return (
    <div className="service-details-page-wrapper">
      <div className="container py-5">
        
        <button className="btn-back-link mb-4 text-gold d-flex align-items-center" onClick={() => navigate('/services')}>
          <FiArrowLeft className="me-2" /> Back to Services
        </button>

        <div className="row g-5">
          {/* LEFT: CONTENT AREA */}
          <div className="col-lg-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="main-image-frame">
                 <img src={service.image} alt={service.title} className="details-main-img" />
                 <div className="rating-tag-float"><FaStar className="me-1 mb-1"/> {service.rating}</div>
              </div>
              
              <h1 className="service-title-text mt-4">{service.title}</h1>
              <p className="service-full-desc mt-3">{service.description}</p>

              {/* FEATURES GRID */}
              <div className="service-features-section mt-5 mb-5">
                <h4 className="gold-title mb-4"><FaTools className="me-2"/> Premium Checklist</h4>
                <div className="row">
                  {service.includes.map((item, idx) => (
                    <div className="col-md-6 mb-3" key={idx}>
                      <div className="check-item-card"><FaCheckCircle className="text-gold me-2" /> {item}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: BOOKING SIDEBAR */}
          <div className="col-lg-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="booking-side-card">
              <div className="pricing-box">
                <span className="small text-muted text-uppercase fw-bold">Starting Rate</span>
                <h2>₹{startingPrice} <span>/ service</span></h2>
              </div>

              <hr className="divider-gold-thin" />

              <div className="info-rows">
                <div className="info-row-item">
                    <FaClock className="row-icon" />
                    <div><p className="row-label">Time Estimate</p><p className="row-val">{service.duration}</p></div>
                </div>
                <div className="info-row-item">
                    <FiShield className="row-icon" />
                    <div><p className="row-label">QuickGo Promise</p><p className="row-val">{service.guarantee}</p></div>
                </div>
                <div className="info-row-item">
                    <FiAward className="row-icon" />
                    <div><p className="row-label">Staff Quality</p><p className="row-val">Background Verified</p></div>
                </div>
              </div>

              <div className="mt-4 d-grid">
                {/* Redirects user back to Services page to choose the provider */}
                <PrimaryButton text="Choose a Provider" onClick={() => navigate('/services')} />
              </div>
              
              <div className="help-box mt-4">
                <FiPhoneCall className="me-2" /> Need help? <span className="text-gold">Contact Concierge</span>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceDetails;