import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from './components/Layout/UserLayout';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import HomeServices from './pages/HomeServices/HomeServices';
import ServiceDetails from './pages/ServiceDetails/ServiceDetails';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import BookService from './pages/BookService/BookService';
import MyBookings from './pages/MyBookings/MyBookings';
import Profile from './pages/Profile/Profile';
import Contact from './pages/Contact/Contact';
import Invoice from './pages/Invoic/Invoice';
const AdminPlaceholder = () => <div className="text-white p-5 text-center"><h1>Admin Portal (Coming Soon)</h1></div>;
const ProviderPlaceholder = () => <div className="text-white p-5 text-center"><h1>Provider Portal (Coming Soon)</h1></div>;

const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. Auth Routes (No Navbar/Footer) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 2. User Portal Routes (With Navbar & Footer) */}
      <Route element={<UserLayout />}>
        <Route path="/admin-dashboard" element={<AdminPlaceholder />} />
        <Route path="/provider-dashboard" element={<ProviderPlaceholder />} />
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
      </Route>
    </Routes>
  );
};

export default AppRoutes;