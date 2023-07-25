import React, { useState, useEffect, useContext } from 'react';
import classes from './DashBoard.module.css';
import AdminContext from '../../Context/AdminContext/AdminContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashBoard = () => {
  const id = localStorage.getItem('id');
  const navigate = useNavigate();
  const [totals, setTotals] = useState({ totalRequests: null, totalComplaints: null, totalTickets: null });
  const [totalsDate, setTotalsDate] = useState({ totalRequestsDate: null, totalComplaintsDate: null, totalTicketsDate: null });
  const adminCtx = useContext(AdminContext);
  const [refresh, setRefresh] = useState(false);

  const daysInThisMonth = () => {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  };

  const requestsPercentage = (totals.totalRequests * 100) / totals.totalTickets;
  const complaintsPercentage = (totals.totalComplaints * 100) / totals.totalTickets;
  const currentDate = new Date();
  const ticketsDays = ((currentDate.getDate() - 1) * 100) / daysInThisMonth();

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
            setTotalsDate({ totalRequestsDate: lastUpdatedSuperadminRequestTime, totalComplaintsDate: lastUpdatedSuperadminComplaintTime, totalTicketsDate: lastUpdatedSuperadminTime });
            setTotals({ totalRequests: superadminRequestList.length, totalComplaints: superadminComplaintList.length, totalTickets: superadminRequestList.length + superadminComplaintList.length });
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
              setTotalsDate({ totalRequestsDate: lastUpdatedAdminRequestTime, totalComplaintsDate: lastUpdatedAdminComplaintTime, totalTicketsDate: lastUpdatedAdminTime });
              setTotals({ totalRequests: adminRequestList.length, totalComplaints: adminComplaintList.length, totalTickets: adminRequestList.length + adminComplaintList.length });
            } catch (error) {
              console.log(error);
            }
            break;

          case 'technician':
            const technicianRequests = await axios.get(`/api/staff/admin/requests/incoming/${res.data.staff.department[0]}`);
            const technicianRequestList = technicianRequests.data.requests;
            const lastUpdatedTechnicianRequestTime = technicianRequestList.length !== 0 && technicianRequestList[technicianRequestList.length - 1].updatedAt;
            const technicianComplaints = await axios.get(`/api/complaint/complaints/incoming/${res.data.staff.department[0]}`);
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
            setTotalsDate({ totalRequestsDate: lastUpdatedTechnicianRequestTime, totalComplaintsDate: lastUpdatedTechnicianComplaintTime, totalTicketsDate: lastUpdatedTechnicianTime });
            setTotals({ totalRequests: technicianRequestList.length, totalComplaints: technicianComplaintList.length, totalTickets: technicianRequestList.length + technicianComplaintList.length });
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
            setTotalsDate({ totalRequestsDate: lastUpdatedUserRequestTime, totalComplaintsDate: lastUpdatedUserComplaintTime, totalTicketsDate: lastUpdatedUserTime });
            setTotals({ totalRequests: userRequestList.length, totalComplaints: userComplaintList.length, totalTickets: userRequestList.length + userComplaintList.length });
            break;

          default:
            navigate(`/404`);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
    checkAuth();
  }, [id, navigate, refresh, adminCtx.department]);

  return (
    <div className={`${classes.DashBoard} row`}>
      <div className="col-4">
        <div className={`${classes.sales}`}>
          <div className={classes.request}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className"bi bi-envelope-fill" viewBox="0 0 16 16">
              <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
            </svg> */}
            <h1>Total Requests</h1>
          </div>
          <div className={classes.count}>
            <div className={classes.progress}>
              <h1>{totals.totalRequests}</h1>
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
          <p>{!totalsDate.totalRequestsDate ? 'No requests initiated' : 'Last update ' + getLastDate(totalsDate.totalRequestsDate)}</p>
        </div>
      </div>
      <div className="col-4">
        <div className={`${classes.sales}`}>
          <div className={classes.complaint}>
            <h1>Total Concerns</h1>
          </div>
          <div className={classes.count}>
            <div className={classes.progress}>
              <h1>{totals.totalComplaints}</h1>
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
          <p>{!totalsDate.totalComplaintsDate ? 'No concerns initiated' : 'Last update ' + getLastDate(totalsDate.totalComplaintsDate)}</p>
        </div>
      </div>
      <div className="col-4">
        <div className={`${classes.sales}`}>
          <div className={classes.pending}>
            <h1>Total Tickets</h1>
          </div>
          <div className={classes.count}>
            <div className={classes.progress}>
              <h1>{totals.totalTickets}</h1>
            </div>
            <div className={classes.circle} style={{ width: 70, height: 70 }}>
              <CircularProgressbar
                value={Math.round(ticketsDays)}
                text={`${(new Date().getDate() - 1)} days`}
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
          <p>{!totalsDate.totalTicketsDate ? 'No tickets initiated' : 'Last update ' + getLastDate(totalsDate.totalTicketsDate)}</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;