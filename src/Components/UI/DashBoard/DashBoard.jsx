import React, { useState, useEffect, useContext } from 'react';
import classes from './DashBoard.module.css';
import AdminContext from '../../Context/AdminContext/AdminContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import getItemWithExpiry from '../../../Utils/expiryFunction';

const DashBoard = () => {
  const id = getItemWithExpiry('id');
  const navigate = useNavigate();
  const [pendingTickets, setPendingTickets] = useState({ pendingRequests: null, totalRequests: null, pendingComplaints: null, totalComplaints: null, totalPendingTickets: null, totalTickets: null });
  const [totalsDate, setTotalsDate] = useState({ totalRequestsDate: null, totalComplaintsDate: null, totalTicketsDate: null });
  const adminCtx = useContext(AdminContext);
  const [refresh, setRefresh] = useState(false);

  const requestsPercentage = (pendingTickets.pendingRequests * 100) / pendingTickets.totalRequests;
  const complaintsPercentage = (pendingTickets.pendingComplaints * 100) / pendingTickets.totalComplaints;
  const ticketsPercentage = (pendingTickets.totalPendingTickets * 100) / pendingTickets.totalTickets;

  const getLastDate = (lastDate) => {
    const now = moment();
    const targetDateTime = moment(lastDate);
    const duration = moment.duration(now.diff(targetDateTime));
    const minutes = duration.asMinutes();
    const hours = duration.asHours();
    const days = duration.asDays();
    const weeks = duration.asWeeks();
    const months = duration.asMonths();
    const years = duration.asYears();
    let durationText = '';
    if (minutes < 1) {
      durationText = 'Just now';
    } else if (minutes < 60) {
      durationText = `${Math.floor(minutes)} ${Math.floor(minutes) === 1 ? 'minute' : 'minutes'} ago`;
    } else if (hours < 24) {
      durationText = `${Math.floor(hours)} ${Math.floor(hours) === 1 ? 'hour' : 'hours'} ago`;
    } else if (hours >= 24 && hours < 48) {
      durationText = 'Yesterday';
    } else if (hours >= 48 && days < 7) {
      durationText = `${Math.floor(days)} ${Math.floor(days) === 1 ? 'day' : 'days'} ago`;
    } else if (days >= 7 && weeks < 2) {
      durationText = '1 week ago';
    } else if (days >= 7 && months < 1) {
      durationText = `${Math.floor(weeks)} ${Math.floor(weeks) === 1 ? 'week' : 'weeks'} ago`;
    } else if (months >= 1 && years < 1) {
      durationText = `${Math.floor(months)} ${Math.floor(months) === 1 ? 'month' : 'months'} ago`;
    } else {
      durationText = `${Math.floor(years)} ${Math.floor(years) === 1 ? 'year' : 'years'} ago`;
    }
    return durationText;
  };

  useEffect(() => {
    setRefresh(false);
    if (!id) {
      navigate('/login')
    }
    const checkAuth = async () => {
      setRefresh(true);
      try {
        const res = await axios.get(`/api/staff/staffdetails/${id}`);
        switch (res.data.staff.role) {
          case 'superadmin':
            const superadminRequest = await axios.get(`/api/request/allrequests`);
            const superadminRequestList = superadminRequest.data.requests;
            const lastUpdatedSuperadminRequestTime = superadminRequestList.length !== 0 && superadminRequestList[superadminRequestList.length - 1].updatedAt;
            const superadminComplaint = await axios.get(`/api/complaint/allcomplaints`);
            const superadminComplaintList = superadminComplaint.data.complaints;
            const lastUpdatedSuperadminComplaintTime = superadminComplaintList.length !== 0 && superadminComplaintList[superadminComplaintList.length - 1].updatedAt;
            let lastUpdatedSuperadminTime;
            if ((superadminRequestList.length !== 0) && (superadminComplaintList.length === 0)) {
              lastUpdatedSuperadminTime = lastUpdatedSuperadminRequestTime;
            } else if ((superadminRequestList.length === 0) && (superadminComplaintList.length !== 0)) {
              lastUpdatedSuperadminTime = lastUpdatedSuperadminComplaintTime;
            } else {
              if (lastUpdatedSuperadminRequestTime > lastUpdatedSuperadminComplaintTime) {
                lastUpdatedSuperadminTime = lastUpdatedSuperadminRequestTime;
              } else {
                lastUpdatedSuperadminTime = lastUpdatedSuperadminComplaintTime;
              }
            }
            const superadminPendingRequestList = superadminRequestList.filter((request) => request.status === 'pending');
            const superadminPendingComplaintList = superadminComplaintList.filter((complaint) => complaint.status === 'pending');
            setTotalsDate({ totalRequestsDate: lastUpdatedSuperadminRequestTime, totalComplaintsDate: lastUpdatedSuperadminComplaintTime, totalTicketsDate: lastUpdatedSuperadminTime });
            setPendingTickets({ pendingRequests: superadminPendingRequestList.length, totalRequests: superadminRequestList.length, pendingComplaints: superadminPendingComplaintList.length, totalComplaints: superadminComplaintList.length, totalPendingTickets: superadminPendingRequestList.length + superadminPendingComplaintList.length, totalTickets: superadminRequestList.length + superadminComplaintList.length });
            break;

          case 'admin':
            try {
              const adminRequests = await axios.get(`/api/staff/admin/requests/incoming/${adminCtx.department}`);
              const adminRequestList = adminRequests.data.requests;
              const lastUpdatedAdminRequestTime = adminRequestList.length !== 0 && adminRequestList[adminRequestList.length - 1].updatedAt;
              const adminComplaint = await axios.get(`/api/complaint/complaints/incoming/${adminCtx.department}`);
              const adminComplaintList = adminComplaint.data.complaints;
              const lastUpdatedAdminComplaintTime = adminComplaintList.length !== 0 && adminComplaintList[adminComplaintList.length - 1].updatedAt;
              let lastUpdatedAdminTime;
              if ((adminRequestList.length !== 0) && (adminComplaintList.length === 0)) {
                lastUpdatedAdminTime = lastUpdatedAdminRequestTime;
              } else if ((adminRequestList.length === 0) && (adminComplaintList.length !== 0)) {
                lastUpdatedAdminTime = lastUpdatedAdminComplaintTime;
              } else {
                if (lastUpdatedAdminRequestTime > lastUpdatedAdminComplaintTime) {
                  lastUpdatedAdminTime = lastUpdatedAdminRequestTime;
                } else {
                  lastUpdatedAdminTime = lastUpdatedAdminComplaintTime;
                }
              }
              const adminPendingRequestList = adminRequestList.filter((request) => request.status === 'pending');
              const adminPendingComplaintList = adminComplaintList.filter((complaint) => complaint.status === 'pending');
              setTotalsDate({ totalRequestsDate: lastUpdatedAdminRequestTime, totalComplaintsDate: lastUpdatedAdminComplaintTime, totalTicketsDate: lastUpdatedAdminTime });
              setPendingTickets({ pendingRequests: adminPendingRequestList.length, totalRequests: adminRequestList.length, pendingComplaints: adminPendingComplaintList.length, totalComplaints: adminComplaintList.length, totalPendingTickets: adminPendingRequestList.length + adminPendingComplaintList.length, totalTickets: adminRequestList.length + adminComplaintList.length });
            } catch (error) {
              console.log(error.message);
            }
            break;

          case 'subadmin':
            try {
              const subadminRequests = await axios.get(`/api/staff/admin/requests/incoming/${res.data.staff.department}`);
              const subadminRequestList = subadminRequests.data.requests;
              const lastUpdatedAdminRequestTime = subadminRequestList.length !== 0 && subadminRequestList[subadminRequestList.length - 1].updatedAt;
              const subadminComplaint = await axios.get(`/api/complaint/complaints/incoming/${res.data.staff.department}`);
              const subadminComplaintList = subadminComplaint.data.complaints;
              const lastUpdatedAdminComplaintTime = subadminComplaintList.length !== 0 && subadminComplaintList[subadminComplaintList.length - 1].updatedAt;
              let lastUpdatedAdminTime;
              if ((subadminRequestList.length !== 0) && (subadminComplaintList.length === 0)) {
                lastUpdatedAdminTime = lastUpdatedAdminRequestTime;
              } else if ((subadminRequestList.length === 0) && (subadminComplaintList.length !== 0)) {
                lastUpdatedAdminTime = lastUpdatedAdminComplaintTime;
              } else {
                if (lastUpdatedAdminRequestTime > lastUpdatedAdminComplaintTime) {
                  lastUpdatedAdminTime = lastUpdatedAdminRequestTime;
                } else {
                  lastUpdatedAdminTime = lastUpdatedAdminComplaintTime;
                }
              }
              const subadminPendingRequestList = subadminRequestList.filter((request) => request.status === 'pending');
              const subadminPendingComplaintList = subadminComplaintList.filter((complaint) => complaint.status === 'pending');
              setTotalsDate({ totalRequestsDate: lastUpdatedAdminRequestTime, totalComplaintsDate: lastUpdatedAdminComplaintTime, totalTicketsDate: lastUpdatedAdminTime });
              setPendingTickets({ pendingRequests: subadminPendingRequestList.length, totalRequests: subadminRequestList.length, pendingComplaints: subadminPendingComplaintList.length, totalComplaints: subadminComplaintList.length, totalPendingTickets: subadminPendingRequestList.length + subadminPendingComplaintList.length, totalTickets: subadminRequestList.length + subadminComplaintList.length });
            } catch (error) {
              console.log(error.message);
            }
            break;

          case 'technician':
            const technicianRequests = await axios.get(`/api/staff/admin/requests/incoming/${res.data.staff.department}`);
            const technicianRequestList = technicianRequests.data.requests;
            const lastUpdatedTechnicianRequestTime = technicianRequestList.length !== 0 && technicianRequestList[technicianRequestList.length - 1].updatedAt;
            const technicianComplaints = await axios.get(`/api/complaint/complaints/incoming/${res.data.staff.department}`);
            const technicianComplaintList = technicianComplaints.data.complaints;
            const lastUpdatedTechnicianComplaintTime = technicianComplaintList.length !== 0 && technicianComplaintList[technicianComplaintList.length - 1].updatedAt;
            let lastUpdatedTechnicianTime;
            if ((technicianRequestList.length !== 0) && (technicianComplaintList.length === 0)) {
              lastUpdatedTechnicianTime = lastUpdatedTechnicianRequestTime;
            } else if ((technicianRequestList.length === 0) && (technicianComplaintList.length !== 0)) {
              lastUpdatedTechnicianTime = lastUpdatedTechnicianComplaintTime;
            } else {
              if (lastUpdatedTechnicianRequestTime > lastUpdatedTechnicianComplaintTime) {
                lastUpdatedTechnicianTime = lastUpdatedTechnicianRequestTime;
              } else {
                lastUpdatedTechnicianTime = lastUpdatedTechnicianComplaintTime;
              }
            }
            const technicianPendingRequestList = technicianRequestList.filter((request) => request.status === 'pending');
            const technicianPendingComplaintList = technicianComplaintList.filter((complaint) => complaint.status === 'pending');
            setTotalsDate({ totalRequestsDate: lastUpdatedTechnicianRequestTime, totalComplaintsDate: lastUpdatedTechnicianComplaintTime, totalTicketsDate: lastUpdatedTechnicianTime });
            setPendingTickets({ pendingRequests: technicianPendingRequestList.length, totalRequests: technicianRequestList.length, pendingComplaints: technicianPendingComplaintList.length, totalComplaints: technicianComplaintList.length, totalPendingTickets: technicianPendingRequestList.length + technicianPendingComplaintList.length, totalTickets: technicianRequestList.length + technicianComplaintList.length });
            break;

          case 'user':
            const userRequests = await axios.get(`/api/request/ownrequests/${id}`);
            const userRequestList = userRequests.data.requests;
            const lastUpdatedUserRequestTime = userRequestList.length !== 0 && userRequestList[userRequestList.length - 1].updatedAt;
            const userComplaints = await axios.get(`/api/complaint/owncomplaints/${id}`);
            const userComplaintList = userComplaints.data.complaints;
            const lastUpdatedUserComplaintTime = userComplaintList.length !== 0 && userComplaintList[userComplaintList.length - 1].updatedAt;
            let lastUpdatedUserTime;
            if ((userRequestList.length !== 0) && (userComplaintList.length === 0)) {
              lastUpdatedUserTime = lastUpdatedUserRequestTime;
            } else if ((userRequestList.length === 0) && (userComplaintList.length !== 0)) {
              lastUpdatedUserTime = lastUpdatedUserComplaintTime;
            } else {
              if (lastUpdatedUserRequestTime > lastUpdatedUserComplaintTime) {
                lastUpdatedUserTime = lastUpdatedUserRequestTime;
              } else {
                lastUpdatedUserTime = lastUpdatedUserComplaintTime;
              }
            }
            const userPendingRequestList = userRequestList.filter((request) => request.status === 'pending');
            const userPendingComplaintList = userComplaintList.filter((complaint) => complaint.status === 'pending');
            setTotalsDate({ totalRequestsDate: lastUpdatedUserRequestTime, totalComplaintsDate: lastUpdatedUserComplaintTime, totalTicketsDate: lastUpdatedUserTime });
            setPendingTickets({ pendingRequests: userPendingRequestList.length, totalRequests: userRequestList.length, pendingComplaints: userPendingComplaintList.length, totalComplaints: userComplaintList.length, totalPendingTickets: userPendingRequestList.length + userPendingComplaintList.length, totalTickets: userRequestList.length + userComplaintList.length });
            break;

          default:
            break;
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    checkAuth();
  }, [id, navigate, refresh, adminCtx.department]);

  return (
    <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-3 row-cols-xl-3" >
      <div className="col-12 col-md-6 col-lg-4">
        <div className={`${classes.sales}`}>
          <div className={`${classes.request} `}>
            <h1>Pending Requests</h1>
          </div>
          <div className={classes.count}>
            <div className={classes.progress}>
              <h1>{pendingTickets.pendingRequests}</h1>
            </div>
            <div className={classes.circle} style={{ width: 70, height: 70 }}>
              <CircularProgressbar
                value={Math.round(requestsPercentage)}
                text={`${Math.round(requestsPercentage)}%`}
                background
                backgroundPadding={6}
                styles={buildStyles({
                  backgroundColor: "#3e98c7",
                  textColor: "#fff",
                  pathColor: "#fff",
                  trailColor: "transparent"
                })}
              />
            </div>
          </div>
          <p>{!totalsDate.totalRequestsDate ? 'No Requests initiated' : 'Last update ' + getLastDate(totalsDate.totalRequestsDate)}</p>
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-4">
        <div className={`${classes.sales}`}>
          <div className={`${classes.request} `}>
            <h1>Pending Concern</h1>
          </div>
          <div className={classes.count}>
            <div className={classes.progress}>
              <h1>{pendingTickets.pendingComplaints}</h1>
            </div>
            <div className={classes.circle} style={{ width: 70, height: 70 }}>
              <CircularProgressbar
                value={Math.round(complaintsPercentage)}
                text={`${Math.round(complaintsPercentage)}%`}
                background
                backgroundPadding={6}
                styles={buildStyles({
                  backgroundColor: "#3e98c7",
                  textColor: "#fff",
                  pathColor: "#fff",
                  trailColor: "transparent"
                })}
              />
            </div>
          </div>
          <p>{!totalsDate.totalComplaintsDate ? 'No Concerns initiated' : 'Last update ' + getLastDate(totalsDate.totalComplaintsDate)}</p>
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-4">
        <div className={`${classes.sales}`}>
          <div className={`${classes.request} `}>
            <h1>Total Pending</h1>
          </div>
          <div className={classes.count}>
            <div className={classes.progress}>
              <h1>{pendingTickets.totalPendingTickets}</h1>
            </div>
            <div className={classes.circle} style={{ width: 70, height: 70 }}>
              <CircularProgressbar
                value={Math.round(ticketsPercentage)}
                text={`${Math.round(ticketsPercentage)}%`}
                background
                backgroundPadding={6}
                styles={buildStyles({
                  backgroundColor: "#3e98c7",
                  textColor: "#fff",
                  pathColor: "#fff",
                  trailColor: "transparent"
                })}
              />
            </div>
          </div>
          <p>{!totalsDate.totalTicketsDate ? 'No Tickets initiated' : 'Last update ' + getLastDate(totalsDate.totalTicketsDate)}</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;