import React, { Fragment, useState } from 'react';
// import classes from './AdminRequest.module.css';
import RequestNavigation from './RequestNavigation/RequestNavigation';
import OutgoingDepartmentRequests from './OutgoingDepartmentRequests/OutgoingDepartmentRequests';
import IncomingRequests from './IncomingRequests/IncomingRequests';
import SendRequest from './SendRequest/SendRequest';
import OwnRequests from './OwnRequests/OwnRequests';
import classes from './AdminRequest.module.css';

const AdminRequest = () => {
    const [openLayout, setOpenLayout] = useState('outgoingDepartmentRequests');
    const checkLayout = (value) => {
        setOpenLayout(value);
    };
    return (
        <Fragment>
            <RequestNavigation viewLayout={checkLayout} />
            <div className={`${classes.container}`}>
                {openLayout === 'outgoingDepartmentRequests' && <OutgoingDepartmentRequests />}
                {openLayout === 'incomingRequests' && <IncomingRequests />}
                {openLayout === 'ownRequests' && <OwnRequests />}
                {openLayout === 'sendRequests' && <SendRequest />}
            </div>
        </Fragment>
    );
};

export default AdminRequest;