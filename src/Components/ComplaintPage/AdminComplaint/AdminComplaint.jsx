import React, { Fragment, useContext, useState } from 'react';
import classes from './AdminComplaint.module.css';
import IncomingComplaint from '../AdminComplaint/IncomingComplaint/IncomingComplaint';
import OutgoingComplaint from '../AdminComplaint/OutgoingComplaint/OutgoingComplaint';
import OwnComplaint from '../AdminComplaint/OwnComplaint/OwnComplaint';
import ComplaintNavigation from './ComplaintNavigation/ComplaintNavigation';
import { useNavigate } from 'react-router-dom';
import AdminContext from '../../Context/AdminContext/AdminContext';


const AdminComplaint = () => {


  const [openLayout, setOpenLayout] = useState('AllStaffIncomingComplaint');
  const checkLayout = (value) => {
    setOpenLayout(value);
  };

  const navigate = useNavigate();
  return (
    <Fragment>
      <div className={`${classes.mainTitle}`}>
        <h2 className="tik-type-title">Complaint</h2>
      </div>
      <ComplaintNavigation viewLayout={checkLayout} />
      {openLayout === 'AllStaffIncomingComplaint' && <IncomingComplaint />}
      {openLayout === 'AllStaffOutGoingComplaint' && <OutgoingComplaint />}
      {openLayout === 'AllStaffOwnComplaint' && <OwnComplaint />}

    </Fragment>
  )
}

export default AdminComplaint