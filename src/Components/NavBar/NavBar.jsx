import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AuthContext from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';

const NavBar = (props) => {
  const [showTabs, setShowTabs] = useState(false);
  const [isCreateActive, setIsCreateActive] = useState(false);
  const [isTrashActive, setIsTrashActive] = useState(false);
  const [staffInfo, setStaffInfo] = useState({ firstname: '', lastname: '', role: '' })
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const handleLogoutClick = (e) => {
    e.preventDefault()
    Swal.fire({
      title: 'Log Out?',
      text: "You will be signed out from your current login",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        ctx.onLogout();
        navigate('/login');
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Logged out successfully'
        })
      }
    });
  };

  useEffect(() => {
    const checkLogin = async () => {
      if (!localStorage.getItem('id')) {
        navigate('/login');
      }
    }
    checkLogin();
  }, [navigate])

  useEffect(() => {
    const id = localStorage.getItem('id');
    if (id === '1') {
      setShowTabs(true);
    }
    if (props.tab === 'create') {
      setIsCreateActive(true);
      setIsTrashActive(false);
    }
    if (props.tab === 'trash') {
      setIsCreateActive(false);
      setIsTrashActive(true);
    }
    if (props.tab === 'none') {
      setIsCreateActive(false);
      setIsTrashActive(false);
    }
    const getUserInfo = async () => {
      try {
        const staff = await axios.get(`http://localhost:8001/staff/staffdetails/${id}`);
        setStaffInfo({ firstname: staff.data.staff.firstname, lastname: staff.data.staff.lastname, role: staff.data.staff.role });
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getUserInfo();
  }, [props]);
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">MET Service Desk</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav mr-auto my-2 my-lg-0 navbar-nav-scroll" style={{ maxHeight: '100px' }}>
            {showTabs && <li className={`nav-item ${isCreateActive && 'active'}`}>
              <Link className="nav-link" to="/superadmin/createstaff">Create Staff</Link>
            </li>}
            {showTabs && <li className={`nav-item ${isTrashActive && 'active'}`}>
              <Link className="nav-link" to="/trash">Trash</Link>
            </li>}
          </ul>
          <form className="d-flex" onSubmit={(e) => handleLogoutClick(e)}>
            <p className='text-light my-auto' style={{ marginRight: '10px' }}><b>{staffInfo.role}</b>: {staffInfo.firstname + ' ' + staffInfo.lastname}</p>
            <button className="btn btn-danger" type="submit">Logout</button>
          </form>
        </div>
      </nav>
    </Fragment>
  );
};

export default NavBar;