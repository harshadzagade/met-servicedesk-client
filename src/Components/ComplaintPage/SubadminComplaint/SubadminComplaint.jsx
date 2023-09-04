import React, { Fragment, useState } from 'react';
import classes from './SubadminComplaint.module.css';
import IncomingComplaint from './IncomingComplaint/IncomingComplaint';
import OutgoingComplaint from './OutgoingComplaint/OutgoingComplaint';
import OwnComplaint from './OwnComplaint/OwnComplaint';
import ComplaintNavigation from './ComplaintNavigation/ComplaintNavigation';
import Rightside from '../../Righside/Rightside';

const SubadminComplaint = () => {
  const [openLayout, setOpenLayout] = useState('AllStaffIncomingComplaint');

  const checkLayout = (value) => {
    setOpenLayout(value);
  };

  return (
    <Fragment>
      <div className="container p-0">
        <div className={`${classes.adminComplaint} row`}>
          <div className="col-sm-9 col-md-8">
            <ComplaintNavigation viewLayout={checkLayout} />
            {openLayout === 'AllStaffIncomingComplaint' && <IncomingComplaint />}
            {openLayout === 'AllStaffOutGoingComplaint' && <OutgoingComplaint />}
            {openLayout === 'AllStaffOwnComplaint' && <OwnComplaint />}
          </div>
          <div className='col-sm-3 col-md-4'>
            <Rightside />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SubadminComplaint;