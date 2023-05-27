import React, { Fragment, useState } from 'react';
import UserHomeNavigation from './UserHomeNavigation/UserHomeNavigation';
import UserOwnRequests from './UserOwnRequests/UserOwnRequests';
import UserOwnComplaints from './UserOwnComplaints/UserOwnComplaints';

const User = () => {
  const [openLayout, setOpenLayout] = useState('ownRequests');
  const checkLayout = (value) => {
    setOpenLayout(value);
  };
  return (
    <Fragment>
      <UserHomeNavigation viewLayout={checkLayout} />
      {openLayout === 'ownRequests' && <UserOwnRequests />}
      {openLayout === 'ownComplaints' && <UserOwnComplaints />}
    </Fragment>
  );
};

export default User;