import React, { Fragment, useState } from 'react';
import classes from './SubadminRequest.module.css';
import RequestNavigation from './RequestNavigation/RequestNavigation';
import IncomingRequest from './IncomingRequest/IncomingRequest';
import OwnRequest from './OwnRequest/OwnRequest';
import OutgoingDepartmentRequest from './OutgoingDepartmentRequest/OutgoingDepartmentRequest';
import Rightside from '../../Righside/Rightside';

const SubadminRequest = () => {
  const [openLayout, setOpenLayout] = useState('AllStaffIncomingRequest');

  const checkLayout = (value,) => {
    setOpenLayout(value);
  };

  return (
    <Fragment>
      <div className="container-fluid p-0">
        <div className={`${classes.adminRequest} row`}>
          <div className="col-8">
            <RequestNavigation viewLayout={checkLayout} />
            {openLayout === 'AllStaffIncomingRequest' && <IncomingRequest />}
            {openLayout === 'AllStaffOutGoingRequest' && <OutgoingDepartmentRequest />}
            {openLayout === 'AllStaffOwnRequest' && <OwnRequest />}
          </div>
          <div className='col-4'>
            <Rightside />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SubadminRequest;