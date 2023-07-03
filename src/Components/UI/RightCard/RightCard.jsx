import React from 'react';
import classes from './RightCard.module.css';


const RightCard = () => {
    return (
        <div className={classes.compdetails}>
            <div className={classes.details}>
                <div>
                    <p>Pending</p>
                    <hr />
                    <p>Assign</p>
                    <hr />
                    <p>Attending</p>
                    <hr />
                    <p>close</p>
                    <hr />
                    <p>forwaed</p>

                </div>
            </div>
        </div>
    )
}

export default RightCard