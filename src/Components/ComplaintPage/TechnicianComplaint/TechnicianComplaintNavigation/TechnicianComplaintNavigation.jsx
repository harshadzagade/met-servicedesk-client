import React from 'react';
import classes from './TechnicianComplaintNavigation.module.css';
import { useState } from 'react';


const TechnicianComplaintNavigation = (props) => {
  const [activeTab, setActiveTab] = useState('AllDepartmentComplaint');

  const handleDepartmentComplaint = () => {
    setActiveTab('AllDepartmentComplaint');
    props.viewLayout('AllDepartmentComplaint')
  };
  const handleOwnComplaint = () => {
    setActiveTab('AllStaffOwnComplaint');
    props.viewLayout('AllStaffOwnComplaint')
  };


  return (
    <div className={`${classes.filterButtons}`}>
      <button className={`${classes.button} ${activeTab === 'AllDepartmentComplaint' && classes.active} filter-button list`} data-filter="assigned" onClick={handleDepartmentComplaint}>Assign</button>
      <button className={`${classes.button} ${activeTab === 'AllStaffOwnComplaint' && classes.active} filter-button list`} onClick={handleOwnComplaint}>Own</button>
    </div>
  )
}

export default TechnicianComplaintNavigation