import React, { useState } from 'react';
import './HomeServices.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

const HomeServices = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // ONLY the three required Home Services
  const servicesData = [
    {
      id: 1,
      title: "Home Cleaning",
      price: "₹15,000 - ₹50,000",
      rating: 4.8,
      category: "Cleaning",
      image: "/public/home.jpg",
      desc: "Premium deep cleaning for high-end residential interiors."
    },
    {
      id: 2,
      title: "Garden Cleaning",
      price: "₹8,000 - ₹25,000",
      rating: 4.5,
      category: "Outdoor",
      image: "/public/garden.jpg",
      desc: "Professional landscaping and yard maintenance services."
    },
    {
      id: 3,
      title: "Electrician Service",
      price: "₹500 - ₹5,000",
      rating: 4.9,
      category: "Electrical",
      image: "/public/ElectricianService.jpg",
      desc: "Certified experts for all your electrical repairs and safety checks."
    }
  ];

  // Logic to filter services based on Search
  const filteredServices = servicesData.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-services-page">
      
      {/* 1. Header & Search Area */}
      <section className="services-banner section-padding">
        <div className="container text-center">
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-title">
            Our <span>Home Services</span>
          </motion.h2>
          <p className="text-muted mb-4">Professional care tailored for your home essentials.</p>
          
          <div className="search-container mx-auto">
            <FiSearch className="search-icon-gold" />
            <input 
              type="text" 
              placeholder="Search for cleaning or repairs..." 
              className="search-input-premium"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* 2. Services Grid */}
      <section className="pb-5">
        <div className="container">
          <div className="row g-4">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <div className="col-lg-4 col-md-6" key={service.id}>
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="home-service-card"
                  >
                    <div className="service-img-wrapper">
                      <img src={service.image} alt={service.title} />
                      <div className="service-rating">
                        <FaStar className="me-1" /> {service.rating}
                      </div>
                    </div>
                    
                    <div className="service-body p-4">
                      <span className="service-category-tag">{service.category}</span>
                      <h4 className="mt-2 text-white">{service.title}</h4>
                      <p className="text-muted small">{service.desc}</p>
                      
                      <div className="price-info mt-3 mb-4">
                        <span className="small text-muted d-block">Starting from</span>
                        <span className="price-tag-gold">{service.price}</span>
                      </div>
                      
                      <div className="d-flex gap-2">
                        <button 
                          className="btn-outline-details"
                          onClick={() => navigate(`/service/${service.id}`)}
                        >
                          Details
                        </button>
                        <PrimaryButton 
                          text="Book Now" 
                          onClick={() => navigate(`/book/${service.id}`)} 
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p className="text-muted">No services found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomeServices;