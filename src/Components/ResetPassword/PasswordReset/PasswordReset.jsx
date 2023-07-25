import React, { useContext, useRef } from 'react';
import classes from './PasswordReset.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import AuthContext from '../../Context/AuthContext/AuthContext';

const PasswordReset = () => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const email = ctx.email;

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
        await axios.put(`/api/staff/newuserlogin`, { email: email, password: passwordRef.current.value });
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
    <div className={classes.createPassword}>
      <div className={classes.form}>
        <form className={classes.passwordForm} onSubmit={(e) => handleReset(e)}>
          <h2>Please enter below your new password  </h2>
          <input type="password" minLength={6} placeholder="New-Password" required ref={passwordRef} />
          <input type="password" minLength={6} placeholder="confirm-password" required ref={confirmPasswordRef} />
          <button type='submit'>submit</button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;