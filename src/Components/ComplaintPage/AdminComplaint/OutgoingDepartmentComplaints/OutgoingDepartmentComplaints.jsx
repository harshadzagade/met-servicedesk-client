import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import classes from './OutgoingDepartmentComplaints.module.css';
import AdminContext from '../../../../Context/AdminContext/AdminContext';
import SingleComplaint from './SingleComplaint/SingleComplaint';
import SmallSingleComplaint from './SmallSingleComplaint/SmallSingleComplaint';
import ComplaintDetails from '../ComplaintDetails/ComplaintDetails';

const OutgoingDepartmentComplaints = () => {
    const id = localStorage.getItem('id');
    const adminCtx = useContext(AdminContext);
    const windowWidth = window.innerWidth;
    const [complaintList, setComplaintList] = useState([]);
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
                const list = await axios.get(`http://localhost:8001/api/staff/admin/complaints/outgoing/${id}/${adminCtx.department}`);
                if (list.data.complaints.length === 0) {
                    setErrorMessage('No complaints available')
                }
                setComplaintList(list.data.complaints);
            } catch (error) {
                setErrorMessage(`${error.response.data.message}`);
            }
        };
        if (adminCtx.department) {
            getList();
        } else {
            setErrorMessage('Please select department')
        }
    }, [id, adminCtx.department]);

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
            {complaintList.length > 0 ?
                <Fragment>
                    {smallDevice &&
                        <Fragment>
                            {
                                complaintList.map((complaint) =>
                                    <SmallSingleComplaint setOpenDetails={checkOpenDetails} key={complaint.id} id={complaint.id} name={complaint.name} department={complaint.department} subject={complaint.subject} category={complaint.category} priority={complaint.priority} status={complaint.status} approval1={complaint.approval1} approval2={complaint.approval2} />
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
                                            <SingleComplaint setOpenDetails={checkOpenDetails} key={complaint.id} id={complaint.id} subject={complaint.subject} name={complaint.name} department={complaint.department} category={complaint.category} priority={complaint.priority} status={complaint.status} />
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

export default OutgoingDepartmentComplaints;