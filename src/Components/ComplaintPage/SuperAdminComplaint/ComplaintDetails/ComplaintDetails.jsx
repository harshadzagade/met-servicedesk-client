import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from '../../../UI/Modal/Modal';
import classes from './ComplaintDetails.module.css';

const ComplaintDetails = (props) => {

  const [complaintData, setComplaintData] = useState({});

  useEffect(() => {
    const getRequestDetails = async () => {
      const complaint = await axios.get(`http://localhost:8001/api/complaint/getcomplaintdetails/${props.id}`);
      setComplaintData(complaint.data.complaint);
    };
    getRequestDetails();
  }, [props.id])

  return (
    <Modal>
      <div className={`${classes.layout}`}>
        <div className={`${classes.requestDetailsHeading}`}>Complaint Details</div>
        <div className={`${classes.detailsView}`}>
          <div className='d-flex'>
            <div className={`${classes.detailsTag}`}>ID:</div>
            <div className={`${classes.detailsField}`}>#{complaintData.id}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag}`}>Subject:</div>
            <div className={`${classes.detailsField} ${classes.wrapData}`}>{complaintData.subject}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Description:</div>
            <div className={`${classes.detailsField} ${classes.wrapData} mt-2`}>{complaintData.description}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Complainan:</div>
            <div className={`${classes.detailsField} ${classes.wrapData} mt-2`}>{complaintData.name}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Status:</div>
            <div className={`${classes.detailsField} mt-2`}>{complaintData.status}</div>
          </div>
          {complaintData.assign && <hr className={`${classes.hrTag}`} />}
          {complaintData.assign && <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Assigned to:</div>
            <div className={`${classes.detailsField} mt-2`}>{complaintData.assignedName}</div>
          </div>}
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Category:</div>
            <div className={`${classes.detailsField} mt-2`}>{complaintData.category}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Priority:</div>
            <div className={`${classes.detailsField} mt-2`}>{complaintData.priority}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Department:</div>
            <div className={`${classes.detailsField} mt-2`}>{complaintData.department}</div><br />
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Repeated:</div>
            <div className={`${classes.detailsField} mt-2`}>{complaintData.isRepeated ? 'Yes' : 'No'}</div>
          </div>
          {complaintData.forwardComment && <hr className={`${classes.hrTag}`} />}
          {complaintData.forwardComment && <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Forward Comment:</div>
            <div className={`${classes.detailsField} ${classes.wrapData} mt-2`}>{complaintData.forwardComment}</div>
          </div>}
          {complaintData.status === 'closed' && <hr className={`${classes.hrTag}`} />}
          {complaintData.status === 'closed' && <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Problem Description:</div>
            <div className={`${classes.detailsField} ${classes.wrapData} mt-2`}>{complaintData.problemDescription}</div>
          </div>}
          {complaintData.status === 'closed' && <hr className={`${classes.hrTag}`} />}
          {complaintData.status === 'closed' && <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Action Taken:</div>
            <div className={`${classes.detailsField} ${classes.wrapData} mt-2`}>{complaintData.actionTaken}</div>
          </div>}
          <div className={`btn ${classes.cancelLayout}`}>
            <button className={`btn ${classes.cancelButton}`} onClick={props.onConfirm}>Cancel</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ComplaintDetails;