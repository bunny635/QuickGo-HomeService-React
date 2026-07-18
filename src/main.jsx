import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

// --- REACT FONTS IMPORT ---
import "@fontsource/inter/400.css"; // Defaults to weight 400
import "@fontsource/inter/700.css"; // Bold
import "@fontsource/inter/800.css"; // Extra Bold
import "@fontsource/playfair-display/700.css"; // Luxury Heading Font
// ---------------------------

import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);