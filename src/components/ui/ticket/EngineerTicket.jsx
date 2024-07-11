import React, { Fragment, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import classes from './Ticket.module.css';
import { Button, Col, Container, Form, FormGroup, Input, Label, List, ListInlineItem, Row } from 'reactstrap';
import TicketDetails from '../cardtickets/TicketDetails';
import TicketCard from '../cardtickets/TicketCard';
import AuthContext from '../../../context/AuthContext/AuthContext';
import CreateTicket from './CreateTicket';

const EngineerTicket = ({ type, department }) => {
    const authCtx = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('assignToMe');
    const [filter, setFilter] = useState([]);
    const [countAssignToMe, setCountAssignToMe] = useState(0);
    const [countMyRequest, setCountMyRequest] = useState(0);
    const [countDept, setCountDept] = useState(0);
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(type === 'Complaint'
                    ? `https://hello.helpdesk.met.edu/api/complaint/complaints/incoming/${department}`
                    : `https://hello.helpdesk.met.edu/api/request/requestsbydepartment/${department}`);
                const responseData = type === 'Complaint' ? response.data.complaints : response.data.requests;
                setData(Array.isArray(responseData) ? responseData : []);
                setFilter(Array.isArray(responseData) ? responseData : []);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, [type, department]);

    useEffect(() => {
        const result = data.filter((item) => {
            const combinedFields = [
                item.name,
                item.status,
                item.department,
                item.subject,
                item.assignedName
            ].join(' ');

            const matchesSearch = combinedFields.toLowerCase().includes(search.toLowerCase());

            let matchesFilter;
            if (selectedFilter === 'assignToMe') {
                matchesFilter = item.assignedName === authCtx.employeeInfo.firstname + ' ' + authCtx.employeeInfo.lastname;
            }
            else if (selectedFilter === 'myRequest') {
                matchesFilter = item.name === authCtx.employeeInfo.firstname + ' ' + authCtx.employeeInfo.lastname;
            }
            else if (selectedFilter === 'department') {
                matchesFilter = authCtx.employeeInfo.department.includes(item.department);
            }
            else {
                matchesFilter = true;
            }

            return matchesSearch && matchesFilter;
        });

        if (result.length === 0) {
            setErrorMessage("No data found");
        } else {
            setErrorMessage("");
        }
        setFilter(result);
    }, [data, search, selectedFilter, authCtx.employeeInfo]);

    const handleFilterSelect = (filter) => {
        setSelectedFilter(filter);
    };

    const handleCardClick = (data, index) => {
        setSelectedCard(data);
        setSelectedCardIndex(index);
    };

    useEffect(() => {
        const updateCounts = () => {
            const assignToMeCount = data.filter(item => item.assignedName === authCtx.employeeInfo.firstname + ' ' + authCtx.employeeInfo.lastname).length;
            const myRequestCount = data.filter(item => item.name === authCtx.employeeInfo.firstname + ' ' + authCtx.employeeInfo.lastname).length;
            const deptCount = data.filter(item => authCtx.employeeInfo.department.includes(item.department)).length;  

            setCountAssignToMe(assignToMeCount);
            setCountMyRequest(myRequestCount);
            setCountDept(deptCount);
        };
        updateCounts();
    }, [authCtx, data]);

    console.log(filter, 'filter');

    return (
        <div>
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <List className={` m-3 ${classes.filters_wrap} `}>
                            <ListInlineItem className={`${classes.filters} ${selectedFilter === 'assignToMe' ? classes.active : ''}`} onClick={() => handleFilterSelect('assignToMe')}>
                                Assign To Me
                                {countAssignToMe > 0 && <span className={classes.notification}>{countAssignToMe}</span>}
                            </ListInlineItem>
                            <ListInlineItem className={`${classes.filters} ${selectedFilter === 'myRequest' ? classes.active : ''}`} onClick={() => handleFilterSelect('myRequest')}>
                                My Request
                                {countMyRequest > 0 && <span className={classes.notification}>{countMyRequest}</span>}
                            </ListInlineItem>
                            <ListInlineItem className={`${classes.filters} ${selectedFilter === 'department' ? classes.active : ''}`} onClick={() => handleFilterSelect('department')}>
                                Department
                                {countDept > 0 && <span className={classes.notification}>{countDept}</span>}
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

export default EngineerTicket;
