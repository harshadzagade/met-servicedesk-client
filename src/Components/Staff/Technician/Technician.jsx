import React, { Fragment, useState } from 'react';
import AssignedRequests from './AssignedRequests/AssignedRequests';
import DepartmentComplaints from './DepartmentComplaints/DepartmentComplaints';
import TechnicianHomeNavigation from './TechnicianHomeNavigation/TechnicianHomeNavigation';
import TechnicianOwnComplaints from './TechnicianOwnComplaints/TechnicianOwnComplaints';
import TechnicianOwnRequests from './TechnicianOwnRequests/TechnicianOwnRequests';

const Technician = () => {
  const [openLayout, setOpenLayout] = useState('assignedRequests');
  const checkLayout = (value) => {
    setOpenLayout(value);
  };
  return (
    <Fragment>
      <TechnicianHomeNavigation viewLayout={checkLayout} />
      {openLayout === 'assignedRequests' && <AssignedRequests />}
      {openLayout === 'departmentComplaints' && <DepartmentComplaints />}
      {openLayout === 'ownRequests' && <TechnicianOwnRequests />}
      {openLayout === 'ownComplaints' && <TechnicianOwnComplaints />}
    </Fragment>
  );
};

export default Technician;