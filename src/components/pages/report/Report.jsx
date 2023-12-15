import React, { Fragment, useContext } from 'react';
import AuthContext from '../../../context/AuthContext/AuthContext';
import Superadmin from './superadmin/Superadmin';
import Admin from './admin/Admin';
import Subadmin from './subadmin/Subadmin';
import Engineer from './engineer/Engineer';

const Report = () => {
    const authCtx = useContext(AuthContext);
    const role = authCtx.employeeInfo ? authCtx.employeeInfo.role : 'checking...';
    return (
        <Fragment>
            { role === 'superadmin' && <Superadmin /> }
            { role === 'admin' && <Admin /> }
            { role === 'subadmin' && <Subadmin /> }
            { role === 'engineer' && <Engineer /> }
        </Fragment>
    );
};

export default Report;