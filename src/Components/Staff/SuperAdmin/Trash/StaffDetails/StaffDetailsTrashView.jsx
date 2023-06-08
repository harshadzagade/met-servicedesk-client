import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import NavBar from '../../../../NavBar/NavBar';
import Swal from 'sweetalert2';
import classes from './StaffDetailsSuperAdminView.module.css';

const StaffDetailsSuperAdminView = () => {
  const navigate = useNavigate();
  const id = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [contactExtension, setContactExtension] = useState(null);
  useEffect(() => {
    const getStaff = async () => {
      const staff = await axios.get(`http://localhost:8001/api/trash/staffdetails/${id.staffId}`);
      setName(staff.data.staff.firstname + ' ' + staff.data.staff.lastname);
      setEmail(staff.data.staff.email);
      setRole(staff.data.staff.role);
      setDepartment(staff.data.staff.department);
      setPhoneNumber(staff.data.staff.phoneNumber);
      setContactExtension(staff.data.staff.contactExtension);
    };
    getStaff();
  }, [id.staffId]);

  const handleRestoreClick = () => {
    Swal.fire({
      title: 'Restore Staff?',
      text: "Your staff will be restored",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, restore it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8001/api/trash/staffdetails/restore/${id.staffId}`);
        navigate('/trash', { state: { refreshTrash: true } });
        Swal.fire(
          'Restored Staff!',
          'You have successfully restored a staff',
          'success'
        )
      }
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: `${error.response.data.message}`,
        text: 'Unable to restore staff'
      });
    });
  };

  const handleDeleteClick = () => {
    Swal.fire({
      title: 'Delete All Staff?',
      text: "All of your staff will be deleted permanently",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8001/api/trash//staffdetails/remove/${id.staffId}`);
        navigate('/trash', { state: { refreshTrash: true } });
        Swal.fire(
          'Deleted Staff!',
          'You have successfully deleted a staff',
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
  return (
    <Fragment>
      {/* <NavBar tab={'trash'} /> */}
      <div className={`${classes.staffDetailsHeading}`}>Staff Details</div>
      <div className={`d-inline-block ${classes.detailsView}`}>
      <div className='d-flex'>
          <div className={`${classes.detailsTag}`}>Name:&nbsp;</div>
          <div className={`${classes.detailsField}`}>{name}</div>
        </div>
        <hr className={`${classes.hrTag}`} />
        <div className='d-flex'>
          <div className={`${classes.detailsTag} mt-2`}>Role:&nbsp;</div>
          <div className={`${classes.detailsField} mt-2`}>{role}</div>
        </div>
        <hr className={`${classes.hrTag}`} />
        <div className='d-flex'>
          <div className={`${classes.detailsTag} mt-2`}>Department(s):&nbsp;</div>
          <div className={`${classes.detailsField} mt-2`}>{department}</div>
        </div>
        <hr className={`${classes.hrTag}`} />
        <div className={`${classes.boxDetails}`}>
          <div className='d-flex'>
            <div className={`${classes.boxHeading}`}>Contact Details</div>
          </div>
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>E-Mail:&nbsp;</div>
            <div className={`${classes.detailsField} mt-2`}>{email}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Phone:&nbsp;</div>
            <div className={`${classes.detailsField} mt-2`}>{phoneNumber}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Extension:&nbsp;</div>
            <div className={`${classes.detailsField} mt-2`}>{contactExtension}</div>
          </div>
        </div>
        <div className={`${classes.buttons}`}>
          <button className={`${classes.restoreButton}`} onClick={handleRestoreClick}>Restore</button>
          <button className={`${classes.deleteButton}`} onClick={handleDeleteClick}>Delete</button>
        </div>
      </div>
    </Fragment>
  );
};

export default StaffDetailsSuperAdminView;