import React from 'react'
import { Button, Card, CardBody, CardText, CardTitle } from 'reactstrap'
import { useReactToPrint } from 'react-to-print';
import classes from './Ticket.module.css';


const PrintDetails = React.forwardRef(({ data }, ref) => {
    const getCreatedDate = (createdAt) => {
        if (createdAt === null) {
            return null;
        }
        const date = new Date(createdAt);
        return (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + formatAMPM(date));
    };

    const formatAMPM = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
        return strTime;
    };
    return (

        <div ref={ref}>
            <Card className={` mt-lg-4  ${classes.card} ${classes.detailsoverlay}`}>
                <CardBody>
                    <CardTitle tag="h5" className='text-left'>
                        TicketId : {data.ticketId}
                    </CardTitle>
                    <CardText className='text-left'>
                        <b>Request By  :</b> {data.name} | {data.staffDepartment} <br />
                    </CardText>
                    <CardText className='text-left'>
                        <b>Subject :</b> {data.subject}
                    </CardText>
                    <CardText className='text-left'>
                        <b>Description :</b> {data.subject}
                    </CardText>
                    <CardText className='text-left'>
                        <b>Status :</b> {data.status}
                    </CardText>
                    <CardText className='text-left'>
                        <b>Department :</b> {data.department}
                    </CardText>
                    <CardText className='text-left'>
                        <b>Priority :</b> {data.priority}
                    </CardText>
                    <CardText className='text-left'>
                        <b>Date :</b> {getCreatedDate(data.createdAt)}
                    </CardText>
                    <CardText className='text-left'>
                        Hod Approval : {data.approval1 ? "Yes" : "No"}
                    </CardText>
                    <CardText className='text-left'>
                        Hod Comment : {data.approval1Comment}
                    </CardText>
                    <CardText className='text-left'>
                        Admin Approval : {data.approval2 ? "Yes" : "No"}
                    </CardText>
                    <CardText className='text-left'>
                        Admin Comment : {data.approval2Comment}
                    </CardText>

                    <CardText className='text-left'>
                        Assigned To : {data.assignedName}
                    </CardText>

                    <CardText className='text-left'>
                        Problem Description : {data.problemDescription}
                    </CardText>
                    <CardText className='text-left'>
                        isRepeated : {data.isRepeated}
                    </CardText>
                </CardBody>
            </Card>
        </div>

    )});
const TicketDetails = ({ data, setSelectedCard, setSelectedCardIndex }) => {
    const handleCardClose = () => {
        setSelectedCard(null);
        setSelectedCardIndex(null);
    }

    // Print funct
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    const printRef = React.useRef();

    return (
        <>
            <div className={`d-flex flex-wrap justify-content-lg-between align-items-center`}>
                <Button color="primary" onClick={handlePrint}>
                    Print
                </Button>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-x ${classes.closebtn}`} viewBox="0 0 16 16" onClick={handleCardClose}>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
            </div>
            <PrintDetails ref={printRef} data={data} />
        </>
    )
}

export default TicketDetails