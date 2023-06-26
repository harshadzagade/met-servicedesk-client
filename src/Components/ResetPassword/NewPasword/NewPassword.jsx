import React, { useRef, useState } from 'react';
import classes from './NewPassword.module.css';
import Swal from 'sweetalert2';
import axios from 'axios';

const NewPassword = (props) => {
    
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
    <div className={classes.createPassword}>
    <div className={classes.form}>
      <form className={classes.passwordForm} onSubmit={(e) => handleReset(e)}>
        <h2>Please enter below your new password  </h2>
        <input type="password" placeholder="New-Password" required ref={passwordRef} />
        <input type="password" placeholder="confirm-password" required ref={confirmPasswordRef} />
        <button type='submit'>submit</button>
      </form>
    </div>
  </div>
  );
};

export default NewPassword;