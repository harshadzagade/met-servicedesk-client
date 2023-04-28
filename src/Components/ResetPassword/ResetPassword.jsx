import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SendOTP from './SendOTP/SendOTP';
import SetNewPassword from './SetNewPassword/SetNewPassword';
import VerifyOTP from './VerifyOTP/VerifyOTP';
import classes from './ResetPassword.module.css';
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';

const ResetPassword = () => {
    const ctx = useContext(AuthContext);
    const navigate = useNavigate();
    const [sendOTP, setSendOTP] = useState(true);
    const [verifyOTP, setVerifyOTP] = useState(false);
    const [setNewPassword, setSetNewPassword] = useState(false);
    const [email, setEmail] = useState('');

    const checkLogin = async () => {
        if (localStorage.getItem('id')) {
            const staff = await axios.get(`http://localhost:8001/staff/staffdetails/${localStorage.getItem('id')}`);
            ctx.onLogin(staff.data.staff.email);
            navigate('/');
        }
    }
    checkLogin();

    const handleGoToVerify = () => {
        setSendOTP(false);
        setVerifyOTP(true);
        setSetNewPassword(false);
    };

    const handleGoToResetPassword = () => {
        setSendOTP(false);
        setVerifyOTP(false);
        setSetNewPassword(true);
    };

    const handleGoBackToLogin = () => {
        navigate('/login');
    };

    const setEmailAddress = (emailId) => {
        setEmail(emailId);
    };

    return (
        <div className={`${classes.resetPassword}`}>
            <div className={`${classes.topBar} border d-flex align-items-center justify-content-center`}>
                <div className={`${classes.resetHeading}`}>Reset Password</div>
            </div>
            {sendOTP && <SendOTP goToVerify={handleGoToVerify} emailAddress={setEmailAddress} />}
            {verifyOTP && <VerifyOTP goToResetPassword={handleGoToResetPassword} />}
            {setNewPassword && <SetNewPassword goBackToLogin={handleGoBackToLogin} getEmail = {email} />}
        </div>
    );
};

export default ResetPassword;