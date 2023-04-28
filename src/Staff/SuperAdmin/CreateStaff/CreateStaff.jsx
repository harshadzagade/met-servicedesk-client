import axios from 'axios';
import React, { Fragment, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../../Components/NavBar/NavBar';
import Swal from 'sweetalert2';
import classes from './CreateStaff.module.css';

const CreateStaff = () => {
    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const departmentRef = useRef();
    const phoneRef = useRef();
    const extensionRef = useRef();
    const navigate = useNavigate();
    const handleSubmitClick = async (e) => {
        e.preventDefault();
        const data = {
            firstname: firstnameRef.current.value,
            lastname: lastnameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            department: [departmentRef.current.value],
            phoneNumber: +phoneRef.current.value,
            contactExtension: +extensionRef.current.value
        };
        try {
            await axios.post('http://localhost:8001/staff/superadmin/createStaff', data);
            Swal.fire(
                'Staff Created!',
                'You have created staff successfully',
                'success'
            );
            navigate('/', { state: { refreshSuperHome: true } });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `${error.response.data.message}`,
                text: 'Please enter valid fields'
            });
        }
    };
    return (
        <Fragment>
            <NavBar tab={'create'} />
            <div className={`${classes.createStaffHeading}`}>Create Staff</div>
            <form className={`d-inline-block ${classes.createStaffForm}`} method="POST" onSubmit={handleSubmitClick}>
                <div className={`d-inline-flex`}>
                    <input className={`${classes.createSmallStaffInput} form-control`} type="text" name="firstname" placeholder="Firstname" autoComplete='true' required ref={firstnameRef} />
                    <input className={`${classes.createSmallStaffInput} form-control`} type="text" name="lastname" placeholder="Lastname" autoComplete='true' required ref={lastnameRef} />
                </div><br /><br />
                <input className={`${classes.createStaffInput} form-control`} type="email" name="email" placeholder="Email" autoComplete='true' required ref={emailRef} /><br />
                <input className={`${classes.createStaffInput} form-control`} type="password" name="password" placeholder="Password" autoComplete='true' required ref={passwordRef} /><br />
                <input className={`${classes.createStaffInput} form-control`} type="text" name="department" placeholder="Department" autoComplete='true' required ref={departmentRef} /><br />
                <input className={`${classes.createStaffInput} form-control`} type="text" name="phone" placeholder="Phone Number" autoComplete='true' ref={phoneRef} /><br />
                <input className={`${classes.createStaffInput} form-control`} type="text" name="extension" placeholder="Contact Extension" autoComplete='true' ref={extensionRef} /><br />
                <button className={`btn ${classes.createButton}`} type="submit">Create</button>
            </form>
        </Fragment>
    );
};

export default CreateStaff;