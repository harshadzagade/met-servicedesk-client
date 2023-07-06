import React from 'react';
import classes from './ComplaintCard.module.css';

const ComplaintCard = () => {
    return (
        <div className={classes.details}>
            <hr className='mt-3' />
            <div className={classes.tikStatus}>
                <label>Pending: </label>
                <p>2000000</p>
            </div>
            <hr />
            <div className={classes.tikStatus}>
                <label>Assign: </label>
                <p>2000000</p>
            </div>
            <hr />
            <div className={classes.tikStatus}>
                <label>Attending: </label>
                <p>2000000</p>
            </div>
            <hr />
            <div className={classes.tikStatus}>
                <label>Forwaded: </label>
                <p>2000000</p>
            </div>
            <hr />
            <div className={classes.tikStatus}>
                <label>Closed: </label>
                <p>2000000</p>
            </div>
          
        </div>
    );
};

export default ComplaintCard;