import React, { useEffect, useState } from 'react';
import classes from './UpdateStaffDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from '../../../UI/Modal/Modal';
import CheckboxDropdown from '../../../UI/CheckboxDropdown/CheckboxDropdown';

const UpdateStaffDetails = (props) => {
    const id = useParams();
    const [departmentList, setDepartmentList] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [institute, setInstitute] = useState('');
    const [institutes, setInstitutes] = useState([]);
    const [departmentType, setDepartmentType] = useState('');
    const roles = ['admin', 'subadmin', 'engineer', 'user'];
    const [staff, setStaff] = useState({});
    const [updateStaff, setUpdateStaff] = useState({ id: staff.id, firstname: staff.firstname, middlename: staff.middlename, lastname: staff.lastname, email: staff.email, role: staff.role, institute: staff.institute, department: staff.department, departmentType: staff.departmentType, phoneNumber: staff.phoneNumber, contactExtension: staff.contactExtension });

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const staff = await axios.get(`/api/staff/staffdetails/${id.staffId}`);
                setStaff(staff.data.staff);
                setDepartmentList(staff.data.staff.department);
                setInstitute(staff.data.staff.institute);
                setDepartmentType(staff.data.staff.departmentType);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchStaff();
    }, [id.staffId]);

    useEffect(() => {
        setUpdateStaff({
            firstname: staff.firstname,
            middlename: staff.middlename,
            lastname: staff.lastname,
            email: staff.email,
            role: staff.role,
            institute: staff.institute,
            department: staff.department,
            departmentType: staff.departmentType,
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
            try {
                await axios.put(`/api/staff/superadmin/staffdetails/updateStaff/${id}`, updates);
                Swal.fire(
                    'Update Employee',
                    'You have updated employee successfully',
                    'success'
                );
                props.onConfirm();
            } catch (error) {
                if (error.response.status === 422 || error.response.status === 401 || error.response.status === 409) {
                    Swal.fire({
                        icon: 'error',
                        title: `${error.response.data.message}`,
                        text: 'Unable to update staff'
                    });
                } else {
                    console.log(error.message);
                }

            }
        }
    };

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const departments = await axios.get(`/api/department/alldepartments`);
                setDepartments(departments.data.departments);
            } catch (error) {
                console.log(error.message);
            }
        };
        getDepartments();
    }, []);

    useEffect(() => {
        const getInstitutes = async () => {
            try {
                const institutes = await axios.get(`/api/institute/`);
                setInstitutes(institutes.data.instituteData);
            } catch (error) {
                console.log(error.message);
            }
        };
        getInstitutes();
    }, []);

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUpdateStaff({ ...updateStaff, [name]: value });
    };

    useEffect(() => {
        setDepartmentList(departmentList);
    }, [departmentList]);

    const handleDepartmentData = (values) => {
        setDepartmentList(values);
    };

    return (
        <Modal>
            <div className={classes.detail}>
                <div >
                    <form className={classes.myform} method="GET" onSubmit={(e) => handleSubmitClick(e, id.staffId, { firstname: updateStaff.firstname, middlename: updateStaff.middlename, lastname: updateStaff.lastname, email: updateStaff.email.toLowerCase(), role: updateStaff.role, institute: institute, department: departmentList, departmentType: departmentType, phoneNumber: updateStaff.phoneNumber, contactExtension: updateStaff.contactExtension, createdAt: staff.createdAt })}>
                        <div className={classes.updateDetails}>
                            <label className="la">Staff ID:</label>
                            <p>#{staff.id}</p>
                        </div>
                        <div className={classes.updateDetails}>
                            <label className="lb">First Name:</label>
                            <input type="text" className={classes.input} placeholder='FirstName' name='firstname' autoComplete='true' defaultValue={staff.firstname} onChange={handleChange} />
                        </div>
                        <div className={classes.updateDetails}>
                            <label className="lb">Middle Name:</label>
                            <input type="text" className={classes.input} placeholder='MiddleName' name='middlename' autoComplete='true' defaultValue={staff.middlename} onChange={handleChange} />
                        </div>
                        <div className={classes.updateDetails}>
                            <label className="lc">Last Name:</label>
                            <input type="text" className={classes.input} placeholder='LastName' name='lastname' autoComplete='true' defaultValue={staff.lastname} onChange={handleChange} />
                        </div>
                        <div className={classes.institute}>
                            <label>Institute:</label>
                            <select value={institute} className={classes.input} onChange={(e) => setInstitute(e.target.value)}>
                                {
                                    institutes.map((institute) => (
                                        <option key={institute.id} value={institute.institute}>{institute.institute}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className={classes.deptik}>
                            <label>Department:</label>
                            <CheckboxDropdown defaultValue={departmentList} data={departments} selectedData={handleDepartmentData} />
                        </div>
                        <div className={classes.category}>
                            <label>Department Type:</label>
                            <select value={departmentType} className={classes.input} onChange={(e) => setDepartmentType(e.target.value)}>
                                <option value='teaching'>teaching</option>
                                <option value='non-teaching'>non-teaching</option>
                            </select>
                        </div>
                        <div className={classes.updateDetails}>
                            <label className="ld">Role:</label>
                            <select defaultValue={staff.role} className={`${classes.input} dropdown-toggle`} name='role' onChange={handleChange}>
                                {
                                    roles.map((role, key) =>
                                        staff.role === role ?
                                            <option key={key} className={`${classes.roleOption}`} selected value={role}>{role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}</option>
                                            :
                                            <option key={key} className={`${classes.roleOption}`} value={role}>{role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className={classes.updateDetails}>
                            <label className="le">E-mail:</label>
                            <input type="text" placeholder='Email' className={classes.input} autoComplete='true' name='email' defaultValue={staff.email} onChange={handleChange} />
                        </div>
                        <div className={classes.updateDetails}>
                            <label className="lg">Phone Number:</label>
                            <input type="tel" pattern="[0-9]{10}" className={classes.input} placeholder='Phone Number' autoComplete='true' name='phoneNumber' defaultValue={staff.phoneNumber} onChange={handleChange} />
                        </div>
                        <div className={classes.updateDetails}>
                            <label className="lh">Contact Extension:</label>
                            <input type="tel" pattern="[0-9]{3}" className={classes.input} placeholder='Contact Extension' name='contactExtension' autoComplete='true' defaultValue={staff.contactExtension} onChange={handleChange} />
                        </div>
                        <div className={classes.detailsBtns}>
                            <button className={classes.updateBtn} type='submit'>Update</button>
                            <button className={classes.deleteBtn} onClick={props.onConfirm}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default UpdateStaffDetails;