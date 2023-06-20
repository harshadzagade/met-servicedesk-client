import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider  from './Components/Context/AuthProvider';
import AdminProvider from './Components/Context/AdminContext/AdminProvider';
import TicketDetailsProvider from './Components/Context/TicketDetailsContext/TicketDetailsProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider><AdminProvider><TicketDetailsProvider><App /></TicketDetailsProvider></AdminProvider></AuthProvider>
  </React.StrictMode>
);