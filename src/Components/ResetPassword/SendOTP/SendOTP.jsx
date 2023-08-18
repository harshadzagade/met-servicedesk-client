import React, { useEffect, useRef, useState } from 'react';
import classes from './SendOTP.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const SendOTP = (props) => {
    const enteredOTP = useRef();
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(0);

    const handleOTPVerification = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:8001/api/staff/verifyOTP', { otp: enteredOTP.current.value });
            props.goToResetPassword();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Please enter valid OTP',
                text: `${error.message}`
            });
        }
    };

    const handleResendOTP = async () => {
        try {
            await axios.post('http://localhost:8001/api/staff/sendOTP', { email: props.getEmail });
            setMinutes(1);
            setSeconds(0);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Please enter valid OTP',
                text: `${error.message}`
            });
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [minutes, seconds]);

    return (
        <div className="send-email">
            <div className={classes.sendOtp}>
                <div className={classes.OTPform}>
                    <form className={classes.loginform} onSubmit={handleOTPVerification}>
                        <h2>Please enter OTP </h2>
                        <input type="text" placeholder="Enter OTP" required ref={enteredOTP} />
                        <div className={classes.timmer}>
                            {seconds > 0 || minutes > 0 ? (
                                <p>
                                    Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                                    {seconds < 10 ? `0${seconds}` : seconds}
                                </p>
                            ) : (
                                <p>Didn't recieve code?</p>
                            )}
                            <button className={classes.timmerBtn} onClick={handleResendOTP}>Resend OTP</button>
                        </div>
                        <button className={classes.button} type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SendOTP;