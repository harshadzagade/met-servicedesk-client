import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import classes from './OutgoingDepartmentRequests.module.css';
import SmallSingleRequest from './SmallSingleRequest/SmallSingleRequest';
import SingleRequest from './SingleRequest/SingleRequest';
import RequestDetails from '../RequestDetails/RequestDetails';

const OutgoingDepartmentRequests = () => {
    const id = localStorage.getItem('id');
    const windowWidth = window.innerWidth;
    const [requestList, setRequestList] = useState([]);
    const [smallDevice, setSmallDevice] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [detailsId, setDetailsId] = useState(null);

    useEffect(() => {
        if (windowWidth < 768) {
            setSmallDevice(true);
        } else {
            setSmallDevice(false);
        }
    }, [windowWidth]);

    useEffect(() => {
        const getList = async () => {
            const list = await axios.get(`http://localhost:8001/api/request/ownrequests/${id}`);
            setRequestList(list.data.requests);
        };
        getList();
    }, [id]);

    const checkOpenDetails = (value, id) => {
        setOpenDetails(value);
        setDetailsId(id);
    };

    const handleUpdateCancel = () => {
        setOpenDetails(false);
    };

    return (
        <Fragment>
            {openDetails && <RequestDetails onConfirm={handleUpdateCancel} id={detailsId} />}
            {requestList.length > 0 ?
                <Fragment>
                    {smallDevice &&
                        <Fragment>
                            {
                                requestList.map((request) =>
                                    <SmallSingleRequest setOpenDetails={checkOpenDetails} key={request.id} id={request.id} name={request.name} department={request.department} subject={request.subject} category={request.category} priority={request.priority} status={request.status} approval1={request.approval1} approval2={request.approval2} />
                                )
                            }
                        </Fragment>
                    }
                    {!smallDevice &&
                        <div className={`mx-3 mt-3`}>
                            <table className={`table ${classes.largeTable} overflow-hidden`}>
                                <thead className={`thead-light`}>
                                    <tr>
                                        <th scope="col">Subject</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Department</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Priority</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">HOD Approval</th>
                                        <th scope="col">Admin Approval</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        requestList.map((request) =>
                                            <SingleRequest setOpenDetails={checkOpenDetails} key={request.id} id={request.id} subject={request.subject} name={request.name} department={request.department} category={request.category} priority={request.priority} status={request.status} approval1={request.approval1} approval2={request.approval2} />
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </Fragment>
                :
                <div className={`${classes.homeNoData}`}>No requests available</div>
            }
        </Fragment>
    );
};

export default OutgoingDepartmentRequests;