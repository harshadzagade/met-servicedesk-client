import React, { useContext, useEffect, useState } from 'react';
import TicketCounterContext from './TicketCounterContext';
import AdminContext from '../AdminContext/AdminContext';
import axios from 'axios';
import getItemWithExpiry from '../../../Utils/expiryFunction';
import openSocket from 'socket.io-client';

const TicketDetailsProvider = props => {
    const id = getItemWithExpiry('id');
    const adminCtx = useContext(AdminContext);
    const [requestStatus, setRequestStatus] = useState({ pending: '', disapproved: '', assigned: '', attending: '', forwarded: '', closed: '' })
    const [complaintStatus, setComplaintStatus] = useState({ pending: '', attending: '', forwarded: '', closed: '' });
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const socket = openSocket('');
        let pending, disapproved, assigned, attending, forwarded, closed;
        setRefresh(false);
        const checkRequestAuth = async () => {
            setRefresh(true);
            try {
                const res = await axios.get(`/api/staff/staffdetails/${id}`);
                switch (res.data.staff.role) {
                    case 'superadmin':
                        const superadminList = await axios.get(`/api/request/allrequests`);
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
                        const adminList = await axios.get(`/api/staff/admin/requests/incoming/${adminCtx.department}`);
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
                        const subadminList = await axios.get(`/api/staff/subadmin/requests/incoming/${res.data.staff.department}`);
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
                        const technicianList = await axios.get(`/api/staff/admin/requests/incoming/${res.data.staff.department}`);
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
                        const userList = await axios.get(`/api/request/ownrequests/${id}`);
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
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        const checkComplaintAuth = async () => {
            setRefresh(true);
            try {
                const res = await axios.get(`/api/staff/staffdetails/${id}`);
                switch (res.data.staff.role) {
                    case 'superadmin':
                        const superadminList = await axios.get(`/api/complaint/allcomplaints`);
                        const superadminComplaintList = superadminList.data.complaints;
                        pending = superadminComplaintList.filter((data) => data.status.startsWith('pending'));
                        attending = superadminComplaintList.filter((data) => data.status.startsWith('attending'));
                        forwarded = superadminComplaintList.filter((data) => data.status.startsWith('forwarded'));
                        closed = superadminComplaintList.filter((data) => data.status.startsWith('closed'));
                        setComplaintStatus({ pending: pending.length, attending: attending.length, forwarded: forwarded.length, closed: closed.length });
                        break;

                    case 'admin':
                        const adminList = await axios.get(`/api/complaint/complaints/incoming/${adminCtx.department}`);
                        const adminComplaintList = adminList.data.complaints;
                        pending = adminComplaintList.filter((data) => data.status.startsWith('pending'));
                        attending = adminComplaintList.filter((data) => data.status.startsWith('attending'));
                        forwarded = adminComplaintList.filter((data) => data.status.startsWith('forwarded'));
                        closed = adminComplaintList.filter((data) => data.status.startsWith('closed'));
                        setComplaintStatus({ pending: pending.length, attending: attending.length, forwarded: forwarded.length, closed: closed.length });
                        break;

                    case 'subadmin':
                        const subadminList = await axios.get(`/api/complaint/complaints/incoming/${res.data.staff.department}`);
                        const subadminComplaintList = subadminList.data.complaints;
                        pending = subadminComplaintList.filter((data) => data.status.startsWith('pending'));
                        attending = subadminComplaintList.filter((data) => data.status.startsWith('attending'));
                        forwarded = subadminComplaintList.filter((data) => data.status.startsWith('forwarded'));
                        closed = subadminComplaintList.filter((data) => data.status.startsWith('closed'));
                        setComplaintStatus({ pending: pending.length, attending: attending.length, forwarded: forwarded.length, closed: closed.length });
                        break;

                    case 'technician':
                        const technicianList = await axios.get(`/api/complaint/complaints/incoming/${res.data.staff.department}`);
                        const technicianComplaintList = technicianList.data.complaints;
                        pending = technicianComplaintList.filter((data) => data.status.startsWith('pending'));
                        attending = technicianComplaintList.filter((data) => data.status.startsWith('attending'));
                        forwarded = technicianComplaintList.filter((data) => data.status.startsWith('forwarded'));
                        closed = technicianComplaintList.filter((data) => data.status.startsWith('closed'));
                        setComplaintStatus({ pending: pending.length, attending: attending.length, forwarded: forwarded.length, closed: closed.length });
                        break;

                    case 'user':
                        const userList = await axios.get(`/api/complaint/owncomplaints/${id}`);
                        const userComplaintList = userList.data.complaints;
                        pending = userComplaintList.filter((data) => data.status.startsWith('pending'));
                        attending = userComplaintList.filter((data) => data.status.startsWith('attending'));
                        forwarded = userComplaintList.filter((data) => data.status.startsWith('forwarded'));
                        closed = userComplaintList.filter((data) => data.status.startsWith('closed'));
                        setComplaintStatus({ pending: pending.length, attending: attending.length, forwarded: forwarded.length, closed: closed.length });
                        break;

                    default:
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        checkRequestAuth();
        checkComplaintAuth();
        socket.on('requestStatus', () => {
            checkRequestAuth();
        });
        socket.on('requests', () => {
            checkRequestAuth();
        });
        socket.on('complaintStatus', () => {
            checkComplaintAuth();
        });
        socket.on('complaints', () => {
            checkComplaintAuth();
        });
    }, [id, refresh, adminCtx.department]);

    const ticketCounterContext = {
        requestStatusCount: requestStatus,
        complaintStatusCount: complaintStatus
    };
    return (
        <TicketCounterContext.Provider value={ticketCounterContext}>{props.children}</TicketCounterContext.Provider>
    );
};

export default TicketDetailsProvider;