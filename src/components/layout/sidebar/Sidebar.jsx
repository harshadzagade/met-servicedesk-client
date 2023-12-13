import React, { Fragment, useContext } from 'react';
import classes from './Sidebar.module.css';
import metLogo from '../../../assets/MET-logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext/AuthContext';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const authCtx = useContext(AuthContext);

    return (
        <div className={classes.sidebar}>
            <div className={classes.header}>
                <img className={classes.metLogo} src={metLogo} alt='logo' />
            </div>
            <div className={classes.sidebarContent}>
                <div className={classes.topContent}>
                    <div className={`${classes.sidebarTab} ${location.pathname === '/' && classes.sidebarTabSelected}`} onClick={() => navigate('/')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-grid-1x2-fill" viewBox="0 0 16 16">
                            <path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5z" />
                        </svg>
                        <h3 className={`${classes.sidebarTabText}`}>Dashboard</h3>
                    </div>
                    {
                        authCtx.employeeInfo && authCtx.employeeInfo.role === 'superadmin' &&
                        <Fragment>
                            <div className={`${classes.sidebarTab} ${location.pathname === '/department' && classes.sidebarTabSelected}`} onClick={() => navigate('/department')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-collection-fill" viewBox="0 0 16 16">
                                    <path d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z" />
                                </svg>
                                <h3 className={`${classes.sidebarTabText}`}>Department</h3>
                            </div>
                            <div className={`${classes.sidebarTab} ${location.pathname === '/institute' && classes.sidebarTabSelected}`} onClick={() => navigate('/institute')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-buildings-fill" viewBox="0 0 16 16">
                                    <path d="M15 .5a.5.5 0 0 0-.724-.447l-8 4A.5.5 0 0 0 6 4.5v3.14L.342 9.526A.5.5 0 0 0 0 10v5.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14h1v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V.5ZM2 11h1v1H2v-1Zm2 0h1v1H4v-1Zm-1 2v1H2v-1h1Zm1 0h1v1H4v-1Zm9-10v1h-1V3h1ZM8 5h1v1H8V5Zm1 2v1H8V7h1ZM8 9h1v1H8V9Zm2 0h1v1h-1V9Zm-1 2v1H8v-1h1Zm1 0h1v1h-1v-1Zm3-2v1h-1V9h1Zm-1 2h1v1h-1v-1Zm-2-4h1v1h-1V7Zm3 0v1h-1V7h1Zm-2-2v1h-1V5h1Zm1 0h1v1h-1V5Z" />
                                </svg>
                                <h3 className={`${classes.sidebarTabText}`}>Institute</h3>
                            </div>
                            <div className={`${classes.sidebarTab} ${location.pathname === '/create_employee' && classes.sidebarTabSelected}`} onClick={() => navigate('/create_employee')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
                                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                                </svg>
                                <h3 className={`${classes.sidebarTabText}`}>Create employee</h3>
                            </div>
                            <div className={`${classes.sidebarTab} ${location.pathname === '/employee_list' && classes.sidebarTabSelected}`} onClick={() => navigate('/employee_list')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                                </svg>
                                <h3 className={`${classes.sidebarTabText}`}>Employee list</h3>
                            </div>
                        </Fragment>
                    }
                    <div className={`${classes.sidebarTab} ${location.pathname === '/complaint' && classes.sidebarTabSelected}`} onClick={() => navigate('/complaint')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                        <h3 className={`${classes.sidebarTabText}`}>Complaint</h3>
                    </div>
                    <div className={`${classes.sidebarTab} ${location.pathname === '/request' && classes.sidebarTabSelected}`} onClick={() => navigate('/request')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                        </svg>
                        <h3 className={`${classes.sidebarTabText}`}>Request</h3>
                    </div>
                    <div className={`${classes.sidebarTab} ${location.pathname === '/report' && classes.sidebarTabSelected}`} onClick={() => navigate('/report')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-vcard-fill" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5ZM9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8Zm1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5Zm-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96c.026-.163.04-.33.04-.5ZM7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
                        </svg>
                        <h3 className={`${classes.sidebarTabText}`}>Report</h3>
                    </div>
                    <div className={`${classes.sidebarTab} ${location.pathname === '/archive' && classes.sidebarTabSelected}`} onClick={() => navigate('/archive')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-archive-fill" viewBox="0 0 16 16">
                            <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                        </svg>
                        <h3 className={`${classes.sidebarTabText}`}>Archive</h3>
                    </div>
                    <div className={`${classes.sidebarTab} ${location.pathname === '/contact_list' && classes.sidebarTabSelected}`} onClick={() => navigate('/contact_list')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                        </svg>
                        <h3 className={`${classes.sidebarTabText}`}>Contact list</h3>
                    </div>
                    <div className={`${classes.sidebarTab} ${location.pathname === '/policies' && classes.sidebarTabSelected}`} onClick={() => navigate('/policies')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-ppt-fill" viewBox="0 0 16 16">
                            <path d="M8.188 10H7V6.5h1.188a1.75 1.75 0 1 1 0 3.5z" />
                            <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zM7 5.5a1 1 0 0 0-1 1V13a.5.5 0 0 0 1 0v-2h1.188a2.75 2.75 0 0 0 0-5.5H7z" />
                        </svg>
                        <h3 className={`${classes.sidebarTabText}`}>Policies</h3>
                    </div>
                    <hr className={classes.hrTag} />
                </div>
                <div className={classes.bottomContent}>
                    <span>©Mumbai Educational Trust</span>
                    <span>All rights reserved</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;