import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import classes from './Ticket.module.css';
import { Col, Container, Input, List, ListInlineItem, Row } from 'reactstrap';
import TicketDetails from '../cardtickets/TicketDetails';
import TicketCard from '../cardtickets/TicketCard';
import AuthContext from '../../../context/AuthContext/AuthContext';
import AdminContext from '../../../context/AdminContext/AdminContext';
import CreateTicket from './CreateTicket';

const AdminTicket = ({ type }) => {
    const authCtx = useContext(AuthContext);
    const adminCtx = useContext(AdminContext);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('incoming');
    const [filter, setFilter] = useState([]);
    const [countIncoming, setCountIncoming] = useState(0);
    const [countOutgoing, setCountOutgoing] = useState(0);
    const [countMyRequest, setCountMyRequest] = useState(0);
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
    const getData = async () => {
        try {
            const id = authCtx.employeeInfo.id;
            const department = adminCtx.department;
            let response;

            if (type === 'Complaint') {
                switch (selectedFilter) {
                    case 'incoming':
                        response = await axios.get(`https://hello.helpdesk.met.edu/api/complaint/complaints/incoming/${department}`);
                        break;
                    case 'outgoing':
                        response = await axios.get(`https://hello.helpdesk.met.edu/api/staff/admin/complaints/outgoing/${id}/${department}`);
                        break;
                    case 'myRequest':
                        response = await axios.get(`https://hello.helpdesk.met.edu/api/complaint/owncomplaints/${id}`);
                        break;
                    default:
                        break;
                }
            } else {
                switch (selectedFilter) {
                    case 'incoming':
                        response = await axios.get(`https://hello.helpdesk.met.edu/api/staff/admin/requests/incoming/${department}`);
                        break;
                    case 'outgoing':
                        response = await axios.get(`https://hello.helpdesk.met.edu/api/staff/admin/requests/outgoing/${id}/${department}`);
                        break;
                    case 'myRequest':
                        response = await axios.get(`https://hello.helpdesk.met.edu/api/request/ownrequests/${id}`);
                        break;
                    default:
                        break;
                }
            }

            const responseData = type === 'Complaint' ? response.data.complaints : response.data.requests;
            const dataWithTypes = responseData.map(item => ({ ...item, type }));
            setData(Array.isArray(dataWithTypes) ? dataWithTypes : []);
            setFilter(Array.isArray(dataWithTypes) ? dataWithTypes : []);
        } catch (error) {
            console.log(error);
        }
    };
    getData();
}, [type, selectedFilter, authCtx.employeeInfo, adminCtx.department]);

    useEffect(() => {
        const result = data.filter((item) => {
            const combinedFields = [
                item.name,
                item.status,
                item.department,
                item.subject,
                item.assignedName
            ].join(' ');

            return combinedFields.toLowerCase().includes(search.toLowerCase());
        });

        if (result.length === 0) {
            setErrorMessage("No data found");
        } else {
            setErrorMessage("");
        }
        setFilter(result);
    }, [data, search]);

    const handleFilterSelect = (filter) => {
        setSelectedFilter(filter);
    };

    const handleCardClick = (data, index) => {
        setSelectedCard(data);
        setSelectedCardIndex(index);
    };

    useEffect(() => {
        const updateCounts = () => {
            const id = authCtx.employeeInfo.id;
            const department = authCtx.employeeInfo.department;
            const incomingCount = data.filter(item => item.department === department).length;
            const outgoingCount = data.filter(item => item.assignedBy === id).length;
            const myRequestCount = data.filter(item => item.name === authCtx.employeeInfo.firstname + ' ' + authCtx.employeeInfo.lastname).length;  

            setCountIncoming(incomingCount);
            setCountOutgoing(outgoingCount);
            setCountMyRequest(myRequestCount);
        };
        updateCounts();
    }, [authCtx, data]);

    return (
        <div>
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <List className={` m-3 ${classes.filters_wrap} `}>
                            <ListInlineItem className={`${classes.filters} ${selectedFilter === 'incoming' ? classes.active : ''}`} onClick={() => handleFilterSelect('incoming')}>
                                Incoming
                                {countIncoming > 0 && <span className={classes.notification}>{countIncoming}</span>}
                            </ListInlineItem>
                            <ListInlineItem className={`${classes.filters} ${selectedFilter === 'outgoing' ? classes.active : ''}`} onClick={() => handleFilterSelect('outgoing')}>
                                Outgoing
                                {countOutgoing > 0 && <span className={classes.notification}>{countOutgoing}</span>}
                            </ListInlineItem>
                            <ListInlineItem className={`${classes.filters} ${selectedFilter === 'myRequest' ? classes.active : ''}`} onClick={() => handleFilterSelect('myRequest')}>
                                My Request
                                {countMyRequest > 0 && <span className={classes.notification}>{countMyRequest}</span>}
                            </ListInlineItem>
                        </List>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <div className='d-flex justify-content-between align-items-center  '>
                            <CreateTicket type={type} />

                            <Input type="text" className={` ${classes.searchinput}`} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <div className={classes.cardwrap}>
                            {filter.length > 0 ? (
                                filter.map((data, index) => (
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

export default AdminTicket;
