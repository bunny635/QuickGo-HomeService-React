import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Navbar from './components/Navbar/Navbar'; 
import Footer from './components/Footer/Footer'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      {/* ToastContainer allows us to show popup notifications from any page */}
      <ToastContainer theme="dark" position="top-right" />
      
      {/* Navbar will eventually go here so it stays on all pages */}
      
      <main>
        <AppRoutes />
      </main>

      {/* Footer will eventually go here */}
    </Router>
  );
}

export default App;