import React from 'react';
import classes from './RequestNavigation.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const RequestNavigation = (props) => {
  const [activeTab, setActiveTab] = useState('AllStaffAssignRequest');
  const navigate = useNavigate();

  const handleAssignRequest = () => {
    setActiveTab('AllStaffAssignRequest');
    props.viewLayout('AllStaffAssignRequest')
  };
  const handleOwnRequest = () => {
    setActiveTab('AllStaffOwnRequest');
    props.viewLayout('AllStaffOwnRequest')
  };


  return (
    <div className={`${classes.buttonsSection}`}>
      <div className={`${classes.filterButtons}`}>
        <button className={`${classes.button} ${activeTab === 'AllStaffAssignRequest' && classes.active} filter-button list`} data-filter="assigned" onClick={handleAssignRequest}>Assign</button>
        <button className={`${classes.button} ${activeTab === 'AllStaffOwnRequest' && classes.active} filter-button list`} onClick={handleOwnRequest}>Own</button>
      </div>
      <button className={`${classes.tikReqbtn}`} onClick={() => navigate('/newrequest')}>
        <span className="material-icons-sharp btn-icon">
          add
        </span>
        <span className={`${classes.btnName}`}> New Ticket</span>
      </button>
    </div>
  )
}

export default RequestNavigation