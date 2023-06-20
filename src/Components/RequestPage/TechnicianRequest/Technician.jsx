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
  const [numberOfPages, setNumberOfPages] = useState(10);
  const checkLayout = (value, numberOfPages) => {
    setOpenLayout(value);
    setNumberOfPages(numberOfPages);
  }

  const navigate = useNavigate();
  return (
    <Fragment>
      <div className={classes.tecreq}>
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
        {openLayout === 'AllStaffAssignRequest' && <TechnicianAssignRequest  numberOfPages={numberOfPages}/>}
        {openLayout === 'AllStaffOwnRequest' && <TechnicianOwnRequest numberOfPages={numberOfPages} />}
      </div>
    </Fragment>

  )
}

export default Technician