import React from 'react';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import classes from './Ticket.module.css';

const TicketCard = ({ data, onClick }) => {

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return classes.statuspending;
            case 'approved':
                return classes.statusapproved;
            case 'Hod Approved':
                return classes.hodapproved;
            case 'attending':
                return classes.statusattending;
            case 'forwarded':
                return classes.statusforwarded;
            case 'closed':
                return classes.statusclose;
            case 'dissapproved':
                return classes.statusdissapproved;
            case 'high':
                return classes.priorityHigh;
            case 'medium':
                return classes.priorityMedium;
            case 'low':
                return classes.priorityLow;
            default:
                return 'primary';
        }
    }

    return (
        <Card className={`mt-4 ${classes.card} `} onClick={onClick}>
            {console.log(getStatusColor(data.priority))}
            <CardBody>
                <div className={` ${classes.card_title_wrap}`}>
                    <CardTitle tag="h5" className='text-left m-2'>
                        {data.name}
                    </CardTitle>
                    <CardText className='m-2'>
                        {data.date}
                    </CardText>
                </div>
                <CardText className='text-left m-2'>
                    {data.subject}
                </CardText>
                <CardText className=' d-flex flex-wrap justify-content-lg-between '>
                    <div className="btn-wrap">
                        <small className={`${classes.tikid} ${classes.button18} m-2`} role='button'>
                            {data.ticketId}
                        </small>
                        <small className={`${getStatusColor(data.priority)} ${classes.button18} m-2`} role='button'>
                            {data.priority}
                        </small>
                        <small className={`${getStatusColor(data.status)} ${classes.button18} m-2`} role='button'>
                            {data.status}
                        </small>
                        {/* <small className={`${classes.button18} m-2 ${classes.hod}`} role='button'>
                            {data.hodstatus}
                        </small> */}
                    </div>

                    <CardText className='text-md-right m-2 text-sm-center' >
                        Assigned to {data.assigned_to}
                    </CardText>
                </CardText>
            </CardBody>
        </Card>
    );
};

export default TicketCard;
