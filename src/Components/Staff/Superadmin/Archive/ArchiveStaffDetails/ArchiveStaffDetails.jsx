import React from 'react';
import classes from './ArchiveStaffDetails.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

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
    const [openUpdate, setOpenUpdate] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const getStaff = async () => {
            const staff = await axios.get(`/api/trash/staffdetails/${id.staffId}`);
            setName(staff.data.staff.firstname);
            setLName(staff.data.staff.lastname);
            setEmail(staff.data.staff.email);
            setRole(staff.data.staff.role);
            setPhoneNo(staff.data.staff.phoneNumber);
            setExtension(staff.data.staff.contactExtension);
            setDepartment(staff.data.staff.department);

        };
        getStaff();
        setRefresh(false);
    }, [refresh, id.staffId]);

    return (
        <main>
            <div className={classes.staffdetails}>
                <h2>Staff Details</h2>
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
                                <p >{role}</p>
                            </div>
                            <div className={classes.phoneNo}>
                                <label className={classes.lg}>PhoneNo:</label>
                                <p>{phoneno}</p>
                            </div>

                            <div className={classes.ContactEXT}>
                                <label className={classes.lh}>ContactEXT:</label>
                                <p >{extention}</p>
                            </div>
                            <div className={classes.detailsBtns}>
                                <button className={classes.deleteBtn} onClick={() => navigate('/archive') }>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )
}

export default ArchiveStaffDetails