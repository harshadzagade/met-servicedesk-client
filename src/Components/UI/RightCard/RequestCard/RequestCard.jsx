import React, { useContext, useEffect, useState } from 'react';
import classes from './RequestCard.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminContext from '../../../Context/AdminContext/AdminContext';

const RequestCard = () => {
    const navigate = useNavigate();
    const id = localStorage.getItem('id');
    const adminCtx = useContext(AdminContext);
    const [requestStatus, setRequestStatus] = useState({ pending: '', disapproved: '', assigned: '', attending: '', forwarded: '', closed: '' })
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        let pending, disapproved, assigned, attending, forwarded, closed;
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
                        const superadminList = await axios.get(`http://localhost:8001/api/request/allrequests`);
                        const superadminRequestList = superadminList.data.requests;
                        pending = superadminRequestList.filter((data) => data.status.startsWith('pending'));
                        disapproved = superadminRequestList.filter((data) => data.status.startsWith('disapproved'));
                        assigned = superadminRequestList.filter((data) => data.status.startsWith('assigned'));
                        attending = superadminRequestList.filter((data) => data.status.startsWith('attending'));
                        forwarded = superadminRequestList.filter((data) => data.status.startsWith('forwarded'));
                        closed = superadminRequestList.filter((data) => data.status.startsWith('closed'));
                        setRequestStatus({ pending: pending.length, disapproved: disapproved.length, assigned: assigned.length, attending: attending.length, forwarded: forwarded.length, closed: closed.length });
                        break;

                    case 'admin':
                        const adminList = await axios.get(`http://localhost:8001/api/staff/admin/requests/incoming/${adminCtx.department}`);
                        const adminRequestList = adminList.data.requests;
                        pending = adminRequestList.filter((data) => data.status.startsWith('pending'));
                        disapproved = adminRequestList.filter((data) => data.status.startsWith('disapproved'));
                        assigned = adminRequestList.filter((data) => data.status.startsWith('assigned'));
                        attending = adminRequestList.filter((data) => data.status.startsWith('attending'));
                        forwarded = adminRequestList.filter((data) => data.status.startsWith('forwarded'));
                        closed = adminRequestList.filter((data) => data.status.startsWith('closed'));
                        setRequestStatus({ pending: pending.length, disapproved: disapproved.length, assigned: assigned.length, attending: attending.length, forwarded: forwarded.length, closed: closed.length });
                        break;

                    case 'subadmin':
                        const subadminList = await axios.get(`http://localhost:8001/api/staff/subadmin/requests/incoming/${res.data.staff.department}`);
                        const subadminRequestList = subadminList.data.requests;
                        pending = subadminRequestList.filter((data) => data.status.startsWith('pending'));
                        disapproved = subadminRequestList.filter((data) => data.status.startsWith('disapproved'));
                        assigned = subadminRequestList.filter((data) => data.status.startsWith('assigned'));
                        attending = subadminRequestList.filter((data) => data.status.startsWith('attending'));
                        forwarded = subadminRequestList.filter((data) => data.status.startsWith('forwarded'));
                        closed = subadminRequestList.filter((data) => data.status.startsWith('closed'));
                        setRequestStatus({ pending: pending.length, disapproved: disapproved.length, assigned: assigned.length, attending: attending.length, forwarded: forwarded.length, closed: closed.length });
                        break;

                    case 'technician':
                        const technicianList = await axios.get(`http://localhost:8001/api/staff/admin/requests/incoming/${res.data.staff.department}`);
                        const technicianRequestList = technicianList.data.requests;
                        pending = technicianRequestList.filter((data) => data.status.startsWith('pending'));
                        disapproved = technicianRequestList.filter((data) => data.status.startsWith('disapproved'));
                        assigned = technicianRequestList.filter((data) => data.status.startsWith('assigned'));
                        attending = technicianRequestList.filter((data) => data.status.startsWith('attending'));
                        forwarded = technicianRequestList.filter((data) => data.status.startsWith('forwarded'));
                        closed = technicianRequestList.filter((data) => data.status.startsWith('closed'));
                        setRequestStatus({ pending: pending.length, disapproved: disapproved.length, assigned: assigned.length, attending: attending.length, forwarded: forwarded.length, closed: closed.length });
                        break;

                    case 'user':
                        const userList = await axios.get(`http://localhost:8001/api/request/ownrequests/${id}`);
                        const userRequestList = userList.data.requests;
                        pending = userRequestList.filter((data) => data.status.startsWith('pending'));
                        disapproved = userRequestList.filter((data) => data.status.startsWith('disapproved'));
                        assigned = userRequestList.filter((data) => data.status.startsWith('assigned'));
                        attending = userRequestList.filter((data) => data.status.startsWith('attending'));
                        forwarded = userRequestList.filter((data) => data.status.startsWith('forwarded'));
                        closed = userRequestList.filter((data) => data.status.startsWith('closed'));
                        setRequestStatus({ pending: pending.length, disapproved: disapproved.length, assigned: assigned.length, attending: attending.length, forwarded: forwarded.length, closed: closed.length });
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
                <p>{requestStatus.pending}</p>
            </div>
            <hr />
            <div className={classes.tikStatus}>
                <label>Disapproved:</label>
                <p>{requestStatus.disapproved}</p>
            </div>
            <hr />
            <div className={classes.tikStatus}>
                <label>Assign:</label>
                <p>{requestStatus.assigned}</p>
            </div>
            <hr />
            <div className={classes.tikStatus}>
                <label>Attending:</label>
                <p>{requestStatus.attending}</p>
            </div>
            <hr />
            <div className={classes.tikStatus}>
                <label>Forwaded:</label>
                <p>{requestStatus.forwarded}</p>
            </div>
            <hr />
            <div className={classes.tikStatus}>
                <label>Closed:</label>
                <p>{requestStatus.closed}</p>
            </div>
        </div>
    );
};

export default RequestCard;