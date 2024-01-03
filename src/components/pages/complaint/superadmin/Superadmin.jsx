import React, { Fragment, useEffect, useState } from 'react';
import classes from './Superadmin.module.css';
import { ButtonDropdown, Card, CardBody, CardText, CardTitle, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, List, ListInlineItem, Row } from 'reactstrap';
import TicketDetails from './TicketDetails';

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

const Superadmin = () => {

    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedDept, setSelectedDept] = useState('');
    const [filter, setFilter] = useState([]);

    useEffect(() => {
        const getData = () => {
            try {
                setData(dummyData);
                setFilter(dummyData);
            } catch (error) {
                console.log(error)
            }
        }
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
            return matchesSearch && matchesDept;
        })
        setFilter(result)
    }, [data, search, selectedDept]);

    const handleDeptSelect = (dept) => {
        setSelectedDept(dept);
    };


    const [dropdownOpen, setOpen] = useState(false);

    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    // console.log(selectedCard);
    // console.log(selectedCardIndex);

    const handleCardClick = (data, index) => {
        setSelectedCard(data);
        setSelectedCardIndex(index);
        // console.log(data);
    }


    return (
        <div>
            {/* filters */}
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <List className={` m-3 ${classes.filters_wrap} `}>
                            <ListInlineItem className={classes.filters}>
                                All
                            </ListInlineItem>
                            <ListInlineItem className={classes.filters}>
                                Pending
                            </ListInlineItem>
                            <ListInlineItem className={classes.filters}>
                                Attending
                            </ListInlineItem>
                            <ListInlineItem className={classes.filters}>
                                Forwaded
                            </ListInlineItem>
                            <ListInlineItem className={classes.filters}>
                                Close
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
                                    <span className="ms-2">Dept</span>
                                </DropdownToggle>
                                <DropdownMenu>
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
                                                    <Card className={`mt-4 ${classes.card} ${selectedCardIndex === index ? 'selected' : ''}`} key={index} onClick={() => handleCardClick(data, index)}>
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
                                                                    <small className={`${classes.button18} m-2`} role='button'>
                                                                        {data.tik_id}
                                                                    </small>
                                                                    <small className={`${classes.button18} m-2`} role='button'>
                                                                        {data.priority}
                                                                    </small>
                                                                    <small className={`${classes.button18} m-2`} role='button'>
                                                                        {data.status}
                                                                    </small>
                                                                    <small className={`${classes.button18} m-2 ${classes.hod}`} role='button'>
                                                                        {data.hodstatus}
                                                                    </small>
                                                                </div>

                                                                <CardText className='text-md-right m-2 text-sm-center' >
                                                                    Assigned to {data.assigned_to}
                                                                </CardText>
                                                            </CardText>
                                                        </CardBody>
                                                    </Card>
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
                                        <Card className={`mt-4 ${classes.card} ${selectedCardIndex === index ? 'selected' : ''}`} key={index} onClick={() => handleCardClick(data, index)}>
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
                                                        <small className={`${classes.button18} m-2`} role='button'>
                                                            {data.tik_id}
                                                        </small>
                                                        <small className={`${classes.button18} m-2`} role='button'>
                                                            {data.priority}
                                                        </small>
                                                        <small className={`${classes.button18} m-2`} role='button'>
                                                            {data.status}
                                                        </small>
                                                        <small className={`${classes.button18} m-2 ${classes.hod}`} role='button'>
                                                            {data.hodstatus}
                                                        </small>
                                                    </div>

                                                    <CardText className='text-md-right m-2 text-sm-center' >
                                                        Assigned to {data.assigned_to}
                                                    </CardText>
                                                </CardText>
                                            </CardBody>
                                        </Card>
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

export default Superadmin;