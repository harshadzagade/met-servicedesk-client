import React, { Fragment, useEffect, useState } from 'react';
import classes from './TechnicianReport.module.css';
import axios from 'axios';

const TechnicianReport = () => {
    const [reportData, setReportData] = useState({});
    const id = localStorage.getItem('id');
    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(() => {
        const getReportDetails = async () => {
            try {
                const report = await axios.get(`http://localhost:8001/api/report/reportbystaff/${id}`);
                setReportData(report.data.report);
            } catch (error) {
                setErrorMessage(`You haven't assigned with any task yet`)
            }
        };
        getReportDetails();
    }, [id]);


    const getCreatedReportDate = (createdAt) => {
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

    const getReportDuration = (duration) => {
        const assignDuration = duration;
        let diffHrs = Math.floor((assignDuration % 86400000) / 3600000);
        let diffMins = Math.round(((assignDuration % 86400000) % 3600000) / 60000);
        return (diffHrs + ' Hours and ' + diffMins + ' Minutes');
    }


    return (
        <Fragment>
            <main>
                {
                    errorMessage.length === 0 ?
                        <div className={classes.reqdetails}>
                            <h2>Report details</h2>
                            <div className={`${classes.detail}`}>
                                <div >
                                    <form className={classes.myform}>
                                        <div className={classes.idDetails}>
                                            <label>Ticket Type:</label>
                                            <p className={classes.complaintDetailsp}>{(reportData.isRequest && 'Request') || (reportData.isComplaint && 'Complaint')}</p>
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
                                            <label>Description:</label>
                                            <div dangerouslySetInnerHTML={{ __html: reportData.description }}></div>
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
                                        <div className={classes.description}>
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
                                        {(reportData.loggedTime && reportData.assignedTime) &&
                                            <div className={classes.date}>
                                                <label>Assign Duration:</label>
                                                <p className={classes.complaintDetailsp}>{getReportDuration(reportData.assignDuration)}</p>
                                            </div>
                                        }


                                        <div className={classes.date}>
                                            <label>Attended Time:</label>
                                            <p className={classes.complaintDetailsp}>{getCreatedReportDate(reportData.attendedTime)}</p>
                                        </div>

                                        {(reportData.assignedTime && reportData.attendedTime) &&
                                            <div className={classes.date}>
                                                <label>Attend Duration:</label>
                                                <p className={classes.complaintDetailsp}>{getReportDuration(reportData.attendDuration)}</p>
                                            </div>
                                        }

                                        <div className={classes.date}>
                                            <label>{(reportData.status === 'closed' && 'Solved') || (reportData.status === 'forwarded' && 'Forwarded')} Time:</label>
                                            <p className={classes.complaintDetailsp}>{getCreatedReportDate(reportData.lastUpdatedTime)}</p>
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
                        :
                        <div>{errorMessage}</div>
                }
            </main>
        </Fragment>
    )
}

export default TechnicianReport;