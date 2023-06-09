import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from '../../../UI/Modal/Modal';
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
      <div className={`d-inline-block ${classes.detailsView}`}>
        <div className='d-flex'>
          <div className={`${classes.detailsTag}`}>ID:&nbsp;</div>
          <div className={`${classes.detailsField}`}>#{requestData.id}</div>
        </div>
        <hr className={`${classes.hrTag}`} />
        <div className='d-flex'>
          <div className={`${classes.detailsTag}`}>Subject:&nbsp;</div>
          <div className={`${classes.detailsField} ${classes.wrapData}`}>{requestData.subject}</div>
        </div>
        <hr className={`${classes.hrTag}`} />
        <div className='d-flex'>
          <div className={`${classes.detailsTag} mt-2`}>Description:&nbsp;</div>
          <div className={`${classes.detailsField} ${classes.wrapData} mt-2`}>{requestData.description}</div>
        </div>
        <hr className={`${classes.hrTag}`} />
        <div className='d-flex'>
          <div className={`${classes.detailsTag} mt-2`}>Requester:&nbsp;</div>
          <div className={`${classes.detailsField} ${classes.wrapData} mt-2`}>{requestData.name}</div>
        </div>
        <hr className={`${classes.hrTag}`} />
        <div className='d-flex'>
          <div className={`${classes.detailsTag} mt-2`}>Category:&nbsp;</div>
          <div className={`${classes.detailsField} mt-2`}>{requestData.category}</div>
        </div>
        <hr className={`${classes.hrTag}`} />
        <div className='d-flex'>
          <div className={`${classes.detailsTag} mt-2`}>Priority:&nbsp;</div>
          <div className={`${classes.detailsField} mt-2`}>{requestData.priority}</div>
        </div>
        <hr className={`${classes.hrTag}`} />
        <div className='d-flex'>
          <div className={`${classes.detailsTag} mt-2`}>Department:&nbsp;</div>
          <div className={`${classes.detailsField} mt-2`}>{requestData.department}</div><br />
        </div>
        <hr className={`${classes.hrTag}`} />
        <div className={`${classes.boxDetails}`}>
          <div className='d-flex'>
            <div className={`${classes.boxHeading}`}>Approvals</div>
          </div>
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>HOD Approval:&nbsp;</div>
            <div className={`${classes.detailsField} mt-2`}>{requestData.approval1 === 1 ? 'approved' : 'not approved'}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Admin Approval:&nbsp;</div>
            <div className={`${classes.detailsField} mt-2`}>{requestData.approval2 === 1 ? 'approved' : 'not approved'}</div>
          </div>
        </div>
        <div className={`btn ${classes.cancelLayout}`}>
          <button className={`btn ${classes.cancelButton}`} onClick={props.onConfirm}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default RequestDetails;