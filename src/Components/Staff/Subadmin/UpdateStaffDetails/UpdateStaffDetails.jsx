import React, { useEffect, useState } from 'react';
import classes from './UpdateStaffDetails.module.css';
import Modal from '../../../UI/Modal/Modal';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateStaffDetails = (props) => {
    const subadminId = localStorage.getItem('id');
    const id = useParams();
    const [staff, setStaff] = useState({});
    const [updateRole, setUpdateRole] = useState(staff.role);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const staff = await axios.get(`/api/staff/staffdetails/${id.staffId}`);
                setStaff(staff.data.staff);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Please enter valid fields'
                });
            }
        };
        fetchStaff();
    }, [id.staffId]);

    useEffect(() => {
        const showLoadingAlert = () => {
            let timerInterval
            Swal.fire({
                title: 'Updating employee role',
                html: 'Please wait...<b></b>',
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            });
        };
        if (showLoading) {
            showLoadingAlert();
        }
    }, [showLoading]);

    useEffect(() => {
        setUpdateRole(staff.role);
    }, [staff]);

    const handleSubmitClick = async (id, role) => {
        try {
            setShowLoading(true);
            await axios.put(`/api/staff/subadmin/staffdetails/updateStaff/${id}`, { subadminId: subadminId, role: role });
            setShowLoading(false);
            Swal.fire(
                'Updated employee role',
                'You have updated employee role successfully',
                'success'
            );
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `${error.response.data.message}`,
                text: 'Please enter valid fields'
            });
        }
        props.onConfirm();
    };

    const handleChange = (e) => {
        setUpdateRole(e.target.value);
    };

    return (
        <Modal>
            <div>
                <h1>Update Role</h1>
            </div>
            <div className={classes.detail}>
                <div>
                    <div className={classes.myform}>
                        <div className={classes.department}>
                            <label className="ld">Role:</label>
                            <select className="dept-select" value={updateRole} name='role' onChange={handleChange}>
                                <option value="technician">Technician</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                        <div className={classes.detailsBtns}>
                            <button className={classes.updateBtn} onClick={() => handleSubmitClick(id.staffId, updateRole)}>Update</button>
                            <button className={classes.deleteBtn} onClick={() => props.onConfirm()}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default UpdateStaffDetails;