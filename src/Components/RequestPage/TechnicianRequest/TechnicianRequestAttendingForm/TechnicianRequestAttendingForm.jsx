import React, { Fragment, useEffect, useState, useRef } from 'react';
import classes from './TechnicianRequestAttendingForm.module.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Rightside from '../../../Righside/Rightside';
import { Bars } from 'react-loader-spinner';

const TechnicianRequestAttendingForm = () => {
    const ticketId = useParams().requestId;
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
    const [showLoading, setShowLoading] = useState(false);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const getTechnicians = async () => {
            try {
                const technician = await axios.get(`/api/staff/staffdetails/${loginId}`);
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
    }, [status]);

    useEffect(() => {
        const getTicketInfo = async () => {
            try {
                const ticket = await axios.get(`/api/request/getrequestdetails/${ticketId}`);
                setStatus(ticket.data.request.status);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to fetch ticket'
                });
            }
        };
        getTicketInfo();
    }, [ticketId]);

    const handleSubmitClick = async (id) => {
        const data = {
            status: status,
            assign: technicianId,
            forwardComment: forwardCommentRef.current ? forwardCommentRef.current.value : null,
            problemDescription: problemDescriptionRef.current ? problemDescriptionRef.current.value : null,
            actionTaken: actionTakenRef.current ? actionTakenRef.current.value : null
        }
        try {
            setShowLoading(true);
            await axios.put(`/api/staff/technician/changerequeststatus/${id}`, data);
            Swal.fire(
                'Changed status',
                'You have changed status successfully',
                'success'
            );
            navigate('/request');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `${error.response.data.message}`,
                text: 'Please enter valid fields'
            });
        } finally {
            setShowLoading(false);
        }
    };

    const handleTechnicianChange = (e) => {
        setTechnicianId(e.target.value);
    };

    return (
        <Fragment>
            {showLoading && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <h1>Closing Request </h1>
                    <div className='d-flex justify-content-center'>
                        <Bars
                            height="80"
                            width="80"
                            color="#CE1212"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div>
                </div>
            )}
            {!showLoading &&
                <div className={`${classes.statusform} row`}>
                    <div className="col-8">
                        <h1>Status change</h1>
                        <div className={classes.createStaffform}>
                            <div className={classes.formStaff}>
                                <div>
                                    <div className={classes.deptTik}>
                                        <span>Change Status</span>
                                        <select value={status} className={classes.deptSelect} name="role" required onChange={(e) => setStatus(e.target.value)} >
                                            <option key="0" value="" hidden>----- Select Categories -----</option>
                                            <option key="1" value="attending" hidden={status === 'attending'}>Attending</option>
                                            <option key="2" value="closed">Closed</option>
                                            <option key="3" value="forwarded">Forwarded</option>
                                        </select>
                                    </div>
                                    {
                                        isForwarded &&
                                        <div className={classes.deptTik}>
                                            <span> Forwarded </span>
                                            <select className={classes.deptSelect} name="role" required onChange={handleTechnicianChange}>
                                                <option key='0' value='' hidden defaultValue=''>Assign to engineer</option>
                                                {
                                                    technicians.map((technician) =>
                                                        <option key={technician.id} value={technician.id}>{technician.firstname + ' ' + technician.lastname}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                    }
                                    {
                                        !isAttending &&
                                        <div className={classes.subject}>
                                            <span>Problem Description</span>
                                            <input type="text" className={classes.subInput} placeholder="Problem Description" ref={problemDescriptionRef} />
                                        </div>
                                    }
                                    {
                                        !isAttending &&
                                        <div className={classes.subject}>
                                            <span>Action Taken   </span>
                                            <input type="text" className={classes.subInput} placeholder="Action Taken" ref={actionTakenRef} />
                                        </div>
                                    }
                                    {
                                        isForwarded &&
                                        <div className={classes.subject}>
                                            <span>Forward Comment</span>
                                            <input type="text" className={classes.subInput} placeholder="Forward Comment" ref={forwardCommentRef} />
                                        </div>
                                    }
                                    <div className={classes.attachment}>
                                        <button className={classes.buttonForm} onClick={() => handleSubmitClick(id.requestId)}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <Rightside />
                    </div>
                </div >
            }
        </Fragment>
    );
};

export default TechnicianRequestAttendingForm;