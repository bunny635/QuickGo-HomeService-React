import React, { useState, useEffect, useRef } from 'react';
import './Profile.css';
import { motion } from 'framer-motion';
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
    profilePic: "/avatar3.jpg"
  });

  useEffect(() => {
    const savedName = localStorage.getItem('user_name');
    const savedPic = localStorage.getItem('user_pic');
    if (savedName) setUser(prev => ({ ...prev, name: savedName }));
    if (savedPic) setUser(prev => ({ ...prev, profilePic: savedPic }));

    const savedBookings = JSON.parse(localStorage.getItem('quickgo_bookings')) || [];
    setBookings(savedBookings.reverse()); // Show newest first
    
    const spent = savedBookings.reduce((sum, b) => {
        return (b.status === 'Confirmed' || b.paymentStatus === 'Paid') ? sum + (b.amount || 0) : sum;
    }, 0);
    setTotalSpent(spent);
  }, []);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

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
  };

  const handleViewInvoice = (item) => {
    const invoicePacket = {
        txnId: item.transactionId || ("QG-TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase()),
        bookingId: item.bookingId || "BK-DEMO",
        customerName: user.name,
        service: item.service || item.serviceType,
        date: item.date,
        time: item.time,
        address: item.address || user.location,
        baseAmount: item.amount,
        tax: item.amount * 0.18,
        platform: 45,
        total: item.amount + (item.amount * 0.18) + 45,
        method: item.paymentMethod || "ONLINE"
    };
    localStorage.setItem('quickgo_last_invoice', JSON.stringify(invoicePacket));
    navigate('/invoice');
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const statsList = [
    { title: "Total Bookings", count: bookings.length, icon: <FiActivity />, color: "var(--gold-accent)" },
    { title: "Pending", count: bookings.filter(b => b.status === 'Pending').length, icon: <FiClock />, color: "#FFA500" },
    { title: "Completed", count: bookings.filter(b => b.status === 'Confirmed').length, icon: <FiCheckCircle />, color: "#28A745" },
    { title: "Cancelled", count: bookings.filter(b => b.status === 'Cancelled').length, icon: <FiXCircle />, color: "#DC3545" }
  ];

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
          
          {/* SIDEBAR */}
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

            <div className="p-billing-box p-4 mb-4">
                <h5 className="gold-heading mb-3">Billing Overview</h5>
                <h3 className="text-white fw-bold">₹{totalSpent.toLocaleString()}</h3>
                <span className="text-muted small">Total Investment in Premium Services</span>
            </div>

            <div className="p-menu-list">
                <div className="p-menu-item"><FiMapPin className="text-gold me-3"/> Saved Addresses <FiChevronRight className="ms-auto"/></div>
                <div className="p-menu-item"><FiMessageSquare className="text-gold me-3"/> Help & Support <FiChevronRight className="ms-auto"/></div>
                <div className="p-menu-item logout-red" onClick={handleLogout}><FiLogOut className="me-3"/> Logout Session <FiChevronRight className="ms-auto"/></div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="col-lg-8">
            <div className="row g-3 mb-5">
              {statsList.map((s, i) => (
                <div className="col-md-3 col-6" key={i}>
                  <motion.div whileHover={{y:-5}} className="p-stat-card-luxury">
                    <div className="p-stat-icon-circ" style={{color: s.color, borderColor: s.color}}>{s.icon}</div>
                    <h4 className="text-white">{s.count}</h4>
                    <p>{s.title}</p>
                  </motion.div>
                </div>
              ))}
            </div>

            <h5 className="gold-heading mb-4 d-flex justify-content-between align-items-center">
                Recent Service Activity
            </h5>
            
            {/* UPDATED HISTORY MAPPING: Shows Service, Provider, and Payment Details perfectly */}
            {bookings.length > 0 ? (
                bookings.map((item, idx) => (
                    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: idx*0.1}} className="p-history-card-detailed mb-4" key={idx}>
                        <div className="h-card-top-bar">
                            <span className="h-ref-text">REF: {item.bookingId || `BK-00${idx+1}`}</span>
                            <span className={`h-status-pill ${item.status?.toLowerCase()}`}>{item.status}</span>
                        </div>

                        <div className="row mt-4 align-items-center">
                            
                            {/* Detailed Service & Payment Info */}
                            <div className="col-md-5 h-border-right">
                                <h6 className="text-white fw-bold mb-1">{item.service || item.serviceType}</h6>
                                <p className="small text-muted mb-0">
                                    <FiCalendar className="me-1"/> {item.date} | <FiClock className="me-1"/> {item.time}
                                </p>
                                <div className="mt-2">
                                    {item.status === 'Confirmed' ? (
                                        <span className="text-success small fw-bold">
                                            <FiCheckCircle className="me-1"/> Paid ₹{(item.amount || 0).toLocaleString()} via {item.paymentMethod || 'Online'}
                                        </span>
                                    ) : (
                                        <span className="text-warning small fw-bold">
                                            <FiClock className="me-1"/> Payment Pending (₹{(item.amount || 0).toLocaleString()})
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Detailed Provider Info */}
                            <div className="col-md-4 h-border-right">
                                <label className="label-tiny-gold">Expert Assigned</label>
                                <h6 className="text-white mb-0">
                                    {item.providerName || "Rahul Sharma"} <span className="text-gold small fw-bold">(Verified)</span>
                                </h6>
                                <p className="small text-muted mb-0"><FiPhone className="me-1"/> {item.providerPhone || "+91 99001 12233"}</p>
                            </div>

                            {/* Actions */}
                            <div className="col-md-3 text-center">
                                {item.status === 'Confirmed' ? (
                                    <button className="btn-history-action w-100 mb-2" onClick={() => handleViewInvoice(item)}>
                                        <FiDownload className="me-1"/> Receipt
                                    </button>
                                ) : (
                                    <button className="btn-history-action w-100 mb-2 border-warning text-warning" onClick={() => navigate('/services')}>
                                        Pay Now
                                    </button>
                                )}
                                <button className="btn-history-action w-100 gold-bg">Live Track</button>
                            </div>
                        </div>
                    </motion.div>
                ))
            ) : (
                <div className="empty-state-placeholder text-center p-5" style={{background: 'rgba(0,0,0,0.4)', borderRadius: '20px', border: '1px dashed #333'}}>
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