import React, { useState, useEffect } from 'react';
import './Invoice.css';
import { FiPrinter, FiCheckCircle, FiDownload, FiMapPin, FiMail, FiPhone } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Invoice = () => {
  const [bill, setBill] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('quickgo_last_invoice'));
    if (data) setBill(data);
  }, []);

  if (!bill) return <div className="p-5 text-center text-white" style={{minHeight: '100vh', background: '#0F1115'}}><h3>Generating Invoice...</h3></div>;

  return (
    <div className="invoice-page-container py-5">
      <div className="container">
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="invoice-premium-card mx-auto shadow-lg">
          
          <img src="/weblogo.jpg" alt="Watermark" className="bill-watermark" />

          {/* HEADER */}
          <div className="invoice-header d-flex justify-content-between align-items-start mb-5">
            <div>
              <h1 className="invoice-brand-title mb-1">QUICK<span>GO</span></h1>
              <p className="text-muted small mb-0">Premium Home Services</p>
            </div>
            <div className="text-end">
                <h3 className="text-white mb-1" style={{fontWeight: 800, letterSpacing: '1px'}}>TAX INVOICE</h3>
                <p className="gold-subtitle m-0">Original for Recipient</p>
                <div className="status-pill-paid mt-3"><FiCheckCircle className="me-1"/> PAID - {bill.method}</div>
            </div>
          </div>

          <hr className="gold-divider-thin mb-4" />

          {/* META DATA ROW */}
          <div className="row mb-5 g-4">
            <div className="col-md-4">
              <div className="info-card">
                  <label className="gold-label-tiny">BILLED TO</label>
                  <h6 className="text-white fw-bold mb-1">{bill.customerName}</h6>
                  <p className="text-muted small mb-1"><FiMapPin className="me-1 text-gold"/> {bill.address}</p>
              </div>
            </div>
            <div className="col-md-4">
               <div className="info-card border-left-gold">
                  <label className="gold-label-tiny">BOOKING DETAILS</label>
                  <p className="small text-white mb-1"><strong>Booking ID:</strong> {bill.bookingId}</p>
                  <p className="small text-white mb-1"><strong>Date:</strong> {bill.date}</p>
                  <p className="small text-white mb-0"><strong>Time:</strong> {bill.time || "10:00 AM"}</p>
               </div>
            </div>
            <div className="col-md-4">
                <div className="info-card border-left-gold">
                  <label className="gold-label-tiny">PAYMENT REFERENCE</label>
                  <p className="small text-white mb-1"><strong>TXN ID:</strong> {bill.txnId}</p>
                  <p className="small text-white mb-1"><strong>Mode:</strong> {bill.method}</p>
                  <p className="small text-success mb-0 fw-bold">Success</p>
                </div>
            </div>
          </div>

          {/* SERVICE TABLE */}
          <table className="table invoice-dark-table mb-4">
            <thead>
              <tr>
                <th className="text-gold w-75">Service Description</th>
                <th className="text-end text-gold w-25">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-white">
                    <strong className="d-block fs-6 mb-1">{bill.service}</strong>
                    <small className="text-muted">Premium Home Service Package • Verified Professional Assigned</small>
                </td>
                <td className="text-end text-white align-middle">₹{bill.baseAmount.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          {/* TOTALS */}
          <div className="row justify-content-end mb-5">
             <div className="col-md-5">
                <div className="totals-box p-3 rounded">
                    <div className="d-flex justify-content-between mb-2 small text-muted"><span>Subtotal</span><span className="text-white">₹{bill.baseAmount.toLocaleString()}</span></div>
                    <div className="d-flex justify-content-between mb-2 small text-muted"><span>GST (18%)</span><span className="text-white">₹{bill.tax.toLocaleString()}</span></div>
                    <div className="d-flex justify-content-between mb-2 small text-muted"><span>Platform Fee</span><span className="text-white">₹{bill.platform}.00</span></div>
                    <hr className="gold-divider-thin my-3" />
                    <div className="d-flex justify-content-between fw-bold text-gold fs-4"><span>GRAND TOTAL</span><span>₹{bill.total.toLocaleString()}</span></div>
                </div>
             </div>
          </div>

          {/* FOOTER */}
          <div className="invoice-footer mt-5 pt-4 text-center">
            <h6 className="text-gold fw-bold italic-tagline mb-3">"Your Time, Our Priority."</h6>
            <div className="d-flex justify-content-center gap-4 text-muted small mb-3">
                <span><FiMail className="me-1"/> support@quickgo.com</span>
                <span><FiPhone className="me-1"/> 1800-QUICK-GO</span>
            </div>
            <p className="small text-muted mb-0" style={{fontSize: '10px'}}>
                This is a computer-generated invoice for demonstration purposes and does not require a physical signature. QuickGo Platform is a college project.
            </p>
          </div>
        </motion.div>

        <div className="text-center mt-5 no-print d-flex justify-content-center gap-3">
          <button className="btn-luxury-print outline" onClick={() => window.location.href='/profile'}><FiCheckCircle className="me-2"/> Done</button>
          <button className="btn-luxury-print" onClick={() => window.print()}><FiPrinter className="me-2"/> Print / Save PDF</button>
        </div>

      </div>
    </div>
  );
};

export default Invoice;