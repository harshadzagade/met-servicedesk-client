import React, { Fragment, useState } from 'react';
import classes from './AdminRequest.module.css';
import RequestNavigation from './RequestNavigation/RequestNavigation';
import OwnDepartmentRequests from './OwnDepartmentRequests/OwnDepartmentRequests';
import IncomingRequests from './IncomingRequests/IncomingRequests';
import SendRequest from './SendRequest/SendRequest';

const AdminRequest = (props) => {
    const [openLayout, setOpenLayout] = useState('ownDepartmentRequests');
    const checkLayout = (value) => {
        setOpenLayout(value);
    };
    return (
        <Fragment>
            <RequestNavigation viewLayout={checkLayout} />
            {openLayout === 'ownDepartmentRequests' && <OwnDepartmentRequests />}
            {openLayout === 'incomingRequests' && <IncomingRequests department={props.appDepartment} />}
            {openLayout === 'sendRequests' && <SendRequest />}
        </Fragment>
    );
};

export default AdminRequest;