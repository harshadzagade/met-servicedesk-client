import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import classes from './Ticket.module.css';
import { ButtonDropdown, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, List, ListInlineItem, Row } from 'reactstrap';
import TicketDetails from '../cardtickets/TicketDetails';
import TicketCard from '../cardtickets/TicketCard';

const Ticket = ({type}) => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedDept, setSelectedDept] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [filter, setFilter] = useState([]);
    const [dropdownText, setDropdownText] = useState('Dept');
    const [countAll, setCountAll] = useState(0);
    const [countPending, setCountPending] = useState(0);
    const [countAttending, setCountAttending] = useState(0);
    const [countForwarded, setCountForwarded] = useState(0);
    const [countClose, setCountClose] = useState(0);
    const [dropdownOpen, setOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [countHodApproved, setCountHodApproved] = useState(0);


    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(type === 'Complaint' ? 'https://hello.helpdesk.met.edu/api/complaint/allcomplaints' : 'https://hello.helpdesk.met.edu/api/request/allrequests');
                const responseData = type === 'Complaint' ? response.data.complaints : response.data.requests;
                console.log("Fetched Data: ", response);
                setData(Array.isArray(responseData) ? responseData : []);
                setFilter(Array.isArray(responseData) ? responseData : []);
                updateCounts(Array.isArray(responseData) ? responseData : []);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, [type]);

    useEffect(() => {
        const result = data.filter((item) => {
            const combinedFields = [
                item.name,
                item.status,
                item.department,
                item.subject
            ].join(' ');

            const matchesSearch = combinedFields.toLowerCase().includes(search.toLowerCase());
            const matchesDept = selectedDept ? item.department === selectedDept : true;
            const matchesStatus = selectedStatus ? item.status === selectedStatus : true;
            return matchesSearch && matchesDept && matchesStatus;
        });
        console.log("Filtered Data: ", result);
        setFilter(result);
    }, [data, search, selectedDept, selectedStatus]);

    const handleDeptSelect = (dept) => {
        setSelectedDept(dept);
        setDropdownText(dept === '' ? 'All' : dept);
    };

    const handleStatusSelect = (status) => {
        setSelectedStatus(status);
    };

    const handleCardClick = (data, index) => {
        setSelectedCard(data);
        setSelectedCardIndex(index);
    };

    const updateCounts = (filteredData) => {
        setCountAll(filteredData.length);
        setCountPending(filteredData.filter(item => item.status === 'pending').length);
        setCountAttending(filteredData.filter(item => item.status === 'attending').length);
        setCountForwarded(filteredData.filter(item => item.status === 'forwarded').length);
        setCountClose(filteredData.filter(item => item.status === 'closed').length);
        setCountHodApproved(filteredData.filter(item => item.status === 'Hod Approved').length);
    };

    return (
        <div>
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <List className={` m-3 ${classes.filters_wrap} `}>
                            <ListInlineItem className={`${classes.filters} ${selectedStatus === '' ? classes.active : ''}`} onClick={() => handleStatusSelect('')}>
                                All
                                {countAll > 0 && <span className={classes.notification}>{countAll}</span>}
                            </ListInlineItem>
                            <ListInlineItem className={`${classes.filters} ${selectedStatus === 'pending' ? classes.active : ''}`} onClick={() => handleStatusSelect('pending')}>
                                Pending
                                {countPending > 0 && <span className={classes.notification}>{countPending}</span>}
                            </ListInlineItem>
                            <ListInlineItem className={`${classes.filters} ${selectedStatus === 'attending' ? classes.active : ''}`} onClick={() => handleStatusSelect('attending')}>
                                Attending
                                {countAttending > 0 && <span className={classes.notification}>{countAttending}</span>}
                            </ListInlineItem>
                            <ListInlineItem className={`${classes.filters} ${selectedStatus === 'forwaded' ? classes.active : ''}`} onClick={() => handleStatusSelect('forwaded')}>
                                Forwarded
                                {countForwarded > 0 && <span className={classes.notification}>{countForwarded}</span>}
                            </ListInlineItem>
                            <ListInlineItem className={`${classes.filters} ${selectedStatus === 'closed' ? classes.active : ''}`} onClick={() => handleStatusSelect('closed')}>
                                Close
                                {countClose > 0 && <span className={classes.notification}>{countClose}</span>}
                            </ListInlineItem>
                        </List>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <div className='d-flex justify-content-between align-items-center  '>
                            <ButtonDropdown toggle={() => { setOpen(!dropdownOpen) }} isOpen={dropdownOpen}>
                                <DropdownToggle className={classes.dropdownbtn} caret>
                                    <i className="fa fa-filter"></i>
                                    <span className="ms-2">{dropdownText}</span>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => handleDeptSelect('')}>All</DropdownItem>
                                    <DropdownItem onClick={() => handleDeptSelect('ERP')}>ERP</DropdownItem>
                                    <DropdownItem onClick={() => handleDeptSelect('NETWORK')}>NETWORK</DropdownItem>
                                    <DropdownItem onClick={() => handleDeptSelect('MAINTENANCE')}>MAINTENANCE</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                            <div className='d-flex align-items-center justify-content-between '>
                                <Input type="text" className={` ${classes.searchinput}`} onChange={(e) => setSearch(e.target.value)} />
                                <div className={classes.searchicon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {window.innerWidth < 480 ?
                            <Fragment>
                                {
                                    !selectedCard ?
                                        <div className={classes.cardwrap}>
                                            {filter.map((data, index) => {
                                                return (
                                                    <TicketCard className={`${selectedCardIndex === index ? 'selected' : ''}`} key={index} data={data} onClick={() => handleCardClick(data, index)} />
                                                )
                                            })}
                                        </div>
                                        :
                                        <Col xs={12} md={4}>
                                            <TicketDetails data={selectedCard} setSelectedCard={setSelectedCard} setSelectedCardIndex={setSelectedCardIndex} />
                                        </Col>
                                }
                            </Fragment>
                            :
                            <div className={classes.cardwrap}>
                                {filter.map((data, index) => {
                                    return (
                                        <TicketCard className={`${selectedCardIndex === index ? 'selected' : ''}`} key={index} data={data} onClick={() => handleCardClick(data, index)} />
                                    )
                                })}
                            </div>
                        }
                    </Col>
                    {
                        window.innerWidth > 480 && selectedCard &&
                        <Col xs={12} md={4}>
                            <TicketDetails data={selectedCard} setSelectedCard={setSelectedCard} setSelectedCardIndex={setSelectedCardIndex} />
                        </Col>
                    }
                </Row>
            </Container>
        </div>
    );
};

export default Ticket;
