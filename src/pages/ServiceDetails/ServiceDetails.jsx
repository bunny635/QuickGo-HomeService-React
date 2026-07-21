import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ServiceDetails.css';
import { motion } from 'framer-motion';
import { FaStar, FaCheckCircle, FaClock, FaTools } from 'react-icons/fa';
import { FiArrowLeft, FiShield } from 'react-icons/fi';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

const ServiceDetails = () => {
  const { id } = useParams(); // Retrieves the service ID from the URL
  const navigate = useNavigate();

  // Mock data for the specific service (In a real app, you'd fetch this via Axios)
  const service = {
    title: "Professional Home Cleaning",
    rating: 4.8,
    reviews: 124,
    price: "₹15,000 - ₹50,000",
    time: "2-4 Hours",
    description: "Our premium home cleaning service is designed for those who value a spotless and healthy living environment. We use eco-friendly products and professional-grade equipment to ensure every corner of your home shines.",
    includes: [
      "Deep cleaning of all rooms",
      "Sanitization of kitchen & bathrooms",
      "Floor scrubbing & polishing",
      "Window and glass cleaning",
      "Dusting of hard-to-reach areas"
    ],
    image: "/public/homecleaning.jpg"
  };

  return (
    <div className="service-details-container">
      <div className="container py-5">
        
        {/* Back Button */}
        <button className="btn-back mb-4" onClick={() => navigate(-1)}>
          <FiArrowLeft className="me-2" /> Back to Services
        </button>

        <div className="row g-5">
          {/* Left Side: Image and Content */}
          <div className="col-lg-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="details-main-content"
            >
              <img src={service.image} alt={service.title} className="details-img rounded-4" />
              
              <h1 className="mt-4 service-title-main">{service.title}</h1>
              
              <div className="d-flex align-items-center mb-4">
                <div className="rating-badge me-3">
                  <FaStar className="me-1 mb-1" /> {service.rating}
                </div>
                <span className="text-muted">({service.reviews} verified reviews)</span>
              </div>

              <div className="description-box">
                <h4>About this Service</h4>
                <p className="text-muted">{service.description}</p>
              </div>

              <div className="includes-box mt-5">
                <h4><FaTools className="me-2 text-gold" /> What's Included?</h4>
                <ul className="includes-list">
                  {service.includes.map((item, index) => (
                    <li key={index}><FaCheckCircle className="check-icon" /> {item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Booking Sidebar */}
          <div className="col-lg-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="booking-sidebar p-4 rounded-4"
            >
              <h3 className="sidebar-price">Starting from <span>${service.price}</span></h3>
              <hr className="divider-gold" />
              
              <div className="sidebar-info-item">
                <FaClock className="icon" />
                <div>
                  <h6>Estimated Duration</h6>
                  <p>{service.time}</p>
                </div>
              </div>

              <div className="sidebar-info-item">
                <FiShield className="icon" />
                <div>
                  <h6>Service Guarantee</h6>
                  <p>100% Satisfaction or Re-clean</p>
                </div>
              </div>

              <div className="mt-4">
                <PrimaryButton 
                  text="Book this Service" 
                  onClick={() => navigate(`/book/${id}`)} 
                />
              </div>
              
              <p className="sidebar-footer-note mt-3 text-center">
                Instant confirmation. No hidden charges.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Reviews Preview Section */}
        <div className="row mt-5">
          <div className="col-12">
            <h4 className="mb-4">Customer Reviews</h4>
            <div className="mini-review-card p-3 rounded-3 mb-3">
              <div className="d-flex justify-content-between">
                <h6>Sarah Jenkins</h6>
                <div className="text-gold"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
              </div>
              <p className="text-muted mb-0 mt-2">"Absolutely professional! My home has never looked this good. The team arrived right on time."</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceDetails;