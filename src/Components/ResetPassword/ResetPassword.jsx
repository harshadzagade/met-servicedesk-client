import React, { useContext, useState } from 'react';
import classes from './ResetPassword.module.css';
import VerfiyEmail from './VerfiyEmail/VerfiyEmail';
import SendOTP from './SendOTP/SendOTP';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext/AuthContext';
import axios from 'axios';
import PasswordReset from './PasswordReset/PasswordReset';
import getItemWithExpiry from '../../Utils/expiryFunction';

const ResetPassword = () => {
    const ctx = useContext(AuthContext);
    const navigate = useNavigate();
    const [sendOTP, setSendOTP] = useState(true);
    const [verifyOTP, setVerifyOTP] = useState(false);
    const [setNewPassword, setSetNewPassword] = useState(false);
    const [email, setEmail] = useState('');

    const checkLogin = async () => {
        if (getItemWithExpiry('id')) {
            try {
                const staff = await axios.get(`/api/staff/staffdetails/${getItemWithExpiry('id').value}`);
                ctx.onLogin(staff.data.staff.email);
                navigate('/');
            } catch (error) {
                console.log(error.message);
            }
        }
    };
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
        <div className={classes.resetPassword}>
            {sendOTP && <VerfiyEmail goToVerify={handleGoToVerify} emailAddress={setEmailAddress} />}
            {verifyOTP && <SendOTP goToResetPassword={handleGoToResetPassword} getEmail={email} />}
            {setNewPassword && <PasswordReset goBackToLogin={handleGoBackToLogin} getEmail={email} />}
        </div>
    );
};

export default ResetPassword;