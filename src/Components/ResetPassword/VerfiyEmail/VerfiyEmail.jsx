import React, { useRef } from 'react';
import classes from './VerfiyEmail.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const VerfiyEmail = (props) => {
    const emailRef = useRef();
    const handleSendOTP = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8001/api/staff/sendOTP', { email: emailRef.current.value });
            props.goToVerify();
            props.emailAddress(emailRef.current.value)
        } catch (error) {
            if (error.response.status === 422 || error.response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to send OTP'
                });
            } else {
                console.log(error.message);
            }
        }
    };

    return (
        <div className="send-email">
            <div className={classes.Email}>
                <div className={classes.emailform}>
                    <form className={classes.loginform} onSubmit={handleSendOTP}>
                        <div className={`${classes.logo} mb-3`}>
                            <img src="/assets/img/met_logo.png" alt="" />
                        </div>
                        <h2>MET Helpdesk</h2>
                        <h3>Please enter the email address below </h3>
                        <input type="email" placeholder="Enter Email" ref={emailRef} />
                        <button type='submit'>send OTP</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerfiyEmail;