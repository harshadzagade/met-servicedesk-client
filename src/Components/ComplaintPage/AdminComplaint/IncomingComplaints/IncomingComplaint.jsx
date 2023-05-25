import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import classes from './IncomingComplaint.module.css';
import DepartmentContext from '../../../../Context/DepartmentContext';
import ComplaintDetails from '../ComplaintDetails/ComplaintDetails';
import SmallSingleComplaint from './SmallSingleComplaint/SmallSingleComplaint';
import SingleComplaint from './SingleComplaint/SingleComplaint';

const IncomingComplaint = () => {
    const departmentCtx = useContext(DepartmentContext);
    const windowWidth = window.innerWidth;
    const [requestList, setRequestList] = useState([]);
    const [smallDevice, setSmallDevice] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [detailsId, setDetailsId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (windowWidth < 768) {
            setSmallDevice(true);
        } else {
            setSmallDevice(false);
        }
    }, [windowWidth]);

    useEffect(() => {
        const getList = async () => {
            try {
                const list = await axios.get(`http://localhost:8001/api/complaint/complaints/incoming/${departmentCtx.department}`);
                if (list.data.complaints.length === 0) {
                    setErrorMessage('No complaints available')
                }
                setRequestList(list.data.complaints);
            } catch (error) {
                setErrorMessage(`${error.response.data.message}`);
            }
        };
        if (departmentCtx.department) {
            getList();
        } else {
            setErrorMessage('Please select department')
        }
    }, [departmentCtx.department]);

    const checkOpenDetails = (value, id) => {
        setOpenDetails(value);
        setDetailsId(id);
    };

    const handleUpdateCancel = () => {
        setOpenDetails(false);
    };

    return (
        <Fragment>
            {openDetails && <ComplaintDetails onConfirm={handleUpdateCancel} id={detailsId} />}
            {requestList.length > 0 ?
                <Fragment>
                    {smallDevice &&
                        <Fragment>
                            {
                                requestList.map((request) =>
                                    <SmallSingleComplaint setOpenDetails={checkOpenDetails} key={request.id} id={request.id} name={request.name} department={request.department} subject={request.subject} category={request.category} priority={request.priority} status={request.status} approval1={request.approval1} approval2={request.approval2} />
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        requestList.map((request) =>
                                            <SingleComplaint setOpenDetails={checkOpenDetails} key={request.id} id={request.id} subject={request.subject} name={request.name} department={request.department} category={request.category} priority={request.priority} status={request.status} approval1={request.approval1} approval2={request.approval2} />
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </Fragment>
                :
                <div className={`${classes.homeNoData}`}>{errorMessage}</div>
            }
        </Fragment>
    );
};

export default IncomingComplaint;