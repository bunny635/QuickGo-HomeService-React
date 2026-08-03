import React, { useState, useEffect, useRef } from 'react';
import './Profile.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCamera, FiEdit, FiShield, FiMail, FiPhone, FiCheck, FiX, 
  FiStar, FiLock, FiLogOut, FiChevronRight, FiFileText, 
  FiCalendar, FiDownload, FiMapPin, FiMessageSquare, FiInfo, FiActivity, FiClock, FiCheckCircle, FiXCircle 
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // 1. STATE MANAGEMENT
  const [isEditing, setIsEditing] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  
  const [user, setUser] = useState({
    name: "User",
    email: "user@quickgo.com",
    phone: "+91 98765 43210",
    location: "Surat, Gujarat",
    dob: "15 Aug 2002",
    gender: "Male",
    memberSince: "July 2023",
    profilePic: "https://i.pravatar.cc/150?u=quickgo"
  });

  // 2. DATA SYNCHRONIZATION
  useEffect(() => {
    // Load User Basic Info
    const savedName = localStorage.getItem('user_name');
    const savedPic = localStorage.getItem('user_pic');
    if (savedName) setUser(prev => ({ ...prev, name: savedName }));
    if (savedPic) setUser(prev => ({ ...prev, profilePic: savedPic }));

    // Load History and Calculate Stats
    const savedBookings = JSON.parse(localStorage.getItem('quickgo_bookings')) || [];
    setBookings(savedBookings);
    
    const spent = savedBookings.reduce((sum, b) => sum + (b.amount || 0), 0);
    setTotalSpent(spent);
  }, []);

  // 3. LOGIC HANDLERS
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

  const handleViewInvoice = (item) => {
    const invoicePacket = {
        txnId: item.transactionId || "TXN-DEMO",
        bookingId: item.bookingId,
        customerName: user.name,
        service: item.service,
        date: item.date,
        address: item.address || user.location,
        baseAmount: item.amount / 1.18,
        tax: item.amount - (item.amount / 1.18),
        platform: 45,
        total: item.amount,
        method: "ONLINE"
    };
    localStorage.setItem('quickgo_last_invoice', JSON.stringify(invoicePacket));
    navigate('/invoice');
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // 4. STATS DATA
  const statsList = [
    { title: "Total", count: bookings.length, icon: <FiActivity />, color: "var(--gold-accent)" },
    { title: "Pending", count: bookings.filter(b => b.status === 'Pending').length, icon: <FiClock />, color: "#FFA500" },
    { title: "Completed", count: bookings.filter(b => b.status === 'Confirmed').length, icon: <FiCheckCircle />, color: "#28A745" },
    { title: "Cancelled", count: bookings.filter(b => b.status === 'Cancelled').length, icon: <FiXCircle />, color: "#DC3545" }
  ];

  return (
    <div className="profile-page-wrapper">
      <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" style={{ display: 'none' }} />

      {/* --- SECTION 1: LUXURY BANNER --- */}
      <section className="profile-hero-banner">
        <div className="container">
          <div className="banner-flex">
            <div className="profile-avatar-container" onClick={() => fileInputRef.current.click()}>
              <img src={user.profilePic} alt="Profile" className="avatar-main" />
              <div className="camera-badge"><FiCamera /></div>
            </div>
            <div className="banner-details text-white">
              <h2 className="fw-bold">{user.name} <span className="v-badge"><FiShield /> Verified User</span></h2>
              <p className="text-muted"><FiMail className="me-2"/> {user.email} | <FiPhone className="me-2"/> {user.phone}</p>
              <p className="member-since">Member Since: {user.memberSince}</p>
              <button className="btn-edit-header mt-2" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? <><FiX className="me-1"/> Cancel Editing</> : <><FiEdit className="me-1"/> Edit Profile</>}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container my-5 pb-5">
        <div className="row g-4">
          
          {/* --- SECTION 2: SIDEBAR (INFO & SETTINGS) --- */}
          <div className="col-lg-4">
            <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} className="profile-glass-card p-4 mb-4">
              <h5 className="gold-heading mb-4">Personal Information</h5>
              <div className="p-info-form">
                <div className="p-form-group">
                  <label>Full Name</label>
                  {isEditing ? <input type="text" value={user.name} name="name" onChange={handleInputChange} className="p-edit-input" /> : <p>{user.name}</p>}
                </div>
                <div className="p-form-group">
                  <label>Mobile Number</label>
                  {isEditing ? <input type="text" value={user.phone} name="phone" onChange={handleInputChange} className="p-edit-input" /> : <p>{user.phone}</p>}
                </div>
                <div className="p-form-group">
                    <label>Birth Date</label>
                    {isEditing ? <input type="text" value={user.dob} name="dob" onChange={handleInputChange} className="p-edit-input" /> : <p>{user.dob}</p>}
                </div>
                <div className="p-form-group border-0">
                  <label>Address</label>
                  {isEditing ? <input type="text" value={user.location} name="location" onChange={handleInputChange} className="p-edit-input" /> : <p>{user.location}</p>}
                </div>
              </div>
              {isEditing && <div className="mt-4 d-grid"><PrimaryButton text="Save Profile" onClick={handleSave} /></div>}
            </motion.div>

            {/* BILLING STATS */}
            <div className="p-billing-box p-4 mb-4">
                <h5 className="gold-heading mb-3">Billing Overview</h5>
                <h3 className="text-white fw-bold">₹{totalSpent.toLocaleString()}</h3>
                <span className="text-muted small">Total Investment in Home Care</span>
                <button className="btn-link-gold d-block mt-3" onClick={()=>navigate('/payment-history')}>View Payment History</button>
            </div>

            <div className="p-menu-list">
                <div className="p-menu-item"><FiMapPin className="text-gold"/> Saved Addresses <FiChevronRight className="ms-auto"/></div>
                <div className="p-menu-item"><FiMessageSquare className="text-gold"/> Help & Support <FiChevronRight className="ms-auto"/></div>
                <div className="p-menu-item logout-red" onClick={handleLogout}><FiLogOut/> Logout Session <FiChevronRight className="ms-auto"/></div>
            </div>
          </div>

          {/* --- SECTION 3: MAIN CONTENT (STATS & HISTORY) --- */}
          <div className="col-lg-8">
            
            {/* BOOKING STATISTICS CARDS */}
            <div className="row g-3 mb-5">
              {statsList.map((s, i) => (
                <div className="col-md-3 col-6" key={i}>
                  <motion.div whileHover={{y:-5}} className="p-stat-card-luxury">
                    <div className="p-stat-icon-circ" style={{color: s.color}}>{s.icon}</div>
                    <h4>{s.count}</h4>
                    <p>{s.title}</p>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* RECENT SERVICE HISTORY */}
            <h5 className="gold-heading mb-4">Recent Service Activity</h5>
            {bookings.length > 0 ? (
                bookings.map((item, idx) => (
                    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: idx*0.1}} className="p-history-card-detailed mb-4" key={idx}>
                        <div className="h-card-top-bar">
                            <span className="h-ref-text">REF: {item.bookingId}</span>
                            <span className={`h-status-pill ${item.status.toLowerCase()}`}>{item.status}</span>
                        </div>

                        <div className="row mt-4 align-items-center">
                            <div className="col-md-5 h-border-right">
                                <h6 className="text-white fw-bold mb-1">{item.service}</h6>
                                <p className="small text-muted mb-0"><FiCalendar className="me-1"/> {item.date} | <FiClock className="me-1"/> {item.time}</p>
                                <div className="mt-2">
                                    <span className="text-success small fw-bold"><FiCheckCircle className="me-1"/> Paid ₹{item.amount.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="col-md-4 h-border-right">
                                <label className="label-tiny-gold">Expert Assigned</label>
                                <h6 className="text-white mb-0">Rahul Sharma (Verified)</h6>
                                <p className="small text-muted mb-0"><FiPhone className="me-1"/> +91 99001 12233</p>
                            </div>

                            <div className="col-md-3 text-center">
                                <button className="btn-history-action w-100 mb-2" onClick={() => handleViewInvoice(item)}>
                                    <FiDownload className="me-1"/> Receipt
                                </button>
                                <button className="btn-history-action w-100 gold-bg">Live Track</button>
                            </div>
                        </div>
                    </motion.div>
                ))
            ) : (
                <div className="empty-state-placeholder text-center p-5">
                    <FiFileText size={50} className="text-muted mb-3" />
                    <h5 className="text-white">No Bookings Found</h5>
                    <p className="text-muted mb-4">Ready to experience premium home care?</p>
                    <PrimaryButton text="Explore Services" onClick={() => navigate('/services')} />
                </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;