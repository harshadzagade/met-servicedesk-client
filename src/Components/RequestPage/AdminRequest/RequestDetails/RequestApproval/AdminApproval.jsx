import React, { useContext, useEffect, useRef, useState } from 'react';
import classes from './AdminApproval.module.css';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminContext from '../../../../Context/AdminContext/AdminContext';
import AdminDeptDrop from '../../../../UI/AdminDepartmentDropDowm/AdminDeptDrop';
import { Fragment } from 'react';

const AdminApproval = (props) => {

    const loginId = localStorage.getItem('id');
    const navigate = useNavigate();
    const adminCtx = useContext(AdminContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const { search } = useLocation();
    const id = useParams();
    const approvalCommentRef = useRef();
    const [approval, setApproval] = useState('approve');
    const [isApproval2, setIsApproval2] = useState(false);
    const [technicians, setTechnicians] = useState([]);
    const [technicianId, setTechnicianId] = useState(null);
    const [assignDisability, setAssignDisability] = useState('');

    useEffect(() => {
        if (adminCtx.approval === '1') {
            setSearchParams(`?${new URLSearchParams({ approval: '1' })}`)
        } else if (adminCtx.approval === '2') {
            setSearchParams(`?${new URLSearchParams({ approval: '2' })}`)
        }
    }, [adminCtx]);

    useEffect(() => {
        if (approval === 'disapprove') {
            setAssignDisability('checked');
            setTechnicianId(null);
        } else {
            setAssignDisability('');
        }
    }, [approval]);

    useEffect(() => {
        if (search.charAt(search.length - 1) === '2') {
            setIsApproval2(true);
        } else if (search.charAt(search.length - 1) === '1') {
            setIsApproval2(false);
        }
    }, [search]);

    useEffect(() => {
        const getTechnicians = async () => {
            try {
                const technicians = await axios.get(`http://localhost:8001/api/staff/admin/admindepartmenttechnicians/${loginId}/${adminCtx.department}`);
                setTechnicians(technicians.data.technicians);
            } catch (error) {
                navigate('/request');
                Swal.fire({
                    icon: 'error',
                    title: 'Please select department',
                    text: 'Please enter valid fields'
                });
            }
        };
        getTechnicians();
    }, [loginId, adminCtx.department, navigate]);

    const handleSubmitClick = async (id) => {
        let approvalValue = null;
        if (approval === 'approve') {
            approvalValue = 1;
        } else if (approval === 'disapprove') {
            approvalValue = 2;
        } else {
            approvalValue = null;
        }
        const approval1data = {
            approval: approvalValue,
            approvalComment: approvalCommentRef.current.value
        };
        const approval2data = {
            staffId: technicianId,
            approval: approvalValue,
            approvalComment: approvalCommentRef.current.value
        };
        try {
            if (isApproval2) {
                await axios.put(`http://localhost:8001/api/staff/admin/approval2/${id}`, approval2data);
            } else {
                await axios.put(`http://localhost:8001/api/staff/admin/approval1/${id}`, approval1data);
            }
            navigate('/request');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `${error.response.data.message}`,
                text: 'Please enter valid fields'
            });
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
            <div className={classes.approvalform}>
                <h1 >Approval</h1>
                <div hidden>
                    <AdminDeptDrop />
                </div>
                <div className={classes.RequestApproval} >
                    <div className={classes.form}>
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

                                    <span>Staff List</span>

                                    <select className={classes.selectStatus} disabled={assignDisability} name="role" required onChange={handleTechnicianChange} >
                                        <option key='0' value='' hidden defaultValue=''>----- Select Categories -----</option>

                                        {
                                            technicians.map((technician) =>
                                                <option key={technician.id} value={technician.id}>{technician.firstname}</option>
                                            )
                                        }
                                    </select>

                                </div>
                            }

                            <div className={classes.comment}>
                                <span>Comment</span>
                                <input type="text" className={classes.subInput} placeholder="Select Your Comment" ref={approvalCommentRef} />
                            </div>

                            <div className={classes.btn}>
                                <button className={classes.submitBtn} onClick={() => handleSubmitClick(id.requestId)} >Submit</button>
                                <button className={classes.cancelBtn} onClick={() => navigate('/request')}>Cancel</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </Fragment>
    );
};

export default AdminApproval;