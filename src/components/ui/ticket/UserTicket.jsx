import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import classes from './Ticket.module.css';
import { Col, Container, Input, List, ListInlineItem, Row } from 'reactstrap';
import TicketDetails from '../cardtickets/TicketDetails';
import TicketCard from '../cardtickets/TicketCard';
import AuthContext from '../../../context/AuthContext/AuthContext';
import CreateTicket from './CreateTicket';

const UserTicket = ({ type, department }) => {
    const authCtx = useContext(AuthContext);
    const [ownData, setOwnData] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchData = async () => {
        try {

            const ownResponse = await axios.get(type === 'Complaint'
                ? `https://hello.helpdesk.met.edu/api/complaint/owncomplaints/${authCtx.employeeInfo.id}`
                : `https://hello.helpdesk.met.edu/api/request/ownrequests/${authCtx.employeeInfo.id}`);
            
            const sortedOwnData = (type === 'Complaint' ? ownResponse.data.complaints : ownResponse.data.requests)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setOwnData(sortedOwnData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [type, department]);


    const handleCardClick = (data, index) => {
        setSelectedCard(data);
        setSelectedCardIndex(index);
    };


    const filteredData = ownData.filter((item) => {
        if (search === '') {
            return item;
        } else if (item.title.toLowerCase().includes(search.toLowerCase())) {
            return item;
        } else if (item.description.toLowerCase().includes(search.toLowerCase())) {
            return item;
        } else if (item.status.toLowerCase().includes(search.toLowerCase())) {
            return item;
        } else (
            setErrorMessage('No results found')
        )
    });

    return (
        <div>
            <Container className='mt-5'>
                <Row>
                    <Col xs={12} md={8}>
                        <div className='d-flex justify-content-between align-items-center'>
                            <CreateTicket type={type} />

                            <Input type="text" className={classes.searchinput} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <div className={classes.cardwrap}>
                            {filteredData.length > 0 ? (
                                filteredData.map((data, index) => (
                                    <TicketCard className={`${selectedCardIndex === index ? 'selected' : ''}`} key={index} data={data} onClick={() => handleCardClick(data, index)} />
                                ))
                            ) : (
                                <p>{errorMessage}</p>
                            )}
                        </div>
                    </Col>
                    {
                        selectedCard &&
                        <Col xs={12} md={4}>
                            <TicketDetails data={selectedCard} setSelectedCard={setSelectedCard} setSelectedCardIndex={setSelectedCardIndex} />
                        </Col>
                    }
                </Row>
            </Container>
        </div>
    );
};

export default UserTicket;
