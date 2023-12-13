import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Login from '../components/pages/login/Login';
import Dashboard from '../components/pages/dashboard/Dashboard';
import Department from '../components/pages/department/Department';
import Institute from '../components/pages/institute/Institute';
import CreateEmployee from '../components/pages/createEmployee/CreateEmployee';

const Routers = () => {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path='department' element={<Department />} />
                    <Route path='institute' element={<Institute />} />
                    <Route path='create_employee' element={<CreateEmployee />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default Routers;