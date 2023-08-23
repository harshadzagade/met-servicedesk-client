import React, { useContext } from 'react';
import classes from './ComplaintCard.module.css';
import TicketCounterContext from '../../../Context/TicketCounterContext/TicketCounterContext';

const ComplaintCard = () => {
    const ticketCounterCtx = useContext(TicketCounterContext);

    return (
        <div className={classes.details}>
            <hr className='mt-3' />
            <div className={classes.tikStatus}>
                <label>Pending:</label>
                <p>{ticketCounterCtx.complaintStatusCount.pending}</p>
            </div>
            <hr />
            <div className={classes.tikStatus}>
                <label>Attending:</label>
                <p>{ticketCounterCtx.complaintStatusCount.attending}</p>
            </div>
            <hr />
            <div className={classes.tikStatus}>
                <label>Forwarded:</label>
                <p>{ticketCounterCtx.complaintStatusCount.forwarded}</p>
            </div>
            <hr />
            <div className={classes.tikStatus}>
                <label>Closed:</label>
                <p>{ticketCounterCtx.complaintStatusCount.closed}</p>
            </div>
        </div>
    );
};

export default ComplaintCard;