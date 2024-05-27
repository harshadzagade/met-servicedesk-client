import React, { useRef, useState } from 'react';
import classes from './CreateEmployee.module.css';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateEmployee = () => {

    const firstnameRef = useRef();
    const middlenameRef = useRef();
    const lastnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const phoneRef = useRef();
    const extnRef = useRef();
    const navigate = useNavigate();

    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);

    const getDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/departments');
            setDepartments(response.data);
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className='' >
            <Container>
            <h3>
                Create Employee
            </h3>
            </Container>
            <Container className={classes.cremp}>
                <Form>
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="firstname">
                                    First Name
                                </Label>
                                <Input
                                    id="firstname"
                                    name="fname"
                                    placeholder="Enter your firstname"
                                    type="text"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="middlename">
                                    Middle Name
                                </Label>
                                <Input
                                    id="middlename"
                                    name="mname"
                                    placeholder="Enter your Middlename"
                                    type="text"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="lastname">
                                    Last Name
                                </Label>
                                <Input
                                    id="lastname"
                                    name="lname"
                                    placeholder="Enter your Lastname"
                                    type="text"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="emailid">
                                    Email Id
                                </Label>
                                <Input
                                    id="emailid"
                                    name="password"
                                    placeholder="Enter your Email Id"
                                    type="email"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="Password">
                                    Password
                                </Label>
                                <Input
                                    id="Password"
                                    name="password"
                                    placeholder="Enter your password"
                                    type="password"
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="selectdept">
                                    Institute
                                </Label> <br />
                                <Input
                                    id="selectdept"
                                    name="selectdept"
                                    type="select"
                                    className='w-100 p-1'
                                >
                                    <option>
                                        1
                                    </option>
                                    <option>
                                        2
                                    </option>
                                    <option>
                                        3
                                    </option>
                                    <option>
                                        4
                                    </option>
                                    <option>
                                        5
                                    </option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="selectdept">
                                    Department
                                </Label> <br />
                                <Input
                                    id="selectdept"
                                    name="selectdept"
                                    type="select"
                                    className='w-100 p-1'
                                >
                                    <option>
                                        1
                                    </option>
                                    <option>
                                        2
                                    </option>
                                    <option>
                                        3
                                    </option>
                                    <option>
                                        4
                                    </option>
                                    <option>
                                        5
                                    </option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="selectdepttype">
                                    Department Type
                                </Label> <br />
                                <Input
                                    id="selectdepttype"
                                    name="selectdepttype"
                                    type="select"
                                    className='w-100 p-1'
                                >
                                    <option>
                                        1
                                    </option>
                                    <option>
                                        2
                                    </option>
                                    <option>
                                        3
                                    </option>
                                    <option>
                                        4
                                    </option>
                                    <option>
                                        5
                                    </option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="number">
                                    Phone Number
                                </Label>
                                <Input
                                    id="number"
                                    name="phonenumber"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleState">
                                    Extension
                                </Label>
                                <Input
                                    id="exampleState"
                                    name="state"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <br />
                    <Button>
                        Submit
                    </Button>
                </Form>
            </Container>
        </div >
    );
};

export default CreateEmployee;