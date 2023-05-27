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
            <div className={`btn ${viewLayout === 'assignedRequests'? 'btn-secondary' : 'btn-primary'} mr-3 mt-2 ${classes.assignedRequests}`} onClick={handleAssignedRequests}>Assigned Requests</div>
            <div className={`btn ${viewLayout === 'departmentComplaints'? 'btn-secondary' : 'btn-warning'} mr-3 mt-2 ${classes.departmentComplaints}`} onClick={handleDepartmentComplaints}>Department Complaints</div>
            <div className={`btn ${viewLayout === 'ownRequests'? 'btn-secondary' : 'btn-info'} mr-3 mt-2 ${classes.ownRequests}`} onClick={handleOwnRequests}>Own Requests</div>
            <div className={`btn ${viewLayout === 'ownComplaints'? 'btn-secondary' : 'btn-success'} mr-3 mt-2 ${classes.ownComplaints}`} onClick={handleOwnComplaints}>Own Complaints</div>
        </div>
    );
};

export default TechnicianHomeNavigation;