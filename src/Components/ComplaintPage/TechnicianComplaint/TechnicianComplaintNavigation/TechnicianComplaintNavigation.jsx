import React from 'react';
import classes from './TechnicianComplaintNavigation.module.css';
import { useState } from 'react';
import DataPerPage from '../../../UI/DataPerPage/DataPerPage';


const TechnicianComplaintNavigation = (props) => {
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [activeTab, setActiveTab] = useState('AllDepartmentComplaint');

  const handleDepartmentComplaint = () => {
    setActiveTab('AllDepartmentComplaint');
    props.viewLayout('AllDepartmentComplaint',  numberOfPages)
  };
  const handleOwnComplaint = () => {
    setActiveTab('AllStaffOwnComplaint');
    props.viewLayout('AllStaffOwnComplaint' ,  numberOfPages)
  };


  return (
    <div className={`${classes.filterButtons}`}>
      <button className={`${classes.button} ${activeTab === 'AllDepartmentComplaint' && classes.active} filter-button list`} data-filter="assigned" onClick={handleDepartmentComplaint}>Assign</button>
      <button className={`${classes.button} ${activeTab === 'AllStaffOwnComplaint' && classes.active} filter-button list`} onClick={handleOwnComplaint}>Own</button>

      <div className={classes.datapage}>
        <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
      </div>
    </div>
  )
}

export default TechnicianComplaintNavigation