import React, { Fragment, useState } from 'react';
import classes from './AdminComplaint.module.css';
import IncomingComplaint from '../AdminComplaint/IncomingComplaint/IncomingComplaint';
import OutgoingComplaint from '../AdminComplaint/OutgoingComplaint/OutgoingComplaint';
import OwnComplaint from '../AdminComplaint/OwnComplaint/OwnComplaint';
import ComplaintNavigation from './ComplaintNavigation/ComplaintNavigation';
import Rightside from '../../Righside/Rightside';


const AdminComplaint = () => {
  const [openLayout, setOpenLayout] = useState('AllStaffIncomingComplaint');
  const checkLayout = (value) => {
    setOpenLayout(value);
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <div className={`${classes.mainTitle}`}>
              <h2 className="tik-type-title">Concern</h2>
            </div>
            <ComplaintNavigation viewLayout={checkLayout} />
            {openLayout === 'AllStaffIncomingComplaint' && <IncomingComplaint />}
            {openLayout === 'AllStaffOutGoingComplaint' && <OutgoingComplaint />}
            {openLayout === 'AllStaffOwnComplaint' && <OwnComplaint />}
          </div>
          <div className='col-4'>
            <Rightside />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default AdminComplaint