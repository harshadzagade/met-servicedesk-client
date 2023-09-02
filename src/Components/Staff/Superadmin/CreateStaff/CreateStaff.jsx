import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import classes from './CreateStaff.module.css';
import { Bars } from 'react-loader-spinner';

const CreateStaff = () => {
    const firstnameRef = useRef();
    const middlenameRef = useRef();
    const lastnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const phoneRef = useRef();
    const extensionRef = useRef();
    const navigate = useNavigate();
    const [department, setDepartment] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [institutes, setInstitutes] = useState([]);
    const [institute, setInstitute] = useState('');
    const [departmentType, setDepartmentType] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    const handleSubmitClick = async (e) => {
        e.preventDefault();
        const data = {
            firstname: firstnameRef.current.value,
            middlename: middlenameRef.current.value,
            lastname: lastnameRef.current.value,
            email: emailRef.current.value.toLowerCase(),
            password: passwordRef.current.value,
            institute: institute,
            department: [department],
            departmentType: departmentType,
            phoneNumber: phoneRef.current.value.length !== 0 ? phoneRef.current.value : null,
            contactExtension: extensionRef.current.value.length !== 0 ? extensionRef.current.value : null
        };
        try {
            setShowLoading(true);
            await axios.post('/api/staff/superadmin/createStaff', data);
            Swal.fire(
                'User Created!',
                'You have created user successfully',
                'success'
            );
            navigate('/', { state: { refreshSuperHome: true } });
            sessionStorage.setItem('tab', 'home');
        } catch (error) {
            if (error.response.status === 422) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to create staff'
                });
            } else {
                console.log(error.message);
            }
        } finally {
            setShowLoading(false);
        }
    };

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


    return (
        <div>
            <main>
                <div className={classes.staffform}>
                    <h2>Create Employee</h2>
                    <div className={`${classes.createStaffform}`}>
                    {showLoading && (
                                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                    <h1>Changing approval status</h1>
                                    <div className='d-flex justify-content-center'>
                                        <Bars
                                            height="80"
                                            width="80"
                                            color="#CE1212"
                                            ariaLabel="bars-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                            visible={true}
                                        />
                                    </div>
                                </div>
                            )}
                        {!showLoading && <div className={`${classes.formStaff}`}>
                            <form method='GET' onSubmit={handleSubmitClick}>
                                <div className={classes.names}>
                                    {/* <div className={`${classes.createForm}`}>
                                        <select name="dog-names" id="dog-names">
                                            <option value="rigatoni">MR.</option>
                                            <option value="dave">DR.</option>
                                            <option value="pumpernickel">MS.</option>
                                        </select>
                                    </div> */}
                                    <div className={`${classes.createForm}`}>
                                        <span>First Name</span>
                                        <input type="text" className={classes.createstaffInput} placeholder="Enter your firstname" ref={firstnameRef} required />
                                    </div>
                                    <div className={`${classes.createForm}`}>
                                        <span>Middle Name</span>
                                        <input type="text" className={classes.createstaffInput} placeholder="Enter your middlename" ref={middlenameRef} required />
                                    </div>
                                    <div className={`${classes.createForm}`}>
                                        <span>Last Name</span>
                                        <input type="text" className={classes.createstaffInput} placeholder="Enter your last name" ref={lastnameRef} required />
                                    </div>
                                </div>
                                <div className={classes.emailpass}>
                                    <div className={`${classes.createForm}`}>
                                        <span>Email</span>
                                        <input type="email" className={classes.createstaffInput} placeholder="Enter your email" ref={emailRef} required />
                                    </div>
                                    <div className={`${classes.createForm}`}>
                                        <span>Password</span>
                                        <input type="password" minLength={6} className={classes.createstaffInput} placeholder="Enter your password" ref={passwordRef} required />
                                    </div>
                                </div>

                                <div className={classes.instDept}>
                                    <div className={classes.institute}>
                                        <span>Institute</span>
                                        <select className={classes.instituteSelect} onChange={(e) => setInstitute(e.target.value)} required>
                                            <option value="" hidden>----- Select Institute -----</option>
                                            {
                                                institutes.map((institute) => (
                                                    <option key={institute.id} value={institute.institute}>{institute.institute}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className={classes.deptik}>
                                        <span>Department</span>
                                        <select className={classes.instituteSelect} onChange={(e) => setDepartment(e.target.value)} required>
                                            <option value="" hidden>----- Select Department -----</option>
                                            {
                                                departments.map((department) => (
                                                    <option key={department.id} value={department}>{department}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className={classes.category}>
                                        <span>Department Type</span>
                                        <select className={classes.categoryType} onChange={(e) => setDepartmentType(e.target.value)} required>
                                            <option value='' hidden>----- Select type -----</option>
                                            <option value='teaching'>teaching</option>
                                            <option value='non-teaching'>non-teaching</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={classes.phone}>
                                    <div className={`${classes.createForm}`} >
                                        <span>Phone Number</span>
                                        <input type="tel" name="phone" minLength={10} maxLength={10} pattern='[1-9]{1}[0-9]{9}' className={classes.createstaffInput} placeholder="Enter your phone number" ref={phoneRef} />
                                    </div>
                                    <div className={`${classes.createForm}`}>
                                        <span>Extension</span>
                                        <input type="number" name="phone" minLength={3} maxLength={3} length='[0-9]{3}' className={classes.createstaffInput} placeholder="enter contact" ref={extensionRef} />
                                    </div>
                                </div>
                                <button type="submit" className={`${classes.createButton}`}>Submit</button>
                            </form>
                        </div>}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateStaff;