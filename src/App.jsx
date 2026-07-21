import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import ScrollToTop from './utils/ScrollToTop'; // Corrects scroll on page change
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importing Bootstrap CSS globally
import 'bootstrap/dist/css/bootstrap.min.css';
// Global Design System (Black & Gold)
import './App.css';

function App() {
  return (
    <Router>
      {/* 1. Global Utility: Automatically scrolls to top when you change pages */}
      <ScrollToTop />

      {/* 2. Global Notification: Beautiful Dark-themed Gold popups */}
      <ToastContainer 
        theme="dark" 
        position="top-right" 
        autoClose={3000}
        pauseOnHover 
      />
      
      {/* 3. Routing Manager: Decides which page component to load based on the URL */}
      {/* Note: Navbar and Footer are inside AppRoutes -> UserLayout */}
      <AppRoutes />
      
    </Router>
  );
}

export default App;