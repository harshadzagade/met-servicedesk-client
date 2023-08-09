import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider from './Context/AuthContext/AuthProvider';
import AdminProvider from './Context/AdminContext/AdminProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider><AdminProvider><App /></AdminProvider></AuthProvider>
  </React.StrictMode>
);
