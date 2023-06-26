import React, { useContext, useEffect, useRef } from 'react';
import classes from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import AuthContext from '../../Components/Context/AuthContext';
import { Link } from 'react-router-dom';


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
    if (localStorage.getItem('id')) {
      const staff = await axios.get(`/api/staff/staffdetails/${localStorage.getItem('id')}`);
      ctx.onLogin(staff.data.staff.email);
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
      localStorage.setItem('token', loginStaff.data.token);
      localStorage.setItem('id', loginStaff.data.staffId);
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
      })

      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: `${error.response.data.message}`,
        text: 'Please enter valid credentials'
      });
    }
    navigate('/');
  };


  return (
    <div className={`${classes.login}`}>
      <div className={classes.formPage}>
        <form className="login-form" onSubmit={(e) => getHome(e)}>
          <input type="email" placeholder="email" ref={emailRef} />
          <input type="password" placeholder="password" ref={passwordRef} />
          <button type='submit'>login</button>
          <Link to='/forgotpassword'>Forget Password</Link>
        </form>
      </div>
    </div>
  )
}

export default Login