import React from 'react';
import classes from './AdminRequest.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Fragment } from 'react';
import RequestNavigation from './RequestNavigation/RequestNavigation';
import IncomingRequest from './IncomingRequest/IncomingRequest';
import OwnRequest from './OwnRequest/OwnRequest';
import OutgoingDepartmentRequest from './OutgoingDepartmentRequest/OutgoingDepartmentRequest';
import { useEffect } from 'react';
import axios from 'axios';
const AdminRequest = () => {
  const navigate = useNavigate();
  const [openLayout, setOpenLayout] = useState('AllStaffIncomingRequest');
  const [numberOfPages, setNumberOfPages] = useState(10);

  const checkLayout = (value, numberOfPages) => {
    setOpenLayout(value);
    setNumberOfPages(numberOfPages);
  };

  return (
    <Fragment>
      <div className={`${classes.mainTitle}`}>
        <h1 className="tik-type-title">Request</h1>
        <button className={`${classes.tikReqbtn}`} onClick={() => navigate('/newrequest')}>
          <span className="material-icons-sharp btn-icon">
            add
          </span>
          <span className={`${classes.btnName}`}> New Ticket</span>
        </button>
      </div>
      <RequestNavigation viewLayout={checkLayout} />
      {openLayout === 'AllStaffIncomingRequest' && <IncomingRequest numberOfPages={numberOfPages} />}
      {openLayout === 'AllStaffOutGoingRequest' && <OutgoingDepartmentRequest numberOfPages={numberOfPages} />}
      {openLayout === 'AllStaffOwnRequest' && <OwnRequest numberOfPages={numberOfPages} />}
    </Fragment>

  )
}

export default AdminRequest