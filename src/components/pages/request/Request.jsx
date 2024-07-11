import React, { Fragment, useContext } from 'react';
import AuthContext from '../../../context/AuthContext/AuthContext';
import Subadmin from './subadmin/Subadmin';
import User from './user/User';
import SuperTicket from '../../ui/ticket/SuperTicket';
import EngineerTicket from '../../ui/ticket/EngineerTicket';
import AdminTicket from '../../ui/ticket/AdminTicket';

const Request = () => {
    const authCtx = useContext(AuthContext);
    const role = authCtx.employeeInfo ? authCtx.employeeInfo.role : 'checking...';
    const department = authCtx.employeeInfo?.department;
    return (
        <Fragment>
            { role === 'superadmin' && <SuperTicket type="Request" /> }
            { role === 'admin' && <AdminTicket type="Request" department={department} /> }
            { role === 'subadmin' && <Subadmin /> }
            { role === 'engineer' && <EngineerTicket type="Request" department={department} /> }
            { role === 'user' && <User /> }
        </Fragment>
    );
};

export default Request;