import React, { useState, useEffect, useRef } from 'react';
import './Profile.css';
import { motion } from 'framer-motion';
import { 
  FiCamera, FiEdit, FiShield, FiMail, 
  FiPhone, FiCheck, FiX, FiStar, FiLock, 
  FiLogOut, FiChevronRight, FiFileText, FiCalendar 
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

const Profile = () => {
  const fileInputRef = useRef(null); // Ref to trigger hidden file input
  const [isEditing, setIsEditing] = useState(false);
  const [bookings, setBookings] = useState([]);
  
  // 1. Initial State with Image
  const [user, setUser] = useState({
    name: "User",
    email: "user@quickgo.com",
    phone: "+91 98765 43210",
    location: "Surat, Gujarat",
    memberSince: "July 2023",
    profilePic: "https://i.pravatar.cc/150?u=quickgo" // Default
  });

  // 2. Load Data from Storage on Mount
  useEffect(() => {
    const savedName = localStorage.getItem('user_name');
    const savedPic = localStorage.getItem('user_pic'); // Load saved photo
    
    if (savedName || savedPic) {
      setUser(prev => ({ 
        ...prev, 
        name: savedName || prev.name, 
        profilePic: savedPic || prev.profilePic 
      }));
    }

    const savedBookings = JSON.parse(localStorage.getItem('quickgo_bookings')) || [];
    setBookings(savedBookings);
  }, []);

  // 3. Handle Photo Upload Logic
  const handlePhotoClick = () => {
    fileInputRef.current.click(); // Open file selector
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB Limit for LocalStorage
        toast.error("Image too large! Please select a file under 1MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setUser({ ...user, profilePic: base64String });
        localStorage.setItem('user_pic', base64String); // Save image to "Database"
        toast.success("Profile Photo Updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (user.name.trim() === "") return toast.error("Name required");
    localStorage.setItem('user_name', user.name);
    setIsEditing(false);
    toast.success("Profile details saved");
    setTimeout(() => window.location.reload(), 800);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="profile-page-wrapper">
      
      {/* HIDDEN FILE INPUT */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        style={{ display: 'none' }} 
      />

      {/* 1. PROFILE BANNER */}
      <section className="profile-hero-banner">
        <div className="container">
          <div className="banner-flex">
            <div className="profile-avatar-container" onClick={handlePhotoClick}>
              <img src={user.profilePic} alt="Profile" className="avatar-main" />
              <div className="camera-badge">
                <FiCamera />
                <span className="tooltip-text">Change Photo</span>
              </div>
            </div>
            <div className="banner-details text-white">
              <h2>{user.name} <span className="v-badge"><FiShield /> Verified</span></h2>
              <p className="text-muted"><FiMail className="me-2"/> {user.email} | <FiPhone className="me-2"/> {user.phone}</p>
              <p className="member-since">Member Since {user.memberSince}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container my-5">
        <div className="row g-4">
          
          {/* LEFT COLUMN: EDIT INFO */}
          <div className="col-lg-4">
            <div className="profile-glass-card p-4 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="gold-heading mb-0">Personal Details</h5>
                {!isEditing ? (
                  <button className="btn-edit-action" onClick={() => setIsEditing(true)}><FiEdit /></button>
                ) : (
                  <div className="d-flex gap-2">
                    <button className="btn-save-circle" onClick={handleSave}><FiCheck /></button>
                    <button className="btn-cancel-circle" onClick={() => setIsEditing(false)}><FiX /></button>
                  </div>
                )}
              </div>

              <div className="p-info-form">
                <div className="p-form-group">
                  <label>Display Name</label>
                  {isEditing ? <input type="text" name="name" value={user.name} onChange={handleInputChange} className="p-edit-input" /> : <p>{user.name}</p>}
                </div>
                <div className="p-form-group">
                  <label>Contact Number</label>
                  {isEditing ? <input type="text" name="phone" value={user.phone} onChange={handleInputChange} className="p-edit-input" /> : <p>{user.phone}</p>}
                </div>
                <div className="p-form-group border-0">
                  <label>Current Location</label>
                  {isEditing ? <input type="text" name="location" value={user.location} onChange={handleInputChange} className="p-edit-input" /> : <p>{user.location}</p>}
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-6"><div className="mini-stat-card"><h4>{bookings.length}</h4><p>Bookings</p></div></div>
              <div className="col-6"><div className="mini-stat-card"><h4>4.9</h4><p>Rating</p></div></div>
            </div>
          </div>

          {/* RIGHT COLUMN: HISTORY & SETTINGS */}
          <div className="col-lg-8">
            <div className="mb-5">
                <h5 className="gold-heading mb-4">Recent Service History</h5>
                <div className="history-scroll-box">
                    {bookings.length > 0 ? (
                        bookings.map((item, idx) => (
                            <div className="p-history-card mb-3" key={idx}>
                                <div className="d-flex align-items-center">
                                    <div className="h-icon-box"><FiFileText /></div>
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="mb-0 text-white">{item.service}</h6>
                                            <span className="h-price text-gold fw-bold">₹{item.amount}</span>
                                        </div>
                                        <p className="mb-0 small text-muted mt-1"><FiCalendar className="me-1"/> {item.date}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-5 text-center bg-dark rounded-3"><p className="text-muted m-0">No services booked yet.</p></div>
                    )}
                </div>
            </div>

            <div className="p-settings-section">
                <h5 className="gold-heading mb-4">Account Settings</h5>
                <div className="p-settings-list">
                    <div className="p-set-item"><span><FiLock className="me-2"/> Update Password</span> <FiChevronRight/></div>
                    <div className="p-set-item logout-red" onClick={handleLogout}><span><FiLogOut className="me-2"/> Sign Out</span> <FiChevronRight/></div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;