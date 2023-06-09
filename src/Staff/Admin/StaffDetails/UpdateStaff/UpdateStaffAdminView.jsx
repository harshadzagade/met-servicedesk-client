import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from './UpdateStaffAdminView.module.css';
import Modal from '../../../../UI/Modal/Modal';

const UpdateStaffAdminView = (props) => {
    const id = useParams();

    const [staff, setStaff] = useState({});
    const [updateRole, setUpdateRole] = useState(staff.role);

    useEffect(() => {
        const fetchStaff = async () => {
            const staff = await axios.get(`http://localhost:8001/staff/superadmin/staffdetails/${id.staffId}`);
            setStaff(staff.data.staff);
        };
        fetchStaff();
    }, [id.staffId]);

    useEffect(() => {
        setUpdateRole(staff.role);
    }, [staff]);

    const handleSubmitClick = async (e, id, role) => {
        e.preventDefault();
        await axios.put(`http://localhost:8001/staff/admin/staffdetails/updateStaff/${id}`, { role: role });
        props.onConfirm();
    };

    const handleChange = (e) => {
        setUpdateRole(e.target.value);
    }
    return (
        <Modal>
            <form method="GET" onSubmit={(e) => handleSubmitClick(e, id.staffId, updateRole)}>
                <div className={`${classes.updateStaffHeading}`}>Edit Role</div>
                <input className={`${classes.updateStaffInput} form-control`} type="text" name="role" placeholder="Role" autoComplete='true' defaultValue={staff.role} required onChange={handleChange} />
                <div className={`${classes.updateLayoutButtons}`}>
                    <button className={`btn ${classes.updateButton}`} type="submit">Update Role</button>
                    <button className={`btn ${classes.cancelButton}`} onClick={props.onConfirm}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
};

export default UpdateStaffAdminView;