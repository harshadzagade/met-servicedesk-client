import React, { Fragment, useContext, useEffect, useState } from 'react';
import classes from './AdminDetails.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import TicketDetailsContext from '../../../Context/TicketDetailsContext/TicketDetailsContext';
import axios from 'axios';
import Rightside from '../../../Righside/Rightside';
import FeedbackForm from '../../../UI/FeedbackForm/FeedbackForm';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import getItemWithExpiry from '../../../../Utils/expiryFunction';
import AdminContext from '../../../Context/AdminContext/AdminContext';
import Swal from 'sweetalert2';

const AdminDetails = () => {
    const navigate = useNavigate();
    const loginId = getItemWithExpiry('id');
    const adminCtx = useContext(AdminContext);
    const id = useParams().complaintId;
    const ticketCtx = useContext(TicketDetailsContext);
    const [complaintData, setComplaintData] = useState({});
    const [behalfStaffName, setBehalfStaffName] = useState('');
    const [openFeedback, setOpenFeedback] = useState(false);
    const [staffId, setStaffId] = useState(null);
    const [technicians, setTechnicians] = useState([]);
    const [technicianId, setTechnicianId] = useState(null);
    const [refresh, setRefresh] = useState(false);
    ticketCtx.onClickHandler('complaint', staffId, complaintData.id);

    const handleAssignComplaint = async (e) => {
        e.preventDefault();
        setRefresh(true);
        try {
            if (technicianId) {
                await axios.put(`/api/staff/admin/assigncomplaint/${id}`, { assignId: technicianId });
                Swal.fire(
                    'Assigned concern',
                    'Engineer assigned to a concern successfully',
                    'success'
                );
            }
        } catch (error) {
            if (error.response.status === 401 || error.response.status === 403) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to assign concern'
                });
            } else {
                console.log(error.message);
            }
        }
        setRefresh(false);
    };

    useEffect(() => {
        const getTechnicians = async () => {
            try {
                const technicians = await axios.get(`/api/staff/admin/admindepartmenttechnicians/${loginId}/${adminCtx.department}`);
                setTechnicians(technicians.data.technicians);
            } catch (error) {
                navigate('/concern');
                console.log(error.message);
            }
        };
        getTechnicians();
    }, [loginId, adminCtx.department, navigate]);

    useEffect(() => {
        const getComplaintDetails = async () => {
            try {
                const complaint = await axios.get(`/api/complaint/getcomplaintdetails/${id}`);
                setComplaintData(complaint.data.complaint);
                if (complaint.data.complaint.behalf) {
                    setStaffId(complaint.data.complaint.behalfId);
                } else {
                    setStaffId(complaint.data.complaint.staffId);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getComplaintDetails();
    }, [id, refresh]);

    useEffect(() => {
        const getStaffDetails = async () => {
            try {
                if (complaintData.behalfId) {
                    const behalf = await axios.get(`/api/staff/staffdetails/${complaintData.behalfId}`);
                    setBehalfStaffName(behalf.data.staff.firstname + ' ' + behalf.data.staff.lastname)
                }
            } catch (error) {
                console.log(error.message);
            }

        };
        getStaffDetails();
    }, [complaintData.behalfId]);

    const getCreatedComplaintDate = (createdAt) => {
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
            const file = await axios.get(`/api/complaint/downloadfile/${complaintData.id}`, { responseType: 'blob' });
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

    const handleTechnicianChange = (e) => {
        setTechnicianId(e.target.value);
    };

    return (
        <Fragment>
            <main>
                <div className='container-fluid '>
                    <div className={`${classes.complaintdetils} row`}>
                        <div className="col-8">
                            <div className={classes.header}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16" onClick={() => navigate('/concern')}>
                                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                                </svg>
                                <h2>Concern details</h2>
                                {openFeedback && <FeedbackForm ticketType={'complaint'} ticketId={complaintData.ticketId} department={complaintData.department} onConfirm={handleFeedback} />}
                                <button onClick={handleGeneratePDF} className={`${classes.printBtn} `}>Print</button>
                                {(complaintData.status === 'closed' && complaintData.staffId.toString() === loginId.toString()) && <button className={`${classes.feedbackBtn}`} onClick={() => setOpenFeedback(true)}>Feedback</button>}
                            </div>
                            <div className={`${classes.detail}`}>
                                <div>
                                    <form className={classes.myform}>
                                        <span id='printContent'>
                                            <div className={classes.idDetails}>
                                                <label>Concern Id:</label>
                                                <p className={classes.complaintDetailsp}>{complaintData.ticketId}</p>
                                            </div>
                                            {
                                                complaintData.behalf && <div className={classes.behalf}>
                                                    <label>Behalf:</label>
                                                    <p className={classes.complaintDetailsp}>{behalfStaffName}</p>
                                                </div>
                                            }
                                            {
                                                complaintData.isRepeated && <div className={classes.behalf}>
                                                    <label>Repeated:</label>
                                                    <p className={classes.complaintDetailsp}>{complaintData.isRepeated && 'Yes'}</p>
                                                </div>
                                            }
                                            <hr />
                                            <div className={classes.subjectDetails}>
                                                <label>Subject:</label>
                                                <p className={classes.complaintDetailsp}>{complaintData.subject}</p>
                                            </div>
                                            <div className={classes.description}>
                                                <label>Description:</label>
                                                <div className={classes.complaintDetailsp} dangerouslySetInnerHTML={{ __html: complaintData.description }}></div>
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
                                                    <label>Concern Type:</label>
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
                                                    <label>Engineer Name:</label>
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
                                        </span>
                                        <hr />
                                        <div className={classes.attachment}>
                                            <label>Attachment:</label>
                                            {
                                                complaintData.attachment && (complaintData.attachment.length === 0 ?
                                                    <p className={classes.complaintDetailsp}>None</p>
                                                    :
                                                    <button className={classes.buttonForm} onClick={handleDownload}>Download</button>
                                                )
                                            }
                                        </div>
                                        <div className={classes.date}>
                                            <label>Date:</label>
                                            <p className={classes.complaintDetailsp}>{getCreatedComplaintDate(complaintData.createdAt)}</p>
                                        </div>
                                        {!complaintData.assign && <div className={classes.assignTo}>
                                            <button className={classes.complaintAssingBtn} onClick={handleAssignComplaint}>Assign to engineer</button>
                                            <select className={classes.selectStatus} name="role" required onChange={handleTechnicianChange} >
                                                <option key='0' value='' hidden defaultValue=''>----- Select Engineer -----</option>
                                                {
                                                    technicians.map((technician) =>
                                                        <option key={technician.id} value={technician.id}>{technician.firstname + " " + technician.lastname}</option>
                                                    )
                                                }
                                            </select>
                                        </div>}
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

export default AdminDetails