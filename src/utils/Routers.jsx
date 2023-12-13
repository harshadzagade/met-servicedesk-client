import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Login from '../components/pages/login/Login';
import Dashboard from '../components/pages/dashboard/Dashboard';
import Department from '../components/pages/department/Department';

const Routers = () => {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path='department' element={<Department />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default Routers;