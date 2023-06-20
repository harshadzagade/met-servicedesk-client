import React, { useRef, useState } from 'react';
import classes from './SendOTP.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const SendOTP = (props) => {
    const enteredOTP = useRef();
    const [isOTPValid, setIsOTPValid] = useState(true)
    const handleOTPVerification = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:8001/api/staff/verifyOTP', { otp: enteredOTP.current.value });
            props.goToResetPassword();
        } catch (error) {
            setIsOTPValid(false);
            Swal.fire({
                icon: 'error',
                title: `${error.response.data.message}`,
                text: 'Please enter valid OTP'
            });
        }
    }   
   
  return (
    <div className="send-email">
        <div className={classes.sendOtp}>
            <div className={classes.OTPform}>
            <form className={classes.loginform} onSubmit={handleOTPVerification}>
                <h2>Please enter OTP </h2>
                <input type="text" placeholder="Enter OTP" required ref={enteredOTP}/>
                <button type='submit'>Submit</button>
               </form>
            </div>
          </div>
    </div>
  );
};

export default SendOTP;