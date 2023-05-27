import React, { useState } from 'react';
import classes from './UserHomeNavigation.module.css';

const UserHomeNavigation = (props) => {
    const [viewLayout, setViewLayout] = useState('ownRequests');
    const handleOwnRequests = () => {
        setViewLayout('ownRequests');
        props.viewLayout('ownRequests')
    };
    const handleOwnComplaints = () => {
        setViewLayout('ownComplaints');
        props.viewLayout('ownComplaints')
    };
    return (
        <div className={`${classes.userHomeNavigation}`}>
            <div className={`btn ${viewLayout === 'ownRequests'? 'btn-secondary' : 'btn-primary'} mr-3 mt-2 ${classes.ownRequests}`} onClick={handleOwnRequests}>Own Requests</div>
            <div className={`btn ${viewLayout === 'ownComplaints'? 'btn-secondary' : 'btn-warning'} mr-3 mt-2 ${classes.ownComplaints}`} onClick={handleOwnComplaints}>Own Complaints</div>
        </div>
    );
};

export default UserHomeNavigation;