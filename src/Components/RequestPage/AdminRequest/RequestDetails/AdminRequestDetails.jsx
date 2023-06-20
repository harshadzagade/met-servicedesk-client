import React from 'react';
import classes from './AdminRequestDetails.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Fragment } from 'react';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import AdminContext from '../../../Context/AdminContext/AdminContext';
import TicketDetailsContext from '../../../Context/TicketDetailsContext/TicketDetailsContext';

const AdminRequestDetails = () => {
    const adminCtx = useContext(AdminContext);
    const paramsId = useParams();
    const id = paramsId.requestId;
    const ticketCtx = useContext(TicketDetailsContext);
    const [requestData, setRequestData] = useState({});
    ticketCtx.onClickHandler('request', requestData.staffId);

    useEffect(() => {
        if (adminCtx.department === requestData.department) {
            adminCtx.setApproval('2')
        } else {
            adminCtx.setApproval('1')
        }
    }, [adminCtx, requestData.department]);

    useEffect(() => {
        const getRequestDetails = async () => {
            const request = await axios.get(`http://localhost:8001/api/request/getrequestdetails/${id}`);
            setRequestData(request.data.request);
        };
        getRequestDetails();
    }, [id]);

    const handleApprovalClick = () => {
        if (adminCtx.department.length !== 0) {
            navigate(`/adminapproval/${id}`)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Please select department',
                text: 'Please enter valid fields'
            });
        }
    };

    const navigate = useNavigate();
    return (
        <Fragment>
            <main>
                <div className={classes.reqdetails}>
                    <h2>Request details</h2>
                    <div className={`${classes.detail}`}>
                        <div >
                            <form className={classes.myform}>
                                <div className={classes.idDetails}>
                                    <label>Request Id:</label>
                                    <p className={classes.complaintDetailsp}>{requestData.id}</p>
                                </div>

                                <hr />

                                <div className={classes.subjectDetails}>
                                    <label>Subject:</label>
                                    <p className={classes.complaintDetailsp}>{requestData.subject}</p>
                                </div>

                                <div className={classes.description}>
                                    <label>Description:</label>
                                    <div dangerouslySetInnerHTML={{ __html: requestData.description }}></div>
                                </div>

                                <hr />

                                <div className={classes.deptper}>
                                    <div className={classes.department}>
                                        <label>Department:</label>
                                        <p className={classes.complaintDetailsp}>{requestData.department}</p>
                                    </div>

                                    <div className={classes.priorityDetails}>
                                        <label>Priority:</label>
                                        <p className={classes.complaintDetailsp}> {requestData.priority}  </p>
                                    </div>
                                </div>


                                <div className={classes.reqsta}>
                                    <div className={classes.ComplaintType}>
                                        <label>Request Type:</label>
                                        <p className={classes.complaintDetailsp}>{requestData.category}</p>
                                    </div>
                                    <div className={classes.name}>
                                        <label>Status:</label>
                                        <p className={classes.complaintDetailsp}>{requestData.status} </p>
                                    </div>
                                </div>
                                <hr />

                                <div className={classes.approval1}>
                                    <div className={classes.approval}>
                                        <label>Admin Approval 1:</label>
                                        <p className={classes.complaintDetailsp}>{requestData.approval1 === 1 ? 'approved' : 'Not approved'}</p>
                                    </div>

                                    <div className={classes.approval}>
                                        <label>Admin 1 commant:</label>
                                        <p className={classes.complaintDetailsp}>{requestData.approval1 ? requestData.approval1Comment : 'Not Commanted'}</p>
                                    </div>
                                    <div className={classes.approval}>
                                        <label>HOD Approval :</label>
                                        <p className={classes.complaintDetailsp}>{requestData.approval2 === 1 ? 'approved' : 'Not approved'}</p>
                                    </div>

                                    <div className={classes.approval}>
                                        <label>HOD Commant :</label>
                                        <p className={classes.complaintDetailsp}>{requestData.approval2 ? requestData.approval2Comment : 'Not Commanted'}</p>
                                    </div>
                                </div>
                                <hr />

                                <div className={classes.techName}>
                                    <label>Technician Name:</label>
                                    <p className={classes.complaintDetailsp}>{requestData.assignedName}</p>
                                </div>



                                <hr />
                                <div className={classes.description}>
                                    <label>Attachment:</label>
                                    <p className={classes.complaintDetailsp}></p>
                                </div>

                                <div className={classes.date}>
                                    <label>Date:</label>
                                    <p className={classes.complaintDetailsp}>{requestData.createdAt}</p>

                                </div>
                                <div>
                                    <button className={classes.complaintAssingBtn} onClick={handleApprovalClick}> Assign To </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>

    );
};


export default AdminRequestDetails