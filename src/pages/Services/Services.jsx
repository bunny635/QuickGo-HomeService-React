import React from 'react';
import './Services.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiTool, FiSun } from 'react-icons/fi';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="services-main-wrapper">
      <section className="services-hero text-center section-padding">
        <div className="container">
          <h1 className="section-title">Home Service <span>Portfolio</span></h1>
          <p className="text-muted">Premium care categories for your luxury residence.</p>
        </div>
      </section>

      <section className="pb-5">
        <div className="container">
          <div className="row g-4">
            {/* Category 1 */}
            <div className="col-md-4">
              <div className="service-category-card">
                <FiHome className="category-icon" />
                <h3>Deep Cleaning</h3>
                <p>Complete interior sanitization and luxury floor care.</p>
                <PrimaryButton text="Explore" onClick={() => navigate('/services/home')} />
              </div>
            </div>
            {/* Category 2 */}
            <div className="col-md-4">
              <div className="service-category-card">
                <FiSun className="category-icon" />
                <h3>Garden Care</h3>
                <p>Expert lawn maintenance and seasonal gardening.</p>
                <PrimaryButton text="Explore" onClick={() => navigate('/services/home')} />
              </div>
            </div>
            {/* Category 3 */}
            <div className="col-md-4">
              <div className="service-category-card">
                <FiTool className="category-icon" />
                <h3>Electrical</h3>
                <p>Safety audits and certified wiring repairs.</p>
                <PrimaryButton text="Explore" onClick={() => navigate('/services/home')} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;