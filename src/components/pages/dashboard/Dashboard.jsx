// src/components/pages/dashboard/Dashboard.jsx
import React, { Fragment, useContext } from 'react';
import AuthContext from '../../../context/AuthContext/AuthContext';
import Admin from './admin/Admin';
import Subadmin from './subadmin/Subadmin';
import Engineer from './engineer/Engineer';
import User from './user/User';
import SuperAdminDash from '../../ui/dashboard/SuperadminDash';
import EngineerDash from '../../ui/dashboard/EngineerDash';

const Dashboard = () => {
    const { employeeInfo } = useContext(AuthContext);
    const role = employeeInfo?.role;
    console.log(role);
    console.log("hel",employeeInfo);

    return (
        <Fragment>
            {role === 'superadmin' && <SuperAdminDash />}
            {role === 'admin' && <Admin />}
            {role === 'subadmin' && <Subadmin />}
            {role === 'engineer' && <EngineerDash />}
            {role === 'user' && <User />}
        </Fragment>
    );
};

export default Dashboard;
