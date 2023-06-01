import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import classes from './ComplaintDetails.module.css';
import NavBar from '../../../../NavBar/NavBar';
import { useParams } from 'react-router-dom';
import ComplaintUpdate from './ComplaintUpdate/ComplaintUpdate';
import Swal from 'sweetalert2';

const ComplaintDetails = () => {
  const ownId = localStorage.getItem('id');
  const paramsId = useParams();
  const id = paramsId.requestId;
  const [complaintData, setComplaintData] = useState({});
  const [openComplaintUpdate, setOpenComplaintUpdate] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getComplaintDetails = async () => {
      const complaint = await axios.get(`http://localhost:8001/api/complaint/getcomplaintdetails/${id}`);
      setComplaintData(complaint.data.complaint);
      setRefresh(false);
    };
    getComplaintDetails();
  }, [refresh, id]);

  const handleUpdateCancel = () => {
    setRefresh(true);
    setOpenComplaintUpdate(false);
  };

  const handleUpdateClick = () => {
    setOpenComplaintUpdate(true);
  };

  const handleSelfAssign = async () => {
    try {
      await axios.put(`http://localhost:8001/api/staff/technician/selfassigncomplaint/${id}/${ownId}`);
      setRefresh(true);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error occured',
        text: `${error.response.data.message}`
      });
    }
  };

  return (
    <Fragment>
      <NavBar tab={'none'} />
      {openComplaintUpdate && <ComplaintUpdate onConfirm={handleUpdateCancel} />}
      <div className={`${classes.complaintDetailsHeading}`}>Complaint Details</div>
      <div className={`d-inline-block ${classes.detailsView}`}>
        <div className={`${classes.detailsName}`}>{complaintData.subject}</div>
        <div className={`${classes.detailsName}`}>{complaintData.description}</div>
        <div className={`${classes.detailsName}`}>{complaintData.name}</div>
        <div className={`${classes.detailsRole} mt-2`}>{complaintData.category}</div>
        <div className={`${classes.detailsRole} mt-2`}>{complaintData.priority}</div>
        <div className={`${classes.detailsDepartment} badge badge-dark mt-3`}>{complaintData.department}</div><br />
        <div>
          {
            complaintData.assign !== null ?
              <div className={`${classes.alreadyAssignedText}`}>Request is assigned to {complaintData.assignedName}</div>
              :
              <button className={`btn mt-3 ${classes.selfAssignButton}`} onClick={handleSelfAssign}>Self-Assign Complaint</button>
          }
        </div>
        <button className={`btn mt-3 ${classes.updateButton}`} onClick={handleUpdateClick}>Change Complaint Status</button>
      </div>
    </Fragment>
  );
};

export default ComplaintDetails;