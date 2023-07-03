import React, { useContext, useEffect, useState } from 'react';
import classes from './Rightside.module.css';
import axios from 'axios';
import RequestedDetails from '../UI/RequestedDetails/RequestedDetails';
import ComplaintedDetails from '../UI/ComplaintedDetails/ComplaintedDetails';
import TicketDetailsContext from '../Context/TicketDetailsContext/TicketDetailsContext';
import { Fragment } from 'react';
import RightCard from '../UI/RightCard/RightCard';

const Rightside = () => {
  const ticketCtx = useContext(TicketDetailsContext);
  const [staffInfo, setStaffInfo] = useState({ firstname: '', lastname: '', role: '', department: '' });
  const id = localStorage.getItem('id');

  useEffect(() => {
    const getStaffInfo = async () => {
      try {
        if (id) {
          const staff = await axios.get(`/api/staff/staffdetails/${id}`);
          setStaffInfo({ firstname: staff.data.staff.firstname, lastname: staff.data.staff.lastname, role: staff.data.staff.role, department: staff.data.staff.department });
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getStaffInfo();
  }, [id]);
  return (

    <Fragment>
      {/* <h1>hello</h1>
      <RightCard /> */}

      <div className={classes.right} hidden={window.location.pathname === '/login' || window.location.pathname === '/forgotpassword' || window.location.pathname === '/passwordreset' ? true : false}>
        {ticketCtx.ticketType === 'complaint' && <ComplaintedDetails />}
        {ticketCtx.ticketType === 'request' && <RequestedDetails />}
      </div>
    </Fragment>


  )
}

export default Rightside;