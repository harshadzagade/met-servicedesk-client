import React, { useState } from 'react';
import classes from '../department/Department.module.css';
import '../department/Dept.css';
import { Button, Modal, ModalHeader, ModalBody, Container, Input, FormGroup, Label, Form, FormFeedback } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import ShowInstitute from './ShowInstitute/ShowInstitute';

const Institute = () => {
    const [instituteName, setInstituteName] = useState('');
    const [modal, setModal] = useState(false);
    const [formError, setFormError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [instituteId, setInstituteId] = useState(null);

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

    const resetForm = () => {
        setInstituteName('');
        setFormError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!instituteName){
            setFormError('Please fill in all required fields.');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill in all required fields.'
            });
            return;
        }

        const payload = {
            institute: instituteName,
        };

        try {
            if (editMode) {
                await axios.put(`https://hello.helpdesk.met.edu/api/institute/editinstitute/${instituteId}`, { instituteName: instituteName });
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Institute updated successfully!'
                });
            } else {
                await axios.post('https://hello.helpdesk.met.edu/api/institute/createinstitute', payload);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Institute created successfully!'
                });
            }
            toggle();
        } catch (error) {
            console.error('Error creating/updating Institute:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an error creating/updating the Institute.'
            });
        }
    };

    const handleEdit = (institute) => {
        setEditMode(true);
        setInstituteId(institute.id);
        setInstituteName(institute.institute);
        console.log(institute);
        setModal(true);
    };

    return (
        <div className={classes.department}>
            <Container>
                <Button className={classes.deptbtn} onClick={() => { setEditMode(false); toggle(); }}>
                    Create Institute
                </Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} close={closeBtn}>{editMode ? 'Edit institute' : 'Create institute'}</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="institutettext">Institute Name</Label>
                                <Input
                                    id="institutettext"
                                    name="institute"
                                    placeholder="Enter a Institute"
                                    type="text"
                                    value={instituteName}
                                    onChange={(e) => setInstituteName(e.target.value)}
                                    invalid={!!formError && !instituteName}
                                />
                                <FormFeedback>Please enter a institute name.</FormFeedback>
                            </FormGroup>
                            
                            <Button type="submit">Submit</Button>
                            {formError && <div className="text-danger mt-2">{formError}</div>}
                        </Form>
                    </ModalBody>
                </Modal>
                <ShowInstitute onEdit={handleEdit} />
            </Container>
        </div>
    );
};

export default Institute;
