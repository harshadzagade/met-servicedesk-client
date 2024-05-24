import React, { useState } from 'react';
import classes from './Department.module.css';
import { Button, Modal, ModalHeader, ModalBody, Container, Input, FormGroup, Label, Form } from 'reactstrap';

const Department = () => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const closeBtn = (
        <button className="close" onClick={toggle} type="button">
            &times;
        </button>
    );

    return (
        <div className={classes.department}>
            <Container>
                <Button className={classes.deptbtn} onClick={toggle}>
                    Create Department
                </Button>
                <Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle} close={closeBtn}>Modal title</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="depttext">
                                    Department
                                </Label>
                                <Input
                                    id="depttext"
                                    name="dept"
                                    placeholder="Enter a Department"
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="deptselect">
                                    Select
                                </Label> <br />
                                <Input
                                    id="deptselect"
                                    name="select"
                                    type="select"
                                    className={classes.deptselect}
                                >
                                    <option>
                                        regular
                                    </option>
                                    <option>
                                        service
                                    </option>
                                </Input>
                            </FormGroup>
                            <Button>
                                Submit
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </Container>
        </div>
    );
}


export default Department;