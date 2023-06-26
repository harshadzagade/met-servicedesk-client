import React, { Fragment } from 'react';
import classes from './TechnicianAttendingForm.module.css';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useEffect } from 'react';


const TechnicianAttendingForm = (props) => {
    const problemDescriptionRef = useRef();
    const actionTakenRef = useRef();
    const forwardCommentRef = useRef();
    const loginId = localStorage.getItem('id');
    const navigate = useNavigate();
    const id = useParams();
    const [technicians, setTechnicians] = useState([]);
    const [technicianId, setTechnicianId] = useState(null);
    const [isAttending, setIsAttending] = useState(false);
    const [isForwarded, setIsForwarded] = useState(false);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const getTechnicians = async () => {
            try {
                const technician = await axios.get(`/api/staff/superadmin/staffdetails/${loginId}`);

                const technicians = await axios.get(`/api/staff/technician/techniciandepartmenttechnicians/${loginId}/${technician.data.staff.department[0]}`);

                setTechnicians(technicians.data.technicians);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Please enter valid fields'
                });
            }
        };
        getTechnicians();
    }, [loginId, navigate]);

    useEffect(() => {
        switch (status) {
            case 'attending':
                setIsAttending(true);
                setIsForwarded(false);
                break;
            case 'closed':
                setIsAttending(false);
                setIsForwarded(false);
                break;

            case 'forwarded':
                setIsForwarded(true);
                setIsAttending(false);
                break;

            default:
                setIsForwarded(false);
                setIsAttending(false);
                break;
        }
    }, [status])


    const handleSubmitClick = async (id) => {

        const data = {
            status: status,
            assign: technicianId,
            forwardComment: forwardCommentRef.current ? forwardCommentRef.current.value : null,
            problemDescription: problemDescriptionRef.current ? problemDescriptionRef.current.value : null,
            actionTaken: actionTakenRef.current ? actionTakenRef.current.value : null
        }
        try {
            await axios.put(`/api/staff/technician/changecomplaintstatus/${id}`, data);
            navigate('/complaint');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `${error.response.data.message}`,
                text: 'Please enter valid fields'
            });
        }
    };

    const handleTechnicianChange = (e) => {
        setTechnicianId(e.target.value);
    };

    return (
        <Fragment >

            <div className={classes.statusform}>
                <h2>Status chnage</h2>

                <div className={classes.createStaffform}>
                    <div className={classes.formStaff}>
                        <div >
                            <div className={classes.deptTik}>
                                <span> Approval Status</span>
                                <select className={classes.deptSelect} name="role" required onChange={(e) => setStatus(e.target.value)} >
                                    <option key="0" value="" hidden>----- Select Categories -----</option>
                                    <option key="1" value="attending">Attending</option>
                                    <option key="2" value="closed">Closed</option>
                                    <option key="3" value="forwarded">Forwarded</option>
                                </select>
                            </div>

                            {
                                isForwarded &&
                                <div className={classes.deptTik}>
                                    <span> Forwarded </span>
                                    <select className={classes.deptSelect} name="role" required onChange={handleTechnicianChange}>
                                        <option key='0' value='' hidden defaultValue=''>Assign to technician</option>
                                        {
                                            technicians.map((technician) =>
                                                <option key={technician.id} value={technician.id}>{technician.firstname + ' ' + technician.lastname}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            }

                            {!isAttending &&
                                <div className={classes.subject}>
                                    <span>Problem Description</span>
                                    <input type="text" className={classes.subInput} placeholder="Problem Description" ref={problemDescriptionRef} />
                                </div>
                            }

                            {!isAttending &&
                                <div className={classes.subject}>
                                    <span>Action Taken   </span>
                                    <input type="text" className={classes.subInput} placeholder="Action Taken" ref={actionTakenRef} />
                                </div>
                            }

                            {isForwarded &&
                                <div className={classes.subject}>
                                    <span>Forward Comment</span>
                                    <input type="text" className={classes.subInput} placeholder="Forward Comment" ref={forwardCommentRef} />
                                </div>
                            }

                            <div className={classes.attachment}>
                                <button className={classes.buttonForm} onClick={() => handleSubmitClick(id.complaintId)}>Submit</button>
                            </div>

                        </div>
                    </div>
                </div >
            </div>
        </Fragment>
    )
}

export default TechnicianAttendingForm