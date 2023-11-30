import React, { useState } from 'react';
import classes from './TechnicianComplaintNavigation.module.css';
import { useNavigate } from 'react-router-dom';

const TechnicianComplaintNavigation = (props) => {
  const [activeTab, setActiveTab] = useState('AllDepartmentComplaint');
  const navigate = useNavigate();

  const handleDepartmentComplaint = () => {
    setActiveTab('AllDepartmentComplaint');
    props.viewLayout('AllDepartmentComplaint')
  };
  const handleOwnComplaint = () => {
    setActiveTab('AllStaffOwnComplaint');
    props.viewLayout('AllStaffOwnComplaint')
  };

  return (
    <div className={classes.buttonsSection}>
      <div className={`${classes.filterButtons}`}>
        <button className={`${classes.button} ${activeTab === 'AllDepartmentComplaint' && classes.active} filter-button list`} data-filter="assigned" onClick={handleDepartmentComplaint}>Department</button>
        <button className={`${classes.button} ${activeTab === 'AllStaffOwnComplaint' && classes.active} filter-button list`} onClick={handleOwnComplaint}>My Complaints</button>
      </div>
      <button className={`${classes.tikReqbtn}`} onClick={() => navigate('/newcomplaint')}>
        <span className="material-icons-sharp btn-icon">
          add
        </span>
        <span className={`${classes.btnName}`}>New Ticket</span>
      </button>
    </div>
  );
};

export default TechnicianComplaintNavigation;