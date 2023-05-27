import React, { useContext, useEffect, useRef, useState } from 'react';
import Modal from '../../../../../UI/Modal/Modal';
import classes from './ComplaintUpdate.module.css'
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AdminContext from '../../../../../../Context/AdminContext/AdminContext';

const ComplaintUpdate = (props) => {
    const id = useParams();

    // useEffect(() => {
    //     const getTechnicians = async () => {
    //         try {
    //             const technicians = await axios.get(`http://localhost:8001/api/staff/admin/admindepartmenttechnicians/${loginId}/${adminCtx.department}`);
    //             setTechnicians(technicians.data.technicians);
    //         } catch (error) {
    //             navigate('/request');
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Please select department',
    //                 text: 'Please enter valid fields'
    //             });
    //         }
    //     };
    //     getTechnicians();
    // }, [loginId, adminCtx.department, navigate]);

    const handleSubmitClick = async (e, id) => {
        e.preventDefault();
    };

    const handleChange = (e) => {
        // setApproval(e.target.value);
    };

    return (
        <Modal>
            <form method="GET" onSubmit={(e) => handleSubmitClick(e, id.requestId)}>
                {/* <div className={`${classes.updateApprovalHeading}`}>Approval</div>
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
                </div> */}
            </form>
        </Modal>
    );
};

export default ComplaintUpdate;