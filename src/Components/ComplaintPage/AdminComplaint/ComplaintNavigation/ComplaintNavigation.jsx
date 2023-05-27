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
            <div className={`btn ${viewLayout === 'outgoingDepartmentComplaints'? 'btn-secondary' : 'btn-primary'} mr-3 mt-2 ${classes.ownDepartmentComplaints}`} onClick={handleOutgoingDepartmentComplaints}>Outgoing Department Complaints</div>
            <div className={`btn ${viewLayout === 'incomingComplaints'? 'btn-secondary' : 'btn-warning'} mr-3 mt-2 ${classes.incomingComplaints}`} onClick={handleIncomingComplaints}>Incoming Complaints</div>
            <div className={`btn ${viewLayout === 'ownComplaints'? 'btn-secondary' : 'btn-info'} mr-3 mt-2 ${classes.ownComplaints}`} onClick={handleOwnComplaints}>Own Complaints</div>
            <div className={`btn ${viewLayout === 'sendComplaints'? 'btn-secondary' : 'btn-success'} mt-2 ${classes.sendComplaints}`} onClick={handleSendComplaints}>Send Complaint</div>
        </div>
    );
};

export default ComplaintNavigation;