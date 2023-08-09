import React, { useState } from 'react';
import classes from './ComplaintNavigation.module.css';

const ComplaintNavigation = (props) => {
    const [viewLayout, setViewLayout] = useState('outgoingDepartmentComplaints');
    const handleOutgoingDepartmentComplaints = () => {
        setViewLayout('outgoingDepartmentComplaints');
        props.viewLayout('outgoingDepartmentComplaints')
    };
    const handleIncomingComplaints = () => {
        setViewLayout('incomingComplaints');
        props.viewLayout('incomingComplaints')
    };
    const handleOwnComplaints = () => {
        setViewLayout('ownComplaints');
        props.viewLayout('ownComplaints')
    };
    const handleSendComplaints = () => {
        setViewLayout('sendComplaints');
        props.viewLayout('sendComplaints')
    };
    return (
        <div className={`${classes.complaintNavigation}`}>
            <div className={`btn ${viewLayout === 'outgoingDepartmentComplaints'? classes.active : classes.default} mr-3 mt-2 ${classes.fixedBase}`} onClick={handleOutgoingDepartmentComplaints}>Outgoing Department Complaints</div>
            <div className={`btn ${viewLayout === 'incomingComplaints'? classes.active : classes.default} mr-3 mt-2 ${classes.fixedBase}`} onClick={handleIncomingComplaints}>Incoming Complaints</div>
            <div className={`btn ${viewLayout === 'ownComplaints'? classes.active : classes.default} mr-3 mt-2 ${classes.fixedBase}`} onClick={handleOwnComplaints}>Own Complaints</div>
            <div className={`btn ${viewLayout === 'sendComplaints'? classes.active : classes.default} mt-2 ${classes.fixedBase}`} onClick={handleSendComplaints}>Send Complaint</div>
        </div>
    );
};

export default ComplaintNavigation;