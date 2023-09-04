import React, { Fragment, useState } from 'react';
import classes from './RightCard.module.css';
import CardNavigate from './CardNavigate/CardNavigate';
import ComplaintCard from './ComplaintCard/ComplaintCard';
import RequestCard from './RequestCard/RequestCard';

const RightCard = () => {
  const currentTab = sessionStorage.getItem('tab');
  const [openLayout, setOpenLayout] = useState(currentTab);

  const checkLayout = (value,) => {
    setOpenLayout(value);
  };

  return (
    <Fragment>
      <div className={classes.compdetails}>
        <div className={classes.details}>
          <CardNavigate viewLayout={checkLayout} />
          {openLayout === 'complaint' && <ComplaintCard />}
          {openLayout === 'request' && <RequestCard />}
        </div>
      </div>
    </Fragment>
  );
};

export default RightCard;