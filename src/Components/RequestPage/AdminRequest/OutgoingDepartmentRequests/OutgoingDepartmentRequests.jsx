import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import classes from './OutgoingDepartmentRequests.module.css';
import SmallSingleRequest from './SmallSingleRequest/SmallSingleRequest';
import SingleRequest from './SingleRequest/SingleRequest';

const OutgoingDepartmentRequests = () => {
    const id = localStorage.getItem('id');
    const windowWidth = window.innerWidth;
    const [requestList, setRequestList] = useState([]);
    const [smallDevice, setSmallDevice] = useState(false);

    useEffect(() => {
        if (windowWidth < 768) {
            setSmallDevice(true);
        } else {
            setSmallDevice(false);
        }
    }, [windowWidth]);

    useEffect(() => {
        const getList = async () => {
            const list = await axios.get(`http://localhost:8001/request/ownrequests/${id}`);
            setRequestList(list.data.requests);
        };
        getList();
    }, [id]);

    return (
        <Fragment>
            {requestList.length > 0 ?
                <Fragment>
                    {smallDevice &&
                        <Fragment>
                            {
                                requestList.map((request) =>
                                    <SmallSingleRequest key={request.id} id={request.id} name={request.name} department={request.department} subject={request.subject} category={request.category} priority={request.priority} status={request.status} approval1={request.approval1} approval2={request.approval2} />
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
                                            <SingleRequest key={request.id} id={request.id} subject={request.subject} name={request.name} department={request.department} category={request.category} priority={request.priority} status={request.status} approval1={request.approval1} approval2={request.approval2} />
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