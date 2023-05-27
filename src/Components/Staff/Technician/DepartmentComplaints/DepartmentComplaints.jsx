import React, { Fragment, useEffect, useState } from 'react';
import classes from './DepartmentComplaints.module.css';
import SmallSingleRequest from './SmallSingleComplaint/SmallSingleComplaint';
import SingleRequest from './SingleComplaint/SingleComplaint';
import axios from 'axios';

const DepartmentComplaints = () => {
    const department = localStorage.getItem('department');
    const windowWidth = window.innerWidth;
    const [complaintList, setComplaintList] = useState([]);
    const [smallDevice, setSmallDevice] = useState(false);
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
                const list = await axios.get(`http://localhost:8001/api/complaint/complaints/incoming/${department}`);
                if (list.data.complaints.length === 0) {
                    setErrorMessage('No requests available')
                }
                setComplaintList(list.data.complaints);
            } catch (error) {
                setErrorMessage(`${error.response.data.message}`);
            }
        };
        getList();
    }, [department]);

    return (
        <Fragment>
            {complaintList.length > 0 ?
                <Fragment>
                    {smallDevice &&
                        <Fragment>
                            {
                                complaintList.map((complaint) =>
                                    <SmallSingleRequest key={complaint.id} id={complaint.id} name={complaint.name} department={complaint.department} subject={complaint.subject} category={complaint.category} priority={complaint.priority} status={complaint.status} />
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
                                        complaintList.map((complaint) =>
                                            <SingleRequest key={complaint.id} id={complaint.id} subject={complaint.subject} name={complaint.name} department={complaint.department} category={complaint.category} priority={complaint.priority} status={complaint.status} />
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

export default DepartmentComplaints;