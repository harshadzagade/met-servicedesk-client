import React from 'react';
import classes from './RequestNavigation.module.css';
import DataPerPage from '../../../UI/DataPerPage/DataPerPage';
import { useState } from 'react';

const RequestNavigation = (props) => {

  const [numberOfPages, setNumberOfPages] = useState(10);
  const [activeTab, setActiveTab] = useState('AllStaffIncomingRequest')

  const handleIncoming = () => {
    setActiveTab('AllStaffIncomingRequest');
    props.viewLayout('AllStaffIncomingRequest', numberOfPages);
  };
  const handleOutGoing = () => {
    setActiveTab('AllStaffOutGoingRequest');
    props.viewLayout('AllStaffOutGoingRequest', numberOfPages);
  };
  const handleOwn = () => {
    setActiveTab('AllStaffOwnRequest');
    props.viewLayout('AllStaffOwnRequest', numberOfPages);
  };


  return (
    <div className={`${classes.filterButtons}`}>
      <button className={`${classes.button} ${activeTab === 'AllStaffIncomingRequest' && classes.active} filter-button list`} data-filter="unassigned" onClick={handleIncoming}>Incoming</button>
      <button className={`${classes.button} ${activeTab === 'AllStaffOutGoingRequest' && classes.active} filter-button list`} data-filter="assigned" onClick={handleOutGoing}>OutGoing</button>
      <button className={`${classes.button} ${activeTab === 'AllStaffOwnRequest' && classes.active} filter-button list`} onClick={handleOwn}>Own</button>

      <div className={classes.datapage}>
        <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
      </div>
    </div>
  )
}

export default RequestNavigation