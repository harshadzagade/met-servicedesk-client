import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AuthContext from '../../Context/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import AdminContext from '../../Context/AdminContext/AdminContext';

const NavBar = (props) => {
  const id = localStorage.getItem('id');
  const [showTabs, setShowTabs] = useState(false);
  const [isCreateActive, setIsCreateActive] = useState(false);
  const [isTrashActive, setIsTrashActive] = useState(false);
  const [isRequestActive, setIsRequestActive] = useState(false);
  const [isComplaintActive, setIsComplaintActive] = useState(false);
  const [isServicesActive, setIsServicesActive] = useState(false);
  const [staffInfo, setStaffInfo] = useState({ firstname: '', lastname: '', role: '' });
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const adminCtx = useContext(AdminContext);

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await axios.get(`http://localhost:8001/api/staff/admin/admindepartments/${id}`);
      setDepartments(departments.data.departments);
    };
    getDepartments();
  }, [id]);

  const handleLogoutClick = (e) => {
    e.preventDefault();
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
        authCtx.onLogout();
        if (sessionStorage.getItem('department')) {
          sessionStorage.removeItem('department');
        }
        if (sessionStorage.getItem('approval')) {
          sessionStorage.removeItem('approval');
        }
        if (localStorage.getItem('department')) {
          localStorage.removeItem('department');
        }
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
    if (id === '1') {
      setShowTabs(true);
    }
    switch (props.tab) {
      case 'create':
        setIsCreateActive(true);
        setIsTrashActive(false);
        setIsRequestActive(false);
        setIsComplaintActive(false);
        setIsServicesActive(false);
        break;

      case 'trash':
        setIsCreateActive(false);
        setIsTrashActive(true);
        setIsRequestActive(false);
        setIsComplaintActive(false);
        setIsServicesActive(false);
        break;

      case 'request':
        setIsCreateActive(false);
        setIsTrashActive(false);
        setIsRequestActive(true);
        setIsComplaintActive(false);
        setIsServicesActive(false);
        break;

      case 'complaint':
        setIsCreateActive(false);
        setIsTrashActive(false);
        setIsRequestActive(false);
        setIsComplaintActive(true);
        setIsServicesActive(false);
        break;

      case 'services':
        setIsCreateActive(false);
        setIsTrashActive(false);
        setIsRequestActive(false);
        setIsComplaintActive(false);
        setIsServicesActive(true);
        break;

      default:
        setIsCreateActive(false);
        setIsTrashActive(false);
        setIsRequestActive(false);
        setIsComplaintActive(false);
        setIsServicesActive(false);
        break;
    };
    const getUserInfo = async () => {
      try {
        const staff = await axios.get(`http://localhost:8001/api/staff/staffdetails/${id}`);
        setStaffInfo({ firstname: staff.data.staff.firstname, lastname: staff.data.staff.lastname, role: staff.data.staff.role });
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getUserInfo();
  }, [props, id]);

  const handleDepartmentClick = (department) => {
    adminCtx.setDepartment(department);
  };

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
              <Link className="nav-link" to="/trash">Archive</Link>
            </li>}
            <li className={`nav-item ${isRequestActive && 'active'}`}>
              <Link className="nav-link" to="/request">Request</Link>
            </li>
            <li className={`nav-item ${isComplaintActive && 'active'}`}>
              <Link className="nav-link" to="/complaint">Complaint</Link>
            </li>
            <li className={`nav-item ${isServicesActive && 'active'}`}>
              <Link className="nav-link" to="/services">Services</Link>
            </li>
          </ul>
          <form className="d-flex" onSubmit={(e) => handleLogoutClick(e)}>
            {
              staffInfo.role === 'admin' &&
              <div className="btn-group dropleft mr-3">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {adminCtx.department === '' ? 'Department' : adminCtx.department}
                </button>
                <div className="dropdown-menu">
                  {
                    departments.map((department, key) => <button key={key} className="dropdown-item" type="button" onClick={() => handleDepartmentClick(department)}>{department}</button>)
                  }
                </div>
              </div>
            }
            <p className='text-light my-auto' style={{ marginRight: '10px' }}><b>{staffInfo.role}</b>: {staffInfo.firstname + ' ' + staffInfo.lastname}</p>
            <button className="btn btn-danger" type="submit">Logout</button>
          </form>
        </div>
      </nav>
    </Fragment>
  );
};

export default NavBar;