import React, { useEffect, useState } from 'react';
import TicketCounterContext from './TicketCounterContext';
import axios from 'axios';
import openSocket from 'socket.io-client';

const TicketDetailsProvider = props => {
    const [id, setId] = useState(null);
    const [department, setDepartment] = useState(null);
    const [role, setRole] = useState(null);
    const [requestStatus, setRequestStatus] = useState({ pending: '', disapproved: '', assigned: '', attending: '', forwarded: '', closed: '' })
    const [complaintStatus, setComplaintStatus] = useState({ pending: '', attending: '', forwarded: '', closed: '' });

    useEffect(() => {
        const socket = openSocket('http://localhost:8001');
        let pending, disapproved, assigned, attending, forwarded, closed;
        const checkRequestAuth = async () => {
            switch (role) {
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
                    const adminList = await axios.get(`http://localhost:8001/api/staff/admin/requests/incoming/${department}`);
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
                    const subadminList = await axios.get(`http://localhost:8001/api/staff/subadmin/requests/incoming/${department}`);
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
                    const technicianList = await axios.get(`http://localhost:8001/api/staff/admin/requests/incoming/${department}`);
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
            }
        }
        const checkComplaintAuth = async () => {
            switch (role) {
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
                    const adminList = await axios.get(`http://localhost:8001/api/complaint/complaints/incoming/${department}`);
                    const adminComplaintList = adminList.data.complaints;
                    pending = adminComplaintList.filter((data) => data.status.startsWith('pending'));
                    attending = adminComplaintList.filter((data) => data.status.startsWith('attending'));
                    forwarded = adminComplaintList.filter((data) => data.status.startsWith('forwarded'));
                    closed = adminComplaintList.filter((data) => data.status.startsWith('closed'));
                    setComplaintStatus({ pending: pending.length, attending: attending.length, forwarded: forwarded.length, closed: closed.length });
                    break;

                case 'subadmin':
                    const subadminList = await axios.get(`http://localhost:8001/api/complaint/complaints/incoming/${department}`);
                    const subadminComplaintList = subadminList.data.complaints;
                    pending = subadminComplaintList.filter((data) => data.status.startsWith('pending'));
                    attending = subadminComplaintList.filter((data) => data.status.startsWith('attending'));
                    forwarded = subadminComplaintList.filter((data) => data.status.startsWith('forwarded'));
                    closed = subadminComplaintList.filter((data) => data.status.startsWith('closed'));
                    setComplaintStatus({ pending: pending.length, attending: attending.length, forwarded: forwarded.length, closed: closed.length });
                    break;

                case 'technician':
                    const technicianList = await axios.get(`http://localhost:8001/api/complaint/complaints/incoming/${department}`);
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
    }, [id, role, department]);

    const handleStaffDetails = (id, department, role) => {
        setId(id);
        setDepartment(department);
        setRole(role);
    };

    const ticketCounterContext = {
        requestStatusCount: requestStatus,
        complaintStatusCount: complaintStatus,
        setStaffDetails: handleStaffDetails
    };
    return (
        <TicketCounterContext.Provider value={ticketCounterContext}>{props.children}</TicketCounterContext.Provider>
    );
};

export default TicketDetailsProvider;