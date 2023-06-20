import React, { useState } from 'react';
import classes from './ComplaintNavigation.module.css';
import DataPerPage from '../../../UI/DataPerPage/DataPerPage';

const ComplaintNavigation = (props) => {
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [activeTab, setActiveTab] = useState('AllStaffIncomingComplaint')

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
    <div className={`${classes.filterButtons}`}>
      <button className={`${classes.button} ${activeTab === 'AllStaffIncomingComplaint' && classes.active} filter-button list`} data-filter="unassigned" onClick={handleIncoming}>Incoming</button>
      <button className={`${classes.button} ${activeTab === 'AllStaffOutGoingComplaint' && classes.active} filter-button list`} data-filter="assigned" onClick={handleOutGoing}>OutGoing</button>
      <button className={`${classes.button} ${activeTab === 'AllStaffOwnComplaint' && classes.active} filter-button list`} onClick={handleOwn}>Own</button>

      <div className={classes.datapage} >
        <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
      </div>
    </div>
  )
}

export default ComplaintNavigation