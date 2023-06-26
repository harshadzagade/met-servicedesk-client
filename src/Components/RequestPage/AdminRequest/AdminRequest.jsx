import React from 'react';
import classes from './AdminRequest.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Fragment } from 'react';
import RequestNavigation from './RequestNavigation/RequestNavigation';
import IncomingRequest from './IncomingRequest/IncomingRequest';
import OwnRequest from './OwnRequest/OwnRequest';
import OutgoingDepartmentRequest from './OutgoingDepartmentRequest/OutgoingDepartmentRequest';
const AdminRequest = () => {
  const [openLayout, setOpenLayout] = useState('AllStaffIncomingRequest');

  const checkLayout = (value, ) => {
    setOpenLayout(value);
  };

  return (
    <Fragment>
      <div className={`${classes.mainTitle}`}>
        <h2 className="tik-type-title">Request</h2>
      </div>
      <RequestNavigation viewLayout={checkLayout} />
      {openLayout === 'AllStaffIncomingRequest' && <IncomingRequest  />}
      {openLayout === 'AllStaffOutGoingRequest' && <OutgoingDepartmentRequest />}
      {openLayout === 'AllStaffOwnRequest' && <OwnRequest  />}
    </Fragment>

  )
}

export default AdminRequest