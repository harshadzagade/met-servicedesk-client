import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import AuthContext from '../../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import { Bars } from 'react-loader-spinner';

const EngineerDetailsRequest = ({ data, updateRequestData }) => {
    const authCtx = useContext(AuthContext);
    const id = authCtx?.employeeInfo?.id;
    const department = authCtx.employeeInfo?.department;
    const [isAttending, setIsAttending] = useState(false);
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
        setIsForwarded(status === 'forwarded');
    }, [status]);

    const handleAttend = async () => {
        setIsAttending(true);
        try {
            await axios.put(`https://hello.helpdesk.met.edu/api/staff/technician/changerequeststatus/${data.id}`, { status: 'attending' });
            updateRequestData(prevData => ({ ...prevData, status: 'attending' }));
            Swal.fire('Success', 'You are now attending this request', 'success');
        } catch (error) {
            Swal.fire('Error', 'Error attending the request', 'error');
        } finally {
            setIsAttending(false);
        }
    };

    const toggleModal = async () => {
        if (!isModalOpen) {
            try {
                const engineers = await axios.get(`https://hello.helpdesk.met.edu/api/staff/technician/techniciandepartmenttechnicians/${id}/${department}`);
                setEngineers(engineers.data.technicians);
            } catch (error) {
                Swal.fire('Error', 'Error fetching engineers', 'error');
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
            await axios.put(`https://hello.helpdesk.met.edu/api/staff/technician/changerequeststatus/${data.id}`, statusData);
            Swal.fire('Success', 'You have changed status successfully', 'success');
            updateRequestData(prevData => ({
                ...prevData,
                status: status,
                assignedName: status === 'forwarded' ? forwardedEngineer : prevData.assignedName,
                problemDescription: problemDescription,
                actionTaken: actionTaken
            }));
            setIsModalOpen(false);
        } catch (error) {
            const errorMsg = error.response && (error.response.status === 422 || error.response.status === 401) ? error.response.data.message : 'Error changing status';
            Swal.fire('Error', errorMsg, 'error');
        } finally {
            setShowLoading(false);
        }
    };

    const handleTechnicianChange = (e) => {
        setForwardedEngineer(e.target.value);
    };

    return (
        <div>
            {authCtx.employeeInfo.firstname + ' ' + authCtx.employeeInfo.lastname === data.assignedName && data.status !== 'attending' && (
                <Button color="primary" onClick={handleAttend} disabled={isAttending}>
                    {isAttending ? 'Attending...' : 'Attend'}
                </Button>
            )}
            {authCtx.employeeInfo.firstname + ' ' + authCtx.employeeInfo.lastname === data.assignedName && data.status === 'attending' && (
                <Button color="primary" onClick={toggleModal}>
                    Change Status
                </Button>
            )}

            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                {showLoading && (
                    <div style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1050,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '50px',
                        borderRadius: '10px'
                    }}>
                        <h1>Changing request status</h1>
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
                {!showLoading && (
                    <>
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
                    </>
                )}
            </Modal>
        </div>
    );
};

export default EngineerDetailsRequest;
