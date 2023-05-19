import axios from 'axios';
import React, { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import classes from './SetNewPassword.module.css';

const SetNewPassword = (props) => {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

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
        await axios.put('http://localhost:8001/api/staff/resetpassword', { email: props.getEmail, password: passwordRef.current.value });
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'New password set successfully',
          showConfirmButton: false,
          timer: 1500
        })
        props.goBackToLogin();
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
  );
};

export default SetNewPassword;