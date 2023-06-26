import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import classes from './RequestDetails.module.css'
import { useParams } from 'react-router-dom';
import TicketDetailsContext from '../../../Context/TicketDetailsContext/TicketDetailsContext';
const RequestDetails = () => {
    const id = useParams().requestId;
    const ticketCtx = useContext(TicketDetailsContext);
    const [requestData, setRequestData] = useState({});
    ticketCtx.onClickHandler('request', requestData.staffId, requestData.id);

    useEffect(() => {
        const getRequestDetails = async () => {
            try {
                const request = await axios.get(`/api/request/getrequestdetails/${id}`);
                setRequestData(request.data.request);
            } catch (error) {
                console.log(error.response.data.message);
            }
        };
        getRequestDetails();
    }, [id]);

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
                        <div >
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
                                {/* <div>
                                    <button className={classes.complaintAssingBtn}>Self Assign </button>
                                    <button className={classes.complaintAssingBtn}>Forward </button>
                                </div> */}

                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    );
};

export default RequestDetails;