import React, { useState, useContext, useEffect, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import AuthContext from '../../../context/AuthContext/AuthContext';
import AdminContext from '../../../context/AdminContext/AdminContext';
import Swal from 'sweetalert2';
import { Bars } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import openSocket from 'socket.io-client';

const AdminDetailsRequest = ({ data, updateTicketData }) => {
    const authCtx = useContext(AuthContext);
    const adminCtx = useContext(AdminContext);
    const id = authCtx?.employeeInfo?.id;
    const department = authCtx.employeeInfo?.department;
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [engineers, setEngineers] = useState([]);
    const [selectedEngineer, setSelectedEngineer] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [requestList, setRequestList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [approval, setApproval] = useState('approve');
    const approvalCommentRef = useRef();

    useEffect(() => {
        const socket = openSocket('');
        const getList = async () => {
            try {
                const list = await axios.get(`https://hello.helpdesk.met.edu/api/staff/admin/requests/incoming/${adminCtx.department}`);
                if (list.data.requests.length === 0) {
                    setErrorMessage('No requests available');
                }
                setRequestList(list.data.requests);
            } catch (error) {
                setErrorMessage(`${error.message}`);
            }
        };

        if (adminCtx.department) {
            getList();
            socket.on('requests', () => {
                getList();
            });
            socket.on('requestStatus', () => {
                getList();
            });
        } else {
            setErrorMessage('Please select department');
        }
    }, [adminCtx.department]);

    useEffect(() => {
        if (isModalOpen) {
            const fetchEngineers = async () => {
                try {
                    const response = await axios.get(`https://hello.helpdesk.met.edu/api/staff/admin/admindepartmenttechnicians/${id}/${adminCtx.department}`);
                    setEngineers(response.data.technicians);
                } catch (error) {
                    Swal.fire('Error', 'Error fetching engineers', 'error');
                }
            };
            fetchEngineers();
        }
    }, [isModalOpen, id, adminCtx.department]);

    const handleRequestClick = (id) => {
        adminCtx.setApproval('2');
        navigate(`/adminrequestdetails/${id}`);
    };

    const handleOutgoingRequestClick = (id) => {
        adminCtx.setApproval('1');
        navigate(`/adminrequestdetails/${id}`);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleAssignEngineer = async () => {
        try {
            setShowLoading(true);
            const approvalData = {
                department: adminCtx.department,
                staffId: selectedEngineer,
                approval: approval === 'approve' ? 1 : 2,
                approvalComment: approvalCommentRef.current.value
            };
            if (adminCtx.approval === '2') {
                await axios.put(`https://hello.helpdesk.met.edu/api/staff/admin/approval2/${data.id}`, approvalData);
            } else {
                await axios.put(`https://hello.helpdesk.met.edu/api/staff/admin/approval1/${data.id}`, approvalData);
            }
            Swal.fire('Success', 'Request assigned and approved successfully', 'success');
            const assignedEngineer = engineers.find(engineer => engineer.id === selectedEngineer);
            updateTicketData(prevData => ({
                ...prevData,
                assignedName: `${assignedEngineer.firstname} ${assignedEngineer.lastname}`
            }));
            setIsModalOpen(false);
        } catch (error) {
            const errorMsg = error.response && (error.response.status === 422 || error.response.status === 401) ? error.response.data.message : 'Error assigning request';
            Swal.fire('Error', errorMsg, 'error');
        } finally {
            setShowLoading(false);
        }
    };

    const handleEngineerChange = (e) => {
        setSelectedEngineer(e.target.value);
    };

    const handleChange = (e) => {
        setApproval(e.target.value);
    };

    return (
        <div>
            {!data.assignedName && (
                <Button color="primary" onClick={toggleModal}>
                    Assign to Engineer
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
                        <h1>Assigning request</h1>
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
                        <ModalHeader toggle={toggleModal}>Approval and Assignment</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="approval">Approval Status</Label>
                                    <Input type="select" id="approval" className='w-100 p-1' value={approval} onChange={handleChange}>
                                        <option value="approve">Approve</option>
                                        <option value="disapprove">Disapprove</option>
                                    </Input>
                                </FormGroup>
                                {adminCtx.approval === '2' && (
                                    <>
                                        <FormGroup>
                                            <Label for="engineer">Select Engineer</Label>
                                            <Input type="select" id="engineer" className='w-100 p-1' value={selectedEngineer} onChange={handleEngineerChange}>
                                                <option value="">Select</option>
                                                {engineers.map(engineer => (
                                                    <option key={engineer.id} value={engineer.id}>{engineer.firstname + ' ' + engineer.lastname}</option>
                                                ))}
                                            </Input>
                                        </FormGroup>
                                    </>
                                )}
                                <FormGroup>
                                    <Label for="comment">Comment</Label>
                                    <Input type="text" id="comment" className='w-100 p-1' placeholder="Enter your comment" ref={approvalCommentRef} required />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={handleAssignEngineer}>Submit</Button>
                            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                        </ModalFooter>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default AdminDetailsRequest;
