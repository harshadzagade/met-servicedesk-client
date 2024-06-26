import React, { useContext, useEffect, useState } from 'react';
import classes from './ComplaintedDetails.module.css';
import axios from 'axios';
import TicketDetailsContext from '../../Context/TicketDetailsContext/TicketDetailsContext';

const ComplaintedDetails = () => {
  const ticketCtx = useContext(TicketDetailsContext);
  const [complaimntDetails, setComplaintDetails] = useState({});

  useEffect(() => {
    const getList = async () => {
      try {
        if (ticketCtx.staffId) {
          const list = await axios.get(`/api/staff/staffdetails/${ticketCtx.staffId}`);
          setComplaintDetails(list.data.staff);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getList();
  }, [ticketCtx.staffId]);

  return (
    <div className={classes.compdetails}>
      <h2>Complaint issued by</h2>
      <div className={classes.details}>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
        </svg>
        <div className={classes.name}>
          <h2>{complaimntDetails.firstname + ' ' + complaimntDetails.lastname} </h2>
          <p>Dept: {complaimntDetails.department}</p>
          <p>Institute: {complaimntDetails.institute}</p>
          <p>Email: {complaimntDetails.email}</p>
          <p>Extension: {complaimntDetails.contactExtension}</p>
        </div>
      </div>
    </div>
  );
};

export default ComplaintedDetails;