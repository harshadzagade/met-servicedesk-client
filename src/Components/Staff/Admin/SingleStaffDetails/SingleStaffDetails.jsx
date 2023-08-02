import React, { useEffect, useState } from 'react';
import classes from './SingleStaffDetails.module.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AdminUpdateStaffdetails from '../UpdateStaffDetails/AdminUpdateStaffDetails';

const SingleStaffDetails = () => {
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
      const staff = await axios.get(`/api/staff/staffdetails/${id.staffId}`);
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


  const navigate = useNavigate();
  return (
    <main>
      <div className={classes.adminstaffdetails}>
        <h1>Staff Details</h1>
        {openUpdate && <AdminUpdateStaffdetails onConfirm={handleUpdateCancel} />}
        <div className={classes.detail}>
          <div className={classes.staffDetails}>
            <div className={classes.myform}>
              <div className={classes.idDetails}>
                <label className={classes.la}>staffid:</label>
                <p>#{id.staffId}</p>
              </div>
              <div className={classes.fname}>
                <label className={classes.lb}>Name:</label>
                <p>{name} </p>
              </div>
              <div className={classes.department}>
                <label className={classes.ld}>Department:</label>
                <p >{department}</p>
              </div>
              <div className={classes.email}>
                <label className={classes.le}>Email:</label>
                <p >{email}</p>
              </div>
              <div className={classes.Role}>
                <label className={classes.lf}>Role:</label>
                <p >{role}</p>
              </div>
              <div className={classes.phoneNo}>
                <label className={classes.lg}>PhoneNo:</label>
                <p>{phoneNumber}</p>
              </div>
              <div className={classes.ContactEXT}>
                <label className={classes.lh}>ContactEXT:</label>
                <p >{contactExtension}</p>
              </div>
              <div className={classes.detailsBtns}>
                <button className={classes.updateBtn} onClick={() => setOpenUpdate(true)}>Update</button>
                <button className={classes.deleteBtn} onClick={() => navigate('/')}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleStaffDetails;