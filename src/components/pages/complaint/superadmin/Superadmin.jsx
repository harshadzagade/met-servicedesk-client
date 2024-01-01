import React from 'react';
import classes from './Superadmin.module.css';
import { ButtonDropdown, Card, CardBody, CardText, CardTitle, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, List, ListInlineItem, Row } from 'reactstrap';

const Superadmin = () => {

    const [dropdownOpen, setOpen] = React.useState(false);

    return (
        <div>
            {/* filters */}
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <List className={` m-3 ${classes.filters_wrap} `}>
                            <ListInlineItem className={classes.filters}>
                                Pending
                            </ListInlineItem>
                            <ListInlineItem className={classes.filters}>
                                Phasellus iaculis
                            </ListInlineItem>
                            <ListInlineItem className={classes.filters}>
                                Nulla volutpat
                            </ListInlineItem>
                        </List>
                    </Col>
                </Row>

            </Container>
            {/* filters */}
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <ButtonDropdown toggle={() => { setOpen(!dropdownOpen) }}
                            isOpen={dropdownOpen}>
                            <DropdownToggle className="bg-primary" caret>
                                Sample Button Dropdown
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Numeric Characters
                                </DropdownItem>
                                <DropdownItem>One</DropdownItem>
                                <DropdownItem>Two</DropdownItem>
                                <DropdownItem>Three</DropdownItem>
                                <DropdownItem>Four</DropdownItem>
                                <DropdownItem>Five</DropdownItem>
                                <DropdownItem>Six</DropdownItem>
                                <DropdownItem>Seven</DropdownItem>
                                <DropdownItem>Eight</DropdownItem>
                                <DropdownItem>Nine</DropdownItem>
                                <DropdownItem>Zero</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                        <Card className={`mt-4 ${classes.card}`}>
                            <CardBody>
                                <div className={` ${classes.card_title_wrap}`}>
                                    <CardTitle tag="h5" className='text-left m-2'>
                                        Harshad Zagade
                                    </CardTitle>
                                    <CardText className='m-2'>
                                        01/01/2024
                                    </CardText>
                                </div>
                                <CardText className='text-left m-2'>
                                    Subject
                                </CardText>
                                <CardText className=' d-flex flex-wrap justify-content-lg-between '>
                                    <div className="btn-wrap">
                                        <small className={`${classes.button18} m-2`} role='button'>
                                            TicketId
                                        </small>
                                        <small className={`${classes.button18} m-2`} role='button'>
                                            Priority
                                        </small>
                                        <small className={`${classes.button18} m-2`} role='button'>
                                            Status
                                        </small>
                                        <small className={`${classes.button18} m-2 ${classes.hod}`} role='button'>
                                            HOD Status
                                        </small>
                                    </div>

                                    <CardText className='text-md-right m-2 text-sm-center' >
                                        Assigned to Enginner Name
                                    </CardText>
                                </CardText>
                            </CardBody>
                        </Card>
                        <Card className={`mt-4 ${classes.card}`}>
                            <CardBody>
                                <div className={` ${classes.card_title_wrap}`}>
                                    <CardTitle tag="h5" className='text-left m-2'>
                                        Harshad Zagade
                                    </CardTitle>
                                    <CardText className='m-2'>
                                        01/01/2024
                                    </CardText>
                                </div>
                                <CardText className='text-left m-2'>
                                    Subject
                                </CardText>
                                <CardText className=' d-flex flex-wrap justify-content-lg-between '>
                                    <div className="btn-wrap">
                                        <small className={`${classes.button18} m-2`} role='button'>
                                            TicketId
                                        </small>
                                        <small className={`${classes.button18} m-2`} role='button'>
                                            Priority
                                        </small>
                                        <small className={`${classes.button18} m-2`} role='button'>
                                            Status
                                        </small>
                                        <small className={`${classes.button18} m-2 ${classes.hod}`} role='button'>
                                            HOD Status
                                        </small>
                                    </div>

                                    <CardText className='text-md-right m-2 text-sm-center' >
                                        Assigned to Enginner Name
                                    </CardText>
                                </CardText>
                            </CardBody>
                        </Card>
                        <Card className={`mt-4 ${classes.card}`}>
                            <CardBody>
                                <div className={` ${classes.card_title_wrap}`}>
                                    <CardTitle tag="h5" className='text-left m-2'>
                                        Harshad Zagade
                                    </CardTitle>
                                    <CardText className='m-2'>
                                        01/01/2024
                                    </CardText>
                                </div>
                                <CardText className='text-left m-2'>
                                    Subject
                                </CardText>
                                <CardText className=' d-flex flex-wrap justify-content-lg-between '>
                                    <div className="btn-wrap">
                                        <small className={`${classes.button18} m-2`} role='button'>
                                            TicketId
                                        </small>
                                        <small className={`${classes.button18} m-2`} role='button'>
                                            Priority
                                        </small>
                                        <small className={`${classes.button18} m-2`} role='button'>
                                            Status
                                        </small>
                                        <small className={`${classes.button18} m-2 ${classes.hod}`} role='button'>
                                            HOD Status
                                        </small>
                                    </div>

                                    <CardText className='text-md-right m-2 text-sm-center' >
                                        Assigned to Enginner Name
                                    </CardText>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs={12} md={4}>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Superadmin;