import React, { useState } from 'react';
import classes from './Department.module.css';
import './Dept.css';
import { TagInput } from 'rsuite';
import { Button, Modal, ModalHeader, ModalBody, Container, Input, FormGroup, Label, Form, FormFeedback } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import ShowDept from './ShowDept/ShowDept';

const Department = () => {
    const [departmentName, setDepartmentName] = useState('');
    const [departmentType, setDepartmentType] = useState('');
    const [tags, setTags] = useState([]);
    const [modal, setModal] = useState(false);
    const [formError, setFormError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [departmentId, setDepartmentId] = useState(null);

    const toggle = () => {
        setModal(!modal);
        if (!modal) {
            resetForm();
        }
    };

    const closeBtn = (
        <button className="close" onClick={toggle} type="button">
            &times;
        </button>
    );

    const handleTagChange = (value) => {
        setTags(value);
    };

    const resetForm = () => {
        setDepartmentName('');
        setDepartmentType('');
        setTags([]);
        setFormError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!departmentName || !departmentType || (departmentType === 'service' && tags.length === 0)) {
            setFormError('Please fill in all required fields.');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill in all required fields.'
            });
            return;
        }

        const payload = {
            departmentName: departmentName,
            type: departmentType,
            category: tags
        };

        console.log(payload);

        try {
            if (editMode) {
                await axios.put(`https://hello.helpdesk.met.edu/api/department/editdepartment/${departmentId}`, payload);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Department updated successfully!'
                });
            } else {
                await axios.post('https://hello.helpdesk.met.edu/api/department/createdepartment', payload);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Department created successfully!'
                });
            }
            toggle();
        } catch (error) {
            console.error('Error creating/updating department:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an error creating/updating the department.'
            });
        }
    };

    const handleEdit = (department) => {
        setEditMode(true);
        setDepartmentId(department.id);
        setDepartmentName(department.department);
        setDepartmentType(department.type);
        setTags(department.category);
        console.log(department , department.category , department.type);
        setModal(true);
    };

    return (
        <div className={classes.department}>
            <Container>
                <Button className={classes.deptbtn} onClick={() => { setEditMode(false); toggle(); }}>
                    Create Department
                </Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} close={closeBtn}>{editMode ? 'Edit Department' : 'Create Department'}</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="depttext">Department</Label>
                                <Input
                                    id="depttext"
                                    name="dept"
                                    placeholder="Enter a Department"
                                    type="text"
                                    value={departmentName}
                                    onChange={(e) => setDepartmentName(e.target.value)}
                                    invalid={!!formError && !departmentName}
                                />
                                <FormFeedback>Please enter a department name.</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="deptselect">Department Type</Label>
                                <Input
                                    id="deptselect"
                                    name="select"
                                    type="select"
                                    className={classes.deptselect}
                                    value={departmentType}
                                    onChange={(e) => setDepartmentType(e.target.value)}
                                    invalid={!!formError && !departmentType}
                                    required
                                >
                                    <option value="">Select a type</option>
                                    <option value="service">Service</option>
                                    <option value="regular">Regular</option>
                                </Input>
                                <FormFeedback>Please select a department type.</FormFeedback>
                            </FormGroup>
                            {departmentType === 'service' && (
                                <FormGroup>
                                    <Label for="depttags">Tags</Label>
                                    <TagInput
                                        style={{ width: 300 }}
                                        onChange={handleTagChange}
                                        value={tags}
                                    />
                                </FormGroup>
                            )}
                            <Button type="submit">Submit</Button>
                            {formError && <div className="text-danger mt-2">{formError}</div>}
                        </Form>
                    </ModalBody>
                </Modal>
                <ShowDept onEdit={handleEdit} />
            </Container>
        </div>
    );
};

export default Department;
