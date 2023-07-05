import React from 'react';
import classes from './RightCard.module.css';
import { useState } from 'react';
import { Fragment } from 'react';
import CardNavigate from './CardNavigate/CardNavigate';
import ComplaintCard from './ComplaintCard/ComplaintCard';
import RequestCard from './RequestCard/RequestCard';


const RightCard = () => {
    const [openLayout, setOpenLayout] = useState('Complaint');
  const checkLayout = (value,) => {
    setOpenLayout(value);
  } 
    return (
        <Fragment> 
        <h2 className="tik-type-title">Dashboard</h2>
        <div className={classes.compdetails}>
           <div className={classes.details}>
           <CardNavigate viewLayout={checkLayout} />
           {openLayout === 'Complaint' && <ComplaintCard />}
            {openLayout === 'Request' && <RequestCard />}
            </div>
        </div>
        </Fragment>
    )
}

export default RightCard