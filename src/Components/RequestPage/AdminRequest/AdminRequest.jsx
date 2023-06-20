import React from 'react';
import classes from './AdminRequest.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Fragment } from 'react';
import RequestNavigation from './RequestNavigation/RequestNavigation';
import IncomingRequest from './IncomingRequest/IncomingRequest';
import OwnRequest from './OwnRequest/OwnRequest';
import AdminDeptDrop from '../../UI/AdminDepartmentDropDowm/AdminDeptDrop';
import OutgoingDepartmentRequest from './OutgoingDepartmentRequest/OutgoingDepartmentRequest';
const AdminRequest = () => {
  const [openLayout, setOpenLayout] = useState('AllStaffIncomingRequest');
  const [numberOfPages, setNumberOfPages] = useState(10);
  const checkLayout = (value, numberOfPages) => {
    setOpenLayout(value);
    setNumberOfPages(numberOfPages);
  };

  const navigate = useNavigate();
  return (
    <Fragment>

      <div className={`${classes.mainTitle}`}>
        <h1 className="tik-type-title">Request</h1>
        <AdminDeptDrop />
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