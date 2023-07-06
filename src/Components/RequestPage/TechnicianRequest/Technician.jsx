import React from 'react';
import classes from './Technician.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Fragment } from 'react';
import RequestNavigation from './RequestNavigation/RequestNavigation';
import TechnicianAssignRequest from '../TechnicianRequest/TechnicianAssignRequest/TechnicianAssignRequest';
import TechnicianOwnRequest from '../TechnicianRequest/TechnicianOwnRequest/TechnicianOwnRequest';
import Rightside from '../../Righside/Rightside';

const Technician = () => {
  const [openLayout, setOpenLayout] = useState('AllStaffAssignRequest');
  const checkLayout = (value,) => {
    setOpenLayout(value);
  }
  return (
    <Fragment>
      <div className="container">
        <div className={`${classes.technicianreq} row`}>
          <div className="col-8">
            <div className={`${classes.mainTitle}`}>
              <h2 className="tik-type-title">Request</h2>
            </div>
            <RequestNavigation viewLayout={checkLayout} />
            {openLayout === 'AllStaffAssignRequest' && <TechnicianAssignRequest />}
            {openLayout === 'AllStaffOwnRequest' && <TechnicianOwnRequest />}
          </div>
          <div className='col-4'>
            <Rightside />
          </div>
        </div>
      </div>
    </Fragment>

  )
}

export default Technician