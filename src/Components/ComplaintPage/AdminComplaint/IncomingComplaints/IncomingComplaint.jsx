import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import classes from './IncomingComplaint.module.css';
import AdminContext from '../../../../Context/AdminContext/AdminContext';
import ComplaintDetails from '../ComplaintDetails/ComplaintDetails';
import SmallSingleComplaint from './SmallSingleComplaint/SmallSingleComplaint';
import SingleComplaint from './SingleComplaint/SingleComplaint';

const IncomingComplaint = () => {
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
                const list = await axios.get(`http://localhost:8001/api/complaint/complaints/incoming/${adminCtx.department}`);
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
    }, [adminCtx.department]);

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
                                            <SingleComplaint setOpenDetails={checkOpenDetails} key={complaint.id} id={complaint.id} subject={complaint.subject} name={complaint.name} department={complaint.department} category={complaint.category} priority={complaint.priority} status={complaint.status} approval1={complaint.approval1} approval2={complaint.approval2} />
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </Fragment>
                :
                <div className={`${classes.noData}`}>{errorMessage}</div>
            }
        </Fragment>
    );
};

export default IncomingComplaint;