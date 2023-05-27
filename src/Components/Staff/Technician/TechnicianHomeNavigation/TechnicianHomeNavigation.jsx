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
    return (
        <div className={`${classes.technicianHomeNavigation}`}>
            <div className={`btn ${viewLayout === 'assignedRequests'? 'btn-secondary' : 'btn-primary'} mr-3 mt-2 ${classes.assignedRequests}`} onClick={handleAssignedRequests}>Assigned Requests</div>
            <div className={`btn ${viewLayout === 'departmentComplaints'? 'btn-secondary' : 'btn-warning'} mr-3 mt-2 ${classes.departmentComplaints}`} onClick={handleDepartmentComplaints}>Department Complaints</div>
        </div>
    );
};

export default TechnicianHomeNavigation;