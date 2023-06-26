import axios from 'axios';
import React, { Fragment, useEffect, useState, useContext } from 'react';
import classes from './ComplaintDetails.module.css'
import { useParams } from 'react-router-dom';
import TicketDetailsContext from '../../../Context/TicketDetailsContext/TicketDetailsContext';
const ComplaintDetails = () => {
    const id = useParams().complaintId;
    const ticketCtx = useContext(TicketDetailsContext);
    const [complaintData, setComplaintData] = useState({});
    ticketCtx.onClickHandler('complaint', complaintData.staffId, complaintData.id);

    useEffect(() => {
        const getComplaintDetails = async () => {
            const complaint = await axios.get(`/api/complaint/getcomplaintdetails/${id}`);
            setComplaintData(complaint.data.complaint);
        };
        getComplaintDetails();
    }, [id]);

    const getCreatedComplaintDate = (createdAt) => {
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
                <div className={classes.complaintdetils}>
                    <h2>complaint details</h2>
                    <div className={`${classes.detail}`}>
                        <div >
                            <form className={classes.myform}>

                                <div className={classes.idDetails}>
                                    <label>Complaint Id:</label>
                                    <p className={classes.complaintDetailsp}>#{complaintData.id}</p>
                                </div>

                                <hr />

                                <div className={classes.subjectDetails}>
                                    <label>Subject:</label>
                                    <p className={classes.complaintDetailsp}>{complaintData.subject}</p>
                                </div>

                                <div className={classes.description}>
                                    <label>Description:</label>
                                    <div dangerouslySetInnerHTML={{ __html: complaintData.description }}></div>
                                </div>
                                <hr />
                                <div className={classes.deptper}>
                                    <div className={classes.department}>
                                        <label>Department:</label>
                                        <p className={classes.complaintDetailsp}>{complaintData.department}</p>
                                    </div>
                                    <div className={classes.priorityDetails}>
                                        <label>Priority:</label>
                                        <p className={classes.complaintDetailsp}> {complaintData.priority}</p>
                                    </div>
                                </div>

                                <div className={classes.reqsta}>
                                    <div className={classes.ComplaintType}>
                                        <label>Request Type:</label>
                                        <p className={classes.complaintDetailsp}>{complaintData.category}</p>
                                    </div>
                                    <div className={classes.status}>
                                        <label>Status:</label>
                                        <p className={classes.complaintDetailsp}>{complaintData.status} </p>
                                    </div>
                                </div>

                                {
                                    (complaintData.assign || complaintData.forwardComment || (complaintData.status === 'forwarded' || complaintData.status === 'closed')) &&
                                    <hr />
                                }
                                {
                                    complaintData.assign &&
                                    <div className={classes.techName}>
                                        <label>Technician Name:</label>
                                        <p className={classes.complaintDetailsp}>{complaintData.assignedName}</p>
                                    </div>
                                }

                                {
                                    complaintData.status === 'forwarded' &&
                                    <div className={classes.techName}>
                                        <label>Forward Comment:</label>
                                        <p className={classes.complaintDetailsp}>{complaintData.forwardComment}</p>
                                    </div>
                                }

                                {
                                    (complaintData.status === 'forwarded' || complaintData.status === 'closed') &&
                                    <div className={classes.techName}>
                                        <label>Problem Description:</label>
                                        <p className={classes.complaintDetailsp}>{complaintData.problemDescription}</p>
                                    </div>
                                }

                                {
                                    (complaintData.status === 'forwarded' || complaintData.status === 'closed') &&
                                    <div className={classes.techName}>
                                    <label>Action Taken:</label>
                                    <p className={classes.complaintDetailsp}>{complaintData.actionTaken}</p>
                                </div>
                                }
                                <hr />
                                <div className={classes.description}>
                                    <label>Attachment:</label>
                                    <p className={classes.complaintDetailsp}>None</p>
                                </div>
                                <div className={classes.date}>
                                    <label>Date:</label>
                                    <p className={classes.complaintDetailsp}>{getCreatedComplaintDate(complaintData.createdAt)}</p>

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

export default ComplaintDetails;