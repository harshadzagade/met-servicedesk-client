import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import classes from './AllStaffRequest.module.css';
import SingleStaffRequest from './SingleStaffRequest/SingleStaffRequest';
import SmallSingleStaffRequest from './SmallSingleStaffRequest/SmallSingleStaffRequest';
import RequestDetails from '../RequestDetails/RequestDetails';

const AllStaffRequest = () => {
    const windowWidth = window.innerWidth;
    const [staffRequestList, setStaffRequestList] = useState([]);
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
            const list = await axios.get(`http://localhost:8001/request/allrequests`);
            setStaffRequestList(list.data.requests);
        };
        getList();
    }, []);

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
            {staffRequestList.length > 0 ?
                <Fragment>
                    {smallDevice &&
                        <Fragment>
                            {
                                staffRequestList.map((request) =>
                                    <SmallSingleStaffRequest setOpenDetails={checkOpenDetails} key={request.id} id={request.id} name={request.name} department={request.department} subject={request.subject} category={request.category} priority={request.priority} status={request.status} approval1={request.approval1} approval2={request.approval2} />
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
                                        staffRequestList.map((request) =>
                                            <SingleStaffRequest setOpenDetails={checkOpenDetails} key={request.id} id={request.id} subject={request.subject} name={request.name} department={request.department} category={request.category} priority={request.priority} status={request.status} approval1={request.approval1} approval2={request.approval2} />
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </Fragment>
                :
                <div className={`${classes.homeNoData}`}>No staff added</div>
            }
        </Fragment>
    );
};

export default AllStaffRequest;