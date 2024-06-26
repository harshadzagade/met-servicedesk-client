import React, { useEffect, useState } from 'react';
import classes from './AdminUpdateStaffDetails.module.css';
import Modal from '../../../UI/Modal/Modal';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminUpdateStaffdetails = (props) => {
    const id = useParams();
    const [staff, setStaff] = useState({});
    const [updateRole, setUpdateRole] = useState(staff.role);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const staff = await axios.get(`/api/staff/staffdetails/${id.staffId}`);
                setStaff(staff.data.staff);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.message}`,
                    text: 'Please enter valid fields'
                });
            }
        };
        fetchStaff();
    }, [id.staffId]);

    useEffect(() => {
        setUpdateRole(staff.role);
    }, [staff]);

    const handleSubmitClick = async (id, role) => {
        try {
            await axios.put(`/api/staff/admin/staffdetails/updateStaff/${id}`, { role: role });
            props.onConfirm();
            Swal.fire(
                'Update successfully',
                'You have updated employee role successfully',
                'success'
            );
        } catch (error) {
            if (error.response.status === 422 || error.response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to update employee'
                });
            } else {
                console.log(error.message);
            }
        }
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
                    <div className={classes.myform} >
                        <div className={classes.department}>
                            <label className="ld">Role:</label>
                            <select className={`${classes.selectUSer} dept-select`} value={updateRole} name='role' onChange={handleChange} >
                                <option value="subadmin">Sub-Admin</option>
                                <option value="engineer">Engineer</option>
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

export default AdminUpdateStaffdetails;