import axios from 'axios';
import React, { Fragment, useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../NavBar/NavBar';
import Swal from 'sweetalert2';
import classes from './NewStaff.module.css';
import AuthContext from '../../../Context/AuthContext';

const NewStaff = () => {
    const ctx = useContext(AuthContext);
    const navigate = useNavigate();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

    const email = ctx.email;

    const handleReset = async (e) => {
        e.preventDefault();
        if (confirmPasswordRef.current.value !== passwordRef.current.value) {
            setIsConfirmPasswordValid(false);
            Swal.fire({
                icon: 'error',
                title: 'Password don\'t match',
                text: 'Please enter same values in both fields'
            });
        } else {
            try {
                await axios.put('http://localhost:8001/api/staff/newuserlogin/', { email: email, password: passwordRef.current.value });
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'New password set successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/');
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Please enter a new password'
                });
            }
        }
    };
    return (
        <Fragment>
            <NavBar tab={'none'} />
            <div className={`${classes.newStaffHeading}`}>Reset Password</div>
            <div className={`${classes.setPasswordFormDiv}`}>
                <div className={`py-5 px-4 mx-auto ${classes.setPasswordForm} align-items-center my-auto`}>
                    <div className={`${classes.setPasswordInfo}`}>Please enter below your new password</div>
                    <form onSubmit={(e) => handleReset(e)}>
                        <input className={`form-control mx-auto ${classes.setPasswordInput}`} required type="password" name="password" placeholder='New Password' autoComplete='true' minLength="6" ref={passwordRef} /><br />
                        <input className={`form-control mx-auto ${classes.setPasswordInput} ${!isConfirmPasswordValid && classes.setPasswordInputError}`} required type="password" name="confirmPassword" placeholder='Confirm Password' autoComplete='true' minLength="6" ref={confirmPasswordRef} /><br />
                        <button className={`btn ${classes.setPasswordButton}`} type="submit">Reset</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default NewStaff;