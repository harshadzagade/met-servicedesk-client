import React, { Fragment, useContext } from 'react';
import AuthContext from '../../../context/AuthContext/AuthContext';
import Subadmin from './subadmin/Subadmin';
import User from './user/User';
import SuperTicket from '../../ui/ticket/SuperTicket';
import AdminTicket from '../../ui/ticket/AdminTicket';
import EngineerTicket from '../../ui/ticket/EngineerTicket';
import UserTicket from '../../ui/ticket/UserTicket';

const Complaint = () => {
    const authCtx = useContext(AuthContext);
    const role = authCtx.employeeInfo?.role;
    const department = authCtx.employeeInfo?.department;
    
    return (
        <Fragment>
            { role === 'superadmin' && <SuperTicket type="Complaint" /> }
            { role === 'admin' && <AdminTicket type="Complaint" department={department} /> }
            { role === 'subadmin' && <Subadmin /> }
            { role === 'engineer' && <EngineerTicket type="Complaint" department={department} /> }
            { role === 'user' && <UserTicket type="Complaint" department={department} /> }
        </Fragment>
    );
};

export default Complaint; 