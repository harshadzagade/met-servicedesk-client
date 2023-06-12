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
      <div className={`${classes.layout}`}>
        <div className={`${classes.requestDetailsHeading}`}>Request Details</div>
        <div className={`${classes.detailsView}`}>
          <div className='d-flex'>
            <div className={`${classes.detailsTag}`}>ID:</div>
            <div className={`${classes.detailsField}`}>#{requestData.id}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag}`}>Subject:</div>
            <div className={`${classes.detailsField} ${classes.wrapData}`}>{requestData.subject}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Description:</div>
            <div className={`${classes.detailsField} ${classes.wrapData} mt-2`}>{requestData.description}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Requester:</div>
            <div className={`${classes.detailsField} ${classes.wrapData} mt-2`}>{requestData.name}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Status:</div>
            <div className={`${classes.detailsField} mt-2`}>{requestData.status}</div>
          </div>
          {requestData.assign && <hr className={`${classes.hrTag}`} />}
          {requestData.assign && <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Assigned to:</div>
            <div className={`${classes.detailsField} mt-2`}>{requestData.assignedName}</div>
          </div>}
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Category:</div>
            <div className={`${classes.detailsField} mt-2`}>{requestData.category}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Priority:</div>
            <div className={`${classes.detailsField} mt-2`}>{requestData.priority}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Department:</div>
            <div className={`${classes.detailsField} mt-2`}>{requestData.department}</div><br />
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className={`${classes.boxDetails}`}>
            <div className='d-flex'>
              <div className={`${classes.boxHeading}`}>Approvals</div>
            </div>
            <div className='d-flex'>
              <div className={`${classes.detailsTag} mt-2`}>HOD Approval:</div>
              <div className={`${classes.detailsField} mt-2`}>{requestData.approval1 === 1 ? 'approved' : 'not approved'}</div>
            </div>
            {requestData.approval1 && <hr className={`${classes.hrTag}`} />}
            {requestData.approval1 && <div className='d-flex'>
              <div className={`${classes.detailsTag} mt-2`}>HOD Comment:</div>
              <div className={`${classes.detailsField} ${classes.wrapData} mt-2`}>{requestData.approval1Comment}</div>
            </div>}
            <hr className={`${classes.hrTag}`} />
            <div className='d-flex'>
              <div className={`${classes.detailsTag} mt-2`}>Admin Approval:</div>
              <div className={`${classes.detailsField} mt-2`}>{requestData.approval2 === 1 ? 'approved' : 'not approved'}</div>
            </div>
            {requestData.approval2 && <hr className={`${classes.hrTag}`} />}
            {requestData.approval2 && <div className='d-flex'>
              <div className={`${classes.detailsTag} mt-2`}>Admin Comment:</div>
              <div className={`${classes.detailsField} ${classes.wrapData} mt-2`}>{requestData.approval2Comment}</div>
            </div>}
          </div>
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Repeated:</div>
            <div className={`${classes.detailsField} mt-2`}>{requestData.isRepeated ? 'Yes' : 'No'}</div>
          </div>
          {requestData.forwardComment && <hr className={`${classes.hrTag}`} />}
          {requestData.forwardComment && <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Forward Comment:</div>
            <div className={`${classes.detailsField} ${classes.wrapData} mt-2`}>{requestData.forwardComment}</div>
          </div>}
          {requestData.status === 'closed' && <hr className={`${classes.hrTag}`} />}
          {requestData.status === 'closed' && <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Problem Description:</div>
            <div className={`${classes.detailsField} ${classes.wrapData} mt-2`}>{requestData.problemDescription}</div>
          </div>}
          {requestData.status === 'closed' && <hr className={`${classes.hrTag}`} />}
          {requestData.status === 'closed' && <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Action Taken:</div>
            <div className={`${classes.detailsField} ${classes.wrapData} mt-2`}>{requestData.actionTaken}</div>
          </div>}
          <div className={`btn ${classes.cancelLayout}`}>
            <button className={`btn ${classes.cancelButton}`} onClick={props.onConfirm}>Cancel</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RequestDetails;