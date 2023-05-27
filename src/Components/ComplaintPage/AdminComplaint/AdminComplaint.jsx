import React, { Fragment, useState } from 'react';
// import classes from './AdminComplaint.module.css';
import SendComplaint from './SendComplaint/SendComplaint';
import IncomingComplaint from './IncomingComplaints/IncomingComplaint';
import OutgoingDepartmentComplaints from './OutgoingDepartmentComplaints/OutgoingDepartmentComplaints';
import ComplaintNavigation from './ComplaintNavigation/ComplaintNavigation';
import OwnComplaints from './OwnComplaints/OwnComplaints';

const AdminComplaint = () => {
    const [openLayout, setOpenLayout] = useState('outgoingDepartmentComplaints');
    const checkLayout = (value) => {
        setOpenLayout(value);
    };
    return (
        <Fragment>
            <ComplaintNavigation viewLayout={checkLayout} />
            {openLayout === 'outgoingDepartmentComplaints' && <OutgoingDepartmentComplaints />}
            {openLayout === 'incomingComplaints' && <IncomingComplaint />}
            {openLayout === 'ownComplaints' && <OwnComplaints />}
            {openLayout === 'sendComplaints' && <SendComplaint />}
        </Fragment>
    );
};

export default AdminComplaint;