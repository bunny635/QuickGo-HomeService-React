import React, { useState } from 'react';
import './Services.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiStar, FiCheckCircle, FiXCircle, FiArrowLeft, FiClock, FiSearch } from 'react-icons/fi';

const servicesData = [
  {
    id: '1',
    title: 'Home Cleaning',
    desc: 'Premium deep cleaning for high-end residential interiors.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070',
    providers: [
      { id: 'p_1', name: 'Sarah Cleaning Services', exp: '6 Years', rating: '4.9', served: '540+', completed: '620+', available: true, fee: 699, image: 'https://images.unsplash.com/photo-1581579186913-4bcacbf508d8?q=80&w=2000' },
      { id: 'p_2', name: 'Sparkle Home Care', exp: '4 Years', rating: '4.8', served: '410+', completed: '470+', available: false, fee: 749, image: 'https://images.unsplash.com/photo-1628177142898-93e46e2f13f1?q=80&w=2000' }
    ]
  },
  {
    id: '2',
    title: 'Garden Care',
    desc: 'Professional landscaping and yard maintenance services.',
    image: 'https://images.unsplash.com/photo-1416879598555-22008713bd78?q=80&w=2070',
    providers: [
      { id: 'p_3', name: 'Green Leaf Gardening', exp: '8 Years', rating: '4.9', served: '700+', completed: '810+', available: true, fee: 899, image: 'https://images.unsplash.com/photo-1592424098651-698fba0ccb4b?q=80&w=2000' },
      { id: 'p_4', name: 'Nature Garden Experts', exp: '5 Years', rating: '4.7', served: '390+', completed: '450+', available: true, fee: 799, image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=2000' }
    ]
  },
  {
    id: '3',
    title: 'Electrician',
    desc: 'Certified experts for all your electrical repairs and safety.',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2070',
    providers: [
      { id: 'p_5', name: 'Bright Electrical Solutions', exp: '10 Years', rating: '5.0', served: '980+', completed: '1150+', available: true, fee: 599, image: 'https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=2000' },
      { id: 'p_6', name: 'PowerFix Electricians', exp: '7 Years', rating: '4.8', served: '760+', completed: '900+', available: false, fee: 649, image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2000' }
    ]
  }
];

const Services = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);

  const handleBookNow = (provider) => {
    navigate(`/book/${selectedService.id}`, { 
      state: { service: selectedService, provider: provider } 
    });
  };

  return (
    <div className="services-page">
      <section className="services-header text-center">
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-white fw-bold display-4 mb-3">
            QuickGo <span>Services</span>
          </motion.h1>
          <p className="text-muted">Premium care categories for your luxury residence.</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <AnimatePresence mode="wait">
            {!selectedService ? (
              <motion.div key="services-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="row g-4">
                  {servicesData.map(service => (
                    <div className="col-lg-4 col-md-6" key={service.id}>
                      <motion.div whileHover={{ y: -10 }} className="main-service-card d-flex flex-column">
                        <div className="card-img-wrapper">
                          <img src={service.image} alt={service.title} className="service-main-img" />
                          <div className="category-tag">Starts at ₹{Math.min(...service.providers.map(p => p.fee))}</div>
                        </div>
                        
                        <div className="main-card-body flex-grow-1 d-flex flex-column justify-content-between">
                          <div>
                            <h3 className="text-white fw-bold mb-2">{service.title}</h3>
                            <p className="text-muted small">{service.desc}</p>
                          </div>
                          
                          <div className="d-flex justify-content-between align-items-center border-top border-secondary pt-3 mt-3">
                            <span className="text-gold small fw-bold"><FiUsers className="me-1"/> {service.providers.length} Providers</span>
                            <button className="btn-gold-outline" onClick={() => setSelectedService(service)}>View Providers</button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="providers-grid" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                <button className="btn-back-link mb-4 text-gold d-flex align-items-center bg-transparent border-0" onClick={() => setSelectedService(null)}>
                  <FiArrowLeft className="me-2"/> Back to Services
                </button>
                
                <div className="text-center mb-5">
                  <h2 className="text-white fw-bold">Select a <span className="text-gold">Provider</span></h2>
                  <p className="text-muted">Available experts for {selectedService.title}</p>
                </div>

                <div className="row justify-content-center g-4">
                  {selectedService.providers.map(provider => (
                    <div className="col-lg-6" key={provider.id}>
                      <div className={`provider-luxury-card ${!provider.available ? 'unavailable' : ''}`}>
                        <div className="d-flex align-items-center gap-3 mb-4">
                          <img src={provider.image} alt={provider.name} className="prov-avatar" />
                          <div>
                            <h4 className="text-white fw-bold mb-1">{provider.name}</h4>
                            <div className="d-flex gap-3">
                                <span className="text-gold small fw-bold"><FiStar className="me-1"/> {provider.rating} Rating</span>
                                <span className="text-muted small"><FiClock className="me-1"/> {provider.exp} Exp.</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="prov-stats-grid mb-4">
                          <div className="p-stat"><span>Customers</span><strong>{provider.served}</strong></div>
                          <div className="p-stat"><span>Completed</span><strong>{provider.completed}</strong></div>
                          <div className="p-stat"><span>Service Fee</span><strong className="text-gold fs-5">₹{provider.fee}</strong></div>
                        </div>

                        <div className="prov-footer d-flex justify-content-between align-items-center pt-3 border-top border-secondary">
                          {provider.available ? (
                            <span className="badge-status success"><FiCheckCircle className="me-1"/> Available</span>
                          ) : (
                            <span className="badge-status danger"><FiXCircle className="me-1"/> Not Available</span>
                          )}

                          <button 
                            className="btn-action-premium gold px-4 m-0" 
                            disabled={!provider.available}
                            onClick={() => handleBookNow(provider)}
                            style={{ opacity: provider.available ? 1 : 0.5 }}
                          >
                            Proceed to Book
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Services;