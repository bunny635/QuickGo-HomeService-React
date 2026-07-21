import React, { useState, useEffect } from 'react';
import './Invoice.css';
import { FiPrinter, FiCheckCircle } from 'react-icons/fi';

const Invoice = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem('quickgo_bookings')) || [];
    if(bookings.length > 0) {
      setData(bookings[0]); // Load the most recent one
    }
  }, []);

  if (!data) return <div className="p-5 text-center text-white">Generating Invoice...</div>;

  return (
    <div className="invoice-page-container py-5">
      <div className="container">
        <div className="invoice-white-card p-5 mx-auto">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div>
              <h2 className="fw-bold mb-0">QUICKGO INVOICE</h2>
              <p className="text-muted small">Tax Receipt</p>
            </div>
            <img src="/weblogo.jpg" alt="Logo" style={{height:'60px', borderRadius:'50%'}} />
          </div>

          <div className="row mb-5">
            <div className="col-6">
              <h6 className="text-muted small">CUSTOMER NAME:</h6>
              <p className="fw-bold">{localStorage.getItem('user_name') || "Valued Customer"}</p>
            </div>
            <div className="col-6 text-end">
              <h6 className="text-muted small">INVOICE NO:</h6>
              <p className="fw-bold">{data.bookingId}</p>
              <p className="small text-muted">{data.bookedAt}</p>
            </div>
          </div>

          <table className="table border mt-4">
            <thead className="table-dark">
              <tr><th>Service Description</th><th className="text-end">Total (Inc. GST)</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.service} - Scheduled for {data.date}</td>
                <td className="text-end">₹{data.amount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-5 text-center">
            <p className="text-success fw-bold"><FiCheckCircle className="me-2"/> Payment Status: SUCCESSFUL</p>
            <button className="btn btn-dark mt-3 no-print" onClick={() => window.print()}><FiPrinter /> Print Bill</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;