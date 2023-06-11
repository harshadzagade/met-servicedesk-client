import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from '../../../Context/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import AdminContext from '../../../Context/AdminContext/AdminContext';
import classes from './Sidebar.module.css';

const Sidebar = ({ children }) => {
    const [showDepartments, setShowDepartments] = useState(false);
    const id = localStorage.getItem('id');
    const [showTabs, setShowTabs] = useState(false);
    const [isHomeActive, setIsHomeActive] = useState(true);
    const [isCreateActive, setIsCreateActive] = useState(false);
    const [isTrashActive, setIsTrashActive] = useState(false);
    const [isRequestActive, setIsRequestActive] = useState(false);
    const [isComplaintActive, setIsComplaintActive] = useState(false);
    const [isServicesActive, setIsServicesActive] = useState(false);
    const [isReportActive, setIsReportActive] = useState(false);
    const [staffInfo, setStaffInfo] = useState({ firstname: '', lastname: '', role: '' });
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const adminCtx = useContext(AdminContext);

    useEffect(() => {
        const getDepartments = async () => {
            if (id) {
                const departments = await axios.get(`http://localhost:8001/api/staff/admin/admindepartments/${id}`);
                setDepartments(departments.data.departments);
            }
        };
        getDepartments();
    }, [id]);

    const handleLogoutClick = () => {
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
        if (window.location.pathname !== '/resetpassword') {
            const checkLogin = async () => {
                if (!localStorage.getItem('id')) {
                    navigate('/login');
                }
            }
            checkLogin();
        }
    }, [navigate]);

    useEffect(() => {
        if (id === '1') {
            setShowTabs(true);
        } else {
            setShowTabs(false);
        }
    }, [id]);

    useEffect(() => {
        const getStaffInfo = async () => {
            try {
                if (id) {
                    const staff = await axios.get(`http://localhost:8001/api/staff/staffdetails/${id}`);
                    setStaffInfo({ firstname: staff.data.staff.firstname, lastname: staff.data.staff.lastname, role: staff.data.staff.role });
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        };
        getStaffInfo();
    }, [id]);

    const handleDepartmentClick = (department) => {
        adminCtx.setDepartment(department);
    };

    const handleHomeClick = () => {
        setIsHomeActive(true);
        setIsCreateActive(false);
        setIsTrashActive(false);
        setIsRequestActive(false);
        setIsComplaintActive(false);
        setIsServicesActive(false);
        setIsReportActive(false);
        navigate('/');
    };

    const handleCreateStaffClick = () => {
        setIsHomeActive(false);
        setIsCreateActive(true);
        setIsTrashActive(false);
        setIsRequestActive(false);
        setIsComplaintActive(false);
        setIsServicesActive(false);
        setIsReportActive(false);
        navigate('/superadmin/createstaff');
    };

    const handleArchiveClick = () => {
        setIsHomeActive(false);
        setIsCreateActive(false);
        setIsTrashActive(true);
        setIsRequestActive(false);
        setIsComplaintActive(false);
        setIsServicesActive(false);
        setIsReportActive(false);
        navigate('/trash');
    };

    const handleRequestClick = () => {
        setIsHomeActive(false);
        setIsCreateActive(false);
        setIsTrashActive(false);
        setIsRequestActive(true);
        setIsComplaintActive(false);
        setIsServicesActive(false);
        setIsReportActive(false);
        navigate('/request');
    };

    const handleComplaintClick = () => {
        setIsHomeActive(false);
        setIsCreateActive(false);
        setIsTrashActive(false);
        setIsRequestActive(false);
        setIsComplaintActive(true);
        setIsServicesActive(false);
        setIsReportActive(false);
        navigate('/complaint');
    };

    const handleServicesClick = () => {
        setIsHomeActive(false);
        setIsCreateActive(false);
        setIsTrashActive(false);
        setIsRequestActive(false);
        setIsComplaintActive(false);
        setIsServicesActive(true);
        setIsReportActive(false);
        navigate('/services');
    };

    const handleReportClick = () => {
        setIsHomeActive(false);
        setIsCreateActive(false);
        setIsTrashActive(false);
        setIsRequestActive(false);
        setIsComplaintActive(false);
        setIsServicesActive(false);
        setIsReportActive(true);
        navigate('/report');
    };

    return (
        <div className={`${classes.fullScreen}`}>
            <div className={`${classes.sidebar}`} hidden={window.location.pathname === '/login' || window.location.pathname === '/resetpassword' ? true : false}>
                <div className={`${classes.heading}`}>MET Service Desk</div>
                <div className={`${classes.container}`}>
                    <div className={`${classes.row} ${isHomeActive ? classes.rowColorActive : classes.rowColorDefault}`} onClick={handleHomeClick}>
                        <div className={`col-2 ${classes.icon}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16">
                                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
                                <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
                            </svg>
                        </div>
                        <div className={`col-10`}>
                            Home
                        </div>
                    </div>
                    {showTabs && <div className={`${classes.row} ${isCreateActive ? classes.rowColorActive : classes.rowColorDefault}`} onClick={handleCreateStaffClick}>
                        <div className={`col-2 ${classes.icon}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                            </svg>
                        </div>
                        <div className={`col-10`}>
                            Create Staff
                        </div>
                    </div>}
                    {showTabs && <div className={`${classes.row} ${isTrashActive ? classes.rowColorActive : classes.rowColorDefault}`} onClick={handleArchiveClick}>
                        <div className={`col-2 ${classes.icon}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-archive-fill" viewBox="0 0 16 16">
                                <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                            </svg>
                        </div>
                        <div className={`col-10`}>
                            Archive
                        </div>
                    </div>}
                    <div className={`${classes.row} ${isRequestActive ? classes.rowColorActive : classes.rowColorDefault}`} onClick={handleRequestClick}>
                        <div className={`col-2 ${classes.icon}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-plus-fill" viewBox="0 0 16 16">
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 4.697v4.974A4.491 4.491 0 0 0 12.5 8a4.49 4.49 0 0 0-1.965.45l-.338-.207L16 4.697Z" />
                                <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z" />
                            </svg>
                        </div>
                        <div className={`col-10`}>
                            Request
                        </div>
                    </div>
                    <div className={`${classes.row} ${isComplaintActive ? classes.rowColorActive : classes.rowColorDefault}`} onClick={handleComplaintClick}>
                        <div className={`col-2 ${classes.icon}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-square-fill" viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                        </div>
                        <div className={`col-10`}>
                            Complaint
                        </div>
                    </div>
                    <div className={`${classes.row} ${isServicesActive ? classes.rowColorActive : classes.rowColorDefault}`} onClick={handleServicesClick}>
                        <div className={`col-2 ${classes.icon}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                            </svg>
                        </div>
                        <div className={`col-10`}>
                            Services
                        </div>
                    </div>
                    <div className={`${classes.row} ${isReportActive ? classes.rowColorActive : classes.rowColorDefault}`} onClick={handleReportClick}>
                        <div className={`col-2 ${classes.icon}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-vcard-fill" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5ZM9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8Zm1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5Zm-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96c.026-.163.04-.33.04-.5ZM7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
                            </svg>
                        </div>
                        <div className={`col-10`}>
                            Report
                        </div>
                    </div>
                </div>
                {
                    staffInfo.role === 'admin' &&
                    <div className={`${classes.departmentMain}`} onMouseOver={() => setShowDepartments(true)} onMouseOut={() => { setShowDepartments(false) }}>
                        <div className={`${classes.departmentSelect}`}>
                            <div className={`col-10`}>
                                {adminCtx.department === '' ? 'Department' : adminCtx.department}
                            </div>
                            <div className={`col-2`}>
                                {
                                    showDepartments ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                        </svg>
                                }
                            </div>
                        </div>
                        {
                            showDepartments &&
                            <div className={`${classes.departmentList}`}>
                                {departments.map((department, key) =>
                                    <div key={key} className={`${classes.singleDepartment}`} onClick={() => handleDepartmentClick(department)}>{department}</div>
                                )}
                            </div>
                        }
                    </div>
                }
                <div className={`${classes.staffInfo} ml-2`}>
                    <div className={`${classes.staffRole}`}>{staffInfo.role}:&nbsp;</div>
                    <div className={`${classes.staffName}`}>{staffInfo.firstname + ' ' + staffInfo.lastname}</div>
                </div>
                <div className={`btn btn-danger ${classes.logoutButton}`} onClick={handleLogoutClick}>
                    <div className={`col-2 ${classes.logoutIcon}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                            <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                        </svg>
                    </div>
                    <div className={`col-10 ${classes.logoutText}`}>
                        Logout
                    </div>
                </div>
            </div>
            <main className={`${classes.mainData}`}>{children}</main>
        </div>
    );
};

export default Sidebar;