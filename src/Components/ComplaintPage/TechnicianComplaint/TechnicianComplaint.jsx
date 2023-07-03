import React from 'react';
import classes from './TechnicianComplaint.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TechnicianComplaintNavigation from './TechnicianComplaintNavigation/TechnicianComplaintNavigation';
import DepartmentComplaint from './DepartmentComplaint/DepartmentComplaint';
import OwnTechComplaint from './OwnTechComplaint/OwnTechComplaint'
import { Fragment } from 'react';
import Rightside from '../../Righside/Rightside';

const TechnicianComplaint = () => {
  const [openLayout, setOpenLayout] = useState('AllDepartmentComplaint');
  const checkLayout = (value) => {
    setOpenLayout(value);
  };


  const navigate = useNavigate();
  return (
    <Fragment>
         <div className="container">
        <div className="row">
          <div className="col-8">
      <div className={`${classes.mainTitle}`}>
        <h2>Concern</h2>
      </div>
      <TechnicianComplaintNavigation viewLayout={checkLayout} />
      {openLayout === 'AllDepartmentComplaint' && <DepartmentComplaint  />}
      {openLayout === 'AllStaffOwnComplaint' && <OwnTechComplaint  />}
      </div>
          <div className='col-4'>
            <Rightside />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TechnicianComplaint;