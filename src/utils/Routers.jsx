import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Login from '../components/pages/login/Login';
import Dashboard from '../components/pages/dashboard/Dashboard';
import Department from '../components/pages/department/Department';
import Institute from '../components/pages/institute/Institute';
import CreateEmployee from '../components/pages/createEmployee/CreateEmployee';
import EmployeeList from '../components/pages/employeeList/EmployeeList';
import Request from '../components/pages/request/Request';
import Complaint from '../components/pages/complaint/Complaint';
import Report from '../components/pages/report/Report';
import Archive from '../components/pages/archive/Archive';
import ContactList from '../components/pages/contactList/ContactList';
import Policies from '../components/pages/policies/Policies';

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
                    <Route path='employee_list' element={<EmployeeList />} />
                    <Route path='complaint' element={<Complaint />} />
                    <Route path='request' element={<Request />} />
                    <Route path='report' element={<Report />} />
                    <Route path='archive' element={<Archive />} />
                    <Route path='contact_list' element={<ContactList />} />
                    <Route path='policies' element={<Policies />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default Routers;