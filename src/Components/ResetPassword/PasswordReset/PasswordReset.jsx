import React, { useRef } from 'react';
import classes from './PasswordReset.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const PasswordReset = (props) => {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleReset = async (e) => {
    e.preventDefault();
    if (confirmPasswordRef.current.value !== passwordRef.current.value) {
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
          title: 'Please enter a new password',
          text: `${error.message}`
        });
      }
    }
  };

  return (
    <div className="send-email">
      <div className={classes.sendOtp}>
        <div className={classes.OTPform}>
          <form className={classes.loginform} onSubmit={(e) => handleReset(e)}>
            <h2>Please enter below your new password</h2>
            <input type="password" minLength={6} placeholder="New-Password" required ref={passwordRef} />
            <input type="password" minLength={6} placeholder="confirm-password" required ref={confirmPasswordRef} />
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;