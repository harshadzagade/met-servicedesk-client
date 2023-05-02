import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from './UpdateStaffSuperAdminView.module.css';
import Modal from '../../../../UI/Modal/Modal';
import Swal from 'sweetalert2';

const UpdateStaffSuperAdminView = props => {
    const id = useParams();

    const roles = ['admin', 'technician', 'user']

    const [staff, setStaff] = useState({});
    const [departmentList, setDepartmentList] = useState([]);
    const [departmentValue, setDepartmentValue] = useState('');
    const [updateStaff, setUpdateStaff] = useState({ firstname: staff.firstname, lastname: staff.lastname, email: staff.email, role: staff.role, department: staff.department, phoneNumber: staff.phoneNumber, contactExtension: staff.contactExtension });

    const handleKeyDown = evt => {
        if (["Enter", "Tab", ","].includes(evt.key)) {
            evt.preventDefault();
            const value = departmentValue.trim().match(/^[a-z0-9]+$/i)
            try {
                let toBeAdded = value.filter(department => !departmentList.includes(department));
                setDepartmentList([...departmentList, ...toBeAdded]);
            } catch (error) {
                console.log('Please enter valid department name');
            }
            setDepartmentValue('');
        }
    };

    const handleDelete = item => {
        setDepartmentList(departmentList.filter(i => i !== item));
    };

    const handlePaste = evt => {
        evt.preventDefault();
        let paste = evt.clipboardData.getData("text");
        var departments = paste.match(/^[a-z0-9]+$/i);
        try {
            let toBeAdded = departments.filter(department => !departmentList.includes(department));
            setDepartmentList([...departmentList, ...toBeAdded]);
        } catch (error) {
            console.log('Please enter valid department name');
        }
    };

    useEffect(() => {
        const fetchStaff = async () => {
            const staff = await axios.get(`http://localhost:8001/staff/superadmin/staffdetails/${id.staffId}`);
            setStaff(staff.data.staff);
            setDepartmentList(staff.data.staff.department);
        };
        fetchStaff();
    }, [id.staffId]);

    useEffect(() => {
        setUpdateStaff({
            firstname: staff.firstname,
            lastname: staff.lastname,
            email: staff.email,
            role: staff.role,
            department: staff.department,
            phoneNumber: staff.phoneNumber,
            contactExtension: staff.contactExtension
        });
    }, [staff]);

    const handleSubmitClick = async (e, id, updates) => {
        e.preventDefault();
        if (updates.role !== 'admin' && departmentList.length > 1) {
            Swal.fire({
                icon: 'error',
                title: 'Only admins can have multiple departments',
                text: 'Please change the role first'
            });
        } else {
            await axios.put(`http://localhost:8001/staff/superadmin/staffdetails/updateStaff/${id}`, updates);
            props.onConfirm();
        }
    };

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUpdateStaff({ ...updateStaff, [name]: value });
    }

    const handleDepartmentChange = evt => {
        setDepartmentValue(evt.target.value);
    };

    return (
        <Modal>
            <form method="GET" onSubmit={(e) => handleSubmitClick(e, id.staffId, { firstname: updateStaff.firstname, lastname: updateStaff.lastname, email: updateStaff.email, role: updateStaff.role, department: departmentList, phoneNumber: +updateStaff.phoneNumber, contactExtension: +updateStaff.contactExtension })}>
                <div className={`${classes.updateStaffHeading}`}>Edit Staff</div>
                <input className={`${classes.updateStaffInput} form-control`} type="text" name="firstname" placeholder="Firstname" autoComplete='true' defaultValue={staff.firstname} required onChange={handleChange} />
                <input className={`${classes.updateStaffInput} form-control`} type="text" name="lastname" placeholder="Lastname" autoComplete='true' defaultValue={staff.lastname} required onChange={handleChange} />
                <input className={`${classes.updateStaffInput} form-control`} type="email" name="email" placeholder="Email" autoComplete='true' defaultValue={staff.email} required onChange={handleChange} />
                <select className={`${classes.roleSelect} form-control`} name="role" required onChange={handleChange}>
                    {
                        roles.map((role, key) =>
                            staff.role === role ?
                                <option key={key} className={`${classes.roleOption}`} selected value={role}>{role}</option>
                                :
                                <option key={key} className={`${classes.roleOption}`} value={role}>{role}</option>
                        )
                    }
                </select>
                <input className={`${classes.updateStaffInput} form-control`} type="text" name="department" placeholder="Department" autoComplete='true' required={departmentList.length === 0} value={departmentValue} onKeyDown={handleKeyDown} onChange={handleDepartmentChange} onPaste={handlePaste} />
                {
                    departmentList.map((item) => (
                        <div className={`${classes.tagItem}`} key={item}>
                            {item}
                            <button type='button' className={`${classes.tag}`} onClick={() => handleDelete(item)}>&times;</button>
                        </div>
                    ))
                }
                <input className={`${classes.updateStaffInput} form-control`} type="number" name="phoneNumber" placeholder="Phone Number" autoComplete='true' defaultValue={staff.phoneNumber} required onChange={handleChange} />
                <input className={`${classes.updateStaffInput} form-control`} type="number" name="contactExtension" placeholder="Contact Extension" autoComplete='true' defaultValue={staff.contactExtension} required onChange={handleChange} />
                <div className={`${classes.updateLayoutButtons}`}>
                    <button className={`btn ${classes.updateButton}`} type="submit">Update</button>
                    <button className={`btn ${classes.cancelButton}`} onClick={props.onConfirm}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
};

export default UpdateStaffSuperAdminView;