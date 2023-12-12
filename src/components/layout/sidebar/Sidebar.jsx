import React from 'react';
import classes from './Sidebar.module.css';
import metLogo from '../../../assets/MET-logo.png';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

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