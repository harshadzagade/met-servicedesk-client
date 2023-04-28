import axios from 'axios';
import React, { useRef } from 'react';
import Swal from 'sweetalert2';
import classes from './SendOTP.module.css';

const SendOTP = (props) => {
    const emailRef = useRef();
    const handleSendOTP = async () => {
        try {
            await axios.post('http://localhost:8001/staff/sendOTP', { email: emailRef.current.value });
            props.goToVerify();
            props.emailAddress(emailRef.current.value)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `${error.response.data.message}`,
                text: 'Please enter valid email'
            });
        }
    }
    return (
        <div className={`${classes.sendOtpFormDiv}`}>
            <div className={`py-5 px-4 mx-auto ${classes.sendOtpForm} align-items-center my-auto`}>
                <div className={`${classes.sendOtpInfo}`}>Please enter your E-Mail address below</div>
                <input className={`form-control mx-auto ${classes.sendOtpInput}`} required type="email" name="email" placeholder="E-Mail" autoComplete='true' ref={emailRef} />
                <br />
                <button className={`btn ${classes.sendOtpButton}`} onClick={handleSendOTP}>Send OTP</button>
            </div>
        </div>
    );
};

export default SendOTP;