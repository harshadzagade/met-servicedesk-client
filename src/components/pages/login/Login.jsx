import React, { useContext, useEffect, useRef, useState } from 'react';
import classes from './Login.module.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import AuthContext from '../../../context/AuthContext/AuthContext';
import metLogo from '../../../assets/MET-logo.png';
import getItemWithExpiry from '../../../utils/expiryFunction';
import Swal from 'sweetalert2';

const Login = () => {
    const idReference = getItemWithExpiry('id');
    const id = idReference ? idReference.value : null;
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const emailRef = useRef();
    const passwordRef = useRef();

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (authCtx.isLoggedIn) {
            navigate('/');
        }
    }, [authCtx.isLoggedIn, navigate])

    useEffect(() => {
        const checkLogin = async () => {
            try {
                if (id) {
                    const staff = await axios.get(`https://hello.helpdesk.met.edu/api/staff/staffdetails/${id}`);
                    authCtx.onLogin(staff.data.staff.email);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        checkLogin();
    }, [id, authCtx]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const staffInfo = {
            email: email,
            password: password
        }
        let loginStaff;
        try {
            loginStaff = await axios.post('https://hello.helpdesk.met.edu/api/', staffInfo);
            const now = new Date();
            const expirationTime = now.getTime() + 8 * 60 * 60 * 1000;
            const emailExpirationTime = now.getTime() + 5 * 60 * 1000;
            const loginId = {
                value: loginStaff.data.staffId,
                expiry: expirationTime
            };
            const tokenString = {
                value: loginStaff.data.token,
                expiry: expirationTime
            };
            const email = {
                value: staffInfo.email,
                expiry: emailExpirationTime
            };
            localStorage.setItem('token', JSON.stringify(tokenString));
            localStorage.setItem('id', JSON.stringify(loginId));
            localStorage.setItem('email', JSON.stringify(email));
            authCtx.onLogin(staffInfo.email);
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
            if (error.response.status === 401 || error.response.status === 422) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to login'
                });
            } else {
                console.log(error.message);
            }
        }
        navigate('/');
    };

    return (
        <div className={classes.fullScreen}>
            <div className={classes.container}>
                <div className={classes.divideLayout}>
                    <div className={classes.leftLayout} />
                    <div className={classes.rightLayout}>
                        <form className={classes.loginContainer} onSubmit={handleSubmit}>
                            <img className={classes.metLogo} src={metLogo} alt='met-logo' />
                            <input className={classes.userInput} type="email" placeholder='Enter E-Mail address' ref={emailRef} />
                            <div className={classes.userPassword}>
                                <input className={classes.userInput} type={showPassword ? 'text' : 'password'} placeholder='Enter password' ref={passwordRef} />
                                <div className={classes.showPasswordButton} onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588M5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                                            </svg>
                                    }
                                </div>
                            </div>
                            <div className={classes.buttonsLogin}>
                                <span className={classes.rememberMe}><input style={{ cursor: 'pointer' }} type="checkbox" />&nbsp;Remember me</span>
                                <Link className={classes.forgotPasword} to='#'>Forgot password?</Link>
                            </div>
                            <button className={classes.loginButton} type='submit'>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;