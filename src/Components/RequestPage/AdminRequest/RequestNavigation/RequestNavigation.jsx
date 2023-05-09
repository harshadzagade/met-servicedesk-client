import React, { useState } from 'react';
import classes from './RequestNavigation.module.css';

const RequestNavigation = (props) => {
    const [viewLayout, setViewLayout] = useState('ownDepartmentRequests');
    const handleOwnDepartmentRequests = () => {
        setViewLayout('ownDepartmentRequests');
        props.viewLayout('ownDepartmentRequests')
    };
    const handleIncomingRequests = () => {
        setViewLayout('incomingRequests');
        props.viewLayout('incomingRequests')
    };
    const handleSendRequests = () => {
        setViewLayout('sendRequests');
        props.viewLayout('sendRequests')
    };
    return (
        <div className={`${classes.requestNavigation}`}>
            <div className={`btn ${viewLayout === 'ownDepartmentRequests'? 'btn-secondary' : 'btn-primary'} mr-3 mt-2 ${classes.ownDepartmentRequests}`} onClick={handleOwnDepartmentRequests}>View Own Department List</div>
            <div className={`btn ${viewLayout === 'incomingRequests'? 'btn-secondary' : 'btn-warning'} mr-3 mt-2 ${classes.incomingRequests}`} onClick={handleIncomingRequests}>Incoming Requests</div>
            <div className={`btn ${viewLayout === 'sendRequests'? 'btn-secondary' : 'btn-success'} mt-2 ${classes.sendRequests}`} onClick={handleSendRequests}>Send Request</div>
        </div>
    );
};

export default RequestNavigation;