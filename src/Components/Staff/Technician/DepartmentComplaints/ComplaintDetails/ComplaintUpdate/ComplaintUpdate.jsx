import React, { useEffect, useRef, useState } from 'react';
import Modal from '../../../../../UI/Modal/Modal';
import classes from './ComplaintUpdate.module.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const ComplaintUpdate = (props) => {
    const problemDescriptionRef = useRef();
    const actionTakenRef = useRef();
    const forwardCommentRef = useRef();
    const loginId = localStorage.getItem('id');
    const navigate = useNavigate();
    const id = useParams();
    const [technicians, setTechnicians] = useState([]);
    const [technicianId, setTechnicianId] = useState(null);
    const [isClosed, setIsClosed] = useState(false);
    const [isForwarded, setIsForwarded] = useState(false);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const getTechnicians = async () => {
            try {
                const technician = await axios.get(`http://localhost:8001/api/staff/superadmin/staffdetails/${loginId}`);
                const technicians = await axios.get(`http://localhost:8001/api/staff/technician/techniciandepartmenttechnicians/${loginId}/${technician.data.staff.department}`);
                setTechnicians(technicians.data.technicians);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Please enter valid fields'
                });
            }
        };
        getTechnicians();
    }, [loginId, navigate]);

    useEffect(() => {
        switch (status) {
            case 'closed':
                setIsClosed(true);
                setIsForwarded(false);
                break;

            case 'forwarded':
                setIsForwarded(true);
                setIsClosed(false);
                break;

            default:
                setIsForwarded(false);
                setIsClosed(false);
                break;
        }
    }, [status])

    const handleSubmitClick = async (e, id) => {
        e.preventDefault();
        const data = {
            status: status,
            assign: technicianId,
            forwardComment: forwardCommentRef.current ? forwardCommentRef.current.value : null,
            problemDescription: problemDescriptionRef.current ? problemDescriptionRef.current.value : null,
            actionTaken: actionTakenRef.current ? actionTakenRef.current.value : null
        }
        try {
            await axios.put(`http://localhost:8001/api/staff/technician/changecomplaintstatus/${id}`, data);
            props.onConfirm();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `${error.response.data.message}`,
                text: 'Please enter valid fields'
            });
        }
    };

    const handleTechnicianChange = (e) => {
        setTechnicianId(e.target.value);
    };

    return (
        <Modal>
            <form method="GET" onSubmit={(e) => handleSubmitClick(e, id.complaintId)}>
                <div className={`${classes.updateStatusHeading}`}>Status Change</div>
                <select className={`${classes.statusSelect} form-control`} name="role" required onChange={(e) => setStatus(e.target.value)}>
                    <option key='0' value='' hidden defaultValue='' className={`${classes.statusOption}`}>Set Approval Status</option>
                    <option key='1' value='attending' className={`${classes.statusOption}`}>Attending</option>
                    <option key='2' value='closed' className={`${classes.statusOption}`}>Closed</option>
                    <option key='3' value='forwarded' className={`${classes.statusOption}`}>Forwarded</option>
                </select>
                {
                    isForwarded &&
                    <select className={`${classes.statusSelect} form-control`} name="role" required onChange={handleTechnicianChange}>
                        <option key='0' value='' hidden defaultValue='' className={`${classes.statusOption}`}>Assign to technician</option>
                        {
                            technicians.map((technician) =>
                                <option key={technician.id} className={`${classes.statusOption}`} value={technician.id}>{technician.firstname + ' ' + technician.lastname}</option>
                            )
                        }
                    </select>
                }
                {isClosed && <input type="text" className={`${classes.updateStatusInput} form-control`} placeholder='Problem Description' ref={problemDescriptionRef} />}
                {isClosed && <input type="text" className={`${classes.updateStatusInput} form-control`} placeholder='Action Taken' ref={actionTakenRef} />}
                {isForwarded && <input type="text" className={`${classes.updateStatusInput} form-control`} placeholder='Forward Comment' ref={forwardCommentRef} />}
                <div className={`${classes.updateLayoutButtons}`}>
                    <button type="submit" className={`btn ${classes.updateButton}`}>Submit</button>
                    <button className={`btn ${classes.cancelButton}`} onClick={props.onConfirm}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
};

export default ComplaintUpdate;