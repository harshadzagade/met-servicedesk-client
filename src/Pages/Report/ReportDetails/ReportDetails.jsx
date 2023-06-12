import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from '../../../Components/UI/Modal/Modal';
import classes from './ReportDetails.module.css';

const ReportDetails = (props) => {

  const [reportData, setReportData] = useState({});

  useEffect(() => {
    const getReportDetails = async () => {
      const report = await axios.get(`http://localhost:8001/api/report/reportdetails/${props.id}`);
      setReportData(report.data.report);
    };
    getReportDetails();
  }, [props.id])

  return (
    <Modal>
      <div className={`${classes.layout}`}>
        <div className={`${classes.reportDetailsHeading}`}>Report Details</div>
        <div className={`${classes.detailsView}`}>
          <div className='d-flex'>
            <div className={`${classes.detailsTag}`}>Ticket Type:</div>
            <div className={`${classes.detailsField}`}>{(reportData.isRequest && 'Request') || (reportData.isComplaint && 'Complaint')}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag}`}>ID:</div>
            <div className={`${classes.detailsField}`}>#{reportData.requestComplaintId}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag}`}>Subject:</div>
            <div className={`${classes.detailsField} ${classes.wrapData}`}>{reportData.subject}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Description:</div>
            <div className={`${classes.detailsField} ${classes.wrapData} mt-2`}>{reportData.description}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Requester:</div>
            <div className={`${classes.detailsField} ${classes.wrapData} mt-2`}>{reportData.staffName}</div>
          </div>
          {reportData.assign && <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Assigned to:</div>
            <div className={`${classes.detailsField} mt-2`}>{reportData.assignedName}</div>
          </div>}
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Category:</div>
            <div className={`${classes.detailsField} mt-2`}>{reportData.category}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Priority:</div>
            <div className={`${classes.detailsField} mt-2`}>{reportData.priority}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Department:</div>
            <div className={`${classes.detailsField} mt-2`}>{reportData.department}</div><br />
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className={`${classes.boxDetails}`}>
            <div className='d-flex'>
              <div className={`${classes.boxHeading}`}>Durations</div>
            </div>
            <div className='d-flex'>
              <div className={`${classes.detailsTag} mt-2`}>Logged Time:</div>
              <div className={`${classes.detailsField} mt-2`}>{reportData.loggedTime}</div>
            </div>
            <hr className={`${classes.hrTag}`} />
            <div className='d-flex'>
              <div className={`${classes.detailsTag} mt-2`}>Attended Time:</div>
              <div className={`${classes.detailsField} mt-2`}>{reportData.attendedTime}</div>
            </div>
            {(reportData.loggedTime && reportData.attendedTime) && <hr className={`${classes.hrTag}`} />}
            {(reportData.loggedTime && reportData.attendedTime) && <div className='d-flex'>
              <div className={`${classes.detailsTag} mt-2`}>Attend Duration:</div>
              <div className={`${classes.detailsField} ${classes.wrapData} mt-2`}>{reportData.attendDuration}</div>
            </div>}
            <hr className={`${classes.hrTag}`} />
            <div className='d-flex'>
              <div className={`${classes.detailsTag} mt-2`}>Solved Time:</div>
              <div className={`${classes.detailsField} mt-2`}>{reportData.solvedTime}</div>
            </div>
            {reportData.solvedTime && <hr className={`${classes.hrTag}`} />}
            {reportData.solvedTime && <div className='d-flex'>
              <div className={`${classes.detailsTag} mt-2`}>Solved Duration:</div>
              <div className={`${classes.detailsField} ${classes.wrapData} mt-2`}>{reportData.solveDuration}</div>
            </div>}
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Problem Description:</div>
            <div className={`${classes.detailsField} ${classes.wrapData} mt-2`}>{reportData.problemDescription}</div>
          </div>
          <hr className={`${classes.hrTag}`} />
          <div className='d-flex'>
            <div className={`${classes.detailsTag} mt-2`}>Action Taken:</div>
            <div className={`${classes.detailsField} ${classes.wrapData} mt-2`}>{reportData.actionTaken}</div>
          </div>
          <div className={`btn ${classes.cancelLayout}`}>
            <button className={`btn ${classes.cancelButton}`} onClick={props.onConfirm}>Cancel</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReportDetails;