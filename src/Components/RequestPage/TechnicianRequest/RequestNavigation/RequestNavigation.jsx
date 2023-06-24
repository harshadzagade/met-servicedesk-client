import React from 'react';
import classes from './RequestNavigation.module.css';
import { useState } from 'react';



const RequestNavigation = (props) => {
  const [activeTab, setActiveTab] = useState('AllStaffAssignRequest');

  const handleAssignRequest = () => {
    setActiveTab('AllStaffAssignRequest');
    props.viewLayout('AllStaffAssignRequest')
  };
  const handleOwnRequest = () => {
    setActiveTab('AllStaffOwnRequest');
    props.viewLayout('AllStaffOwnRequest')
  };


  return (
    <div className={`${classes.filterButtons}`}>
      <button className={`${classes.button} ${activeTab === 'AllStaffAssignRequest' && classes.active} filter-button list`} data-filter="assigned" onClick={handleAssignRequest}>Assign</button>
      <button className={`${classes.button} ${activeTab === 'AllStaffOwnRequest' && classes.active} filter-button list`} onClick={handleOwnRequest}>Own</button>
    </div>
  )
}

export default RequestNavigation