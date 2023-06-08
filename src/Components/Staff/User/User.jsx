import React, { Fragment, useState } from 'react';
import UserHomeNavigation from './UserHomeNavigation/UserHomeNavigation';
import UserOwnRequests from './UserOwnRequests/UserOwnRequests';
import UserOwnComplaints from './UserOwnComplaints/UserOwnComplaints';
import classes from './User.module.css';

const User = () => {
  const [openLayout, setOpenLayout] = useState('ownRequests');
  const checkLayout = (value) => {
    setOpenLayout(value);
  };
  return (
    <Fragment>
      <UserHomeNavigation viewLayout={checkLayout} />
      <div className={`${classes.container}`}>
        {openLayout === 'ownRequests' && <UserOwnRequests />}
        {openLayout === 'ownComplaints' && <UserOwnComplaints />}
      </div>
    </Fragment>
  );
};

export default User;