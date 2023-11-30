// import axios from 'axios';
import React from 'react';
import classes from './Technician.module.css';
import ComplaintCard from '../../UI/RightCard/ComplaintCard/ComplaintCard';
import RequestCard from '../../UI/RightCard/RequestCard/RequestCard';

const Technician = () => {
    // const [complaintStatus, setComplaintStatus] = useState({ pending: '', attending: '', forwarded: '', closed: '' })
    // const [requestStatus, setRequestStatus] = useState({ pending: '', disapproved: '', assigned: '', attending: '', forwarded: '', closed: '' })
    // const [refresh, setRefresh] = useState(false);
    // const id = getItemWithExpiry('id');

    /* useEffect(() => {
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
                console.log(error.message);
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
                console.log(error.message);
            }
        }
        getGraph();
    }, [id, refresh]); */

    /* const data = [
        {
            "name": "Pending",
            "request": requestStatus.pending,
            'complaint': complaintStatus.pending,
        },
        {
            "name": "attending",
            "request": requestStatus.attending,
            'complaint': complaintStatus.attending,
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
            "complaint": complaintStatus.forwarded,
        },
        {
            "name": "closed",
            "request": requestStatus.closed,
            "complaint": complaintStatus.closed,
        }

    ] */

    return (
        <div className='row'>
            {/* <div style={{ width: '100%', height: 300 }}>
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
                        <XAxis dataKey="name" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="request" fill="#8884d8" />
                        <Bar dataKey="complaint" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div> */}
            <div className={classes.statusCard}>
                <div className='col-5 mt-2'>
                    <div className={classes.compdetails}>
                        <h2>Complaint Status</h2>
                        <ComplaintCard />
                    </div>
                </div>
                <div className='col-5 mt-2'>
                    <div className={classes.compdetails}>
                        <h2>Request Status</h2>
                        <RequestCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Technician;