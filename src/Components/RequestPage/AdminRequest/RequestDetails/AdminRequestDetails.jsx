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
    const navigate = useNavigate();
    const adminCtx = useContext(AdminContext);
    const paramsId = useParams();
    const id = paramsId.requestId;
    const ticketCtx = useContext(TicketDetailsContext);
    const [requestData, setRequestData] = useState({});
    ticketCtx.onClickHandler('request', requestData.staffId, requestData.id);

    useEffect(() => {
        if (adminCtx.department === requestData.department) {
            adminCtx.setApproval('2')
        } else {
            adminCtx.setApproval('1')
        }
    }, [adminCtx, requestData.department]);

    useEffect(() => {
        const getRequestDetails = async () => {
            const request = await axios.get(`/api/request/getrequestdetails/${id}`);
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

    const getCreatedRequestDate = (createdAt) => {
        const date = new Date(createdAt);
        return (date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + formatAMPM(date));
    };

    const formatAMPM = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
        return strTime;
    }

    return (
        <Fragment>
            <main>
                <div className={classes.reqdetails}>
                    <h2>Request details</h2>
                    <div className={`${classes.detail}`}>
                        <div>
                            <form className={classes.myform}>
                                <div className={classes.idDetails}>
                                    <label>Request Id:</label>
                                    <p className={classes.complaintDetailsp}>#{requestData.id}</p>
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
                                        <label>HOD Approval:</label>
                                        <p className={classes.complaintDetailsp}>{(requestData.approval1 === 1 && 'approved') || (requestData.approval1 === 2 && 'Disapproved') || (requestData.approval1 === null && 'Not updated')}</p>
                                    </div>
                                    {
                                        requestData.approval1 &&
                                        <div className={classes.approval}>
                                            <label>HOD Comment:</label>
                                            <p className={classes.complaintDetailsp}>{requestData.approval1 ? requestData.approval1Comment : 'Not Commented'}</p>
                                        </div>
                                    }
                                    <div className={classes.approval}>
                                        <label>Admin Approval:</label>
                                        <p className={classes.complaintDetailsp}>{(requestData.approval2 === 1 && 'Approved') || (requestData.approval2 === 2 && 'Disapproved') || (requestData.approval2 === null && 'Not updated')}</p>
                                    </div>
                                    {
                                        requestData.approval2 &&
                                        <div className={classes.approval}>
                                            <label>Admin Comment:</label>
                                            <p className={classes.complaintDetailsp}>{requestData.approval2 ? requestData.approval2Comment : 'Not Commented'}</p>
                                        </div>
                                    }
                                </div>
                                {
                                    (requestData.assign || requestData.forwardComment || (requestData.status === 'forwarded' || requestData.status === 'closed')) &&
                                    <hr />
                                }
                                {
                                    requestData.assign &&
                                    <div className={classes.techName}>
                                        <label>Technician Name:</label>
                                        <p >{requestData.assignedName}</p>
                                    </div>
                                }
                                {
                                    requestData.status === 'forwarded' &&
                                    <div className={classes.techName}>
                                        <label>Forward Comment:</label>
                                        <p >{requestData.forwardComment}</p>
                                    </div>
                                }
                                {
                                    (requestData.status === 'forwarded' || requestData.status === 'closed') &&
                                    <div className={classes.techName}>
                                        <label>Problem Description:</label>
                                        <p >{requestData.problemDescription}</p>
                                    </div>
                                }
                                {
                                    (requestData.status === 'forwarded' || requestData.status === 'closed') &&
                                    <div className={classes.techName}>
                                        <label>Action Taken:</label>
                                        <p >{requestData.actionTaken}</p>
                                    </div>
                                }
                                <hr />
                                <div className={classes.description}>
                                    <label>Attachment:</label>
                                    <p className={classes.complaintDetailsp}>None</p>
                                </div>
                                <div className={classes.date}>
                                    <label>Date:</label>
                                    <p className={classes.complaintDetailsp}>{getCreatedRequestDate(requestData.createdAt)}</p>
                                </div>
                                <div>
                                    <button className={classes.complaintAssingBtn} onClick={handleApprovalClick}>Request Approval</button>
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