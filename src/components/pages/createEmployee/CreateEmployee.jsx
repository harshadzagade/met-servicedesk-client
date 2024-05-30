import React, { useEffect, useRef, useState } from 'react';
import classes from './CreateEmployee.module.css';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Comment } from 'react-loader-spinner';

const CreateEmployee = () => {

    const firstnameRef = useRef();
    const middlenameRef = useRef();
    const lastnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const phoneRef = useRef();
    const extnRef = useRef();
    const navigate = useNavigate();

    const [institute, setInstitute] = useState('');
    const [institutes, setInstitutes] = useState([]);

    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const [departmentType, setDepartmentType] = useState('');

    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        const getInstitutes = async () => {
            try {
                const response = await axios.get(`https://hello.helpdesk.met.edu/api/institute/`);
                setInstitutes(response.data.instituteData);
            } catch (error) {
                console.log(error.message);
            }
        };
        getInstitutes();
    }, []);

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const response = await axios.get(`https://hello.helpdesk.met.edu/api/department/alldepartments`);
                setDepartments(response.data.departments);
            } catch (error) {
                console.log(error.message);
            }
        };
        getDepartments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            firstname: firstnameRef.current.value,
            middlename: middlenameRef.current.value,
            lastname: lastnameRef.current.value,
            email: emailRef.current.value?.toLowerCase(),
            password: passwordRef.current.value,
            phoneNumber: phoneRef.current.value?.length !== 0 ? phoneRef.current.value : null,
            contactExtension: extnRef.current.value?.length !== 0 ? extnRef.current.value : null,
            institute: institute,
            department: [department],
            departmentType: departmentType,
        }

        console.log("Data: ", data);

        try {
            setShowLoading(true);
            await axios.post('https://hello.helpdesk.met.edu/api/staff/superadmin/createStaff', data);
            Swal.fire(
                'User Created!',
                'You have created user successfully',
                'success'
            );
            navigate('/', { state: { refreshSuperHome: true } });
            sessionStorage.setItem('tab', 'home');
        } catch (error) {
            if (error.response && error.response.status === 422) {
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

    return (
        <div className={classes.createEmployee}>
            <Container>
                <h3>Create Employee</h3>
            </Container>
            {showLoading ? (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <h1>Creating employee account</h1>
                    <div className='d-flex justify-content-center'>
                        <Comment
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="comment-loading"
                            wrapperStyle={{}}
                            wrapperClass="comment-wrapper"
                            color="#fff"
                            backgroundColor="#F4442E"
                        />
                    </div>
                </div>
            ) : (
                <Container className={classes.cremp}>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="firstname">First Name</Label>
                                    <Input id="firstname" name="fname" placeholder="Enter your firstname" type="text" innerRef={firstnameRef} />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="middlename">Middle Name</Label>
                                    <Input id="middlename" name="mname" placeholder="Enter your Middlename" type="text" innerRef={middlenameRef} />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="lastname">Last Name</Label>
                                    <Input id="lastname" name="lname" placeholder="Enter your Lastname" type="text" innerRef={lastnameRef} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="emailid">Email Id</Label>
                                    <Input id="emailid" name="email" placeholder="Enter your Email Id" type="email" innerRef={emailRef} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="Password">Password</Label>
                                    <Input id="Password" name="password" placeholder="Enter your password" type="password" innerRef={passwordRef} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="selectInstitute">Institute</Label>
                                    <Input id="selectInstitute" name="selectInstitute" type="select" className='w-100 p-1' onChange={(e) => setInstitute(e.target.value)} required>
                                        <option key={'default'} value="" hidden>----- Select Institute -----</option>
                                        {institutes.map((institute) => (
                                            <option key={institute.id} value={institute.institute}>{institute.institute}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="selectDepartment">Department</Label>
                                    <Input id="selectDepartment" name="selectDepartment" type="select" className='w-100 p-1' onChange={(e) => setDepartment(e.target.value)} required>
                                        <option key={'default'} value="" hidden>----- Select Department -----</option>
                                        {departments.map((department) => (
                                            <option key={department} value={department}>{department}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="selectDeptType">Department Type</Label>
                                    <Input id="selectDeptType" name="selectDeptType" type="select" className='w-100 p-1' onChange={(e) => setDepartmentType(e.target.value)} required>
                                        <option key={'default'} value='' hidden>----- Select type -----</option>
                                        <option key={'teaching'} value='teaching'>teaching</option>
                                        <option key={'non-teaching'} value='non-teaching'>non-teaching</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="number">Phone Number</Label>
                                    <Input id="number" name="phonenumber" placeholder="Enter your phone number" type="tel" minLength={10} maxLength={10} pattern='[1-9]{1}[0-9]{9}' innerRef={phoneRef} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="extension">Extension</Label>
                                    <Input id="extension" name="extension" placeholder="Enter your extension" type="number" minLength={3} maxLength={3} innerRef={extnRef} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <br />
                        <Button type="submit">Submit</Button>
                    </Form>
                </Container>
            )}
        </div>
    );
};

export default CreateEmployee;
