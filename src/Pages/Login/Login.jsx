import axios from 'axios';
import React, { Fragment, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import classes from './Login.module.css';
import Swal from 'sweetalert2';
import METLogo from '../../Images/met-logo.png';

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
            const staff = await axios.get(`http://localhost:8001/api/staff/staffdetails/${localStorage.getItem('id')}`);
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
            loginStaff = await axios.post('http://localhost:8001/api/', staffInfo);
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

    const handleForgotPasswordClick = () => {
        navigate('/resetpassword');
    };

    return (
        <Fragment>
            <div className={`${classes.login}`}>
                <div className={`${classes.topBar} border`}>
                    <div className={`${classes.loginLogo} mb-4`}><img src={METLogo} className={`${classes.loginLogoImg}`} alt="MET Logo" /></div>
                </div><br />
                <div className={`${classes.loginFormDiv}`}>
                    <form className={`py-5 px-sm-4 ${classes.loginForm}`} onSubmit={(e) => getHome(e)}>
                        <h3 className={`${classes.loginHeading} mb-4`}>MET Service Desk</h3>
                        <input className={`form-control ${classes.loginInput}`} required type="email" name="email" placeholder="E-Mail" autoComplete='true' ref={emailRef} /><br />
                        <input className={`form-control ${classes.loginInput}`} required minLength="6" type="password" name="password" placeholder="Password" autoComplete='true' ref={passwordRef} /><br />
                        <button className={`btn ${classes.loginButton}`} type="submit">Login</button><br />
                        <p className={`${classes.forgotPassword} mt-3`} onClick={handleForgotPasswordClick}>Forgot password?</p>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;