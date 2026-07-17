import React, { useState } from 'react';
import './Profile.css';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiCheck, FiShoppingBag, FiStar, FiActivity } from 'react-icons/fi';
import { toast } from 'react-toastify';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

const Profile = () => {
  // 1. State for User Data
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    address: "Bungalow No. 5, Silver Oak Society, Mumbai, India",
    profilePic: "https://i.pravatar.cc/150?u=john"
  });

  const [isEditing, setIsEditing] = useState(false);

  // 2. Handle Input Changes
  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 3. Save Changes Logic
  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="profile-container py-5">
      <div className="container">
        <div className="row g-4">
          
          {/* LEFT COLUMN: Profile Header & Stats */}
          <div className="col-lg-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="profile-card sidebar-card text-center"
            >
              <div className="profile-img-wrapper">
                <img src={user.profilePic} alt="Profile" className="profile-img" />
                <div className="edit-overlay"><FiEdit2 /></div>
              </div>
              <h3 className="mt-3 text-white">{user.name}</h3>
              <p className="text-gold fw-bold small mb-4">PREMIUM MEMBER</p>

              {/* Statistics Grid */}
              <div className="row g-2 mt-2">
                <div className="col-4">
                  <div className="stat-box">
                    <FiShoppingBag className="stat-icon" />
                    <h6>12</h6>
                    <span>Total</span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stat-box">
                    <FiActivity className="stat-icon" />
                    <h6>2</h6>
                    <span>Active</span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stat-box">
                    <FiStar className="stat-icon" />
                    <h6>4.9</h6>
                    <span>Rating</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Account Details Form */}
          <div className="col-lg-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="profile-card details-card"
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="text-gold mb-0">Account Details</h4>
                {!isEditing ? (
                  <button className="btn-edit-toggle" onClick={() => setIsEditing(true)}>
                    <FiEdit2 className="me-2" /> Edit Profile
                  </button>
                ) : (
                  <button className="btn-save-toggle" onClick={handleSave}>
                    <FiCheck className="me-2" /> Save Changes
                  </button>
                )}
              </div>

              <div className="profile-form">
                <div className="row">
                  {/* Name */}
                  <div className="col-md-6 mb-4">
                    <label className="profile-label"><FiUser className="me-2"/> Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      className={`profile-input ${isEditing ? 'editable' : ''}`}
                      value={user.name} 
                      readOnly={!isEditing} 
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* Email */}
                  <div className="col-md-6 mb-4">
                    <label className="profile-label"><FiMail className="me-2"/> Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      className={`profile-input ${isEditing ? 'editable' : ''}`}
                      value={user.email} 
                      readOnly={!isEditing} 
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* Phone */}
                  <div className="col-md-6 mb-4">
                    <label className="profile-label"><FiPhone className="me-2"/> Phone Number</label>
                    <input 
                      type="text" 
                      name="phone"
                      className={`profile-input ${isEditing ? 'editable' : ''}`}
                      value={user.phone} 
                      readOnly={!isEditing} 
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* Address */}
                  <div className="col-12 mb-4">
                    <label className="profile-label"><FiMapPin className="me-2"/> Primary Address</label>
                    <textarea 
                      name="address"
                      className={`profile-input ${isEditing ? 'editable' : ''}`}
                      rows="3"
                      value={user.address} 
                      readOnly={!isEditing} 
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Account Security Preview */}
              <div className="security-info mt-4">
                <h5 className="text-muted small mb-3">ACCOUNT SECURITY</h5>
                <div className="p-3 bg-black rounded-3 d-flex justify-content-between align-items-center">
                  <span>Password: **********</span>
                  <button className="btn-link-gold p-0 border-0 bg-transparent">Update Password</button>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;