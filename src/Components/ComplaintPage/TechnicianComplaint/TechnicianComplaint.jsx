import React from 'react';
import classes from './TechnicianComplaint.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TechnicianComplaintNavigation from './TechnicianComplaintNavigation/TechnicianComplaintNavigation';
import DepartmentComplaint from './DepartmentComplaint/DepartmentComplaint';
import OwnTechComplaint from './OwnTechComplaint/OwnTechComplaint'
import { Fragment } from 'react';

const TechnicianComplaint = () => {
  const [openLayout, setOpenLayout] = useState('AllDepartmentComplaint');
  const checkLayout = (value) => {
    setOpenLayout(value);
  };


  const navigate = useNavigate();
  return (
    <Fragment>

      <div className={`${classes.mainTitle}`}>
        <h2 >Complaint</h2>
      </div>
      <TechnicianComplaintNavigation viewLayout={checkLayout} />
      {openLayout === 'AllDepartmentComplaint' && <DepartmentComplaint  />}
      {openLayout === 'AllStaffOwnComplaint' && <OwnTechComplaint  />}
    
    </Fragment>
  )
}

export default TechnicianComplaint;