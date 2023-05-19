import axios from 'axios';
import React, { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import classes from './VerifyOTP.module.css';

const VerifyOTP = (props) => {
    const enteredOTP = useRef();
    const [isOTPValid, setIsOTPValid] = useState(true)
    const handleOTPVerification = async () => {
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
        <div className={`${classes.verifyOtpFormDiv}`}>
            <div className={`py-5 px-4 mx-auto ${classes.verifyOtpForm} align-items-center my-auto`}>
                <div className={`${classes.verifyOtpInfo} text-wrap`}>Please enter below an OTP which has been sent on your mentioned E-Mail address</div>
                <input className={`form-control mx-auto col-4 ${classes.verifyOtpInput} ${!isOTPValid && classes.verifyOtpInputError}`} type="text" name="otp" placeholder="Enter OTP here" autoComplete='true' maxLength="6" ref={enteredOTP} />
                <br />
                <button className={`btn ${classes.verifyOtpButton}`} onClick={handleOTPVerification}>Verify OTP</button>
            </div>
        </div>
    );
};

export default VerifyOTP;