import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './UserLayout.css';

const UserLayout = () => {
  return (
    <div className="user-layout-wrapper">
      {/* 1. Fixed Navbar at the top */}
      <Navbar />

      {/* 2. The Outlet: This is where different pages will change */}
      <main className="content-area">
        <Outlet />
      </main>

      {/* 3. Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default UserLayout;