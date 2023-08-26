import React, { useState, useEffect } from 'react';
import classes from './ArchiveStaffDetails.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ArchiveStaffDetails = () => {
    const navigate = useNavigate();
    const id = useParams();
    const [name, setName] = useState('');
    const [lname, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [phoneno, setPhoneNo] = useState('');
    const [extention, setExtension] = useState('');
    const [department, setDepartment] = useState('');
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const getStaff = async () => {
            try {
                const staff = await axios.get(`http://localhost:8001/api/trash/staffdetails/${id.staffId}`);
                setName(staff.data.staff.firstname);
                setLName(staff.data.staff.lastname);
                setEmail(staff.data.staff.email);
                setRole(staff.data.staff.role);
                setPhoneNo(staff.data.staff.phoneNumber);
                setExtension(staff.data.staff.contactExtension);
                setDepartment(staff.data.staff.department);
            } catch (error) {
                console.log(error.message);
            }

        };
        getStaff();
        setRefresh(false);
    }, [refresh, id.staffId]);

    return (
        <main>
            <div className={classes.staffdetails}>
                <div className={classes.header}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16" onClick={() => navigate('/archive')}>
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                    </svg>
                    <h2>Employee details</h2>
                </div>
                <div className={classes.detail}>
                    <div className={classes.staffDetails}>
                        <div className={classes.myform}>
                            <div className={classes.idDetails}>
                                <label className={classes.la}>Staff ID:</label>
                                <p>#{id.staffId}</p>
                            </div>
                            <div className={classes.fname}>
                                <label className={classes.lb}>Firstname:</label>
                                <p>{name} </p>
                            </div>
                            <div className={classes.lname}>
                                <label className={classes.lc}>Lastname:</label>
                                <p >{lname} </p>
                            </div>
                            <div className={classes.department}>
                                <label className={classes.ld}>Department:</label>
                                <p >{department.toString()}</p>
                            </div>
                            <div className={classes.email}>
                                <label className={classes.le}>Email:</label>
                                <p >{email}</p>
                            </div>
                            <div className={classes.Role}>
                                <label className={classes.lf}>Role:</label>
                                <p >{role === 'technician' ? 'engineer' : role}</p>
                            </div>
                            <div className={classes.phoneNo}>
                                <label className={classes.lg}>PhoneNo:</label>
                                <p>{phoneno}</p>
                            </div>
                            <div className={classes.ContactEXT}>
                                <label className={classes.lh}>Extension:</label>
                                <p >{extention}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    );
};

export default ArchiveStaffDetails;