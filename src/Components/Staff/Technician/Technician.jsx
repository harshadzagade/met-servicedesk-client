import React, { Fragment, useState } from 'react';
import AssignedRequests from './AssignedRequests/AssignedRequests';
import DepartmentComplaints from './DepartmentComplaints/DepartmentComplaints';
import TechnicianHomeNavigation from './TechnicianHomeNavigation/TechnicianHomeNavigation';
import TechnicianOwnComplaints from './TechnicianOwnComplaints/TechnicianOwnComplaints';
import TechnicianOwnRequests from './TechnicianOwnRequests/TechnicianOwnRequests';
import classes from './Technician.module.css';

const Technician = () => {
  const [openLayout, setOpenLayout] = useState('assignedRequests');
  const checkLayout = (value) => {
    setOpenLayout(value);
  };
  return (
    <Fragment>
      <TechnicianHomeNavigation viewLayout={checkLayout} />
      <div className={`${classes.container}`}>
        {openLayout === 'assignedRequests' && <AssignedRequests />}
        {openLayout === 'departmentComplaints' && <DepartmentComplaints />}
        {openLayout === 'ownRequests' && <TechnicianOwnRequests />}
        {openLayout === 'ownComplaints' && <TechnicianOwnComplaints />}
      </div>
    </Fragment>
  );
};

export default Technician;