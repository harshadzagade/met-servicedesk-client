import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import classes from './Ticket.module.css';
import { Col, Container, Input, List, ListInlineItem, Row } from 'reactstrap';
import TicketDetails from '../cardtickets/TicketDetails';
import TicketCard from '../cardtickets/TicketCard';
import AuthContext from '../../../context/AuthContext/AuthContext';
import CreateTicket from './CreateTicket';

const EngineerTicket = ({ type, department }) => {
    const authCtx = useContext(AuthContext);
    const [departmentData, setDepartmentData] = useState([]);
    const [ownData, setOwnData] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('assignToMe');
    const [filteredData, setFilteredData] = useState([]);
    const [countAssignToMe, setCountAssignToMe] = useState(0);
    const [countOwn, setCountOwn] = useState(0);
    const [countDept, setCountDept] = useState(0);
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    

    const fetchData = async () => {
        try {
            const departmentResponse = await axios.get(type === 'Complaint'
                ? `https://hello.helpdesk.met.edu/api/complaint/complaints/incoming/${department}`
                : `https://hello.helpdesk.met.edu/api/request/requestsbydepartment/${department}`);
            
            const ownResponse = await axios.get(type === 'Complaint'
                ? `https://hello.helpdesk.met.edu/api/complaint/owncomplaints/${authCtx.employeeInfo.id}`
                : `https://hello.helpdesk.met.edu/api/request/ownrequests/${authCtx.employeeInfo.id}`);
            
            setDepartmentData(type === 'Complaint' ? departmentResponse.data.complaints : departmentResponse.data.requests);
            setOwnData(type === 'Complaint' ? ownResponse.data.complaints : ownResponse.data.requests);
            setFilteredData(type === 'Complaint' ? departmentResponse.data.complaints : departmentResponse.data.requests);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [type, department]);

    useEffect(() => {
        const result = departmentData.filter((item) => {
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
            else if (selectedFilter === (type === 'Complaint' ? 'myComplaints' : 'myRequests')) {
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
        setFilteredData(result);
    }, [departmentData, search, selectedFilter, authCtx.employeeInfo, type]);

    const handleFilterSelect = (filter) => {
        setSelectedFilter(filter);
    };

    const handleCardClick = (data, index) => {
        setSelectedCard(data);
        setSelectedCardIndex(index);
    };

    useEffect(() => {
        const updateCounts = () => {
            const assignToMeCount = departmentData.filter(item => item.assignedName === authCtx.employeeInfo.firstname + ' ' + authCtx.employeeInfo.lastname).length;
            const ownCount = departmentData.filter(item => item.name === authCtx.employeeInfo.firstname + ' ' + authCtx.employeeInfo.lastname).length;
            const deptCount = departmentData.filter(item => authCtx.employeeInfo.department.includes(item.department)).length;  

            setCountAssignToMe(assignToMeCount);
            setCountOwn(ownCount);
            setCountDept(deptCount);
        };
        updateCounts();
    }, [authCtx, departmentData]);

    return (
        <div>
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <List className={`m-3 ${classes.filters_wrap}`}>
                            <ListInlineItem className={`${classes.filters} ${selectedFilter === 'assignToMe' ? classes.active : ''}`} onClick={() => handleFilterSelect('assignToMe')}>
                                Assign To Me
                                {countAssignToMe > 0 && <span className={classes.notification}>{countAssignToMe}</span>}
                            </ListInlineItem>
                            <ListInlineItem className={`${classes.filters} ${selectedFilter === (type === 'Complaint' ? 'myComplaints' : 'myRequests') ? classes.active : ''}`} onClick={() => handleFilterSelect(type === 'Complaint' ? 'myComplaints' : 'myRequests')}>
                                {type === 'Complaint' ? 'My Complaints' : 'My Requests'}
                                {countOwn > 0 && <span className={classes.notification}>{countOwn}</span>}
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

export default EngineerTicket;
