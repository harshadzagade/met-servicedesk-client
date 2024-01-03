import React from 'react'
import { Button, Card, CardBody, CardText, CardTitle } from 'reactstrap'
import classes from './Superadmin.module.css';

const TicketDetails = ({ data, setSelectedCard, setSelectedCardIndex }) => {
    const handleCardClose = () => {
        setSelectedCard(null);
        setSelectedCardIndex(null);
    }
    // console.log(data);
    return (
        <>
            <div className={`d-flex flex-wrap justify-content-lg-between align-items-center`}>
                <Button color="primary">
                    Print
                </Button>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class={`bi bi-x ${classes.closebtn}`} viewBox="0 0 16 16" onClick={handleCardClose}>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
            </div>
            <Card className={` mt-lg-4  ${classes.card} ${classes.detailsoverlay}`}>
                <CardBody>
                    <CardTitle tag="h5" className='text-left'>
                        TicketId : {data.tik_id}
                    </CardTitle>
                    <CardText className='text-left'>
                        Request By : {data.name}
                    </CardText>
                    <CardText className='text-left'>
                        Subject : {data.subject}
                    </CardText>
                    <CardText className='text-left'>
                        Description : {data.subject}
                    </CardText>
                </CardBody>
            </Card>


        </>
    )
}

export default TicketDetails