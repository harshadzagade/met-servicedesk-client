import React, { useRef } from 'react';
import classes from './VerfiyEmail.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const VerfiyEmail = (props) => {
    const emailRef = useRef();
    const handleSendOTP = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/staff/sendOTP', { email: emailRef.current.value });
            props.goToVerify();
            props.emailAddress(emailRef.current.value)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Please enter valid email',
                text: `${error.message}`
            });
        }
    };

    return (
        <div className="send-email">
            <div className={classes.Email}>
                <div className={classes.emailform}>
                    <form className={classes.loginform} onSubmit={handleSendOTP}>
                        <h2>Please enter the email address below </h2>
                        <input type="email" placeholder="Enter Email" ref={emailRef} />
                        <button type='submit'>send OTP</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerfiyEmail;