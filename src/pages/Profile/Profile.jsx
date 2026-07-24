import React, { useState, useEffect, useRef } from 'react';
import './Profile.css';
import { motion } from 'framer-motion';
import { 
  FiCamera, FiEdit, FiShield, FiMail, FiPhone, FiCheck, FiX, 
  FiStar, FiLock, FiLogOut, FiChevronRight, FiFileText, 
  FiCalendar, FiDownload, FiMapPin, FiMessageSquare, FiInfo, FiActivity,
  FiCheckCircle // Added this missing icon
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [bookings, setBookings] = useState([]);
  
  const [user, setUser] = useState({
    name: "User",
    email: "user@quickgo.com",
    phone: "+91 98765 43210",
    location: "Surat, Gujarat",
    memberSince: "July 2023",
    profilePic: "https://i.pravatar.cc/150?u=quickgo"
  });

  useEffect(() => {
    const savedName = localStorage.getItem('user_name');
    const savedPic = localStorage.getItem('user_pic');
    if (savedName) setUser(prev => ({ ...prev, name: savedName }));
    if (savedPic) setUser(prev => ({ ...prev, profilePic: savedPic }));

    const savedBookings = JSON.parse(localStorage.getItem('quickgo_bookings')) || [];
    const enrichedBookings = savedBookings.map(b => ({
        ...b,
        providerName: "Rahul Sharma (Certified)",
        providerPhone: "+91 99001 12233",
        paymentStatus: "Paid"
    }));
    setBookings(enrichedBookings);
  }, []);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) return toast.error("Image too large (Max 1MB)");
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profilePic: reader.result });
        localStorage.setItem('user_pic', reader.result);
        toast.success("Profile Photo Updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (user.name.trim() === "") return toast.error("Name is required!");
    localStorage.setItem('user_name', user.name);
    setIsEditing(false);
    toast.success("Account Details Saved!");
    setTimeout(() => window.location.reload(), 500);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="profile-page-wrapper">
      <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" style={{ display: 'none' }} />

      <section className="profile-hero-banner">
        <div className="container">
          <div className="banner-flex">
            <div className="profile-avatar-container" onClick={() => fileInputRef.current.click()}>
              <img src={user.profilePic} alt="Profile" className="avatar-main" />
              <div className="camera-badge"><FiCamera /></div>
            </div>
            <div className="banner-details text-white">
              <h2 className="fw-bold">{user.name} <span className="v-badge"><FiShield /> Verified</span></h2>
              <p className="text-muted"><FiMail className="me-2"/> {user.email} | <FiPhone className="me-2"/> {user.phone}</p>
              <button className="btn-edit-header mt-2" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? <><FiX className="me-1"/> Cancel</> : <><FiEdit className="me-1"/> Manage Profile</>}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container my-5 pb-5">
        <div className="row g-4">
          
          <div className="col-lg-4">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="profile-glass-card p-4 mb-4">
              <h5 className="gold-heading mb-4">Personal Information</h5>
              <div className="p-info-form">
                <div className="p-form-group">
                  <label>Display Name</label>
                  {isEditing ? <input type="text" value={user.name} onChange={(e)=>setUser({...user, name: e.target.value})} className="p-edit-input" /> : <p>{user.name}</p>}
                </div>
                <div className="p-form-group">
                  <label>Mobile Number</label>
                  {isEditing ? <input type="text" value={user.phone} onChange={(e)=>setUser({...user, phone: e.target.value})} className="p-edit-input" /> : <p>{user.phone}</p>}
                </div>
                <div className="p-form-group border-0">
                  <label>Saved Location</label>
                  {isEditing ? <input type="text" value={user.location} onChange={(e)=>setUser({...user, location: e.target.value})} className="p-edit-input" /> : <p>{user.location}</p>}
                </div>
              </div>
              {isEditing && <div className="mt-4 d-grid"><PrimaryButton text="Save Changes" onClick={handleSave} /></div>}
            </motion.div>

            <div className="row g-2 mb-4">
                <div className="col-6"><div className="p-stat-box"><FiActivity/> <h6>{bookings.length}</h6><span>Bookings</span></div></div>
                <div className="col-6"><div className="p-stat-box"><FiStar/> <h6>4.9</h6><span>Rating</span></div></div>
            </div>

            <div className="p-menu-list">
                <div className="p-menu-item"><FiMapPin className="text-gold"/> Saved Addresses <FiChevronRight className="ms-auto"/></div>
                <div className="p-menu-item"><FiMessageSquare className="text-gold"/> Help & Support <FiChevronRight className="ms-auto"/></div>
                <div className="p-menu-item logout-red" onClick={handleLogout}><FiLogOut/> Sign Out <FiChevronRight className="ms-auto"/></div>
            </div>
          </div>

          <div className="col-lg-8">
            <h5 className="gold-heading mb-4">Activity Log & Service Tracker</h5>
            
            {bookings.length > 0 ? (
                bookings.map((item, idx) => (
                    <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} className="p-history-card-detailed mb-4" key={idx}>
                        <div className="h-card-top">
                            <span className="h-ref">BOOKING ID: {item.bookingId}</span>
                            <span className="h-badge-confirmed">Confirmed</span>
                        </div>

                        <div className="row mt-4 align-items-center">
                            <div className="col-md-5 h-border-right">
                                <h6 className="text-white fw-bold mb-1">{item.service}</h6>
                                <p className="small text-muted mb-0"><FiCalendar className="me-1"/> {item.date} at {item.time}</p>
                                <div className="mt-3">
                                    <span className="text-success small fw-bold"><FiCheckCircle className="me-1"/> Paid Full (₹{item.amount})</span>
                                </div>
                            </div>

                            <div className="col-md-4 h-border-right">
                                <label className="label-tiny">Expert Assigned</label>
                                <h6 className="text-white mb-0">{item.providerName}</h6>
                                <p className="small text-muted mb-0"><FiPhone className="me-1"/> {item.providerPhone}</p>
                                <p className="small text-gold-accent mt-2"><FiShield className="me-1"/> Verified Pro</p>
                            </div>

                            <div className="col-md-3 text-center">
                                <button className="btn-h-invoice w-100 mb-2" onClick={() => navigate('/invoice')}>
                                    <FiDownload className="me-1"/> Receipt
                                </button>
                                <button className="btn-h-track w-100">Live Status</button>
                            </div>
                        </div>
                    </motion.div>
                ))
            ) : (
                <div className="empty-state-card text-center p-5">
                    <FiFileText size={50} className="text-muted mb-3" />
                    <h5 className="text-white">No history found</h5>
                    <p className="text-muted">Once you book a service, it will be tracked here.</p>
                    <PrimaryButton text="Book My First Service" onClick={() => navigate('/services')} />
                </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;