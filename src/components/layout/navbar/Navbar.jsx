import React, { useContext, useState } from 'react';
import classes from './Navbar.module.css';
import Hamburger from 'hamburger-react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext/AuthContext';
import YesNoAlert from '../../ui/customAlert/yesNoAlert/YesNoAlert';
import getItemWithExpiry from '../../../utils/expiryFunction';

const Navbar = () => {
    const idReference = getItemWithExpiry('id');
    const id = idReference ? idReference.value : null;
    const authCtx = useContext(AuthContext);
    authCtx.setEmployeeInfoId(id);
    const employeeDetails = authCtx.employeeInfo;
    const navigate = useNavigate();
    const [focus, setFocus] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleSubmitAlert = () => {
        authCtx.onLogout();
        setShowAlert(false);
    };

    const handleDashboard = () => {
        navigate('/');
        setIsMenuOpen(false);
    };

    return (
        <div className={classes.navbar}>
            {showAlert && <YesNoAlert message={{ header: 'Logout', submessage: 'Do you really want to logout?' }} onClose={handleCloseAlert} onSubmit={handleSubmitAlert} />}
            {
                focus &&
                <div className={classes.profileContainer}>
                    <div className={classes.closeButtonContainer} onClick={() => setFocus(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                        </svg>
                    </div>
                    <div className={classes.profileLayout}>
                        <div className={classes.topContainer}>
                            <span className={classes.profileEmail}>{employeeDetails.email}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                            <span className={classes.profileUsername}>{employeeDetails.firstname + ' ' + employeeDetails.lastname}</span>
                        </div>
                        <div className={classes.bottomContainer} onClick={() => setShowAlert(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                                <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                            </svg>
                            &nbsp;
                            Logout
                        </div>
                    </div>
                </div>
            }
            <div className={classes.leftCorner}>
                <Hamburger style={{ zIndex: 460 }} toggled={isMenuOpen} toggle={setIsMenuOpen} direction="right" />
                {
                    isMenuOpen &&
                    <div className={classes.menuOptions}>
                        <div className={classes.menuItem} onClick={handleDashboard}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-grid-1x2-fill" viewBox="0 0 16 16">
                                <path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5z" />
                            </svg>
                            <span>Dashboard</span>
                        </div>
                    </div>
                }
            </div>
            <div className={classes.rightCorner}>
                <div className={classes.navbarIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                    </svg>
                </div>
                &nbsp;&nbsp;
                <div className={classes.navbarIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                    </svg>
                </div>
                &nbsp;&nbsp;
                <div className={classes.profile}>
                    <div className={`${classes.navbarIcon} ${classes.avatar}`} onClick={() => setFocus(!focus)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg>
                    </div>
                </div>
                &nbsp;&nbsp;
                <h3 className={classes.username}>{employeeDetails !== null ? (employeeDetails.firstname + ' ' + employeeDetails.lastname) : 'Unknown'}</h3>
                &nbsp;
            </div>
        </div>
    );
};

export default Navbar;