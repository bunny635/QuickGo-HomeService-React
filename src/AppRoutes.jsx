import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from './components/Layout/UserLayout';

// Auth Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Main Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import HomeServices from './pages/HomeServices/HomeServices';
import ServiceDetails from './pages/ServiceDetails/ServiceDetails';
import BookService from './pages/BookService/BookService';
import MyBookings from './pages/MyBookings/MyBookings';
import Profile from './pages/Profile/Profile';
import Contact from './pages/Contact/Contact';
import Invoice from './pages/Invoice/Invoice';
import History from './pages/History/History';

// Placeholder components for Admin and Provider Portals
const AdminPlaceholder = () => (
  <div className="text-white p-5 text-center" style={{minHeight:'80vh'}}>
    <h1 className="text-gold">Admin Portal</h1>
    <p>System Management logic will be implemented in the Backend Phase.</p>
  </div>
);

const ProviderPlaceholder = () => (
  <div className="text-white p-5 text-center" style={{minHeight:'80vh'}}>
    <h1 className="text-gold">Service Provider Portal</h1>
    <p>Expert dashboard for managing service requests.</p>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. AUTH ROUTES (No Navbar/Footer for clean Login/Register experience) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 2. USER PORTAL ROUTES (Everything inside shares ONE Navbar and ONE Footer) */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/home" element={<HomeServices />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/book/:id" element={<BookService />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/history" element={<History />} />
        
        {/* Dashboards sharing the same Layout for easy navigation back */}
        <Route path="/admin-dashboard" element={<AdminPlaceholder />} />
        <Route path="/provider-dashboard" element={<ProviderPlaceholder />} />
      </Route>

      {/* 3. 404 CATCH-ALL */}
      <Route path="*" element={<div className="text-center py-5 text-white"><h3>404 - Page Not Found</h3></div>} />
    </Routes>
  );
};

export default AppRoutes;