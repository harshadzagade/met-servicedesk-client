import React, { useEffect, useState } from 'react';
import classes from './SingleStaff.module.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateStaffDetails from '../UpdateStaff/UpdateStaffDetails';



const SingleStaff = () => {

  const navigate = useNavigate();
  const id = useParams();
  const [name, setName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [phoneno, setPhoneNo] = useState('');
  const [extention, setExtension] = useState('');
  const [department, setDepartment] = useState('');
  const [openUpdate, setOpenUpdate] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const getStaff = async () => {
      const staff = await axios.get(`http://localhost:8001/api/staff/superadmin/staffdetails/${id.staffId}`);
      setName(staff.data.staff.firstname);
      setLName(staff.data.staff.lastname);
      setEmail(staff.data.staff.email);
      setRole(staff.data.staff.role);
      setPhoneNo(staff.data.staff.phoneNumber);
      setExtension(staff.data.staff.contactExtension);
      setDepartment(staff.data.staff.department);
      
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
    <main>
      <div className={classes.staffdetails}>
        <h1>staff Details</h1>
        {openUpdate && <UpdateStaffDetails onConfirm={handleUpdateCancel} />}
        <div className={classes.detail}>
          <div className={classes.staffDetails}>
            <div className={classes.myform}>

              <div className={classes.idDetails}>
                <label className={classes.la}>staffid:</label>
                <p>#{id.staffId}</p>
              </div>
              <div className={classes.fname}>
                <label className={classes.lb}>first Name:</label>
                <p>{name} </p>
              </div>
              <div className={classes.lname}>
                <label className={classes.lc}>Last Name:</label>
                <p >{lname} </p>
              </div>
              <div className={classes.department}>
                <label className={classes.ld}>Department:</label>
                <p >{department.toString()}</p>
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
                <p>{phoneno}</p>
              </div>

              <div className={classes.ContactEXT}>
                <label className={classes.lh}>ContactEXT:</label>
                <p >{extention}</p>
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