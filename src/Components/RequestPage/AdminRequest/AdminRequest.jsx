import React, { Fragment, useState } from 'react';
// import classes from './AdminRequest.module.css';
import RequestNavigation from './RequestNavigation/RequestNavigation';
import OutgoingDepartmentRequests from './OutgoingDepartmentRequests/OutgoingDepartmentRequests';
import IncomingRequests from './IncomingRequests/IncomingRequests';
import SendRequest from './SendRequest/SendRequest';
import OwnRequests from './OwnRequests/OwnRequests';

const AdminRequest = () => {
    const [openLayout, setOpenLayout] = useState('outgoingDepartmentRequests');
    const checkLayout = (value) => {
        setOpenLayout(value);
    };
    return (
        <Fragment>
            <RequestNavigation viewLayout={checkLayout} />
            {openLayout === 'outgoingDepartmentRequests' && <OutgoingDepartmentRequests />}
            {openLayout === 'incomingRequests' && <IncomingRequests />}
            {openLayout === 'ownRequests' && <OwnRequests />}
            {openLayout === 'sendRequests' && <SendRequest />}
        </Fragment>
    );
};

export default AdminRequest;