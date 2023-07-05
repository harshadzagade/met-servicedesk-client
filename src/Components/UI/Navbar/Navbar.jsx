import React, { Fragment, useEffect, useState } from 'react';
import classes from './Navbar.module.css';
import axios from 'axios';
import AdminDeptDrop from '../AdminDepartmentDropDowm/AdminDeptDrop';

const Navbar = () => {
    const [staffInfo, setStaffInfo] = useState({ firstname: '', lastname: '', role: '', department: '' });
    const id = localStorage.getItem('id');

    useEffect(() => {
        const getStaffInfo = async () => {
            try {
                if (id) {
                    const staff = await axios.get(`/api/staff/staffdetails/${id}`);
                    setStaffInfo({ firstname: staff.data.staff.firstname, lastname: staff.data.staff.lastname, role: staff.data.staff.role, department: staff.data.staff.department });
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        };
        getStaffInfo();
    }, [id]);
    return (
        <div className={classes.nav} hidden={window.location.pathname === '/login' || window.location.pathname === '/forgotpassword' || window.location.pathname === '/passwordreset' ? true : false}>
            <div className={classes.departmentSelection}>
                {staffInfo.role === 'admin' &&
                    <div className={classes.adminDept}>
                        <h3>Department:</h3>
                        <AdminDeptDrop />
                    </div>
                }
            </div>
            <div className={classes.top}>
                <div className={classes.profile}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                    <div className={classes.role}>
                        <p>Hey, <b>{staffInfo.firstname}</b><br />
                            {staffInfo.role} <br />
                            {staffInfo.department}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;