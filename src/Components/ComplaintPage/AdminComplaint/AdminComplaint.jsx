import React, { Fragment, useContext, useState } from 'react';
import classes from './AdminComplaint.module.css';
import IncomingComplaint from '../AdminComplaint/IncomingComplaint/IncomingComplaint';
import OutgoingComplaint from '../AdminComplaint/OutgoingComplaint/OutgoingComplaint';
import OwnComplaint from '../AdminComplaint/OwnComplaint/OwnComplaint';
import ComplaintNavigation from './ComplaintNavigation/ComplaintNavigation';
import { useNavigate } from 'react-router-dom';
import AdminDeptDrop from '../../UI/AdminDepartmentDropDowm/AdminDeptDrop';
import AdminContext from '../../Context/AdminContext/AdminContext';


const AdminComplaint = () => {
  
 
  const [openLayout, setOpenLayout] = useState('AllStaffIncomingComplaint');
  const checkLayout = (value) => {
    setOpenLayout(value);
  };
  
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className={classes.adminComplaint}>

        <div className={`${classes.mainTitle}`}>
          <h1 className="tik-type-title">Complaint</h1>
          <AdminDeptDrop />

          <button className={`${classes.tikReqBtn}`} onClick={() => navigate('/newcomplaint')}>
            <span className="material-icons-sharp btn-icon">
              add
            </span>
            <span className={`${classes.btnName}`}> New Ticket</span>
          </button>
        </div>
        <ComplaintNavigation viewLayout={checkLayout} />
        {openLayout === 'AllStaffIncomingComplaint' && <IncomingComplaint />}
        {openLayout === 'AllStaffOutGoingComplaint' && <OutgoingComplaint />}
        {openLayout === 'AllStaffOwnComplaint' && <OwnComplaint />}
      </div>
    </Fragment>
  )
}

export default AdminComplaint