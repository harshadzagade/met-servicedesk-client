import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import classes from './RequestDetails.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import TicketDetailsContext from '../../../Context/TicketDetailsContext/TicketDetailsContext';
import Rightside from '../../../Righside/Rightside';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import FeedbackForm from '../../FeedbackForm/FeedbackForm';
import getItemWithExpiry from '../../../../Utils/expiryFunction';

const RequestDetails = () => {
    const navigate = useNavigate();
    const loginId = getItemWithExpiry('id');
    const id = useParams().requestId;
    const ticketCtx = useContext(TicketDetailsContext);
    const [requestData, setRequestData] = useState({});
    const [behalfStaffName, setBehalfStaffName] = useState('');
    const [openFeedback, setOpenFeedback] = useState(false);
    const [staffId, setStaffId] = useState(null);
    ticketCtx.onClickHandler('request', staffId, requestData.id);

    useEffect(() => {
        const getRequestDetails = async () => {
            try {
                const request = await axios.get(`/api/request/getrequestdetails/${id}`);
                setRequestData(request.data.request);
                if (request.data.request.behalf) {
                    setStaffId(request.data.request.behalfId);
                } else {
                    setStaffId(request.data.request.staffId);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getRequestDetails();
    }, [id]);

    useEffect(() => {
        const getStaffDetails = async () => {
            try {
                if (requestData.behalfId) {
                    const behalf = await axios.get(`/api/staff/staffdetails/${requestData.behalfId}`);
                    setBehalfStaffName(behalf.data.staff.firstname + ' ' + behalf.data.staff.lastname)
                }
            } catch (error) {
                console.log(error.message);
            }

        };
        getStaffDetails();
    }, [requestData.behalfId]);

    const getCreatedRequestDate = (createdAt) => {
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
    };

    const handleDownload = async (e) => {
        e.preventDefault();
        try {
            const file = await axios.get(`/api/request/downloadfile/${requestData.id}`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([file.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'files.zip');
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(url);
            link.remove();
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleGeneratePDF = () => {
        const content = document.getElementById('printContent');
        html2canvas(content).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10);
            pdf.save('generated.pdf');
        });
    };

    const handleFeedback = () => {
        setOpenFeedback(false);
    };

    return (
        <Fragment>
            <main>
                <div className='container-fluid'>
                    <div className={`${classes.reqdetails} row`}>
                        <div className="col-8">
                            <div className={classes.header}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16" onClick={() => navigate('/request')}>
                                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                                </svg>
                                <h2>Request details</h2>
                                {openFeedback && <FeedbackForm ticketType={'request'} ticketId={requestData.ticketId} department={requestData.department} onConfirm={handleFeedback}/>}
                                <button onClick={handleGeneratePDF} className={`${classes.printBtn} `}>Print</button>
                                {(requestData.status === 'closed' && requestData.staffId.toString() === loginId.toString()) && <button className={`${classes.feedbackBtn} `} onClick={() => setOpenFeedback(true)}>Feedback</button>}
                            </div>
                            <div className={`${classes.detail}`}>
                                <div >
                                    <form className={classes.myform}>
                                        <span id='printContent'>
                                            <div className={classes.idDetails}>
                                                <label>Request Id:</label>
                                                <p className={classes.complaintDetailsp}>{requestData.ticketId}</p>
                                            </div>
                                            {requestData.behalf && <div className={classes.idDetails}>
                                                <label>Behalf:</label>
                                                <p className={classes.complaintDetailsp}>{behalfStaffName}</p>
                                            </div>}
                                            {requestData.isRepeated && <div className={classes.idDetails}>
                                                <label>Repeated:</label>
                                                <p className={classes.complaintDetailsp}>{requestData.isRepeated && 'Yes'}</p>
                                            </div>}
                                            <hr />
                                            <div className={classes.subjectDetails}>
                                                <label>Subject:</label>
                                                <p className={classes.complaintDetailsp}>{requestData.subject}</p>
                                            </div>
                                            <div className={classes.description}>
                                                <label>Description:</label>
                                                <div className={classes.complaintDetailsp} dangerouslySetInnerHTML={{ __html: requestData.description }}></div>
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
                                                <div className={classes.status}>
                                                    <label>Status:</label>
                                                    <p className={classes.complaintDetailsp}>{requestData.status} </p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className={classes.approval1}>
                                                <div className={classes.approval}>
                                                    <label>HOD Approval:</label>
                                                    <p className={classes.complaintDetailsp}>{(requestData.approval1 === 1 && 'approved') || (requestData.approval1 === 2 && 'disapproved') || (requestData.approval1 === null && 'not updated')}</p>
                                                </div>
                                                {
                                                    requestData.approval1 &&
                                                    <div className={classes.approval}>
                                                        <label>HOD Comment:</label>
                                                        <p className={classes.complaintDetailsp}>{requestData.approval1 ? requestData.approval1Comment : 'not commented'}</p>
                                                    </div>
                                                }
                                                <div className={classes.approval}>
                                                    <label>Admin Approval:</label>
                                                    <p className={classes.complaintDetailsp}>{(requestData.approval2 === 1 && 'approved') || (requestData.approval2 === 2 && 'disapproved') || (requestData.approval2 === null && 'not updated')}</p>
                                                </div>
                                                {
                                                    requestData.approval2 &&
                                                    <div className={classes.approval}>
                                                        <label>Admin Comment:</label>
                                                        <p className={classes.complaintDetailsp}>{requestData.approval2 ? requestData.approval2Comment : 'not commented'}</p>
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
                                                    <label>Engineer Name:</label>
                                                    <p className={classes.complaintDetailsp}>{requestData.assignedName}</p>
                                                </div>
                                            }
                                            {
                                                requestData.status === 'forwarded' &&
                                                <div className={classes.techName}>
                                                    <label>Forward Comment:</label>
                                                    <p className={classes.complaintDetailsp}>{requestData.forwardComment}</p>
                                                </div>
                                            }
                                            {
                                                (requestData.status === 'forwarded' || requestData.status === 'closed') &&
                                                <div className={classes.techName}>
                                                    <label>Problem Description:</label>
                                                    <p className={classes.complaintDetailsp}>{requestData.problemDescription}</p>
                                                </div>
                                            }
                                            {
                                                (requestData.status === 'forwarded' || requestData.status === 'closed') &&
                                                <div className={classes.techName}>
                                                    <label>Action Taken:</label>
                                                    <p className={classes.complaintDetailsp}>{requestData.actionTaken}</p>
                                                </div>
                                            }
                                        </span>
                                        <hr />
                                        <div className={classes.attachment}>
                                            <label>Attachment:</label>
                                            {
                                                requestData.attachment && (requestData.attachment.length === 0 ?
                                                    <p className={classes.complaintDetailsp}>None</p>
                                                    :
                                                    <button className={classes.buttonForm} onClick={handleDownload}>Download</button>
                                                )
                                            }
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
                        <div className='col-4'>
                            <Rightside />
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    );
};

export default RequestDetails;