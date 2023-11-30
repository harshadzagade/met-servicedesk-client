import React, { useState } from 'react';
import classes from './CardNavigate.module.css';

const CardNavigate = (props) => {
  const currentTab = sessionStorage.getItem('tab');
  const [activeTab, setActiveTab] = useState(currentTab);

  const handleComplaint = () => {
    setActiveTab('complaint');
    props.viewLayout('complaint')
  };

  const handleRequest = () => {
    setActiveTab('request');
    props.viewLayout('request')
  };

  return (
    <div className={`${classes.filterButtons}`}>
      <button className={`${classes.button} ${activeTab === 'complaint' && classes.active} filter-button list`} data-filter="assigned" onClick={handleComplaint}>Complaint</button>
      <button className={`${classes.button} ${activeTab === 'request' && classes.active} filter-button list`} onClick={handleRequest}>Request</button>
    </div>
  );
};

export default CardNavigate;