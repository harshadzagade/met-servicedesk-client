import React, { Fragment, useContext, useEffect, useState } from 'react';
import classes from './TechComplaintDetails.module.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import TicketDetailsContext from '../../../Context/TicketDetailsContext/TicketDetailsContext';


const TechComplaintDetails = () => {
    const navigate = useNavigate();
    const [complaintData, setComplaintData] = useState({});
    const paramsId = useParams();
    const id = paramsId.complaintId;
    const ownId = localStorage.getItem('id');
    const ticketCtx = useContext(TicketDetailsContext);
    ticketCtx.onClickHandler('complaint', complaintData.staffId, complaintData.id);

    useEffect(() => {
        const getComplaintDetails = async () => {
            const complaint = await axios.get(`/api/complaint/getcomplaintdetails/${id}`);
            setComplaintData(complaint.data.complaint);
        };
        getComplaintDetails();
    }, [id]);

    const handleSelfAssign = async () => {
        try {
            await axios.put(`/api/staff/technician/selfassigncomplaint/${id}/${ownId}`);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error occured',
                text: `${error.response.data.message}`
            });
        }
    };

    return (
        <Fragment>
            <main>
                <div className={classes.techcomdetails}>
                    <h2>Concern details</h2>
                    <div className={`${classes.detail}`}>
                        <div >
                            <form className={classes.myform}>
                                <div className={classes.idDetails}>
                                    <label>Staff ID:</label>
                                    <p className={classes.complaintDetailsp}>{complaintData.staffId}</p>
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
                                <div className={classes.deptpri}>
                                    <div className={classes.department}>
                                        <label>Department:</label>
                                        <p className={classes.complaintDetailsp}>{complaintData.department}</p>
                                    </div>
                                    <div className={classes.priorityDetails}>
                                        <label>Priority:</label>
                                        <p className={classes.complaintDetailsp}> {complaintData.priority}</p>
                                    </div>
                                </div>
                                <div className={classes.statech}>
                                    <div className={classes.name}>
                                        <label>Status:</label>
                                        <p className={classes.complaintDetailsp}>{complaintData.status} </p>
                                    </div>
                                    <div className={classes.techName}>
                                        <label>Technician Name:</label>
                                        <p className={classes.complaintDetailsp}>{complaintData.assignedName}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className={classes.date}>
                                    <label>Date:</label>
                                    <p className={classes.complaintDetailsp}>{complaintData.createdAt}</p>
                                </div>
                                <div className={classes.status}>
                                    <button className={classes.complaintAssingBtn} onClick={() => navigate(`/TechcomplaintAttending/${complaintData.id}`)}>Change Status</button>
                                    {
                                        complaintData.assign !== null ?
                                            <div className={`${classes.alreadyAssignedText}`}>Concern assigned to {complaintData.assignedName}</div>
                                            :
                                            <button className={classes.complaintAssingBtn} onClick={handleSelfAssign}>Self Assign</button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>

    );
};


export default TechComplaintDetails;