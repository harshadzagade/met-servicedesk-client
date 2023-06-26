import React from 'react';
import classes from './Technician.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Fragment } from 'react';
import RequestNavigation from './RequestNavigation/RequestNavigation';
import TechnicianAssignRequest from '../TechnicianRequest/TechnicianAssignRequest/TechnicianAssignRequest';
import TechnicianOwnRequest from '../TechnicianRequest/TechnicianOwnRequest/TechnicianOwnRequest';

const Technician = () => {
  const [openLayout, setOpenLayout] = useState('AllStaffAssignRequest');
  const checkLayout = (value, ) => {
    setOpenLayout(value);
  }

  const navigate = useNavigate();
  return (
    <Fragment>
      
       <div className={`${classes.mainTitle}`}>
       <h2 className="tik-type-title">Request</h2>
        </div>
        <RequestNavigation viewLayout={checkLayout} />
        {openLayout === 'AllStaffAssignRequest' && <TechnicianAssignRequest  />}
        {openLayout === 'AllStaffOwnRequest' && <TechnicianOwnRequest  />}
      
    </Fragment>

  )
}

export default Technician