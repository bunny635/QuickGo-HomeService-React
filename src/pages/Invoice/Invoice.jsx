import React from 'react';
import './Invoice.css';
import { FiPrinter, FiDownload } from 'react-icons/fi';

const Invoice = () => {
  const invoiceData = {
    billNo: "INV-" + Math.floor(Math.random() * 90000),
    date: new Date().toLocaleDateString(),
    customer: "John Doe",
    service: "Home Cleaning",
    amount: 15000,
    gst: 2700,
    total: 17700
  };

  return (
    <div className="invoice-container py-5">
      <div className="container">
        <div className="invoice-box p-5 bg-white text-dark shadow-lg mx-auto" style={{maxWidth: '800px'}}>
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div>
              <h2 className="fw-bold mb-0">INVOICE</h2>
              <p className="text-muted small">QuickGo Home Services</p>
            </div>
            <img src="/weblogo.jpg" alt="Logo" style={{height:'60px', borderRadius: '50%'}} />
          </div>

          <div className="row mb-5">
            <div className="col-6">
              <h6>Billed To:</h6>
              <p className="mb-0">{invoiceData.customer}</p>
              <p className="small text-muted">Surat, Gujarat</p>
            </div>
            <div className="col-6 text-end">
              <h6>Invoice Info:</h6>
              <p className="mb-0">No: {invoiceData.billNo}</p>
              <p className="mb-0">Date: {invoiceData.date}</p>
            </div>
          </div>

          <table className="table table-bordered mt-4">
            <thead className="table-dark">
              <tr>
                <th>Service Description</th>
                <th className="text-end">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{invoiceData.service} (Premium Package)</td>
                <td className="text-end">₹{invoiceData.amount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <div className="row justify-content-end">
            <div className="col-md-5">
              <div className="d-flex justify-content-between mb-2">
                <span>Tax (GST 18%)</span>
                <span>₹{invoiceData.gst.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between fw-bold fs-5 border-top pt-2">
                <span>Total Paid</span>
                <span>₹{invoiceData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 text-center text-muted small">
            <p>Thank you for choosing QuickGo. Your time is our priority.</p>
          </div>
        </div>

        <div className="text-center mt-4 no-print">
          <button className="btn btn-outline-light me-3" onClick={() => window.print()}><FiPrinter className="me-2"/> Print Bill</button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;