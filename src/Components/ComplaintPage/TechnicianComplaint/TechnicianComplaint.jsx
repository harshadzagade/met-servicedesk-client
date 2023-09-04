import React, { Fragment, useState } from 'react';
import classes from './TechnicianComplaint.module.css'
import TechnicianComplaintNavigation from './TechnicianComplaintNavigation/TechnicianComplaintNavigation';
import DepartmentComplaint from './DepartmentComplaint/DepartmentComplaint';
import OwnTechComplaint from './OwnTechComplaint/OwnTechComplaint'
import Rightside from '../../Righside/Rightside';

const TechnicianComplaint = () => {
  const [openLayout, setOpenLayout] = useState('AllDepartmentComplaint');

  const checkLayout = (value) => {
    setOpenLayout(value);
  };

  return (
    <Fragment>
      <div className="container-fluid p-0">
        <div className={`${classes.techniciancom} row`}>
          <div className="col-8">
            <TechnicianComplaintNavigation viewLayout={checkLayout} />
            {openLayout === 'AllDepartmentComplaint' && <DepartmentComplaint />}
            {openLayout === 'AllStaffOwnComplaint' && <OwnTechComplaint />}
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