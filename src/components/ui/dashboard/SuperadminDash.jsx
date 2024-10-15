// src/components/pages/dashboard/superadmin/Superadmin.jsx
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import classes from './Superadmin.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext/AuthContext';

const SuperadminDash = (type) => {

    const authCtx = useContext(AuthContext);
    const id = authCtx?.employeeInfo?.id;
    const department = authCtx.employeeInfo?.department;
    
    const [totalPendingRequest, setTotalPendingRequest] = useState(0);
    const [totalHodApproved, setTotalHodApproved] = useState(0);
    const [totalComplaint, setTotalComplaint] = useState(0);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                // const response = await axios.get(type === 'Complaint' ? 'https://hello.helpdesk.met.edu/api/complaint/allcomplaints' : 'https://hello.helpdesk.met.edu/api/request/allrequests');
                const response = await axios.get(`http://localhost:8001/api/dashboard/superadmin/${department}/${id}`);
                const responseData = type === 'Complaint' ? response.data.complaints : response.data.requests;
                console.log("Fetched Data: ", response);
                setData(Array.isArray(responseData) ? responseData : []);
                updateCounts(Array.isArray(responseData) ? responseData : []);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, [type]);

    // const updateCounts = (filteredData) => {
    //     setTotalPendingRequest( type === 'Complaint' ? filteredData.filter(item => item.status === 'pending').length : 0);
    //     setTotalHodApproved ( type === 'request' ? filteredData.filter(item => item.status === 'pending' && item.approval1 === 1 && (item.approval2 === 0 || item.approval2 === null)).length : 0);
    //     setTotalComplaint(filteredData.filter(item => item.status === 'pending' && item.approval1 === 1 && (item.approval2 === 0 || item.approval2 === null)).length);
    // };

    console.log("Data: ", data)

    const updateCounts = (filteredData) => {
        console.log(filteredData);
        
        setTotalPendingRequest(filteredData.filter(item => item.status === 'pending').length);
        setTotalHodApproved(filteredData.filter(item => item.status === 'Hod Approved').length);
    };

    const tableHeaderStyle = {
        headCells: {
            style: {
                fontWeight: 'bold',
                fontSize: "15px",
            }
        },
        rows: {
            highlightOnHoverStyle: {
                backgroundColor: 'rgb(230, 244, 244)',
                borderBottomColor: '#FFFFFF',
                borderRadius: '25px',
                outline: '1px solid #FFFFFF',
            },
        },
    };

    const navigate = useNavigate();

    const navigateToFilterPage = (status, type) => {
        const route = type === 'complaint' ? '/complaint' : '/request';

        navigate(route, { state: { filter: status } });
    };



    return (
        <div>
            <Container>
                <Row>
                    <Col xs={12} md={4} sm>
                        <div className={classes.card} onClick={() => navigateToFilterPage('pending', 'request')}>
                            <div className={classes.card_title}>Total Pending Request</div>
                            <div className={classes.card_des}>{totalPendingRequest > 0 ? totalPendingRequest : 0}</div>
                        </div>
                    </Col>
                    <Col xs={12} md={4} sm>
                        <div className={classes.card} onClick={() => navigateToFilterPage('hod approved', 'request')}>
                            <div className={classes.card_title}>Hod Approved Request</div>
                            <div className={classes.card_des}>{totalHodApproved > 0 ? totalHodApproved : 0}</div>
                        </div>
                    </Col>
                    <Col xs={12} md={4} sm>
                        <div className={classes.card} onClick={() => navigateToFilterPage('pending', 'complaint')}>
                            <div className={classes.card_title}>Total Pending Complaint</div>
                            <div className={classes.card_des}>{totalComplaint > 0 ? totalComplaint : 0}</div>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col xs={12} md={8} sm>
                        <div className={classes.table}>
                            <DataTable
                                customStyles={tableHeaderStyle}
                                //columns={}
                                //data={}
                                defaultSortField="title"
                                pagination
                                fixedHeader
                                selectableRowsHighlight
                                highlightOnHover
                                subHeader
                            // subHeaderComponent={
                            //     <input type="text" className={classes.form_control}
                            //         placeholder="Search Here" value={search}
                            //         onChange={(e) => setSearch(e.target.value)}
                            //     />
                            // }
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={4} sm>
                        <div className={classes.card}>
                            <div className={classes.card_title}>Daily Ticket Raised</div>
                            <div className={classes.card_des}>12</div>
                        </div>
                        <div className={classes.card}>
                            <div className={classes.card_title}>Total Attending Tickets</div>
                            <div className={classes.card_des}>12</div>
                        </div>
                        <div className={classes.card}>
                            <div className={classes.card_title}>Total Ticket</div>
                            <div className={classes.card_des}>12</div>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col xs={12} md={12} sm>
                        {/* <ShowEmployee /> */}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SuperadminDash;
