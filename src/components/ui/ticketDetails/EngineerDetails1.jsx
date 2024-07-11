import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import AuthContext from '../../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import { Bars } from 'react-loader-spinner';

const EngineerDetails = ({ data, updateTicketData }) => {
    const authCtx = useContext(AuthContext);
    const id = authCtx?.employeeInfo?.id;
    const department = authCtx.employeeInfo?.department;
    const [isAssigning, setIsAssigning] = useState(false);
    const [isForwarded, setIsForwarded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [forwardedEngineer, setForwardedEngineer] = useState('');
    const [problemDescription, setProblemDescription] = useState('');
    const [actionTaken, setActionTaken] = useState('');
    const [forwardComment, setForwardComment] = useState('');
    const [engineers, setEngineers] = useState([]);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        if (status === 'forwarded') {
            setIsForwarded(true);
        } else {
            setIsForwarded(false);
        }
    }, [status]);

    const handleSelfAssign = async () => {
        setIsAssigning(true);
        try {
            await axios.put(`https://hello.helpdesk.met.edu/api/staff/technician/selfassigncomplaint/${data.id}/${id}`);
            updateTicketData(prevData => ({ ...prevData, assignedName: `${authCtx.employeeInfo.firstname} ${authCtx.employeeInfo.lastname}` }));
            setIsAssigning(false);
        } catch (error) {
            console.error('Error during self-assignment:', error);
            setIsAssigning(false);
        }
    };

    const toggleModal = async () => {
        if (!isModalOpen) {
            try {
                const engineers = await axios.get(`https://hello.helpdesk.met.edu/api/staff/technician/techniciandepartmenttechnicians/${id}/${department}`);
                setEngineers(engineers.data.technicians);
            } catch (error) {
                console.error('Error fetching engineers:', error);
            }
        }
        setIsModalOpen(!isModalOpen);
    };

    const handleChangeStatus = async () => {
        const statusData = {
            status: status,
            assign: forwardedEngineer || null,
            forwardComment: forwardComment || null,
            problemDescription: problemDescription,
            actionTaken: actionTaken
        };

        try {
            setShowLoading(true);
            console.log(data.id);
            await axios.put(`https://hello.helpdesk.met.edu/api/staff/technician/changecomplaintstatus/${data.id}`, statusData);
            Swal.fire('Changed status', 'You have changed status successfully', 'success');
            setIsModalOpen(false);
        } catch (error) {
            if (error.response && (error.response.status === 422 || error.response.status === 401)) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to change status'
                });
            } else {
                console.error('Error changing status:', error);
            }
        } finally {
            setShowLoading(false);
        }
    };

    const handleTechnicianChange = (e) => {
        setForwardedEngineer(e.target.value);
    };

    return (
        <div>
            {showLoading && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <h1>Changing complaint status</h1>
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
            {!showLoading && authCtx.employeeInfo.firstname + ' ' + authCtx.employeeInfo.lastname === data.assignedName && (
                <Button color="primary" onClick={() => {
                    if (data.assignedName) {
                        toggleModal();
                    } else {
                        handleSelfAssign();
                    }
                }} disabled={isAssigning}>
                    {isAssigning ? 'Assigning...' : (data.assignedName ? 'Change Status' : 'Self Assign')}
                </Button>
            )}

            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Change Status</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="status">Change Status</Label>
                            <Input type="select" id="status" className='w-100 p-1' value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="">Select</option>
                                <option value="closed">Closed</option>
                                <option value="forwarded">Forwarded</option>
                            </Input>
                        </FormGroup>
                        {status === 'forwarded' && (
                            <FormGroup>
                                <Label for="forwardedEngineer">Forward to Engineer</Label>
                                <Input type="select" id="forwardedEngineer" className='w-100 p-1' value={forwardedEngineer} onChange={handleTechnicianChange}>
                                    <option value="">Select</option>
                                    {engineers.map(engineer => (
                                        <option key={engineer.id} value={engineer.id}>{engineer.firstname + ' ' + engineer.lastname}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        )}
                        <FormGroup>
                            <Label for="problemDescription">Problem Description</Label>
                            <Input type="textarea" id="problemDescription" value={problemDescription} onChange={(e) => setProblemDescription(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="actionTaken">Action Taken</Label>
                            <Input type="textarea" id="actionTaken" value={actionTaken} onChange={(e) => setActionTaken(e.target.value)} />
                        </FormGroup>
                        {status === 'forwarded' && (
                            <FormGroup>
                                <Label for="forwardComment">Forward Comment</Label>
                                <Input type="textarea" id="forwardComment" value={forwardComment} onChange={(e) => setForwardComment(e.target.value)} />
                            </FormGroup>
                        )}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleChangeStatus}>Save</Button>
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default EngineerDetails;
