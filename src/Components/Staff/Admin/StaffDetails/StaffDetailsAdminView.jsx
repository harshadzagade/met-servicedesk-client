import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import NavBar from '../../../NavBar/NavBar';
import classes from './StaffDetailsAdminView.module.css';
import UpdateStaffAdminView from './UpdateStaff/UpdateStaffAdminView';

const StaffDetailsAdminView = () => {
  const id = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [contactExtension, setContactExtension] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const getStaff = async () => {
      const staff = await axios.get(`http://localhost:8001/api/staff/admin/staffdetails/${id.staffId}`);
      setName(staff.data.staff.firstname + ' ' + staff.data.staff.lastname);
      setEmail(staff.data.staff.email);
      setRole(staff.data.staff.role);
      setDepartment(staff.data.staff.department);
      setPhoneNumber(staff.data.staff.phoneNumber);
      setContactExtension(staff.data.staff.contactExtension);
    };
    getStaff();
    setRefresh(false);
  }, [refresh, id.staffId]);

  const handleUpdateCancel = () => {
    setRefresh(true);
    setOpenUpdate(false);
  };

  return (
    <Fragment>
      {/* <NavBar tab={'none'} /> */}
      {openUpdate && <UpdateStaffAdminView onConfirm={handleUpdateCancel} />}
      <div className={`${classes.staffDetailsHeading}`}>Staff Details</div>
      <div className={`d-inline-block ${classes.detailsView}`}>
        <div className='d-flex'>
          <div className={`${classes.detailsTag}`}>Name:</div>
          <div className={`${classes.detailsField}`}>{name}</div>
        </div>
        <hr className={`${classes.hrTag}`} />
        <div className='d-flex'>
          <div className={`${classes.detailsTag} mt-2`}>Role:</div>
          <div className={`${classes.detailsField} mt-2`}>{role}</div>
        </div>
        <hr className={`${classes.hrTag}`} />
        <div className='d-flex'>
          <div className={`${classes.detailsTag} mt-2`}>Department(s):</div>
          <div className={`${classes.detailsField} mt-2`}>{department}</div>
        </div>
        <hr className={`${classes.hrTag}`} />
        <div className={`${classes.boxDetails}`}>
          <div className='d-flex'>
            <div className={`${classes.boxHeading}`}>Contact Details</div>
          </div>
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>E-Mail:</div>
            <div className={`${classes.detailsField} mt-2`}>{email}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Phone:</div>
            <div className={`${classes.detailsField} mt-2`}>{phoneNumber}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Extension:</div>
            <div className={`${classes.detailsField} mt-2`}>{contactExtension}</div>
          </div>
        </div>
        <button className={`${classes.updateButton}`} onClick={() => setOpenUpdate(true)}>Update Role</button>
      </div>
    </Fragment>
  );
};

export default StaffDetailsAdminView;