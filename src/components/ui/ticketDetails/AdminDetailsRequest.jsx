import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { Bars } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext/AuthContext';
import AdminContext from '../../../context/AdminContext/AdminContext';

const AdminDetailsRequest = ({ data }) => {
    const authCtx = useContext(AuthContext);
    const adminCtx = useContext(AdminContext);
    const navigate = useNavigate();
    const [approval, setApproval] = useState('approve');
    const [approvalComment, setApprovalComment] = useState('');
    const [technicians, setTechnicians] = useState([]);
    const [technicianId, setTechnicianId] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const approvalCommentRef = useRef(null);

    useEffect(() => {
        const fetchTechnicians = async () => {
            try {
                const response = await axios.get(`https://hello.helpdesk.met.edu/api/staff/admin/admindepartmenttechnicians/${authCtx.employeeInfo.id}/${adminCtx.department}`);
                setTechnicians(response.data.technicians);
            } catch (error) {
                console.error('Error fetching technicians:', error);
                navigate('/request');
            }
        };

        fetchTechnicians();
    }, [authCtx.employeeInfo.id, adminCtx.department, navigate]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleChange = (e) => {
        setApproval(e.target.value);
    };

    const handleTechnicianChange = (e) => {
        setTechnicianId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let approvalValue = approval === 'approve' ? 1 : approval === 'disapprove' ? 2 : null;

        const requestData = {
            department: adminCtx.department,
            approval: approvalValue,
            approvalComment: approvalCommentRef.current.value,
            staffId: approvalValue === 2 ? technicianId : undefined,
        };

        try {
            setShowLoading(true);
            const endpoint = approvalValue === 1
                ? `https://hello.helpdesk.met.edu/api/staff/admin/approval1/${data.id}`
                : `https://hello.helpdesk.met.edu/api/staff/admin/approval2/${data.id}`;

            await axios.put(endpoint, requestData);

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `Request ${approvalValue === 1 ? 'approved' : 'disapproved'} successfully`,
            });

            navigate('/request');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Unable to submit approval',
            });
            console.error('Approval error:', error);
        } finally {
            setShowLoading(false);
        }
    };

    return (
        <div>
            {/* Button to initiate approval process */}
            <Button
                color="primary"
                onClick={toggleModal}
                disabled={data.status === 'closed' || (data.approval1 !== null && data.approval2 !== null)}
            >
                {(data.approval1 !== null && data.approval2 === null) ? 'Approve (Step 2)' : 'Approve'}
            </Button>

            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Change Status</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="approvalStatus">Change Status:</Label>
                            <Input type="select" name="approvalStatus" id="approvalStatus" value={approval} onChange={handleChange} required>
                                <option value="approve">Approve</option>
                                <option value="disapprove">Disapprove</option>
                            </Input>
                        </FormGroup>

                        {(approval === 'approve' && data.approval1 !== null) && (
                            <FormGroup>
                                <Label for="technician">Select Technician:</Label>
                                <Input type="select" name="technician" id="technician" value={technicianId} onChange={handleTechnicianChange} required>
                                    <option value="">Select Technician</option>
                                    {technicians.map((technician) => (
                                        <option key={technician.id} value={technician.id}>
                                            {`${technician.firstname} ${technician.lastname} (${technician.busyStatus ? 'Busy' : 'Available'})`}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                        )}

                        <FormGroup>
                            <Label for="comment">Comment:</Label>
                            <Input type="text" id="comment" innerRef={approvalCommentRef} value={approvalComment} onChange={(e) => setApprovalComment(e.target.value)} required />
                        </FormGroup>

                        <ModalFooter>
                            <Button color="primary" type="submit" disabled={showLoading}>
                                {showLoading ? <Bars height={15} width={100} color="#fff" /> : 'Submit'}
                            </Button>{' '}
                            <Button color="secondary" onClick={toggleModal} disabled={showLoading}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default AdminDetailsRequest;
