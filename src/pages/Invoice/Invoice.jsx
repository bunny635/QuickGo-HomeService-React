import React, { useState, useEffect } from 'react';
import './Invoice.css';
import { FiPrinter, FiCheckCircle, FiFileText } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Invoice = () => {
  const [bill, setBill] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('quickgo_last_invoice'));
    if (data) setBill(data);
  }, []);

  if (!bill) return <div className="p-5 text-center text-white"><h3>Generating...</h3></div>;

  return (
    <div className="invoice-page-container py-5">
      <div className="container">
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="invoice-premium-card mx-auto shadow-lg">
          
          {/* WATERMARK LOGO */}
          <img src="/weblogo.jpg" alt="Watermark" className="bill-watermark" />

          <div className="invoice-top-header d-flex justify-content-between align-items-center mb-5">
            <div>
              <h1 className="invoice-brand-title">QUICK<span>GO</span></h1>
              <p className="gold-subtitle m-0">Official Digital Receipt</p>
              <div className="status-pill-paid mt-2"><FiCheckCircle className="me-1"/> PAID SUCCESSFUL</div>
            </div>
            <img src="/weblogo.jpg" alt="Logo" className="invoice-brand-logo" />
          </div>

          <div className="row mb-5">
            <div className="col-6">
              <label className="gold-label-tiny">BILLED TO</label>
              <h5 className="text-white mb-1">{bill.customerName}</h5>
              <p className="text-muted small m-0">{bill.address}</p>
            </div>
            <div className="col-6 text-end">
              <label className="gold-label-tiny">INVOICE DETAILS</label>
              <p className="small text-white m-0"><strong>Invoice ID:</strong> {bill.txnId}</p>
              <p className="small text-white"><strong>Date:</strong> {bill.date}</p>
            </div>
          </div>

          <table className="table invoice-dark-table">
            <thead>
              <tr>
                <th className="text-gold">Service Description</th>
                <th className="text-end text-gold">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-white"><strong>{bill.service}</strong><br/><small className="text-muted">Premium Home Service</small></td>
                <td className="text-end text-white">₹{bill.baseAmount.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          <div className="row justify-content-end mt-4">
             <div className="col-md-5">
                <div className="d-flex justify-content-between mb-2 small text-muted"><span>Base Amount</span><span>₹{bill.baseAmount.toLocaleString()}</span></div>
                <div className="d-flex justify-content-between mb-2 small text-muted"><span>GST (18%)</span><span>₹{bill.tax.toLocaleString()}</span></div>
                <div className="d-flex justify-content-between mb-2 small text-muted"><span>Platform Fee</span><span>₹{bill.platform}.00</span></div>
                <hr className="gold-divider-thin" />
                <div className="d-flex justify-content-between fw-bold text-gold fs-4"><span>GRAND TOTAL</span><span>₹{bill.total.toLocaleString()}</span></div>
             </div>
          </div>

          <div className="mt-5 pt-5 text-center border-top border-secondary">
            <p className="small text-muted mb-0">This is a system-generated invoice for demonstration purposes.</p>
            <h6 className="text-gold mt-2 fw-bold italic-tagline">"Your Time, Our Priority."</h6>
          </div>
        </motion.div>

        <div className="text-center mt-5 no-print">
          <button className="btn-luxury-print" onClick={() => window.print()}><FiPrinter className="me-2"/> PRINT OFFICIAL BILL</button>
        </div>

      </div>
    </div>
  );
};

export default Invoice;