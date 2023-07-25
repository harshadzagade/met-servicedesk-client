import React, { useState } from 'react';
import classes from './CardNavigate.module.css';

const CardNavigate = (props) => {
  const [activeTab, setActiveTab] = useState('Complaint');

  const handleComplaint = () => {
    setActiveTab('Complaint');
    props.viewLayout('Complaint')
  };

  const handleRequest = () => {
    setActiveTab('Request');
    props.viewLayout('Request')
  };

  return (
    <div className={`${classes.filterButtons}`}>
      <button className={`${classes.button} ${activeTab === 'Complaint' && classes.active} filter-button list`} data-filter="assigned" onClick={handleComplaint}>Complaint</button>
      <button className={`${classes.button} ${activeTab === 'Request' && classes.active} filter-button list`} onClick={handleRequest}>Request</button>
    </div>
  );
};

export default CardNavigate;