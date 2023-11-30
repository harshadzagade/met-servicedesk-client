import React, { useState } from 'react';
import classes from './ComplaintNavigation.module.css';
import InformationBtn from '../../../UI/InformationBtn/InformationBtn';
import { useNavigate } from 'react-router-dom';

const ComplaintNavigation = (props) => {
  const [activeTab, setActiveTab] = useState('AllStaffIncomingComplaint');
  const navigate = useNavigate();

  const handleIncoming = () => {
    setActiveTab('AllStaffIncomingComplaint');
    props.viewLayout('AllStaffIncomingComplaint')
  };
  const handleOutGoing = () => {
    setActiveTab('AllStaffOutGoingComplaint');
    props.viewLayout('AllStaffOutGoingComplaint')
  };
  const handleOwn = () => {
    setActiveTab('AllStaffOwnComplaint');
    props.viewLayout('AllStaffOwnComplaint')
  };

  return (
    <div className={classes.buttonsSection}>
      <div className={`${classes.filterButtons} p-0`}>
        <button className={`${classes.button} ${activeTab === 'AllStaffIncomingComplaint' && classes.active} filter-button list`} data-filter="unassigned" onClick={handleIncoming}>Incoming</button>
        <button className={`${classes.button} ${activeTab === 'AllStaffOutGoingComplaint' && classes.active} filter-button list`} data-filter="assigned" onClick={handleOutGoing}>OutGoing</button>
        <button className={`${classes.button} ${activeTab === 'AllStaffOwnComplaint' && classes.active} filter-button list`} onClick={handleOwn}>My Complaints</button>
        <InformationBtn />
      </div>
      <button className={`${classes.tikReqbtn}`} onClick={() => navigate('/newcomplaint')}>
        <span className="material-icons-sharp btn-icon">
          add
        </span>
        <span className={`${classes.btnName} `}>New Ticket</span>
      </button>
    </div>
  );
};

export default ComplaintNavigation;