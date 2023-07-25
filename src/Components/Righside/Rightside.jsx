import React, { Fragment, useContext } from 'react';
import classes from './Rightside.module.css';
import RequestedDetails from '../UI/RequestedDetails/RequestedDetails';
import ComplaintedDetails from '../UI/ComplaintedDetails/ComplaintedDetails';
import TicketDetailsContext from '../Context/TicketDetailsContext/TicketDetailsContext';
import RightCard from '../UI/RightCard/RightCard';

const Rightside = () => {
  const ticketCtx = useContext(TicketDetailsContext);

  return (
    <Fragment>
      <RightCard />
      <div className={classes.right} hidden={window.location.pathname === '/login' || window.location.pathname === '/forgotpassword' || window.location.pathname === '/passwordreset' ? true : false}>
        {ticketCtx.ticketType === 'complaint' && <ComplaintedDetails />}
        {ticketCtx.ticketType === 'request' && <RequestedDetails />}
      </div>
    </Fragment>
  );
};

export default Rightside;