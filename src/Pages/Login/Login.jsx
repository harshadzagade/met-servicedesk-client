import React, { useContext, useEffect, useRef } from 'react';
import classes from './Login.module.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import AuthContext from '../../Components/Context/AuthContext/AuthContext';
import getItemWithExpiry from '../../Utils/expiryFunction';

const Login = () => {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (ctx.isLoggedIn) {
      navigate('/');
    }
  }, [ctx.isLoggedIn, navigate])

  const checkLogin = async () => {
    if (getItemWithExpiry('id')) {
      try {
        const staff = await axios.get(`/api/staff/staffdetails/${getItemWithExpiry('id')}`);
        ctx.onLogin(staff.data.staff.email);
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  checkLogin();

  const getHome = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const staffInfo = {
      email: email,
      password: password
    }
    let loginStaff;
    try {
      loginStaff = await axios.post('/api/', staffInfo);
      const now = new Date();
      const expirationTime = now.getTime() + 8 * 60 * 60 * 1000;
      const loginId = {
        value: loginStaff.data.staffId,
        expiry: expirationTime
      };
      const tokenString = {
        value: loginStaff.data.token,
        expiry: expirationTime
      };
      localStorage.setItem('token', JSON.stringify(tokenString));
      localStorage.setItem('id', JSON.stringify(loginId));
      ctx.onLogin(staffInfo.email);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      });
    } catch (error) {
      console.log(error.message);
    }
    navigate('/');
  };

  return (
    <div className={`${classes.login}`}>
      <div className={classes.formPage}>
        <form className="login-form" onSubmit={(e) => getHome(e)}>
          <input type="email" placeholder="email" ref={emailRef} required />
          <input type="password" minLength={6} placeholder="password" ref={passwordRef} required />
          <button type='submit'>login</button>
          <Link to='/forgotpassword'>Forgot Password</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;