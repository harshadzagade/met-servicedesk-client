import React, { useEffect } from 'react';
import classes from './TechnicianRequestDetails.module.css';
import { Fragment } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import TicketDetailsContext from '../../../Context/TicketDetailsContext/TicketDetailsContext';


const TechnicianRequestDetails = () => {
    const paramsId = useParams();
    const id = paramsId.requestId;
    const [requestData, setRequestData] = useState({});
    const navigate = useNavigate();
    const ticketCtx = useContext(TicketDetailsContext);
    const [staffId, setStaffId] = useState(null);
    ticketCtx.onClickHandler('request', staffId, requestData.id);

    useEffect(() => {
        const getRequestDetails = async () => {
            const request = await axios.get(`/api/request/getrequestdetails/${id}`);
            setRequestData(request.data.request);
            if (request.data.request.behalf) {
                setStaffId(request.data.request.behalfId);
            } else {
                setStaffId(request.data.request.staffId);
            }
        };
        getRequestDetails();
    }, [id]);

    return (
        <Fragment>
            <main>
                <div className={classes.reqdetails}>
                    <div className={classes.header}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16" onClick={() => navigate('/request')}>
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                        </svg>
                        <h2>Request details</h2>
                    </div>
                    <div className={`${classes.detail}`}>
                        <div >
                            <form className={classes.myform}>

                                <div className={classes.idDetails}>
                                    <label>Request Id:</label>
                                    <p className={classes.complaintDetailsp}>{requestData.ticketId}</p>
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
                                        <p className={classes.complaintDetailsp}> {requestData.priority}</p>
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
                                <div className={classes.idDetails}>
                                    <label>Behalf:</label>
                                    <p className={classes.complaintDetailsp}>{requestData.behalf ? 'Yes' : 'No'}</p>
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
                                <div className={classes.status}>
                                    <button className={classes.complaintAssingBtn} onClick={() => navigate(`/TechrequestAttending/${requestData.id}`)}>Change Status </button>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    )
}

export default TechnicianRequestDetails