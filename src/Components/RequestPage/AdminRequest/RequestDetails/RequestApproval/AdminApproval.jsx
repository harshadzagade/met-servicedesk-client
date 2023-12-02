import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import classes from './AdminApproval.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminContext from '../../../../Context/AdminContext/AdminContext';
import Rightside from '../../../../Righside/Rightside';
import getItemWithExpiry from '../../../../../Utils/expiryFunction';
import Swal from 'sweetalert2';
import { Bars } from 'react-loader-spinner';

const AdminApproval = () => {
    const idReference = getItemWithExpiry('id');
    const loginId = idReference ? idReference.value : null;
    const navigate = useNavigate();
    const adminCtx = useContext(AdminContext);
    const id = useParams();
    const approvalCommentRef = useRef();
    const [approval, setApproval] = useState('approve');
    const [isApproval2, setIsApproval2] = useState(false);
    const [technicians, setTechnicians] = useState([]);
    const [technicianId, setTechnicianId] = useState(null);
    const [assignDisability, setAssignDisability] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        if (approval === 'disapprove') {
            setAssignDisability('checked');
            setTechnicianId(null);
        } else {
            setAssignDisability('');
        }
    }, [approval]);

    useEffect(() => {
        if (adminCtx.approval === '2') {
            setIsApproval2(true);
        } else if (adminCtx.approval === '1') {
            setIsApproval2(false);
        }
    }, [adminCtx.approval]);

    useEffect(() => {
        const getTechnicians = async () => {
            try {
                const technicians = await axios.get(`/api/staff/admin/admindepartmenttechnicians/${loginId}/${adminCtx.department}`);
                setTechnicians(technicians.data.technicians);
            } catch (error) {
                navigate('/request');
                console.log(error.message);
            }
        };
        getTechnicians();
    }, [loginId, adminCtx.department, navigate]);

    const handleSubmitClick = async (e, id) => {
        e.preventDefault();
        let approvalValue = null;
        if (approval === 'approve') {
            approvalValue = 1;
        } else if (approval === 'disapprove') {
            approvalValue = 2;
        } else {
            approvalValue = null;
        }
        const approval1data = {
            department: adminCtx.department,
            approval: approvalValue,
            approvalComment: approvalCommentRef.current.value
        };
        const approval2data = {
            department: adminCtx.department,
            staffId: technicianId,
            approval: approvalValue,
            approvalComment: approvalCommentRef.current.value
        };
        try {
            setShowLoading(true);
            if (isApproval2) {
                await axios.put(`/api/staff/admin/approval2/${id}`, approval2data);
            } else {
                await axios.put(`/api/staff/admin/approval1/${id}`, approval1data);
            }
            navigate('/request');
        } catch (error) {
            if (error.response.status === 422 || error.response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to approve ticket'
                });
            } else {
                console.log(error.message);
            }
        } finally {
            setShowLoading(false);
        }
    };

    const handleChange = (e) => {
        setApproval(e.target.value);
    };

    const handleTechnicianChange = (e) => {
        setTechnicianId(e.target.value);
    };

    return (
        <Fragment>
            <div className="container-fluid">
                <div className={`${classes.approvalform} row`}>
                    <div className="col-8">
                        <h2>Approval</h2>
                        <div hidden>
                        </div>
                        <div className={classes.RequestApproval}>
                            {showLoading && (
                                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                    <h1>Changing approval status</h1>
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
                            {!showLoading &&<form className={classes.form} onSubmit={(e) => handleSubmitClick(e, id.requestId)}>
                                <div>
                                    <div className={classes.approvalStatus}>
                                        <label>Change Status:</label>
                                        <select className={classes.selectStatus} name="role" required onChange={handleChange} >
                                            <option key='0' value="" hidden>----- Approval Status -----</option>
                                            <option key='1' value="approve">Approve</option>
                                            <option key='2' value="disapprove">Disapprove</option>
                                        </select>
                                    </div>
                                    {
                                        isApproval2 &&
                                        <div className={classes.selectStaff}>
                                            <label>Engineer List:</label>
                                            <select className={classes.selectStatus} disabled={assignDisability} name="role" required onChange={handleTechnicianChange} >
                                                <option key='0' value='' hidden defaultValue=''>----- Select Engineer -----</option>
                                                {
                                                    technicians.map((technician) =>
                                                        <option key={technician.id} value={technician.id}><span>{technician.firstname + " " + technician.lastname}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{technician.busyStatus? 'Busy' : 'Available'}</b></option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                    }
                                    <div className={classes.comment}>
                                        <label>Comment:</label>
                                        <input type="text" className={classes.subInput} placeholder="Enter your comment" ref={approvalCommentRef} required />
                                    </div>
                                    <div className={classes.btn}>
                                        <button className={classes.submitBtn} type='submit' >Submit</button>
                                        <button className={classes.cancelBtn} onClick={() => navigate('/request')}>Cancel</button>
                                    </div>
                                </div>
                            </form>}
                        </div>
                    </div>
                    <div className="col-4">
                        <Rightside />
                    </div>
                </div>
            </div >
        </Fragment>
    );
};

export default AdminApproval;