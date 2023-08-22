import React, { Fragment, useEffect, useState } from 'react';
import classes from './ReportDetails.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ReportDetails = () => {
    const [reportData, setReportData] = useState({});
    const id = useParams().reportId;
    const navigate = useNavigate();

    useEffect(() => {
        const getReportDetails = async () => {
            const report = await axios.get(`/api/report/reportdetails/${id}`);
            setReportData(report.data.report);
        };
        getReportDetails();
    }, [id]);


    const getCreatedReportDate = (createdAt) => {
        if (createdAt === null) {
            return null;
        }
        const date = new Date(createdAt);
        return (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + formatAMPM(date));
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

    const getReportDuration = (duration) => {
        const assignDuration = duration;
        let diffHrs = Math.floor((assignDuration % 86400000) / 3600000);
        let diffMins = Math.round(((assignDuration % 86400000) % 3600000) / 60000);
        return (diffHrs + ' Hours and ' + diffMins + ' Minutes');
    }

    return (
        <Fragment>
            <main>
                <div className={classes.reqdetails}>
                    <div className={classes.header}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16" onClick={() => navigate('/report')}>
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                        </svg>
                        <h2>Report details</h2>
                    </div>
                    <div className={`${classes.detail}`}>
                        <div>
                            <form className={classes.myform}>
                                <div className={classes.idDetails}>
                                    <label>Ticket Type:</label>
                                    <p className={classes.complaintDetailsp}>{(reportData.isRequest && 'Request') || (reportData.isComplaint && 'Concern')}</p>
                                </div>
                                <div className={classes.idDetails}>
                                    <label>Ticket ID:</label>
                                    <p className={classes.complaintDetailsp}>#{reportData.requestComplaintId}</p>
                                </div>
                                <hr />
                                <div className={classes.subjectDetails}>
                                    <label>Subject:</label>
                                    <p className={classes.complaintDetailsp}>{reportData.subject}</p>
                                </div>
                                <div className={classes.description}>
                                    <label>Description :</label>
                                    <div className={classes.complaintDetailsp} dangerouslySetInnerHTML={{ __html: reportData.description }}></div>
                                </div>
                                <div className={classes.subjectDetails}>
                                    <label>Ticket raised by:</label>
                                    <p className={classes.complaintDetailsp}>{reportData.staffName}</p>
                                </div>
                                <hr />
                                <div className={classes.deptper}>
                                    <div className={classes.department}>
                                        <label>Department:</label>
                                        <p className={classes.complaintDetailsp}>{reportData.department}</p>
                                    </div>
                                    <div className={classes.priorityDetails}>
                                        <label>Priority:</label>
                                        <p className={classes.complaintDetailsp}> {reportData.priority}  </p>
                                    </div>
                                </div>
                                <div className={classes.reqsta}>
                                    <div className={classes.ComplaintType}>
                                        <label>Request Type:</label>
                                        <p className={classes.complaintDetailsp}>{reportData.category}</p>
                                    </div>
                                    <div className={classes.name}>
                                        <label>Status:</label>
                                        <p className={classes.complaintDetailsp}>{reportData.status} </p>
                                    </div>
                                </div>
                                <hr />
                                <div className={classes.approval1}>
                                    <div className={classes.approval}>
                                        <label>HOD Approval:</label>
                                        <p className={classes.complaintDetailsp}>{(reportData.approval1 === 1 && 'approved') || (reportData.approval1 === 2 && 'Disapproved') || (reportData.approval1 === null && 'Not updated')}</p>
                                    </div>
                                    {
                                        reportData.approval1 &&
                                        <div className={classes.approval}>
                                            <label>HOD Comment:</label>
                                            <p className={classes.complaintDetailsp}>{reportData.approval1 ? reportData.approval1Comment : 'Not Commented'}</p>
                                        </div>
                                    }
                                    <div className={classes.approval}>
                                        <label>Admin Approval:</label>
                                        <p className={classes.complaintDetailsp}>{(reportData.approval2 === 1 && 'Approved') || (reportData.approval2 === 2 && 'Disapproved') || (reportData.approval2 === null && 'Not updated')}</p>
                                    </div>
                                    {
                                        reportData.approval2 &&
                                        <div className={classes.approval}>
                                            <label>Admin Comment:</label>
                                            <p className={classes.complaintDetailsp}>{reportData.approval2 ? reportData.approval2Comment : 'Not Commented'}</p>
                                        </div>
                                    }
                                </div>
                                {
                                    (reportData.assign || reportData.forwardComment || (reportData.status === 'forwarded' || reportData.status === 'closed')) &&
                                    <hr />
                                }
                                {
                                    reportData.assign &&
                                    <div className={classes.techName}>
                                        <label>Assigned To:</label>
                                        <p >{reportData.assignedName}</p>
                                    </div>
                                }
                                {
                                    reportData.status === 'forwarded' &&
                                    <div className={classes.techName}>
                                        <label>Forward Comment:</label>
                                        <p >{reportData.forwardComment}</p>
                                    </div>
                                }

                                {
                                    (reportData.status === 'forwarded' || reportData.status === 'closed') &&
                                    <div className={classes.techName}>
                                        <label>Problem Description:</label>
                                        <p >{reportData.problemDescription}</p>
                                    </div>
                                }

                                {
                                    (reportData.status === 'forwarded' || reportData.status === 'closed') &&
                                    <div className={classes.techName}>
                                        <label>Action Taken:</label>
                                        <p >{reportData.actionTaken}</p>
                                    </div>
                                }
                                <hr />
                                <div className={classes.attachment}>
                                    <label>Attachment:</label>
                                    <p className={classes.complaintDetailsp}>None</p>
                                </div>
                                <hr />
                                <div className={classes.date}>
                                    <label>Logged Time:</label>
                                    <p className={classes.complaintDetailsp}>{getCreatedReportDate(reportData.loggedTime)}</p>
                                </div>

                                <div className={classes.date}>
                                    <label>Assigned Time:</label>
                                    <p className={classes.complaintDetailsp}>{getCreatedReportDate(reportData.assignedTime)}</p>
                                </div>
                                {reportData.isRequest && (reportData.loggedTime && reportData.assignedTime) &&
                                    <div className={classes.date}>
                                        <label>Assign Duration:</label>
                                        <p className={classes.complaintDetailsp}>{getReportDuration(reportData.assignDuration)}</p>
                                    </div>
                                }
                                <div className={classes.date}>
                                    <label>Attended Time:</label>
                                    <p className={classes.complaintDetailsp}>{reportData.attendedTime ? getCreatedReportDate(reportData.attendedTime) : 'Not updated yet'}</p>
                                </div>
                                {(reportData.assignedTime && reportData.attendedTime) &&
                                    <div className={classes.date}>
                                        <label>Attend Duration:</label>
                                        <p className={classes.complaintDetailsp}>{getReportDuration(reportData.attendDuration)}</p>
                                    </div>
                                }
                                <div className={classes.date}>
                                    <label>{(reportData.status === 'closed' && 'Solved') || (reportData.status === 'forwarded' && 'Forwarded')} Time:</label>
                                    <p className={classes.complaintDetailsp}>{reportData.lastUpdatedTime ? getCreatedReportDate(reportData.lastUpdatedTime) : 'Not updated yet'}</p>
                                </div>
                                {
                                    reportData.lastUpdatedTime &&
                                    <div className={classes.date}>
                                        <label>{(reportData.status === 'closed' && 'Solved') || (reportData.status === 'forwarded' && 'Forwarded')} Duration:</label>
                                        <p className={classes.complaintDetailsp}>{getReportDuration(reportData.lastUpdateDuration)}</p>
                                    </div>
                                }

                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    );
};

export default ReportDetails;