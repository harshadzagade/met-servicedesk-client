// src/components/pages/dashboard/Dashboard.jsx
import React, { Fragment, useContext } from 'react';
import AuthContext from '../../../context/AuthContext/AuthContext';
import Superadmin from './superadmin/Superadmin';
import Admin from './admin/Admin';
import Subadmin from './subadmin/Subadmin';
import Engineer from './engineer/Engineer';
import User from './user/User';

const Dashboard = () => {
    const { employeeInfo } = useContext(AuthContext);
    const role = employeeInfo?.role;
    console.log(role);
    console.log("hel",employeeInfo);

    return (
        <Fragment>
            {role === 'superadmin' && <Superadmin />}
            {role === 'admin' && <Admin />}
            {role === 'subadmin' && <Subadmin />}
            {role === 'engineer' && <Engineer />}
            {role === 'user' && <User />}
        </Fragment>
    );
};

export default Dashboard;
