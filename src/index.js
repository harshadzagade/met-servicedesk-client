import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider from './Context/AuthContext/AuthProvider';
import DepartmentProvider from './Context/DepartmentContext/DepartmentProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider><DepartmentProvider><App /></DepartmentProvider></AuthProvider>
  </React.StrictMode>
);
