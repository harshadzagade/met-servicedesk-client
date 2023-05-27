import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import classes from './ComplaintDetails.module.css';
import NavBar from '../../../../NavBar/NavBar';
import { useParams } from 'react-router-dom';
import RequestUpdate from './ComplaintUpdate/ComplaintUpdate';

const ComplaintDetails = () => {
  const paramsId = useParams();
  const id = paramsId.requestId;
  const [complaintData, setComplaintData] = useState({});
  const [openApproval, setOpenApproval] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getComplaintDetails = async () => {
      const request = await axios.get(`http://localhost:8001/api/request/getrequestdetails/${id}`);
      setComplaintData(request.data.request);
      setRefresh(false);
    };
    getComplaintDetails();
  }, [refresh, id]);

  const handleUpdateCancel = () => {
    setRefresh(true);
    setOpenApproval(false);
  };

  const handleUpdateClick = () => {
    setOpenApproval(true);
  };

  return (
    <Fragment>
      <NavBar tab={'none'} />
      {openApproval && <RequestUpdate onConfirm={handleUpdateCancel} />}
      <div className={`${classes.staffDetailsHeading}`}>Complaint Details</div>
      <div className={`d-inline-block ${classes.detailsView}`}>
        <div className={`${classes.detailsName}`}>{complaintData.subject}</div>
        <div className={`${classes.detailsName}`}>{complaintData.description}</div>
        <div className={`${classes.detailsName}`}>{complaintData.name}</div>
        <div className={`${classes.detailsRole} mt-2`}>{complaintData.category}</div>
        <div className={`${classes.detailsRole} mt-2`}>{complaintData.priority}</div>
        <div className={`${classes.detailsDepartment} badge badge-dark mt-3`}>{complaintData.department}</div><br />
        <button className={`btn mt-3 ${classes.updateButton}`} onClick={handleUpdateClick}>Approve/Disapprove Request</button>
      </div>
    </Fragment>
  );
};

export default ComplaintDetails;