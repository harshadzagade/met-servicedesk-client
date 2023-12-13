import React, { useContext } from 'react';
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
                        <div className={`${classes.sidebarTab} ${location.pathname === '/department' && classes.sidebarTabSelected}`} onClick={() => navigate('/department')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-collection-fill" viewBox="0 0 16 16">
                                <path d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z" />
                            </svg>
                            <h3 className={`${classes.sidebarTabText}`}>Department</h3>
                        </div>
                    }
                    {
                        authCtx.employeeInfo && authCtx.employeeInfo.role === 'superadmin' &&
                        <div className={`${classes.sidebarTab} ${location.pathname === '/institute' && classes.sidebarTabSelected}`} onClick={() => navigate('/institute')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-buildings-fill" viewBox="0 0 16 16">
                                <path d="M15 .5a.5.5 0 0 0-.724-.447l-8 4A.5.5 0 0 0 6 4.5v3.14L.342 9.526A.5.5 0 0 0 0 10v5.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14h1v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V.5ZM2 11h1v1H2v-1Zm2 0h1v1H4v-1Zm-1 2v1H2v-1h1Zm1 0h1v1H4v-1Zm9-10v1h-1V3h1ZM8 5h1v1H8V5Zm1 2v1H8V7h1ZM8 9h1v1H8V9Zm2 0h1v1h-1V9Zm-1 2v1H8v-1h1Zm1 0h1v1h-1v-1Zm3-2v1h-1V9h1Zm-1 2h1v1h-1v-1Zm-2-4h1v1h-1V7Zm3 0v1h-1V7h1Zm-2-2v1h-1V5h1Zm1 0h1v1h-1V5Z" />
                            </svg>
                            <h3 className={`${classes.sidebarTabText}`}>Institute</h3>
                        </div>
                    }
                    {
                        authCtx.employeeInfo && authCtx.employeeInfo.role === 'superadmin' &&
                        <div className={`${classes.sidebarTab} ${location.pathname === '/create_employee' && classes.sidebarTabSelected}`} onClick={() => navigate('/create_employee')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                            </svg>
                            <h3 className={`${classes.sidebarTabText}`}>Create employee</h3>
                        </div>
                    }
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