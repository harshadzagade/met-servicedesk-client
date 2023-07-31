import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider from './Components/Context/AuthContext/AuthProvider';
import AdminProvider from './Components/Context/AdminContext/AdminProvider';
import TicketDetailsProvider from './Components/Context/TicketDetailsContext/TicketDetailsProvider';
import SubadminProvider from './Components/Context/SubadminContext/SubadminProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider><AdminProvider><SubadminProvider><TicketDetailsProvider><App /></TicketDetailsProvider></SubadminProvider></AdminProvider></AuthProvider>
  </React.StrictMode>
);