import React, { Fragment, useState } from 'react';
import classes from './SubadminRequest.module.css';
import RequestNavigation from './RequestNavigation/RequestNavigation';
import IncomingRequest from './IncomingRequest/IncomingRequest';
import OwnRequest from './OwnRequest/OwnRequest';
import OutgoingDepartmentRequest from './OutgoingDepartmentRequest/OutgoingDepartmentRequest';
import Rightside from '../../Righside/Rightside';
import InformationBtn from '../../UI/InformationBtn/InformationBtn';

const SubadminRequest = () => {
  const [openLayout, setOpenLayout] = useState('AllStaffIncomingRequest');

  const checkLayout = (value,) => {
    setOpenLayout(value);
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <div className={`${classes.adminRequest} row`}>
          <div className="col-8">
            <div className={`${classes.mainTitle}`}>
              <h2 className="tik-type-title">Request</h2>
              <InformationBtn />
            </div>
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