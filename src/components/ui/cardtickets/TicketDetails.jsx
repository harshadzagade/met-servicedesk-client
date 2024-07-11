import React from 'react';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import classes from './Ticket.module.css';
import EngineerDetails from '../ticketDetails/EngineerDetails';
import AdminDetails from '../ticketDetails/AdminDetails';
import SubAdminDetails from '../ticketDetails/SubAdminDetails';
import AuthContext from '../../../context/AuthContext/AuthContext';

const TicketDetails = ({ data, setSelectedCard, setSelectedCardIndex }) => {
    const authCtx = React.useContext(AuthContext);
    const userRole = authCtx.employeeInfo.role;

    const handleCardClose = () => {
        setSelectedCard(null);
        setSelectedCardIndex(null);
    }

    const renderRoleSpecificComponent = () => {
        switch (userRole) {
            case 'engineer':
                return <EngineerDetails data={data} />;
            case 'admin':
                return <AdminDetails data={data} />;
            case 'subadmin':
                return <SubAdminDetails data={data} />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className={`d-flex flex-wrap justify-content-lg-between align-items-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-x ${classes.closebtn}`} viewBox="0 0 16 16" onClick={handleCardClose}>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
            </div>
            <Card className={`mt-lg-4 ${classes.card} ${classes.detailsoverlay}`}>
                <CardBody>
                    <CardTitle tag="h5" className='text-left'>
                        TicketId: {data.ticketId}
                    </CardTitle>
                    <CardText className='text-left'>
                        <b>Request By:</b> {data.name} | {data.staffDepartment}
                    </CardText>
                    <CardText className='text-left'>
                        <b>Subject:</b> {data.subject}
                    </CardText>
                    <CardText className='text-left'>
                        <b>Description:</b> {data.description}
                    </CardText>
                    <CardText className='text-left'>
                        <b>Status:</b> {data.status}
                    </CardText>
                    <CardText className='text-left'>
                        <b>Department:</b> {data.department}
                    </CardText>
                    <CardText className='text-left'>
                        <b>Priority:</b> {data.priority}
                    </CardText>
                    <CardText className='text-left'>
                        <b>Date:</b> {new Date(data.createdAt).toLocaleString()}
                    </CardText>
                    <CardText className='text-left'>
                        <b>Assigned To:</b> {data.assignedName ? data.assignedName : "Not Assigned"}
                    </CardText>
                    <CardText className='text-left'>
                        <b>Problem Description:</b> {data.problemDescription ? data.problemDescription : "No Description"}
                    </CardText>
                    <CardText className='text-left'>
                        <b>Action Taken:</b> {data.actionTaken ? data.actionTaken : "No Action"}
                    </CardText>
                </CardBody>
            </Card>
            {renderRoleSpecificComponent()}
        </>
    );
};

export default TicketDetails;
