import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from '../../../../UI/Modal/Modal';
import classes from './RequestDetails.module.css';

const RequestDetails = (props) => {

  const [requestData, setRequestData] = useState({});

  useEffect(() => {
    const getRequestDetails = async () => {
      const request = await axios.get(`http://localhost:8001/api/request/getrequestdetails/${props.id}`);
      setRequestData(request.data.request);
    };
    getRequestDetails();
  }, [props.id])

  return (
    <Modal>
      <div className={`${classes.requestDetailsHeading}`}>Request Details</div>
        <div className={`${classes.detailsSubject}`}>{requestData.subject}</div>
        <div className={`${classes.detailsRole} mt-2`}>Description: {requestData.description}</div>
        <div className={`${classes.detailsName} mt-2`}>Name: {requestData.name}</div>
        <div className={`${classes.detailsCategory} mt-2`}>Category: {requestData.category}</div>
        <div className={`${classes.detailsPriority} mt-2`}>Priority: {requestData.priority}</div>
        <div className={`${classes.detailsDepartment} badge badge-dark mt-3`}>{requestData.department}</div><br />
        <button className={`btn ${classes.cancelButton}`} onClick={props.onConfirm}>Cancel</button>
    </Modal>
  );
};

export default RequestDetails;