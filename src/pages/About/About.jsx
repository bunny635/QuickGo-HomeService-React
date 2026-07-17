import React from 'react';
import './About.css';
import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiUsers, FiAward, FiCheckCircle } from 'react-icons/fi';

const About = () => {
  // Animation settings
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const teamMembers = [
    { name: "Vinay Dharaiya", role: "Founder & CEO", img: "/public/avatar3.jpg" },
    { name: "Kavya Desai", role: "Operations Head", img: "/public/avatar1.jpg" },
    { name: "Smit Ghoghari", role: "Service Director", img: "/public/avatar2.jpg" }
  ];

  return (
    <div className="about-container">
      
      {/* 1. Header Section */}
      <section className="about-hero text-center">
        <div className="container">
          <motion.h1 initial="hidden" animate="visible" variants={fadeInUp} className="display-4 fw-bold">
            Redefining <span>Home Services</span>
          </motion.h1>
          <p className="lead text-muted">Your Time, Our Priority. The QuickGo Story.</p>
        </div>
      </section>

      {/* 2. Company Story */}
      <section className="section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img 
                src="/public/companymeet.jpg" 
                alt="Our Story" 
                className="img-fluid rounded-4 shadow-gold" 
              />
            </div>
            <div className="col-md-6 ps-md-5">
              <h2 className="section-title text-start">Our <span>Story</span></h2>
              <p className="text-muted mt-3">
                Founded in 2023, QuickGo was born out of a simple observation: finding reliable, premium home services was too difficult. We set out to create a platform that values the customer's time above all else.
              </p>
              <p className="text-muted">
                Today, QuickGo stands as a symbol of luxury and trust, connecting thousands of households with background-verified experts who treat every home like their own.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="section-padding bg-black-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="mv-card">
                <FiTarget className="mv-icon" />
                <h3>Our Mission</h3>
                <p className="text-muted">To provide seamless, high-quality home solutions that simplify life and return valuable time back to our clients.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mv-card">
                <FiEye className="mv-icon" />
                <h3>Our Vision</h3>
                <p className="text-muted">To be the global gold standard for home maintenance and lifestyle services, known for excellence and punctuality.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us (Specific to About Page) */}
      <section className="section-padding">
        <div className="container text-center">
          <h2 className="section-title mb-5">Why People <span>Trust Us</span></h2>
          <div className="row">
            {[
              { icon: <FiAward />, title: "Certified Excellence", desc: "Only the top 5% of applicants make it to our team." },
              { icon: <FiUsers />, title: "Customer Centric", desc: "Dedicated support managers for every service." },
              { icon: <FiCheckCircle />, title: "Guaranteed Satisfaction", desc: "If you aren't happy, we'll make it right at no cost." }
            ].map((item, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <div className="trust-card">
                  <div className="trust-icon">{item.icon}</div>
                  <h5 className="mt-3">{item.title}</h5>
                  <p className="text-muted small">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Process */}
      <section className="section-padding bg-black-light">
        <div className="container">
          <h2 className="section-title text-center mb-5">Our <span>Process</span></h2>
          <div className="process-timeline">
            <div className="process-step">
              <span className="step-num">01</span>
              <div>
                <h5>Rigorous Screening</h5>
                <p className="text-muted">Background checks and skills assessment of all partners.</p>
              </div>
            </div>
            <div className="process-step">
              <span className="step-num">02</span>
              <div>
                <h5>Smart Matching</h5>
                <p className="text-muted">Assigning the best-suited expert based on your specific requirements.</p>
              </div>
            </div>
            <div className="process-step">
              <span className="step-num">03</span>
              <div>
                <h5>Service Execution</h5>
                <p className="text-muted">Top-tier service delivered with premium equipment and care.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Professional Team */}
      <section className="section-padding">
        <div className="container text-center">
          <h2 className="section-title mb-5">The <span>Leadership Team</span></h2>
          <div className="row justify-content-center">
            {teamMembers.map((member, idx) => (
              <div className="col-md-3 mb-4" key={idx}>
                <motion.div whileHover={{ scale: 1.05 }} className="team-card">
                  <img src={member.img} alt={member.name} className="team-img" />
                  <h5 className="mt-3 mb-1 text-gold">{member.name}</h5>
                  <p className="text-muted small">{member.role}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;