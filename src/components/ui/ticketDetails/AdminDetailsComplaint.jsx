import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import AuthContext from '../../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import { Bars } from 'react-loader-spinner';

const AdminDetailsComplaint = ({ data, updateTicketData }) => {
    const authCtx = useContext(AuthContext);
    const id = authCtx?.employeeInfo?.id;
    const department = authCtx.employeeInfo?.department;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [engineers, setEngineers] = useState([]);
    const [selectedEngineer, setSelectedEngineer] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    const toggleModal = async () => {
        if (!isModalOpen) {
            try {
                const response = await axios.get(`https://hello.helpdesk.met.edu/api/staff/admin/admindepartmenttechnicians/${id}/${department}`);
                setEngineers(response.data.technicians);
            } catch (error) {
                Swal.fire('Error', 'Error fetching engineers', 'error');
            }
        }
        setIsModalOpen(!isModalOpen);
    };

    const handleAssignEngineer = async () => {
        try {
            setShowLoading(true);
            await axios.put(`https://hello.helpdesk.met.edu/api/staff/admin/assigncomplaint/${data.id}`, { engineerId: selectedEngineer });
            Swal.fire('Success', 'Complaint assigned successfully', 'success');
            const assignedEngineer = engineers.find(engineer => engineer.id === selectedEngineer);
            updateTicketData(prevData => ({
                ...prevData,
                assignedName: `${assignedEngineer.firstname} ${assignedEngineer.lastname}`
            }));
            setIsModalOpen(false);
        } catch (error) {
            const errorMsg = error.response && (error.response.status === 422 || error.response.status === 401) ? error.response.data.message : 'Error assigning complaint';
            Swal.fire('Error', errorMsg, 'error');
        } finally {
            setShowLoading(false);
        }
    };

    const handleEngineerChange = (e) => {
        setSelectedEngineer(e.target.value);
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
                        <h1>Assigning complaint</h1>
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
                        <ModalHeader toggle={toggleModal}>Assign to Engineer</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="engineer">Select Engineer</Label>
                                    <Input type="select" id="engineer" className='w-100 p-1' value={selectedEngineer} onChange={handleEngineerChange}>
                                        <option value="">Select</option>
                                        {engineers.map(engineer => (
                                            <option key={engineer.id} value={engineer.id}>{engineer.firstname + ' ' + engineer.lastname}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={handleAssignEngineer}>Assign</Button>
                            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                        </ModalFooter>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default AdminDetailsComplaint;
