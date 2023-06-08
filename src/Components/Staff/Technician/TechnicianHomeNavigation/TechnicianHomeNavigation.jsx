import React, { useState } from 'react';
import classes from './TechnicianHomeNavigation.module.css';

const TechnicianHomeNavigation = (props) => {
    const [viewLayout, setViewLayout] = useState('assignedRequests');
    const handleAssignedRequests = () => {
        setViewLayout('assignedRequests');
        props.viewLayout('assignedRequests')
    };
    const handleDepartmentComplaints = () => {
        setViewLayout('departmentComplaints');
        props.viewLayout('departmentComplaints')
    };
    const handleOwnRequests = () => {
        setViewLayout('ownRequests');
        props.viewLayout('ownRequests')
    };
    const handleOwnComplaints = () => {
        setViewLayout('ownComplaints');
        props.viewLayout('ownComplaints')
    };
    return (
        <div className={`${classes.technicianHomeNavigation}`}>
            <div className={`btn ${viewLayout === 'assignedRequests'? classes.active : classes.default} mr-3 mt-2 ${classes.fixedBase}`} onClick={handleAssignedRequests}>Assigned Requests</div>
            <div className={`btn ${viewLayout === 'departmentComplaints'? classes.active : classes.default} mr-3 mt-2 ${classes.fixedBase}`} onClick={handleDepartmentComplaints}>Department Complaints</div>
            <div className={`btn ${viewLayout === 'ownRequests'? classes.active : classes.default} mr-3 mt-2 ${classes.fixedBase}`} onClick={handleOwnRequests}>Own Requests</div>
            <div className={`btn ${viewLayout === 'ownComplaints'? classes.active : classes.default} mr-3 mt-2 ${classes.fixedBase}`} onClick={handleOwnComplaints}>Own Complaints</div>
        </div>
    );
};

export default TechnicianHomeNavigation;