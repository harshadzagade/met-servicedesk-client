import React, { useEffect, useState } from 'react';
import classes from './UpdateStaffDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from '../../../UI/Modal/Modal';

const UpdateStaffDetails = (props) => {
    const id = useParams();
    const [input, setInput] = useState('');
    const [departmentList, setDepartmentList] = useState([]);
    const [isKeyReleased, setIsKeyReleased] = useState(false);
    const roles = ['admin', 'technician', 'user'];
    //set the value
    const [staff, setStaff] = useState({});
    const [updateStaff, setUpdateStaff] = useState({ id: staff.id, firstname: staff.firstname, lastname: staff.lastname, email: staff.email, role: staff.role, department: staff.department, phoneNumber: staff.phoneNumber, contactExtension: staff.contactExtension });

    //set the department functionality
    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };

    useEffect(() => {
        setDepartmentList(departmentList);
    }, [departmentList]);

    const onKeyDown = (e) => {
        const { key } = e;
        const trimmedInput = input.toUpperCase().trim();

        if (key === 'Enter' && trimmedInput.length && !departmentList.includes(trimmedInput)) {
            e.preventDefault();
            setDepartmentList(prevState => [...prevState, trimmedInput]);
            setInput('');
        }

        if (key === "Backspace" && !input.length && departmentList.length && isKeyReleased) {
            const tagsCopy = [...departmentList];
            const poppedTag = tagsCopy.pop();
            e.preventDefault();
            setDepartmentList(tagsCopy);
            setInput(poppedTag);
        }

        setIsKeyReleased(false);
    };

    const onKeyUp = () => {
        setIsKeyReleased(true);
    };


    const deleteTag = (index) => {
        setDepartmentList(prevState => prevState.filter((tag, i) => i !== index))
    };

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const staff = await axios.get(`/api/staff/superadmin/staffdetails/${id.staffId}`);
                setStaff(staff.data.staff);
                setDepartmentList(staff.data.staff.department);
            } catch (error) {
                console.log(error.response.data.message);
            }
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
            try {
                await axios.put(`/api/staff/superadmin/staffdetails/updateStaff/${id}`, updates);
                props.onConfirm();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to update staff'
                });
            }
        }
    };

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUpdateStaff({ ...updateStaff, [name]: value });
    };

    return (
        <Modal>
            <div className={classes.detail}>
                <div >
                    <form className={classes.myform} method="GET" onSubmit={(e) => handleSubmitClick(e, id.staffId, { firstname: updateStaff.firstname, lastname: updateStaff.lastname, email: updateStaff.email.toLowerCase(), role: updateStaff.role, department: departmentList, phoneNumber: +updateStaff.phoneNumber, contactExtension: +updateStaff.contactExtension, createdAt: staff.createdAt })}>
                        <div className={classes.updateDetails}>
                            <label className="la">Staff ID:</label>
                            <p>#{staff.id}</p>
                        </div>


                        <div className={classes.updateDetails}>
                            <label className="lb">First Name:</label>
                            <input type="text" className={classes.input} placeholder='FirstName' name='firstname' autoComplete='true' defaultValue={staff.firstname} onChange={handleChange} />

                        </div>
                        <div className={classes.updateDetails}>
                            <label className="lc">Last Name:</label>
                            <input type="text" className={classes.input} placeholder='LastName' name='lastname' autoComplete='true' defaultValue={staff.lastname} onChange={handleChange} />
                        </div>

                        <div className={classes.deptik}>
                            <label>Department</label>
                            <div className={`${classes.createForm}`}>
                                <input
                                    value={input}
                                    placeholder="Enter a department"
                                    className={classes.createstaffInput}
                                    onKeyDown={onKeyDown}
                                    onKeyUp={onKeyUp}
                                    onChange={onChange}

                                />
                                <div className={classes.departmentParent}>
                                    {departmentList.map((tag, index) => (
                                        <div className={classes.tag}>
                                            {tag} &nbsp;
                                            <button className={classes.tag} onClick={() => deleteTag(index)}>x</button>
                                        </div>
                                    ))}
                                </div>
                            </div>

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
                            <label className="le">Email:</label>
                            <input type="text" placeholder='Email' className={classes.input} autoComplete='true' name='email' defaultValue={staff.email} onChange={handleChange} />
                        </div>


                        <div className={classes.updateDetails}>
                            <label className="lg">PhoneNo:</label>
                            <input type="text" className={classes.input} placeholder='PhoneNo' autoComplete='true' name='phoneNumber' defaultValue={staff.phoneNumber} onChange={handleChange} />
                        </div>

                        <div className={classes.updateDetails}>
                            <label className="lh">ContactEXT:</label>
                            <input type="text" className={classes.input} placeholder='ContactEXT' name='contactExtension' autoComplete='true' defaultValue={staff.contactExtension} onChange={handleChange} />
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