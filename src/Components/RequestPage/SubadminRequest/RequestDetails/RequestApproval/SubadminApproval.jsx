import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import classes from './SubadminApproval.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Rightside from '../../../../Righside/Rightside';
import SubadminContext from '../../../../Context/SubadminContext/SubadminContext';
import { Bars } from 'react-loader-spinner';
import getItemWithExpiry from '../../../../../Utils/expiryFunction';

const SubadminApproval = () => {
    const idReference = getItemWithExpiry('id');
    const loginId = idReference ? idReference.value : null;
    const navigate = useNavigate();
    const subadminCtx = useContext(SubadminContext);
    const id = useParams();
    const approvalCommentRef = useRef();
    const [approval, setApproval] = useState('approve');
    const [isApproval2, setIsApproval2] = useState(false);
    const [technicians, setTechnicians] = useState([]);
    const [technicianId, setTechnicianId] = useState(null);
    const [assignDisability, setAssignDisability] = useState('');
    const [subadminDetails, setSubadminDetails] = useState({});
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        const getSubadminDetails = async () => {
            try {
                const subadmin = await axios.get(`/api/staff/staffdetails/${loginId}`);
                setSubadminDetails(subadmin.data.staff);
            } catch (error) {
                console.log(error.message);
            }
        };
        getSubadminDetails();
    }, [loginId]);

    useEffect(() => {
        if (approval === 'disapprove') {
            setAssignDisability('checked');
            setTechnicianId(null);
        } else {
            setAssignDisability('');
        }
    }, [approval]);

    useEffect(() => {
        if (subadminCtx.approval === '2') {
            setIsApproval2(true);
        } else if (subadminCtx.approval === '1') {
            setIsApproval2(false);
        }
    }, [subadminCtx.approval]);

    useEffect(() => {
        const getTechnicians = async () => {
            try {
                const technicians = await axios.get(`/api/staff/subadmin/subadmindepartmenttechnicians/${loginId}/${subadminDetails.department}`);
                setTechnicians(technicians.data.technicians);
            } catch (error) {
                console.log(error.message);
            }
        };
        getTechnicians();
    }, [loginId, subadminDetails.department, navigate]);

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
            subadminId: loginId,
            approval: approvalValue,
            approvalComment: approvalCommentRef.current.value
        };
        const approval2data = {
            subadminId: loginId,
            staffId: technicianId,
            approval: approvalValue,
            approvalComment: approvalCommentRef.current.value
        };
        try {
            setShowLoading(true);
            if (isApproval2) {
                await axios.put(`/api/staff/subadmin/approval2/${id}`, approval2data);
            } else {
                await axios.put(`/api/staff/subadmin/approval1/${id}`, approval1data);
            }
            Swal.fire(
                'Approval status updated',
                'You have updated approval status successfully',
                'success'
            );
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
            {showLoading && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <h1>Approving request</h1>
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
            {!showLoading && <div className={`${classes.approvalform} row`}>
                <div className="col-8">
                    <h2>Approval</h2>
                    <div hidden>
                    </div>
                    <div className={classes.RequestApproval} >
                        <form className={classes.form} onSubmit={(e) => handleSubmitClick(e, id.requestId)}>
                            <div >
                                <div className={classes.approvalStatus}>
                                    <span>Change Status</span>
                                    <select className={classes.selectStatus} name="role" required onChange={handleChange} >
                                        <option key='0' value="" hidden>----- Approval Status -----</option>
                                        <option key='1' value="approve">Approve</option>
                                        <option key='2' value="disapprove">Disapprove</option>
                                    </select>
                                </div>
                                {
                                    isApproval2 &&
                                    <div className={classes.selectStaff}>
                                        <span>Engineer List</span>
                                        <select className={classes.selectStatus} disabled={assignDisability} name="role" required onChange={handleTechnicianChange} >
                                            <option key='0' value='' hidden defaultValue=''>----- Select Engineer-----</option>
                                            {
                                                technicians.map((technician) =>
                                                    <option key={technician.id} value={technician.id}>{technician.firstname + " " + technician.lastname}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                }
                                <div className={classes.comment}>
                                    <span>Comment</span>
                                    <input type="text" className={classes.subInput} placeholder="Enter Your Comment" ref={approvalCommentRef} required />
                                </div>
                                <div className={classes.btn}>
                                    <button className={classes.submitBtn} type='submit' >Submit</button>
                                    <button className={classes.cancelBtn} onClick={() => navigate('/request')}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-4">
                    <Rightside />
                </div>
            </div>
            }
        </Fragment>
    );
};

export default SubadminApproval;