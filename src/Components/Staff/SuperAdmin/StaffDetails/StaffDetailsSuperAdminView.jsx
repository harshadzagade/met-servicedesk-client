import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import NavBar from '../../../NavBar/NavBar';
import Swal from 'sweetalert2';
import classes from './StaffDetailsSuperAdminView.module.css';
import UpdateStaffSuperAdminView from './UpdateStaff/UpdateStaffSuperAdminView';

const StaffDetailsSuperAdminView = () => {
  const navigate = useNavigate();
  const id = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [contactExtension, setContactExtension] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [refresh, setRefresh] = useState(false);
  let departments = "";
  if (department.length > 1) {
    for (let i = 0; i < department.length; i++) {
      const singleDepartment = department[i];
      if (i !== department.length - 1) {
        departments = departments.concat(singleDepartment) + ', ';
      } else {
        departments = departments.concat(singleDepartment);
      }
    }
  } else {
    departments = department[0];
  }
  useEffect(() => {
    const getStaff = async () => {
      const staff = await axios.get(`http://localhost:8001/api/staff/superadmin/staffdetails/${id.staffId}`);
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

  const handleDeleteClick = () => {
    Swal.fire({
      title: 'Delete Staff?',
      text: "Your staff will be moved to archive",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8001/api/staff/superadmin/staffdetails/${id.staffId}`);
        navigate('/', { state: { refreshSuperHome: true } });
        Swal.fire(
          'Staff Deleted!',
          'You have deleted staff successfully',
          'success'
        )
      }
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: `${error.response.data.message}`,
        text: 'Unable to delete staff'
      });
    });
  };

  const handleUpdateCancel = () => {
    setRefresh(true);
    setOpenUpdate(false);
  };

  return (
    <Fragment>
      {/* <NavBar tab={'none'} /> */}
      {openUpdate && <UpdateStaffSuperAdminView onConfirm={handleUpdateCancel} />}
      <div className={`${classes.staffDetailsHeading}`}>Staff Details</div>
      <div className={`d-inline-block ${classes.detailsView}`}>
        <div className={`${classes.detailsName}`}>{name}</div>
        <div className={`${classes.detailsRole} mt-2`}>{role}</div>
        <div className={`${classes.detailsDepartment} badge badge-dark mt-3`}>{departments}</div><br />
        <div className={`${classes.contactDetails}`}>
          Contact Details
          <div className={`${classes.detailsContact} mt-2`}>E-Mail: {email}</div>
          <div className={`${classes.detailsContact} mt-2`}>Phone: {phoneNumber}</div>
          <div className={`${classes.detailsContact} mt-2`}>Extension: {contactExtension}</div>
        </div>
        <button className={`btn mt-3 ${classes.updateButton}`} onClick={() => setOpenUpdate(true)}>Update</button>
        <button className={`btn mt-3 ${classes.deleteButton}`} onClick={handleDeleteClick}>Delete</button>
      </div>
    </Fragment>
  );
};

export default StaffDetailsSuperAdminView;