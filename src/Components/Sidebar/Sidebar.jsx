import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Sidebar.module.css';
import Swal from 'sweetalert2';
import AuthContext from '../Context/AuthContext/AuthContext';
import axios from 'axios';
import TicketDetailsContext from '../Context/TicketDetailsContext/TicketDetailsContext';
import Navbar from '../UI/Navbar/Navbar';

const Sidebar = ({ children }) => {
  const id = localStorage.getItem('id');
  const ticketCtx = useContext(TicketDetailsContext);
  const [showTabs, setShowTabs] = useState(false);
  const [isHomeActive, setIsHomeActive] = useState(false);
  const [isInstituteActive, setIsInstituteActive] = useState(false);
  const [isDepartmentActive, setIsDepartmentActive] = useState(false);
  const [isSubadminActivitiesActive, setIsSubadminActivitiesActive] = useState(false);
  const [isCreateActive, setIsCreateActive] = useState(false);
  const [isTrashActive, setIsTrashActive] = useState(false);
  const [isRequestActive, setIsRequestActive] = useState(false);
  const [isComplaintActive, setIsComplaintActive] = useState(false);
  const [isServicesActive, setIsServicesActive] = useState(false);
  const [isReportActive, setIsReportActive] = useState(false);
  const [staffInfo, setStaffInfo] = useState({});
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  useEffect(() => {
    if (window.location.pathname !== '/forgotpassword') {
      if (!id) {
        navigate('/login')
      }
    }
  }, [id, navigate]);

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

  if ((window.location.pathname !== `/requestdetails/${ticketCtx.ticketId}`) && (window.location.pathname !== `/complaintdetails/${ticketCtx.ticketId}`) && (window.location.pathname !== `/adminrequestdetails/${ticketCtx.ticketId}`) && (window.location.pathname !== `/Techcomplaintdetails/${ticketCtx.ticketId}`) && (window.location.pathname !== `/technicianRequestDetails/${ticketCtx.ticketId}`)) {
    ticketCtx.onClickHandler('', null, null)
  }

  useEffect(() => {
    if (id === '1') {
      setShowTabs(true);
    } else {
      setShowTabs(false);
    }
  }, [id]);

  useEffect(() => {
    switch (sessionStorage.getItem('tab')) {
      case 'home':
        setIsHomeActive(true);
        setIsInstituteActive(false);
        setIsDepartmentActive(false);
        setIsCreateActive(false);
        setIsTrashActive(false);
        setIsSubadminActivitiesActive(false);
        setIsRequestActive(false);
        setIsComplaintActive(false);
        setIsServicesActive(false);
        setIsReportActive(false);
        break;

      case 'institute':
        setIsHomeActive(false);
        setIsInstituteActive(true);
        setIsDepartmentActive(false);
        setIsCreateActive(false);
        setIsTrashActive(false);
        setIsSubadminActivitiesActive(false);
        setIsRequestActive(false);
        setIsComplaintActive(false);
        setIsServicesActive(false);
        setIsReportActive(false);
        break;

      case 'department':
        setIsHomeActive(false);
        setIsInstituteActive(false);
        setIsDepartmentActive(true);
        setIsCreateActive(false);
        setIsTrashActive(false);
        setIsSubadminActivitiesActive(false);
        setIsRequestActive(false);
        setIsComplaintActive(false);
        setIsServicesActive(false);
        setIsReportActive(false);
        break;

      case 'create':
        setIsHomeActive(false);
        setIsInstituteActive(false);
        setIsDepartmentActive(false);
        setIsCreateActive(true);
        setIsTrashActive(false);
        setIsSubadminActivitiesActive(false);
        setIsRequestActive(false);
        setIsComplaintActive(false);
        setIsServicesActive(false);
        setIsReportActive(false);
        break;

      case 'archive':
        setIsHomeActive(false);
        setIsInstituteActive(false);
        setIsDepartmentActive(false);
        setIsCreateActive(false);
        setIsTrashActive(true);
        setIsSubadminActivitiesActive(false);
        setIsRequestActive(false);
        setIsComplaintActive(false);
        setIsServicesActive(false);
        setIsReportActive(false);
        break;

      case 'subadmin':
        setIsHomeActive(false);
        setIsInstituteActive(false);
        setIsDepartmentActive(false);
        setIsCreateActive(false);
        setIsTrashActive(false);
        setIsSubadminActivitiesActive(true);
        setIsRequestActive(false);
        setIsComplaintActive(false);
        setIsServicesActive(false);
        setIsReportActive(false);
        break;

      case 'request':
        setIsHomeActive(false);
        setIsInstituteActive(false);
        setIsDepartmentActive(false);
        setIsCreateActive(false);
        setIsTrashActive(false);
        setIsSubadminActivitiesActive(false);
        setIsRequestActive(true);
        setIsComplaintActive(false);
        setIsServicesActive(false);
        setIsReportActive(false);
        break;

      case 'complaint':
        setIsHomeActive(false);
        setIsInstituteActive(false);
        setIsDepartmentActive(false);
        setIsCreateActive(false);
        setIsTrashActive(false);
        setIsSubadminActivitiesActive(false);
        setIsRequestActive(false);
        setIsComplaintActive(true);
        setIsServicesActive(false);
        setIsReportActive(false);
        break;

      case 'services':
        setIsHomeActive(false);
        setIsInstituteActive(false);
        setIsDepartmentActive(false);
        setIsCreateActive(false);
        setIsTrashActive(false);
        setIsSubadminActivitiesActive(false);
        setIsRequestActive(false);
        setIsComplaintActive(false);
        setIsServicesActive(true);
        setIsReportActive(false);
        break;

      case 'report':
        setIsHomeActive(false);
        setIsInstituteActive(false);
        setIsDepartmentActive(false);
        setIsCreateActive(false);
        setIsTrashActive(false);
        setIsSubadminActivitiesActive(false);
        setIsRequestActive(false);
        setIsComplaintActive(false);
        setIsServicesActive(false);
        setIsReportActive(true);
        break;

      default:
        break;
    }
  }, [navigate])

  const handleHomeClick = () => {
    sessionStorage.setItem('tab', 'home');
    setIsHomeActive(true);
    setIsInstituteActive(false);
    setIsDepartmentActive(false);
    setIsCreateActive(false);
    setIsTrashActive(false);
    setIsSubadminActivitiesActive(false);
    setIsRequestActive(false);
    setIsComplaintActive(false);
    setIsServicesActive(false);
    setIsReportActive(false);
  };

  const handleInstituteClick = () => {
    sessionStorage.setItem('tab', 'institute');
    setIsHomeActive(false);
    setIsInstituteActive(true);
    setIsDepartmentActive(false);
    setIsCreateActive(false);
    setIsTrashActive(false);
    setIsSubadminActivitiesActive(false);
    setIsRequestActive(false);
    setIsComplaintActive(false);
    setIsServicesActive(false);
    setIsReportActive(false);
  };

  const handleDepartmentClick = () => {
    sessionStorage.setItem('tab', 'department');
    setIsHomeActive(false);
    setIsInstituteActive(false);
    setIsDepartmentActive(true);
    setIsCreateActive(false);
    setIsTrashActive(false);
    setIsSubadminActivitiesActive(false);
    setIsRequestActive(false);
    setIsComplaintActive(false);
    setIsServicesActive(false);
    setIsReportActive(false);
  };

  const handleCreateStaffClick = () => {
    sessionStorage.setItem('tab', 'create');
    setIsHomeActive(false);
    setIsInstituteActive(false);
    setIsDepartmentActive(false);
    setIsCreateActive(true);
    setIsTrashActive(false);
    setIsSubadminActivitiesActive(false);
    setIsRequestActive(false);
    setIsComplaintActive(false);
    setIsServicesActive(false);
    setIsReportActive(false);
  };

  const handleReportClick = () => {
    sessionStorage.setItem('tab', 'report');
    setIsHomeActive(false);
    setIsInstituteActive(false);
    setIsDepartmentActive(false);
    setIsCreateActive(false);
    setIsTrashActive(false);
    setIsSubadminActivitiesActive(false);
    setIsRequestActive(false);
    setIsComplaintActive(false);
    setIsServicesActive(false);
    setIsReportActive(true);
  };

  const handleArchiveClick = () => {
    sessionStorage.setItem('tab', 'archive');
    setIsHomeActive(false);
    setIsInstituteActive(false);
    setIsDepartmentActive(false);
    setIsCreateActive(false);
    setIsTrashActive(true);
    setIsSubadminActivitiesActive(false);
    setIsRequestActive(false);
    setIsComplaintActive(false);
    setIsServicesActive(false);
    setIsReportActive(false);
  };

  const handleSubadminClick = () => {
    sessionStorage.setItem('tab', 'subadmin');
    setIsHomeActive(false);
    setIsInstituteActive(false);
    setIsDepartmentActive(false);
    setIsCreateActive(false);
    setIsTrashActive(false);
    setIsSubadminActivitiesActive(true);
    setIsRequestActive(false);
    setIsComplaintActive(false);
    setIsServicesActive(false);
    setIsReportActive(false);
  };

  const handleRequestClick = () => {
    sessionStorage.setItem('tab', 'request');
    setIsHomeActive(false);
    setIsInstituteActive(false);
    setIsDepartmentActive(false);
    setIsCreateActive(false);
    setIsTrashActive(false);
    setIsSubadminActivitiesActive(false);
    setIsRequestActive(true);
    setIsComplaintActive(false);
    setIsServicesActive(false);
    setIsReportActive(false);
  };

  const handleComplaintClick = () => {
    sessionStorage.setItem('tab', 'complaint');
    setIsHomeActive(false);
    setIsInstituteActive(false);
    setIsDepartmentActive(false);
    setIsCreateActive(false);
    setIsTrashActive(false);
    setIsSubadminActivitiesActive(false);
    setIsRequestActive(false);
    setIsComplaintActive(true);
    setIsServicesActive(false);
    setIsReportActive(false);
  };

  const handleServicesClick = () => {
    sessionStorage.setItem('tab', 'services');
    setIsHomeActive(false);
    setIsInstituteActive(false);
    setIsDepartmentActive(false);
    setIsCreateActive(false);
    setIsTrashActive(false);
    setIsSubadminActivitiesActive(false);
    setIsRequestActive(false);
    setIsComplaintActive(false);
    setIsServicesActive(true);
    setIsReportActive(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        if (id) {
          const staff = await axios.get(`/api/staff/staffdetails/${id}`);
          setStaffInfo(staff.data.staff);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getUserInfo();
  }, [id]);

  if (!(window.location.pathname === '/login' || window.location.pathname === '/forgotpassword' || window.location.pathname === '/passwordreset')) {
    if (!sessionStorage.getItem('tab')) {
      sessionStorage.setItem('tab', 'home');
    }
  }

  useEffect(() => {
    const checkStaff = async () => {
      try {
        if (id) {
          await axios.get(`/api/staff/checkstaffexistence/${id}`);
        }
      } catch (error) {
        if (error.response.data.message === 'Staff not found') {
          ctx.onLogout();
        } else {
          console.log(error.response.data.message);
        }
      }
    };

    const interval = setInterval(() => {
      checkStaff();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [ctx, id]);

  return (
    <Fragment>
      <div className={classes.nav}>
        <Navbar />
      </div>
      <div className="container-fluid">
        <div className={`${classes.wrapper} row`} >
          <div className="col-2 p-0">
            {
              id &&
              <div className='bg-white' hidden={window.location.pathname === '/login' || window.location.pathname === '/forgotpassword' || window.location.pathname === '/passwordreset' ? true : false}>

                <div className={`${classes.sidemenu}`}>
                  <Link to='/' onClick={handleHomeClick} className={`${isHomeActive && classes.active}`} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16">
                      <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
                      <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
                    </svg>
                    <h3>Home</h3>
                  </Link>

                  {showTabs && <Link to='/department' onClick={handleDepartmentClick} className={`${isDepartmentActive && classes.active}`} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-collection-fill" viewBox="0 0 16 16">
                      <path d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z" />
                    </svg>
                    <h3>Department</h3>
                  </Link>}

                  {showTabs && <Link to='/institute' onClick={handleInstituteClick} className={`${isInstituteActive && classes.active}`} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-buildings-fill" viewBox="0 0 16 16">
                      <path d="M15 .5a.5.5 0 0 0-.724-.447l-8 4A.5.5 0 0 0 6 4.5v3.14L.342 9.526A.5.5 0 0 0 0 10v5.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14h1v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V.5ZM2 11h1v1H2v-1Zm2 0h1v1H4v-1Zm-1 2v1H2v-1h1Zm1 0h1v1H4v-1Zm9-10v1h-1V3h1ZM8 5h1v1H8V5Zm1 2v1H8V7h1ZM8 9h1v1H8V9Zm2 0h1v1h-1V9Zm-1 2v1H8v-1h1Zm1 0h1v1h-1v-1Zm3-2v1h-1V9h1Zm-1 2h1v1h-1v-1Zm-2-4h1v1h-1V7Zm3 0v1h-1V7h1Zm-2-2v1h-1V5h1Zm1 0h1v1h-1V5Z" />
                    </svg>
                    <h3>Institute</h3>
                  </Link>}

                  {showTabs && <Link to='/createstaff' onClick={handleCreateStaffClick} className={`${isCreateActive && classes.active}`} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                    </svg>
                    <h3>Create Employee</h3>
                  </Link>}

                  {staffInfo.role === 'admin' && <Link to='/subadminactivities' onClick={handleSubadminClick} className={`${isSubadminActivitiesActive && classes.active}`} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                    <h3>Subadmin</h3>
                  </Link>}

                  <Link to='/complaint' onClick={handleComplaintClick} className={`${isComplaintActive && classes.active}`} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                    <h3>Concern</h3>
                  </Link>

                  <Link to='/request' onClick={handleRequestClick} className={`${isRequestActive && classes.active}`} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                    </svg>
                    <h3>Request</h3>
                  </Link>

                  {staffInfo.role !== 'user' && <Link to='/report' onClick={handleReportClick} className={`${isReportActive && classes.active}`} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-vcard-fill" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5ZM9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8Zm1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5Zm-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96c.026-.163.04-.33.04-.5ZM7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
                    </svg>
                    <h3>Report</h3>
                  </Link>}

                  {showTabs && <Link to='/archive' onClick={handleArchiveClick} className={`${isTrashActive && classes.active}`} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-archive-fill" viewBox="0 0 16 16">
                      <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                    </svg>
                    <h3>Archive</h3>
                  </Link>}

                  <Link to='/services' onClick={handleServicesClick} className={`${isServicesActive && classes.active}`} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
                      <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                    </svg>
                    <h3>Contact List</h3>
                  </Link>
                  <Link onClick={(e) => handleLogoutClick(e)} className={`${classes.active ? classes.rowColorActive : classes.rowColorDefault} text-danger`}  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                      <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg>
                    <h3>Logout</h3>
                  </Link>
                </div>
              </div>
            }
          </div>
          <div className={`col-10 ${classes.mainScreen}`}>
            <main className={classes.main}>
              {children}
            </main>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;