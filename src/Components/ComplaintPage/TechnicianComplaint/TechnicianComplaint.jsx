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
  const [numberOfPages, setNumberOfPages] = useState(10);
  const checkLayout = (value, numberOfPages) => {
    setOpenLayout(value);
    setNumberOfPages(numberOfPages);
  };


  const navigate = useNavigate();
  return (
    <Fragment>
      <div className={classes.techcomplaint}>
        <div className={`${classes.mainTitle}`}>
        <h1 >Complaint</h1>
          <button className={`${classes.tikReqbtn}`} onClick={() => navigate('/newcomplaint')}>
            <span className="material-icons-sharp btn-icon">
              add
            </span>
            <span className={`${classes.btnName}`}> New Ticket</span>
          </button>
        </div>
        <TechnicianComplaintNavigation viewLayout={checkLayout} />
        {openLayout === 'AllDepartmentComplaint' && <DepartmentComplaint numberOfPages={numberOfPages}/>}
        {openLayout === 'AllStaffOwnComplaint' && <OwnTechComplaint numberOfPages={numberOfPages}/>}
      </div>
    </Fragment>
  )
}

export default TechnicianComplaint;