import React, { useEffect, useState } from 'react';
import classes from './SingleStaff.module.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateStaffDetails from '../UpdateStaff/UpdateStaffDetails';

const SingleStaff = () => {
  const navigate = useNavigate();
  const id = useParams();
  const [staff, setStaff] = useState({});
  const [openUpdate, setOpenUpdate] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getStaff = async () => {
      const staff = await axios.get(`/api/staff/staffdetails/${id.staffId}`);
      setStaff(staff.data.staff);
    };
    getStaff();
    setRefresh(false);
  }, [refresh, id.staffId]);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Delete Staff?',
      text: "Your staff will be moved to trash",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/staff/staffdetails/${id.staffId}`);
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
    <main>
      <div className={classes.staffdetails}>
        <h2>Employee Details</h2>
        {openUpdate && <UpdateStaffDetails onConfirm={handleUpdateCancel} />}
        <div className={classes.detail}>
          <div className={classes.staffDetails}>
            <div className={classes.myform}>
              <div className={classes.staff}>
                <label className={classes.la}>Staff ID:</label>
                <p>#{id.staffId}</p>
              </div>
              <div className={classes.staff}>
                <label className={classes.lb}>Firstname:</label>
                <p>{staff.firstname} </p>
              </div>
              <div className={classes.staff}>
                <label className={classes.lb}>Middlename:</label>
                <p>{staff.middlename} </p>
              </div>
              <div className={classes.staff}>
                <label className={classes.lc}>Lastname:</label>
                <p >{staff.lastname} </p>
              </div>
              <div className={classes.staff}>
                <label className={classes.ld}>Department:</label>
                <p >{staff.department}</p>
              </div>
              <div className={classes.staff}>
                <label className={classes.le}>Institute:</label>
                <p >{staff.institute}</p>
              </div>
              <div className={classes.staff}>
                <label className={classes.le}>Department type:</label>
                <p >{staff.departmentType}</p>
              </div>
              <div className={classes.staff}>
                <label className={classes.le}>Email:</label>
                <p >{staff.email}</p>
              </div>
              <div className={classes.staff}>
                <label className={classes.lf}>Role:</label>
                <p >{staff.role}</p>
              </div>
              <div className={classes.staff}>
                <label className={classes.lg}>Phone Number:</label>
                <p>{staff.phoneNumber}</p>
              </div>
              <div className={classes.staff}>
                <label className={classes.lh}>Contact Extension:</label>
                <p >{staff.contactExtension}</p>
              </div>
              <div className={classes.detailsBtns}>
                <button className={classes.updateBtn} onClick={() => setOpenUpdate(true)}>Update</button>
                <button className={classes.deleteBtn} onClick={handleDeleteClick}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main >
  );
};

export default SingleStaff;