import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from '../../../UI/Modal/Modal';
import classes from './ComplaintDetails.module.css';

const ComplaintDetails = (props) => {

  const [complaintData, setComplaintData] = useState({});

  useEffect(() => {
    const getComplaintDetails = async () => {
      const complaint = await axios.get(`http://localhost:8001/api/request/getrequestdetails/${props.id}`);
      setComplaintData(complaint.data.request);
    };
    getComplaintDetails();
  }, [props.id])

  return (
    <Modal>
      <div className={`${classes.complaintDetailsHeading}`}>Complaint Details</div>
        <div className={`${classes.detailsSubject}`}>{complaintData.subject}</div>
        <div className={`${classes.detailsRole} mt-2`}>Description: {complaintData.description}</div>
        <div className={`${classes.detailsName} mt-2`}>Name: {complaintData.name}</div>
        <div className={`${classes.detailsCategory} mt-2`}>Category: {complaintData.category}</div>
        <div className={`${classes.detailsPriority} mt-2`}>Priority: {complaintData.priority}</div>
        <div className={`${classes.detailsDepartment} badge badge-dark mt-3`}>{complaintData.department}</div><br />
        <button className={`btn ${classes.cancelButton}`} onClick={props.onConfirm}>Cancel</button>
    </Modal>
  );
};

export default ComplaintDetails;