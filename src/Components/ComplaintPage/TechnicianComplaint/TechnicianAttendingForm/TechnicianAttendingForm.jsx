import React, { Fragment, useRef, useState, useEffect } from 'react';
import classes from './TechnicianAttendingForm.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Rightside from '../../../Righside/Rightside';
import { Bars } from 'react-loader-spinner';
import getItemWithExpiry from '../../../../Utils/expiryFunction';

const TechnicianAttendingForm = () => {
    const problemDescriptionRef = useRef();
    const actionTakenRef = useRef();
    const forwardCommentRef = useRef();
    const loginId = getItemWithExpiry('id');
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
                const technician = await axios.get(`http://localhost:8001/api/staff/staffdetails/${loginId}`);
                const technicians = await axios.get(`http://localhost:8001/api/staff/technician/techniciandepartmenttechnicians/${loginId}/${technician.data.staff.department}`);
                setTechnicians(technicians.data.technicians);
            } catch (error) {
                console.log(error.message);
            }
        };
        getTechnicians();
    }, [loginId, navigate]);

    useEffect(() => {
        switch (status) {
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
            await axios.put(`http://localhost:8001/api/staff/technician/changecomplaintstatus/${id}`, data);
            Swal.fire(
                'Changed status',
                'You have changed status successfully',
                'success'
            );
            navigate('/concern');
        } catch (error) {
            if (error.response.status === 422 || error.response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to change status'
                });
            } else {
                console.log(error.message);
            }
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
                    <h1>Changing status</h1>
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
            {!showLoading && <div className={`${classes.statusform} row`}>
                <div className="col-8">
                    <h2>Status change</h2>
                    <div className={classes.createStaffform}>
                        <div className={classes.formStaff}>
                            <div>
                                <div className={classes.assignStatus}>
                                    <span>Change Status:</span>
                                    <select className={classes.deptSelect} name="role" required onChange={(e) => setStatus(e.target.value)} >
                                        <option key="0" value="" hidden>----- Select Categories -----</option>
                                        <option key="2" value="closed">Closed</option>
                                        <option key="3" value="forwarded">Forwarded</option>
                                    </select>
                                </div>
                                {
                                    isForwarded &&
                                    <div className={classes.assignStatus}>
                                        <span>Forwarded:</span>
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
                                        <span>Problem Description:</span>
                                        <input type="text" className={classes.subInput} required placeholder="Problem Description" ref={problemDescriptionRef} />
                                    </div>
                                }
                                {
                                    !isAttending &&
                                    <div className={classes.subject}>
                                        <span>Action Taken: </span>
                                        <input type="text" className={classes.subInput} required placeholder="Action Taken" ref={actionTakenRef} />
                                    </div>
                                }
                                {
                                    isForwarded &&
                                    <div className={classes.subject}>
                                        <span>Forward Comment:</span>
                                        <input type="text" className={classes.subInput} required placeholder="Forward Comment" ref={forwardCommentRef} />
                                    </div>
                                }
                                <div className={classes.btn}>
                                    <button className={classes.buttonForm} onClick={() => handleSubmitClick(id.complaintId)}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <Rightside />
                </div>
            </div >}
        </Fragment>
    );
};

export default TechnicianAttendingForm;