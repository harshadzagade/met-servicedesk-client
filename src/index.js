import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider from './Context/AuthProvider';
import DepartmentProvider from './Context/DepartmentProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider><DepartmentProvider><App /></DepartmentProvider></AuthProvider>
  </React.StrictMode>
);
