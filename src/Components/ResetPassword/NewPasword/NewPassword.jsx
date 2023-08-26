import React, { useRef, useContext } from 'react';
import classes from './NewPassword.module.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import AuthContext from '../../Context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const NewPassword = () => {
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
        if (error.response.status === 422 || error.response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: `${error.response.data.message}`,
            text: 'Please enter a new password'
          });
        } else {
          console.log(error.message);
        }
      }
    }
  };

  return (
    <div className="send-email">
      <div className={classes.sendOtp}>
        <div className={classes.OTPform}>
          <form className={classes.loginform} onSubmit={(e) => handleReset(e)}>
            <div className={`${classes.logo} mb-3`}>
              <img src="/assets/img/met_logo.png" alt="" />
            </div>
            <h2>MET Helpdesk</h2>
            <h3>Please enter below your new password  </h3>
            <input type="password" minLength={6} placeholder="New-Password" required ref={passwordRef} />
            <input type="password" minLength={6} placeholder="confirm-password" required ref={confirmPasswordRef} />
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default NewPassword;