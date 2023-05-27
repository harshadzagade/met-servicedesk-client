import React, { useContext, useEffect, useRef, useState } from 'react';
import Modal from '../../../../UI/Modal/Modal';
import classes from './RequestApproval.module.css'
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AdminContext from '../../../../../Context/AdminContext/AdminContext';

const RequestApproval = (props) => {
    const loginId = localStorage.getItem('id');
    const navigate = useNavigate();
    const departmentCtx = useContext(AdminContext);
    const { search } = useLocation();
    const id = useParams();
    const approvalCommentRef = useRef();
    const [approval, setApproval] = useState('approve');
    const [isApproval2, setIsApproval2] = useState(false);
    const [technicians, setTechnicians] = useState([]);
    const [technicianId, setTechnicianId] = useState(null);
    const [assignDisability, setAssignDisability] = useState('');

    useEffect(() => {
        if (approval === 'disapprove') {
            setAssignDisability('checked');
            setTechnicianId(null);
        } else {
            setAssignDisability('');
        }
    }, [approval]);

    useEffect(() => {
        if (search.charAt(search.length - 1) === '2') {
            setIsApproval2(true);
        } else if (search.charAt(search.length - 1) === '1') {
            setIsApproval2(false);
        }
    }, [search]);

    useEffect(() => {
        const getTechnicians = async () => {
            try {
                const technicians = await axios.get(`http://localhost:8001/api/staff/admin/admindepartmenttechnicians/${loginId}/${departmentCtx.department}`);
                setTechnicians(technicians.data.technicians);
            } catch (error) {
                navigate('/request');
                Swal.fire({
                    icon: 'error',
                    title: 'Please select department',
                    text: 'Please enter valid fields'
                });
            }
        };
        getTechnicians();
    }, [loginId, departmentCtx.department, navigate]);

    const handleSubmitClick = async (e, id) => {
        e.preventDefault();
        let approvalValue = null;
        if (approval === 'approve') {
            approvalValue = 1;
        } else if (approval === 'disapprove') {
            approvalValue = 2;
        } else {
            approvalValue = null;
        }
        const approval1data = {
            approval: approvalValue,
            approvalComment: approvalCommentRef.current.value
        };
        const approval2data = {
            staffId: technicianId,
            approval: approvalValue,
            approvalComment: approvalCommentRef.current.value
        };
        try {
            if (isApproval2) {
                await axios.put(`http://localhost:8001/api/staff/admin/approval2/${id}`, approval2data);
            } else {
                await axios.put(`http://localhost:8001/api/staff/admin/approval1/${id}`, approval1data);
            }
            props.onConfirm();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `${error.response.data.message}`,
                text: 'Please enter valid fields'
            });
        }
    };

    const handleChange = (e) => {
        setApproval(e.target.value);
    };

    const handleTechnicianChange = (e) => {
        setTechnicianId(e.target.value);
    };

    return (
        <Modal>
            <form method="GET" onSubmit={(e) => handleSubmitClick(e, id.requestId)}>
                <div className={`${classes.updateApprovalHeading}`}>Approval</div>
                <select className={`${classes.approvalSelect} form-control`} name="role" required onChange={handleChange}>
                    <option key='0' value='' hidden defaultValue='' className={`${classes.approvalOption}`}>Set Approval Status</option>
                    <option key='1' value='approve' className={`${classes.approvalOption}`}>Approve</option>
                    <option key='2' value='disapprove' className={`${classes.approvalOption}`}>Disapprove</option>
                </select>
                {
                    isApproval2 &&
                    <select className={`${classes.approvalSelect} form-control`} disabled={assignDisability} name="role" required onChange={handleTechnicianChange}>
                        <option key='0' value='' hidden defaultValue='' className={`${classes.approvalOption}`}>Assign to technician</option>
                        {
                            technicians.map((technician) =>
                                <option key={technician.id} className={`${classes.roleOption}`} value={technician.id}>{technician.firstname}</option>
                            )
                        }
                    </select>
                }
                <input type="text" className={`${classes.updateApprovalInput} form-control`} placeholder='Comments' ref={approvalCommentRef} />
                <div className={`${classes.updateLayoutButtons}`}>
                    <button type="submit" className={`btn ${classes.updateButton}`}>Submit</button>
                    <button className={`btn ${classes.cancelButton}`} onClick={props.onConfirm}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
};

export default RequestApproval;