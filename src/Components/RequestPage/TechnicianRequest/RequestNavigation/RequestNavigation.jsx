import React from 'react';
import classes from './RequestNavigation.module.css';
import { useState } from 'react';
import DataPerPage from '../../../UI/DataPerPage/DataPerPage';



const RequestNavigation = (props) => {
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [activeTab, setActiveTab] = useState('AllStaffAssignRequest');

  const handleAssignRequest = () => {
    setActiveTab('AllStaffAssignRequest' );
    props.viewLayout('AllStaffAssignRequest' , numberOfPages)
  };
  const handleOwnRequest = () => {
    setActiveTab('AllStaffOwnRequest');
    props.viewLayout('AllStaffOwnRequest' , numberOfPages)
  };


  return (
    <div className={`${classes.filterButtons}`}>
      <button className={`${classes.button} ${activeTab === 'AllStaffAssignRequest' && classes.active} filter-button list`} data-filter="assigned" onClick={handleAssignRequest}>Assign</button>
      <button className={`${classes.button} ${activeTab === 'AllStaffOwnRequest' && classes.active} filter-button list`} onClick={handleOwnRequest}>Own</button>

      <div className={classes.datapage}>
        <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
      </div>
    </div>
  )
}

export default RequestNavigation