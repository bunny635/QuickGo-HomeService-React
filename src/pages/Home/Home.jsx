import React from 'react';
import './Home.css';
import { motion } from 'framer-motion';
import { FiClock, FiShield, FiHeadphones, FiDollarSign, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}}>
            <h1 className="hero-title">Your Home, Our <br /> <span>Expert Care</span></h1>
            <p className="hero-tagline">Your Time, Our Priority. Luxury Home Services in one click.</p>
            <div className="hero-btns">
              <PrimaryButton text="Book a Service" onClick={() => navigate('/services')} />
              <button className="btn-outline-gold ms-3" onClick={() => navigate('/about')}>Our Story</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED HOME SERVICES */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="section-title">Home Service <span>Essentials</span></h2>
            <p className="text-muted">High-quality solutions for your everyday living.</p>
          </div>
          <div className="row">
            {[
              { id: 1, title: "Home Cleaning", img: "/homecleaning.jpg", desc: "Eco-friendly deep cleaning for your interiors." },
              { id: 2, title: "Garden Cleaning", img: "/GardenCleaning.jpg", desc: "Expert landscape and garden maintenance." },
              { id: 3, title: "Electrician Service", img: "/elo.jpg", desc: "Certified professionals for safe repairs." }
            ].map((service) => (
              <div className="col-md-4 mb-4" key={service.id}>
                <div className="service-card-premium">
                  <img src={service.img} alt={service.title} className="card-img" />
                  <div className="card-content">
                    <h4>{service.title}</h4>
                    <p>{service.desc}</p>
                    <button className="card-link" onClick={() => navigate(`/service/${service.id}`)}>
                      Explore <FiArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE QUICKGO */}
      <section className="section-padding bg-black-light">
        <div className="container">
          <div className="row g-4 text-center">
            {[
              { icon: <FiClock />, title: "On-Time Arrival", desc: "We value your schedule above all." },
              { icon: <FiShield />, title: "Trusted Experts", desc: "Strict background-verified professionals." },
              { icon: <FiDollarSign />, title: "Transparent Pricing", desc: "Premium services at honest rates." },
              { icon: <FiHeadphones />, title: "24/7 Concierge", desc: "Support whenever you need assistance." }
            ].map((item, index) => (
              <div className="col-md-3" key={index}>
                <div className="feature-icon-gold">{item.icon}</div>
                <h5 className="mt-3">{item.title}</h5>
                <p className="text-muted small">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;