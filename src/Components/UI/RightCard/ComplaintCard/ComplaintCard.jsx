import React, { useContext, useEffect, useState } from 'react';
import classes from './ComplaintCard.module.css';
import { useNavigate } from 'react-router-dom';
import AdminContext from '../../../Context/AdminContext/AdminContext';
import axios from 'axios';

const ComplaintCard = () => {
    const navigate = useNavigate();
    const id = localStorage.getItem('id');
    const adminCtx = useContext(AdminContext);
    const [complaintStatus, setComplaintStatus] = useState({ pending: '', attending: '', forwarded: '', closed: '' })
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        let pending, attending, forwarded, closed;
        setRefresh(false);
        if (!id) {
            navigate('/login')
        }
        const checkAuth = async () => {
            setRefresh(true);
            try {
                const res = await axios.get(`http://localhost:8001/api/staff/staffdetails/${id}`);
                switch (res.data.staff.role) {
                    case 'superadmin':
                        const superadminList = await axios.get(`http://localhost:8001/api/complaint/allcomplaints`);
                        const superadminComplaintList = superadminList.data.complaints;
                        pending = superadminComplaintList.filter((data) => data.status.startsWith('pending'));
                        attending = superadminComplaintList.filter((data) => data.status.startsWith('attending'));
                        forwarded = superadminComplaintList.filter((data) => data.status.startsWith('forwarded'));
                        closed = superadminComplaintList.filter((data) => data.status.startsWith('closed'));
                        setComplaintStatus({ pending: pending.length, attending: attending.length, forwarded: forwarded.length, closed: closed.length });
                        break;

                    case 'admin':
                        const adminList = await axios.get(`http://localhost:8001/api/complaint/complaints/incoming/${adminCtx.department}`);
                        const adminComplaintList = adminList.data.complaints;
                        pending = adminComplaintList.filter((data) => data.status.startsWith('pending'));
                        attending = adminComplaintList.filter((data) => data.status.startsWith('attending'));
                        forwarded = adminComplaintList.filter((data) => data.status.startsWith('forwarded'));
                        closed = adminComplaintList.filter((data) => data.status.startsWith('closed'));
                        setComplaintStatus({ pending: pending.length, attending: attending.length, forwarded: forwarded.length, closed: closed.length });
                        break;

                    case 'subadmin':
                        const subadminList = await axios.get(`http://localhost:8001/api/complaint/complaints/incoming/${res.data.staff.department}`);
                        const subadminComplaintList = subadminList.data.complaints;
                        pending = subadminComplaintList.filter((data) => data.status.startsWith('pending'));
                        attending = subadminComplaintList.filter((data) => data.status.startsWith('attending'));
                        forwarded = subadminComplaintList.filter((data) => data.status.startsWith('forwarded'));
                        closed = subadminComplaintList.filter((data) => data.status.startsWith('closed'));
                        setComplaintStatus({ pending: pending.length, attending: attending.length, forwarded: forwarded.length, closed: closed.length });
                        break;

                    case 'technician':
                        const technicianList = await axios.get(`http://localhost:8001/api/complaint/complaints/incoming/${res.data.staff.department}`);
                        const technicianComplaintList = technicianList.data.complaints;
                        pending = technicianComplaintList.filter((data) => data.status.startsWith('pending'));
                        attending = technicianComplaintList.filter((data) => data.status.startsWith('attending'));
                        forwarded = technicianComplaintList.filter((data) => data.status.startsWith('forwarded'));
                        closed = technicianComplaintList.filter((data) => data.status.startsWith('closed'));
                        setComplaintStatus({ pending: pending.length, attending: attending.length, forwarded: forwarded.length, closed: closed.length });
                        break;

                    case 'user':
                        const userList = await axios.get(`http://localhost:8001/api/complaint/owncomplaints/${id}`);
                        const userComplaintList = userList.data.complaints;
                        pending = userComplaintList.filter((data) => data.status.startsWith('pending'));
                        attending = userComplaintList.filter((data) => data.status.startsWith('attending'));
                        forwarded = userComplaintList.filter((data) => data.status.startsWith('forwarded'));
                        closed = userComplaintList.filter((data) => data.status.startsWith('closed'));
                        setComplaintStatus({ pending: pending.length, attending: attending.length, forwarded: forwarded.length, closed: closed.length });
                        break;

                    default:
                        navigate(`/404`);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        checkAuth();
    }, [id, navigate, refresh, adminCtx.department]);

    return (
        <div className={classes.details}>
            <hr className='mt-3' />
            <div className={classes.tikStatus}>
                <label>Pending:</label>
                <p>{complaintStatus.pending}</p>
            </div>
            <hr />
            <div className={classes.tikStatus}>
                <label>Attending:</label>
                <p>{complaintStatus.attending}</p>
            </div>
            <hr />
            <div className={classes.tikStatus}>
                <label>Forwaded:</label>
                <p>{complaintStatus.forwarded}</p>
            </div>
            <hr />
            <div className={classes.tikStatus}>
                <label>Closed:</label>
                <p>{complaintStatus.closed}</p>
            </div>
        </div>
    );
};

export default ComplaintCard;