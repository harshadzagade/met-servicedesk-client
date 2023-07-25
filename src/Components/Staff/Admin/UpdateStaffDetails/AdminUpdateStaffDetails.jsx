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
                const staff = await axios.get(`/api/staff/superadmin/staffdetails/${id.staffId}`);
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
        setUpdateRole(staff.role);
    }, [staff]);

    const handleSubmitClick = async (id, role) => {
        await axios.put(`/api/staff/admin/staffdetails/updateStaff/${id}`, { role: role });
        props.onConfirm();
    };

    const handleChange = (e) => {
        setUpdateRole(e.target.value);
    };

    return (
        <Modal>
            <div >
                <h1 >Update Role</h1>
            </div>
            <div className={classes.detail}>
                <div >
                    <div className={classes.myform} >
                        <div className={classes.department}>
                            <label className="ld">Role:</label>
                            <select className="dept-select" defaultValue={staff.role} name='role' onChange={handleChange} >
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

export default AdminUpdateStaffdetails;