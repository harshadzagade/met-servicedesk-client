import React, { useState } from 'react';
import classes from './RequestNavigation.module.css';
import { useNavigate } from 'react-router-dom';

const RequestNavigation = (props) => {
  const [activeTab, setActiveTab] = useState('AssignedRequest');
  const navigate = useNavigate();

  const handleAssignRequest = () => {
    setActiveTab('AssignedRequest');
    props.viewLayout('AssignedRequest')
  };

  const handleOwnRequest = () => {
    setActiveTab('OwnRequest');
    props.viewLayout('OwnRequest')
  };

  const handleDepartmentRequest = () => {
    setActiveTab('DepartmentRequest');
    props.viewLayout('DepartmentRequest')
  };

  return (
    <div className={`${classes.buttonsSection}`}>
      <div className={`${classes.filterButtons}`}>
        <button className={`${classes.button} ${activeTab === 'AssignedRequest' && classes.active} filter-button list`} data-filter="assigned" onClick={handleAssignRequest}>Assigned to me</button>
        <button className={`${classes.button} ${activeTab === 'OwnRequest' && classes.active} filter-button list`} onClick={handleOwnRequest}>My Requests</button>
        <button className={`${classes.button} ${activeTab === 'DepartmentRequest' && classes.active} filter-button list`} onClick={handleDepartmentRequest}>Department</button>
      </div>
      <button className={`${classes.tikReqbtn}`} onClick={() => navigate('/newrequest')}>
        <span className="material-icons-sharp btn-icon">
          add
        </span>
        <span className={`${classes.btnName}`}>New Ticket</span>
      </button>
    </div>
  );
};

export default RequestNavigation;