import React, { useState } from 'react';
import classes from './RequestNavigation.module.css';

const RequestNavigation = (props) => {
    const [viewLayout, setViewLayout] = useState('outgoingDepartmentRequests');
    const handleOutgoingDepartmentRequests = () => {
        setViewLayout('outgoingDepartmentRequests');
        props.viewLayout('outgoingDepartmentRequests')
    };
    const handleIncomingRequests = () => {
        setViewLayout('incomingRequests');
        props.viewLayout('incomingRequests')
    };
    const handleOwnRequests = () => {
        setViewLayout('ownRequests');
        props.viewLayout('ownRequests')
    };
    const handleSendRequests = () => {
        setViewLayout('sendRequests');
        props.viewLayout('sendRequests')
    };
    return (
        <div className={`${classes.requestNavigation}`}>
            <div className={`${viewLayout === 'outgoingDepartmentRequests'? classes.active : classes.default} mr-3 mt-2 ${classes.fixedBase}`} onClick={handleOutgoingDepartmentRequests}>Outgoing Department Requests</div>
            <div className={`${viewLayout === 'incomingRequests'? classes.active : classes.default} mr-3 mt-2 ${classes.fixedBase}`} onClick={handleIncomingRequests}>Incoming Requests</div>
            <div className={`${viewLayout === 'ownRequests'? classes.active : classes.default} mr-3 mt-2 ${classes.fixedBase}`} onClick={handleOwnRequests}>Own Requests</div>
            <div className={`${viewLayout === 'sendRequests'? classes.active : classes.default} mt-2 ${classes.fixedBase}`} onClick={handleSendRequests}>Send Request</div>
        </div>
    );
};

export default RequestNavigation;