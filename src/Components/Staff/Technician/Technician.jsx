import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const Technician = () => {
    const [complaintStatus, setComplaintStatus] = useState({ pending: '', attending: '', forwarded: '', closed: '' })
    const [requestStatus, setRequestStatus] = useState({ pending: '', disapproved: '', assigned: '', attending: '', forwarded: '', closed: '' })
    const [refresh, setRefresh] = useState(false);
    const id = localStorage.getItem('id');

    useEffect(() => {
        let pending, attending, forwarded, closed;
        const getGraph = async () => {
            setRefresh(true);
            try {
                const res = await axios.get(`/api/staff/staffdetails/${id}`);
                {
                    const technicianList = await axios.get(`/api/complaint/complaints/incoming/${res.data.staff.department}`);
                    const technicianComplaintList = technicianList.data.complaints;
                    pending = technicianComplaintList.filter((data) => data.status.startsWith('pending'));
                    attending = technicianComplaintList.filter((data) => data.status.startsWith('attending'));
                    forwarded = technicianComplaintList.filter((data) => data.status.startsWith('forwarded'));
                    closed = technicianComplaintList.filter((data) => data.status.startsWith('closed'));
                    setComplaintStatus({ pending: pending.length, attending: attending.length, forwarded: forwarded.length, closed: closed.length });
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
        getGraph();
    }, [id, refresh]);

    useEffect(() => {
        let pending, disapproved, assigned, attending, forwarded, closed;
        const getGraph = async () => {
            setRefresh(true);
            try {
                const res = await axios.get(`/api/staff/staffdetails/${id}`);
                {
                    const technicianList = await axios.get(`/api/staff/admin/requests/incoming/${res.data.staff.department}`);
                    const technicianRequestList = technicianList.data.requests;
                    pending = technicianRequestList.filter((data) => data.status.startsWith('pending'));
                    disapproved = technicianRequestList.filter((data) => data.status.startsWith('disapproved'));
                    assigned = technicianRequestList.filter((data) => data.status.startsWith('assigned'));
                    attending = technicianRequestList.filter((data) => data.status.startsWith('attending'));
                    forwarded = technicianRequestList.filter((data) => data.status.startsWith('forwarded'));
                    closed = technicianRequestList.filter((data) => data.status.startsWith('closed'));
                    setRequestStatus({ pending: pending.length, disapproved: disapproved.length, assigned: assigned.length, attending: attending.length, forwarded: forwarded.length, closed: closed.length });
                }


            } catch (error) {
                console.log(error.response.data.message);
            }
        }
        getGraph();
    }, [id, refresh]);

    const data = [
        {
            "name": "Pending",
            "request": requestStatus.pending,
            'concern': complaintStatus.pending,
        },
        {
            "name": "attending",
            "request": requestStatus.attending,
            'concern': complaintStatus.attending,
        },
        {
            "name": "assigned",
            "request": requestStatus.assigned,
        },
        {
            "name": "disapproved",
            "request": requestStatus.disapproved,
        },
        {
            "name": "forwarded",
            "request": requestStatus.forwarded,
            "concern": complaintStatus.forwarded,
        },
        {
            "name": "closed",
            "request": requestStatus.closed,
            "concern": complaintStatus.closed,
        }

    ]

    return (
        <div className='mt-2'>
            {/* <BarChart width={800} height={350} data={data}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="concern" fill="#8884d8" />
                <Bar dataKey="request" fill="#82ca9d" />
            </BarChart> */}
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="name" />
                        {/* <YAxis /> */}
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="request" fill="#8884d8" />
                        <Bar dataKey="concern" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Technician;