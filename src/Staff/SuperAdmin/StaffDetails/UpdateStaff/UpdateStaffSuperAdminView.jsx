import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from './UpdateStaffSuperAdminView.module.css';
import Modal from '../../../../UI/Modal/Modal';

const UpdateStaffSuperAdminView = props => {
    const id = useParams();

    const roles = ['admin', 'technician', 'user']

    const [staff, setStaff] = useState({});
    const [departments, setDepartments] = useState([]);
    const [updateStaff, setUpdateStaff] = useState({ firstname: staff.firstname, lastname: staff.lastname, email: staff.email, role: staff.role, department: staff.department });

    useEffect(() => {
        const getAllDepartments = async () => {
            const departments = await axios.get(`http://localhost:8001/staff/departments`);
            setDepartments(departments.data.departments)
        };
        getAllDepartments();
    }, []);

    useEffect(() => {
        const fetchStaff = async () => {
            const staff = await axios.get(`http://localhost:8001/staff/superadmin/staffdetails/${id.staffId}`);
            setStaff(staff.data.staff);
        };
        fetchStaff();
    }, [id.staffId]);

    useEffect(() => {
        setUpdateStaff({
            firstname: staff.firstname,
            lastname: staff.lastname,
            email: staff.email,
            role: staff.role,
            department: staff.department
        });
    }, [staff]);

    const handleSubmitClick = async (e, id, updates) => {
        e.preventDefault();
        await axios.put(`http://localhost:8001/staff/superadmin/staffdetails/updateStaff/${id}`, updates);
        props.onConfirm();
    };

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUpdateStaff({ ...updateStaff, [name]: value });
    }
    return (
        <Modal>
            <form method="GET" onSubmit={(e) => handleSubmitClick(e, id.staffId, { firstname: updateStaff.firstname, lastname: updateStaff.lastname, email: updateStaff.email, role: updateStaff.role, department: updateStaff.department })}>
                <div className={`${classes.updateStaffHeading}`}>Edit Staff</div>
                <input className={`${classes.updateStaffInput} form-control`} type="text" name="firstname" placeholder="Firstname" autoComplete='true' defaultValue={staff.firstname} required onChange={handleChange} />
                <input className={`${classes.updateStaffInput} form-control`} type="text" name="lastname" placeholder="Lastname" autoComplete='true' defaultValue={staff.lastname} required onChange={handleChange} />
                <input className={`${classes.updateStaffInput} form-control`} type="email" name="email" placeholder="Email" autoComplete='true' defaultValue={staff.email} required onChange={handleChange} />
                <select className={`${classes.roleSelect}`} name="role" required onChange={handleChange}>
                    {
                        roles.map((role) =>
                            staff.role === role ?
                                <option className={`${classes.roleOption}`} selected value={role}>{role}</option>
                                :
                                <option className={`${classes.roleOption}`} value={role}>{role}</option>
                        )
                    }
                </select>
                <input className={`${classes.updateStaffInput} form-control`} type="text" name="department" placeholder="Department" autoComplete='true' defaultValue={staff.department} required onChange={handleChange} />
                {
                    departments.map((department) => <div className={`badge badge-dark`}>{department}</div>)
                }
                <div className={`${classes.updateLayoutButtons}`}>
                    <button className={`btn ${classes.updateButton}`} type="submit">Update</button>
                    <button className={`btn ${classes.cancelButton}`} onClick={props.onConfirm}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
};

export default UpdateStaffSuperAdminView;