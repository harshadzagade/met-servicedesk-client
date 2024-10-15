import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/AuthContext/AuthContext';
import classes from './Superadmin.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { set } from 'rsuite/esm/internals/utils/date';

function EngineerDash() {

    const authCtx = useContext(AuthContext);
    const employeeId = authCtx?.employeeInfo?.id;
    const department = authCtx?.employeeInfo?.department;

    const [totalPendingRequest, setTotalPendingRequest] = useState(0);
    const [totalAttendingRequest, setTotalAttendingRequest] = useState(0);
    const [totalClosedRequest, setTotalClosedRequest] = useState(0);

    const [totalPendingComplaint, setTotalPendingComplaint] = useState(0);
    const [totalAttendingComplaint, setTotalAttendingComplaint] = useState(0);
    const [totalClosedComplaint, setTotalClosedComplaint] = useState(0);

    const [data, setData] = useState({});
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/api/dashboard/engineer/${department}/`);
                const responseData = response.data;

                setData(responseData);

                updateCounts(responseData);
            } catch (err) {
                setError('Failed to fetch dashboard data');
                console.error('Error:', err);
            }
        };

        if (department && employeeId) {
            getData();
        }
    }, [department, employeeId]);

    const updateCounts = (filterdata) => {
        if (filterdata.data) {
            setTotalPendingRequest(filterdata.data.pendingRequests?.length || 0);
            setTotalAttendingRequest(filterdata.data.attendingRequests?.length || 0);
            setTotalClosedRequest(filterdata.data.closedRequests?.length || 0);

            setTotalPendingComplaint(filterdata.data.pendingComplaints?.length || 0);
            setTotalAttendingComplaint(filterdata.data.attendingComplaints?.length || 0);
            setTotalClosedComplaint(filterdata.data.closedComplaints?.length || 0);
        }
    };

    const navigateToFilterPage = (status, type) => {
        const route = type === 'complaint' ? '/complaint' : '/request';

        navigate(route, status);
    };

    return (
        <div>
            <Container>
                <h2>Request</h2>
                <Row>

                    {/* Display Pending Request */}
                    <Col xs={12} md={4} sm>
                        <div className={classes.card} onClick={() => navigateToFilterPage('pending', 'request')}>
                            <div className={classes.card_title}>Total Pending Request</div>
                            <div className={classes.card_des}>{totalPendingRequest}</div>
                        </div>
                    </Col>

                    {/* Display Attending (HOD Approved) Request */}
                    <Col xs={12} md={4} sm>
                        <div className={classes.card} onClick={() => navigateToFilterPage('attending', 'request')}>
                            <div className={classes.card_title}>Total Attending Request</div>
                            <div className={classes.card_des}>{totalAttendingRequest}</div>
                        </div>
                    </Col>

                    {/* Display Closed Request */}
                    <Col xs={12} md={4} sm>
                        <div className={classes.card} onClick={() => navigateToFilterPage('pending', 'complaint')}>
                            <div className={classes.card_title}>Total Close Request</div>
                            <div className={classes.card_des}>{totalClosedRequest}</div>
                        </div>
                    </Col>
                </Row>

                <h2>Complaint</h2>
                <Row>

                    {/* Display Pending Complaint */}
                    <Col xs={12} md={4} sm>
                        <div className={classes.card} onClick={() => navigateToFilterPage('pending', 'complaint')}>
                            <div className={classes.card_title}>Total Pending Complaint</div>
                            <div className={classes.card_des}>{totalPendingComplaint}</div>
                        </div>
                    </Col>

                    {/* Display Attending Complaint */}
                    <Col xs={12} md={4} sm>
                        <div className={classes.card} onClick={() => navigateToFilterPage('attending', 'complaint')}>
                            <div className={classes.card_title}>Total Attending Complaint</div>
                            <div className={classes.card_des}>{totalAttendingComplaint}</div>
                        </div>
                    </Col>

                    {/* Display Closed Complaint */}
                    <Col xs={12} md={4} sm>
                        <div className={classes.card} onClick={() => navigateToFilterPage('pending', 'complaint')}>
                            <div className={classes.card_title}>Total Close Complaint</div>
                            <div className={classes.card_des}>{totalClosedComplaint}</div>
                        </div>
                    </Col>
                </Row>


                {/* Display Error Message if API Call Fails */}
                {error && (
                    <Row>
                        <Col>
                            <div className={classes.error_message}>{error}</div>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
}

export default EngineerDash;