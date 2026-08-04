import React, { useState } from 'react';
import './HomeServices.css'; // Uses your existing HomeServices_2.css perfectly
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

const HomeServices = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // SYNCHRONIZED SERVICES DATA
  // IDs match exactly with ServiceDetails.jsx (1, 2, 3)
  const servicesData = [
    {
      id: 1,
      title: "Home Cleaning",
      price: "₹699",
      rating: 4.8,
      category: "Cleaning",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070",
      desc: "Premium deep cleaning for high-end residential interiors."
    },
    {
      id: 2,
      title: "Garden Care",
      price: "₹799",
      rating: 4.5,
      category: "Outdoor",
      image: "https://images.unsplash.com/photo-1416879598555-22008713bd78?q=80&w=2070",
      desc: "Professional landscaping and yard maintenance services."
    },
    {
      id: 3,
      title: "Electrician",
      price: "₹599",
      rating: 4.9,
      category: "Electrical",
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2070",
      desc: "Certified experts for all your electrical repairs and safety checks."
    }
  ];

  // Logic to filter services based on Search
  const filteredServices = servicesData.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
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
              placeholder="Search for cleaning, garden, or electrician..." 
              className="search-input-premium"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* 2. Services Grid */}
      <section className="pb-5 pt-5">
        <div className="container">
          <div className="row g-4">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <div className="col-lg-4 col-md-6" key={service.id}>
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="home-service-card d-flex flex-column"
                  >
                    <div className="service-img-wrapper">
                      <img src={service.image} alt={service.title} />
                      <div className="service-rating">
                        <FaStar className="me-1 mb-1" /> {service.rating}
                      </div>
                    </div>
                    
                    <div className="service-body p-4 flex-grow-1 d-flex flex-column justify-content-between">
                      <div>
                          <span className="service-category-tag">{service.category}</span>
                          <h4 className="mt-2 text-white fw-bold">{service.title}</h4>
                          <p className="text-muted small mb-0">{service.desc}</p>
                      </div>
                      
                      <div className="mt-4 border-top border-secondary pt-3">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="small text-muted">Starting from</span>
                            <span className="price-tag-gold">{service.price}</span>
                          </div>
                          
                          {/* THE FIX: Replaced direct booking with Provider Routing */}
                          <PrimaryButton 
                            text={<>Select Provider <FiArrowRight className="ms-1"/></>} 
                            onClick={() => navigate(`/service/${service.id}`)} 
                            style={{width: '100%'}}
                          />
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5 border border-secondary rounded-4" style={{background: 'rgba(0,0,0,0.4)'}}>
                <p className="text-muted fs-5 mb-0">No services found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomeServices;