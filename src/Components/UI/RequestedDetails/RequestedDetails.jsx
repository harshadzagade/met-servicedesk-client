import React, { useContext, useEffect, useState } from 'react';
import classes from './RequestedDetails.module.css';
import axios from 'axios';
import TicketDetailsContext from '../../Context/TicketDetailsContext/TicketDetailsContext';

const RequestedDetails = () => {
  const ticketCtx = useContext(TicketDetailsContext);
  const [requesterDetails, setRequesterDetails] = useState({});

  useEffect(() => {
    const getList = async () => {
      try {
        if (ticketCtx.id) {
          const list = await axios.get(`http://localhost:8001/api/staff/superadmin/staffdetails/${ticketCtx.id}`);
          setRequesterDetails(list.data.staff);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getList();
  }, [ticketCtx.id]);
  return (
    <div className={classes.requesterdetails}>
      <h2>Requester Details</h2>
      <div className={classes.details}>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
        </svg>
        <div className={classes.name}>
          <h2>{requesterDetails.firstname} </h2>
          <p>Dept: {requesterDetails.department}</p>
          <p>Email: {requesterDetails.email}</p>
          <p>Extension: {requesterDetails.contactExtension}</p>
        </div>

      </div>

    </div>
  )
}

export default RequestedDetails