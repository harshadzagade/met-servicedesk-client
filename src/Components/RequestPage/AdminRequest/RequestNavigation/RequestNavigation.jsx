import React, { useState } from 'react';
import classes from './RequestNavigation.module.css';
import { useNavigate } from 'react-router-dom';

const RequestNavigation = (props) => {
  const [activeTab, setActiveTab] = useState('AllStaffIncomingRequest');
  const navigate = useNavigate();

  const handleIncoming = () => {
    setActiveTab('AllStaffIncomingRequest');
    props.viewLayout('AllStaffIncomingRequest');
  };
  const handleOutGoing = () => {
    setActiveTab('AllStaffOutGoingRequest');
    props.viewLayout('AllStaffOutGoingRequest');
  };
  const handleOwn = () => {
    setActiveTab('AllStaffOwnRequest');
    props.viewLayout('AllStaffOwnRequest');
  };

  return (
    <div className={classes.buttonsSection}>
      <div className={`${classes.filterButtons}`}>
        <button className={`${classes.button} ${activeTab === 'AllStaffIncomingRequest' && classes.active} filter-button list`} data-filter="unassigned" onClick={handleIncoming}>Incoming</button>
        <button className={`${classes.button} ${activeTab === 'AllStaffOutGoingRequest' && classes.active} filter-button list`} data-filter="assigned" onClick={handleOutGoing}>OutGoing</button>
        <button className={`${classes.button} ${activeTab === 'AllStaffOwnRequest' && classes.active} filter-button list`} onClick={handleOwn}>My Requests</button>
      </div>
      <button className={`${classes.tikReqbtn}`} onClick={() => navigate('/newrequest')}>
        <span className="material-icons-sharp btn-icon">
          add
        </span>
        <span className={`${classes.btnName}`}> New Ticket</span>
      </button>
    </div>
  );
};

export default RequestNavigation;