import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Sidebar.module.css';
import Swal from 'sweetalert2';
import AuthContext from '../Context/AuthContext';
import axios from 'axios';
import Rightside from '../Righside/Rightside';
import TicketDetailsContext from '../Context/TicketDetailsContext/TicketDetailsContext';
import Navbar from '../UI/Navbar/Navbar';
import { Fragment } from 'react';

const Sidebar = ({ children }) => {
  const id = localStorage.getItem('id');
  const ticketCtx = useContext(TicketDetailsContext);
  const [showTabs, setShowTabs] = useState(false);
  const [isHomeAvailable, setIsHomeAvailable] = useState(false);
  const [isHomeActive, setIsHomeActive] = useState(false);
  const [isDepartmentActive, setIsDepartmentActive] = useState(false);
  const [isCreateActive, setIsCreateActive] = useState(false);
  const [isTrashActive, setIsTrashActive] = useState(false);
  const [isRequestActive, setIsRequestActive] = useState(false);
  const [isComplaintActive, setIsComplaintActive] = useState(false);
  const [isServicesActive, setIsServicesActive] = useState(false);
  const [isReportActive, setIsReportActive] = useState(false);
  const [staffInfo, setStaffInfo] = useState({});
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/createstaff",
      name: "CreateStaff",
    },
    {
      path: "/complaint",
      name: "Complaint",
    },
    {
      path: "/request",
      name: "Request",
    },
    {
      path: "/product",
      name: "Product",
    },
    {
      path: "/allstaff",
      name: "Allstaff",
    },
    {
      path: "/archive",
      name: "DeleteStaff",
    }
  ]

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

  useEffect(() => {
    if ((window.location.pathname !== `/requestdetails/${ticketCtx.ticketId}`) || (window.location.pathname !== `/complaintdetails/${ticketCtx.ticketId}`) || (window.location.pathname !== `/adminrequestdetails/${ticketCtx.ticketId}`) || (window.location.pathname !== `/Techcomplaintdetails/${ticketCtx.ticketId}`) || (window.location.pathname !== `/technicianRequestDetails/${ticketCtx.ticketId}`)) {
      ticketCtx.onClickHandler('', null, null)
    }
  }, [window.location.pathname]);

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
        setIsDepartmentActive(false);
        setIsCreateActive(false);
        setIsTrashActive(false);
        setIsRequestActive(false);
        setIsComplaintActive(false);
        setIsServicesActive(false);
        setIsReportActive(false);
        break;

      case 'department':
        setIsHomeActive(false);
        setIsDepartmentActive(true);
        setIsCreateActive(false);
        setIsTrashActive(false);
        setIsRequestActive(false);
        setIsComplaintActive(false);
        setIsServicesActive(false);
        setIsReportActive(false);
        break;

      case 'create':
        setIsHomeActive(false);
        setIsDepartmentActive(false);
        setIsCreateActive(true);
        setIsTrashActive(false);
        setIsRequestActive(false);
        setIsComplaintActive(false);
        setIsServicesActive(false);
        setIsReportActive(false);
        break;

      case 'archive':
        setIsHomeActive(false);
        setIsDepartmentActive(false);
        setIsCreateActive(false);
        setIsTrashActive(true);
        setIsRequestActive(false);
        setIsComplaintActive(false);
        setIsServicesActive(false);
        setIsReportActive(false);
        break;

      case 'request':
        setIsHomeActive(false);
        setIsDepartmentActive(false);
        setIsCreateActive(false);
        setIsTrashActive(false);
        setIsRequestActive(true);
        setIsComplaintActive(false);
        setIsServicesActive(false);
        setIsReportActive(false);
        break;

      case 'complaint':
        setIsHomeActive(false);
        setIsDepartmentActive(false);
        setIsCreateActive(false);
        setIsTrashActive(false);
        setIsRequestActive(false);
        setIsComplaintActive(true);
        setIsServicesActive(false);
        setIsReportActive(false);
        break;

      case 'services':
        setIsHomeActive(false);
        setIsDepartmentActive(false);
        setIsCreateActive(false);
        setIsTrashActive(false);
        setIsRequestActive(false);
        setIsComplaintActive(false);
        setIsServicesActive(true);
        setIsReportActive(false);
        break;

      case 'report':
        setIsHomeActive(false);
        setIsDepartmentActive(false);
        setIsCreateActive(false);
        setIsTrashActive(false);
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
    setIsDepartmentActive(false);
    setIsCreateActive(false);
    setIsTrashActive(false);
    setIsRequestActive(false);
    setIsComplaintActive(false);
    setIsServicesActive(false);
    setIsReportActive(false);
  };

  const handleDepartmentClick = () => {
    sessionStorage.setItem('tab', 'department');
    setIsHomeActive(false);
    setIsDepartmentActive(true);
    setIsCreateActive(false);
    setIsTrashActive(false);
    setIsRequestActive(false);
    setIsComplaintActive(false);
    setIsServicesActive(false);
    setIsReportActive(false);
  };

  const handleCreateStaffClick = () => {
    sessionStorage.setItem('tab', 'create');
    setIsHomeActive(false);
    setIsDepartmentActive(false);
    setIsCreateActive(true);
    setIsTrashActive(false);
    setIsRequestActive(false);
    setIsComplaintActive(false);
    setIsServicesActive(false);
    setIsReportActive(false);
  };

  const handleReportClick = () => {
    sessionStorage.setItem('tab', 'report');
    setIsHomeActive(false);
    setIsDepartmentActive(false);
    setIsCreateActive(false);
    setIsTrashActive(false);
    setIsRequestActive(false);
    setIsComplaintActive(false);
    setIsServicesActive(false);
    setIsReportActive(true);
  };

  const handleArchiveClick = () => {
    sessionStorage.setItem('tab', 'archive');
    setIsHomeActive(false);
    setIsDepartmentActive(false);
    setIsCreateActive(false);
    setIsTrashActive(true);
    setIsRequestActive(false);
    setIsComplaintActive(false);
    setIsServicesActive(false);
    setIsReportActive(false);
  };

  const handleRequestClick = () => {
    sessionStorage.setItem('tab', 'request');
    setIsHomeActive(false);
    setIsDepartmentActive(false);
    setIsCreateActive(false);
    setIsTrashActive(false);
    setIsRequestActive(true);
    setIsComplaintActive(false);
    setIsServicesActive(false);
    setIsReportActive(false);
  };

  const handleComplaintClick = () => {
    sessionStorage.setItem('tab', 'complaint');
    setIsHomeActive(false);
    setIsDepartmentActive(false);
    setIsCreateActive(false);
    setIsTrashActive(false);
    setIsRequestActive(false);
    setIsComplaintActive(true);
    setIsServicesActive(false);
    setIsReportActive(false);
  };

  const handleServicesClick = () => {
    sessionStorage.setItem('tab', 'services');
    setIsHomeActive(false);
    setIsDepartmentActive(false);
    setIsCreateActive(false);
    setIsTrashActive(false);
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
          if (staff.data.staff.role === 'technician' || staff.data.staff.role === 'user') {
            setIsHomeAvailable(false);
          } else {
            setIsHomeAvailable(true);
          }
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getUserInfo();
  }, [id]);

  useEffect(() => {
    if (staffInfo !== {}) {
      if (staffInfo.role === 'technician' || staffInfo.role === 'user') {
        navigate('/complaint');
        sessionStorage.setItem('tab', 'complaint');
      } else {
        navigate('/');
        sessionStorage.setItem('tab', 'home');
      }
    }
  }, [staffInfo]);

  return (
    <Fragment>
      <div className={classes.wrapper}  >
        {
          id &&
          <div className='bg-white' hidden={window.location.pathname === '/login' || window.location.pathname === '/forgotpassword' || window.location.pathname === '/passwordreset' ? true : false}>
            <div className={`${classes.logo}`}>
              <img src="/assets/img/met_logo.png" alt="" />
            </div>


            <div className={`${classes.sidemenu}`}>
              {isHomeAvailable && <Link to='/' onClick={handleHomeClick} className={`${isHomeActive && classes.active}`} >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
                  <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
                </svg>
                <h3>Home</h3>
              </Link>}
              {showTabs && <Link to='/department' onClick={handleDepartmentClick} className={`${isDepartmentActive && classes.active}`} >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-collection-fill" viewBox="0 0 16 16">
                  <path d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z" />
                </svg>
                <h3>Department</h3>
              </Link>}
              {showTabs && <Link to='/createstaff' onClick={handleCreateStaffClick} className={`${isCreateActive && classes.active}`} >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                </svg>
                <h3>Create Staff</h3>
              </Link>}

              <Link to='/complaint' onClick={handleComplaintClick} className={`${isComplaintActive && classes.active}`} >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <h3>Complaint</h3>
              </Link>

              <Link to='/request' onClick={handleRequestClick} className={`${isRequestActive && classes.active}`} >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-question-square-fill" viewBox="0 0 16 16">
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.496 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" />
                </svg>
                <h3>Request</h3>
              </Link>

              {staffInfo.role !== 'user' && <Link to='/report' onClick={handleReportClick} className={`${isReportActive && classes.active}`} >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-vcard-fill" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5ZM9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8Zm1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5Zm-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96c.026-.163.04-.33.04-.5ZM7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
                </svg>
                <h3>Report</h3>
              </Link>}

              {showTabs && <Link to='/archive' onClick={handleArchiveClick} className={`${isTrashActive && classes.active}`} >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                  <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                </svg>
                <h3>Archive</h3>
              </Link>}

              <Link to='/services' onClick={handleServicesClick} className={`${isServicesActive && classes.active}`} >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-gear" viewBox="0 0 16 16">
                  <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                </svg>
                <h3>Staff List</h3>
              </Link>
              <Link onClick={(e) => handleLogoutClick(e)} className={`${classes.active ? classes.rowColorActive : classes.rowColorDefault} text-danger`}  >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                </svg>
                <h3>Logout</h3>
              </Link>
            </div>
          </div>
        }


        <div className="container">
          <div className="row">
            <div className="col-12">
              <main className={classes.main}>
                <div className={classes.nav}>
                  <Navbar />
                </div>
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>


    </Fragment>
  )
}

export default Sidebar;