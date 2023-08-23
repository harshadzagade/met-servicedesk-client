import React, { useContext } from 'react';
import classes from './RequestCard.module.css';
import TicketCounterContext from '../../../Context/TicketCounterContext/TicketCounterContext';

const RequestCard = () => {
    const ticketCounterCtx = useContext(TicketCounterContext);

    return (
        <div className={classes.details}>
            <hr className='mt-3' />
            <div className={classes.tikStatus}>
                <label>Pending:</label>
                <p>{ticketCounterCtx.requestStatusCount.pending}</p>
            </div>
            <hr />
            <div className={classes.tikStatus}>
                <label>Disapproved:</label>
                <p>{ticketCounterCtx.requestStatusCount.disapproved}</p>
            </div>
            <hr />
            <div className={classes.tikStatus}>
                <label>Assigned:</label>
                <p>{ticketCounterCtx.requestStatusCount.assigned}</p>
            </div>
            <hr />
            <div className={classes.tikStatus}>
                <label>Attending:</label>
                <p>{ticketCounterCtx.requestStatusCount.attending}</p>
            </div>
            <hr />
            <div className={classes.tikStatus}>
                <label>Forwarded:</label>
                <p>{ticketCounterCtx.requestStatusCount.forwarded}</p>
            </div>
            <hr />
            <div className={classes.tikStatus}>
                <label>Closed:</label>
                <p>{ticketCounterCtx.requestStatusCount.closed}</p>
            </div>
        </div>
    );
};

export default RequestCard;