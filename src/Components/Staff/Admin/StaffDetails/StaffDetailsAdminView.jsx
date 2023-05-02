import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../../NavBar/NavBar';
import classes from './StaffDetailsAdminView.module.css';
import UpdateStaffAdminView from './UpdateStaff/UpdateStaffAdminView';

const StaffDetailsAdminView = () => {
  const id = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [openUpdate, setOpenUpdate] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const getStaff = async () => {
      const staff = await axios.get(`http://localhost:8001/staff/admin/staffdetails/${id.staffId}`);
      setName(staff.data.staff.name);
      setEmail(staff.data.staff.email);
      setRole(staff.data.staff.role);
      setDepartment(staff.data.staff.department);
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
      <NavBar tab={'none'} />
      {openUpdate && <UpdateStaffAdminView onConfirm={handleUpdateCancel} />}
      <div className={`${classes.staffDetailsHeading}`}>Staff Details</div>
      <div className={`d-inline-block ${classes.detailsView}`}>
        <div className={`${classes.detailsName}`}>{name}</div>
        <div className={`${classes.detailsEmail} mt-2`}>{email}</div>
        <div className={`${classes.detailsRole} mt-2`}>{role}</div>
        <div className={`${classes.detailsDepartment} badge badge-dark mt-3`}>{department}</div><br />
        <button className={`btn mt-3 ${classes.updateButton}`} onClick={() => setOpenUpdate(true)}>Update Role</button>
      </div>
    </Fragment>
  );
};

export default StaffDetailsAdminView;