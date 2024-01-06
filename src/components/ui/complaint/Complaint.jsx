// Complaint.jsx
import React, { Fragment, useEffect, useState } from 'react';
import classes from './Complaint.module.css';
import { ButtonDropdown, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, List, ListInlineItem, Row } from 'reactstrap';
import TicketDetails from '../cardtickets/TicketDetails';
import TicketCard from '../cardtickets/TicketCard';

const dummyData = [
    {
        name: "Harshad Zagade",
        subject: "Mic Not Working",
        date: "12/12/2021",
        department: "IT",
        tik_id: "#012024",
        priority: "High",
        status: "Pending",
        hodstatus: "Pending",
        assigned_to: "Harshad"
    },
    {
        name: "Anirudha Mhatre",
        subject: "Keyboard Not Working",
        date: "12/12/2021",
        department: "ERP",
        tik_id: "#022024",
        priority: "High",
        status: "Attending",
        hodstatus: "Pending",
        assigned_to: "NA"
    },
    {
        name: "Manoj Bagal",
        subject: "Monitor Not Working",
        date: "12/12/2021",
        department: "ERP",
        tik_id: "#032024",
        priority: "High",
        status: "Pending",
        hodstatus: "Pending",
        assigned_to: "NA"
    },
    {
        name: "Akshay Shinde",
        subject: "Mouse Not Working",
        date: "12/12/2021",
        department: "HR",
        tik_id: "#042024",
        priority: "High",
        status: "Pending",
        hodstatus: "Pending",
        assigned_to: "NA"
    },
    {
        name: "Jamshed Irani",
        subject: "Internet Speed Issue",
        date: "12/12/2021",
        department: "NETWORK",
        tik_id: "#052024",
        priority: "High",
        status: "Attending",
        hodstatus: "Pending",
        assigned_to: "Maya"
    },
    {
        name: "Ankush Bagal",
        subject: "TV Not Working",
        date: "12/12/2021",
        tik_id: "#062024",
        priority: "High",
        status: "Close",
        hodstatus: "Pending",
        assigned_to: "Alex"
    }
];

const Complaint = ({ }) => {
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

    useEffect(() => {
        const getData = () => {
            try {
                // Fetch or set data based on the role or other conditions
                setData(dummyData);
                setFilter(dummyData);
                updateCounts(dummyData);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    useEffect(() => {
        const result = data.filter((item) => {
            const combinedFields = [
                item.name,
                item.status,
                item.institute,
                item.subject
            ].join(' ');

            const matchesSearch = combinedFields.toLowerCase().includes(search.toLowerCase());
            const matchesDept = selectedDept ? item.department === selectedDept : true;
            const matchesStatus = selectedStatus ? item.status === selectedStatus : true;
            return matchesSearch && matchesDept && matchesStatus;
        });
        setFilter(result);
    }, [data, search, selectedDept, selectedStatus]);

    const handleDeptSelect = (dept) => {
        setSelectedDept(dept);
        setDropdownText(dept === '' ? 'All' : dept);
    };

    const handleStatusSelect = (status) => {
        setSelectedStatus(status);
    };

    const [dropdownOpen, setOpen] = useState(false);

    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);

    const handleCardClick = (data, index) => {
        setSelectedCard(data);
        setSelectedCardIndex(index);
    };

    // Notificaiton count
    const updateCounts = (filteredData) => {
        // Calculate counts based on the filtered data
        setCountAll(filteredData.length);
        setCountPending(filteredData.filter(item => item.status === 'Pending').length);
        setCountAttending(filteredData.filter(item => item.status === 'Attending').length);
        setCountForwarded(filteredData.filter(item => item.status === 'Forwarded').length);
        setCountClose(filteredData.filter(item => item.status === 'Close').length);
        
    };

    return (
        <div>
            {/* filters */}
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <List className={` m-3 ${classes.filters_wrap} `}>
                            <ListInlineItem className={`${classes.filters} ${selectedStatus === '' ? classes.active : ''}`} onClick={() => handleStatusSelect('')}>
                                All
                                {countAll > 0 && <span className={classes.notification}>{countAll}</span>}
                            </ListInlineItem>
                            <ListInlineItem className={`${classes.filters} ${selectedStatus === 'Pending' ? classes.active : ''}`} onClick={() => handleStatusSelect('Pending')}>
                                Pending
                                {countPending > 0 && <span className={classes.notification}>{countPending}</span>}
                            </ListInlineItem>
                            <ListInlineItem className={`${classes.filters} ${selectedStatus === 'Attending' ? classes.active : ''}`} onClick={() => handleStatusSelect('Attending')}>
                                Attending
                                {countAttending > 0 && <span className={classes.notification}>{countAttending}</span>}
                            </ListInlineItem>
                            <ListInlineItem className={`${classes.filters} ${selectedStatus === 'Forwaded' ? classes.active : ''}`} onClick={() => handleStatusSelect('Forwaded')}>
                                Forwaded
                                {countForwarded > 0 && <span className={classes.notification}>{countForwarded}</span>}
                            </ListInlineItem>
                            <ListInlineItem className={`${classes.filters} ${selectedStatus === 'Close' ? classes.active : ''}`} onClick={() => handleStatusSelect('Close')}>
                                Close
                                {countClose > 0 && <span className={classes.notification}>{countClose}</span>}
                            </ListInlineItem>
                        </List>
                    </Col>
                </Row>

            </Container>
            {/* filters */}
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <div className='d-flex justify-content-between align-items-center '>
                            <ButtonDropdown toggle={() => { setOpen(!dropdownOpen) }}
                                isOpen={dropdownOpen}>
                                <DropdownToggle className="bg-primary" caret>
                                    <i className="fa fa-filter"></i>
                                    <span className="ms-2">{dropdownText}</span>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => handleDeptSelect('')}>All</DropdownItem>
                                    <DropdownItem onClick={() => handleDeptSelect('ERP')}>ERP</DropdownItem>
                                    <DropdownItem onClick={() => handleDeptSelect('NETWORK')}>NETWORK</DropdownItem>
                                    <DropdownItem onClick={() => handleDeptSelect('MAINTENANCE')}>MAINTAINENCE</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                            <div className='d-flex align-items-center justify-content-between '>
                                <Input type="text" className={` ${classes.searchinput}`} onChange={(e) => setSearch(e.target.value)} />
                                <div className={classes.searchicon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
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

export default Complaint;
