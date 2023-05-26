import React, { useRef, useState } from 'react';
import Modal from '../../../../UI/Modal/Modal';
import classes from './RequestApproval.module.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const RequestApproval = (props) => {
    const id = useParams();
    const approvalCommentRef = useRef();
    const [approval, setApproval] = useState('approve');

    const handleSubmitClick = async (e, id) => {
        e.preventDefault();
        let approval1 = null;
        if (approval === 'approve') {
            approval1 = 1;
        } else if (approval === 'disapprove') {
            approval1 = 2;
        } else {
            approval1 = null;
        }
        const data = {
            approval: approval1,
            approvalComment: approvalCommentRef.current.value
        };
        try {
            await axios.put(`http://localhost:8001/api/staff/admin/approval1/${id}`, data);
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

    return (
        <Modal>
            <form method="GET" onSubmit={(e) => handleSubmitClick(e, id.requestId)}>
                <div className={`${classes.updateApprovalHeading}`}>Approval</div>
                <select className={`${classes.approvalSelect} form-control`} name="role" required onChange={handleChange}>
                    <option value='' hidden selected className={`${classes.approvalOption}`}>Set Approval Status</option>
                    <option value='approve' className={`${classes.approvalOption}`}>Approve</option>
                    <option value='disapprove' className={`${classes.approvalOption}`}>Disapprove</option>
                </select>
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