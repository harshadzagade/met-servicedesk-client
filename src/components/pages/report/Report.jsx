import React, { Fragment, useContext } from 'react';
import AuthContext from '../../../context/AuthContext/AuthContext';
import Superadmin from './superadmin/Superadmin';
import Subadmin from './subadmin/Subadmin';
import Engineer from './engineer/Engineer';
import ReportData from '../../ui/report/Report';
import AdminContext from '../../../context/AdminContext/AdminContext';

const Report = () => {
    const authCtx = useContext(AuthContext);
    const role = authCtx.employeeInfo ? authCtx.employeeInfo.role : 'checking...';
    const adminCtx = useContext(AdminContext);
    const department = adminCtx.employeeInfo?.department;

    return (
        <Fragment>
            { role === 'superadmin' && <Superadmin /> }
            { role === 'admin' && <ReportData department={department} /> }
            { role === 'subadmin' && <Subadmin /> }
            { role === 'engineer' && <Engineer /> }
        </Fragment>
    );
};

export default Report;