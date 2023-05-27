import React, { Fragment, useState } from 'react';
import AssignedRequests from './AssignedRequests/AssignedRequests';
import DepartmentComplaints from './DepartmentComplaints/DepartmentComplaints';
import TechnicianHomeNavigation from './TechnicianHomeNavigation/TechnicianHomeNavigation';

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
    </Fragment>
  );
};

export default Technician;