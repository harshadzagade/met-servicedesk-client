import React, { Fragment, useState } from 'react';
import classes from './Technician.module.css';
import RequestNavigation from './RequestNavigation/RequestNavigation';
import TechnicianAssignRequest from '../TechnicianRequest/TechnicianAssignRequest/TechnicianAssignRequest';
import TechnicianOwnRequest from '../TechnicianRequest/TechnicianOwnRequest/TechnicianOwnRequest';
import Rightside from '../../Righside/Rightside';
import DepartmentRequest from './DepartmentRequest/DepartmentRequest';

const Technician = () => {
  const [openLayout, setOpenLayout] = useState('AssignedRequest');

  const checkLayout = (value,) => {
    setOpenLayout(value);
  }

  return (
    <Fragment>
      <div className="container-fluid">
        <div className={`${classes.technicianreq} row`}>
          <div className="col-8">
            <div className={`${classes.mainTitle}`}>
              <h2 className="tik-type-title">Request</h2>
            </div>
            <RequestNavigation viewLayout={checkLayout} />
            {openLayout === 'AssignedRequest' && <TechnicianAssignRequest />}
            {openLayout === 'OwnRequest' && <TechnicianOwnRequest />}
            {openLayout === 'DepartmentRequest' && <DepartmentRequest />}
          </div>
          <div className='col-4'>
            <Rightside />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Technician;