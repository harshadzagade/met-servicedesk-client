import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import classes from './RequestDetails.module.css';
// import NavBar from '../../../NavBar/NavBar';
import { useParams, useSearchParams } from 'react-router-dom';
import RequestApproval from './RequestApproval/RequestApproval';
import AdminContext from '../../../../Context/AdminContext/AdminContext';
import Swal from 'sweetalert2';

const RequestDetails = () => {
  const adminCtx = useContext(AdminContext);
  const paramsId = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = paramsId.requestId;
  const [requestData, setRequestData] = useState({});
  const [openApproval, setOpenApproval] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (adminCtx.department === requestData.department) {
      adminCtx.setApproval('2')
    } else {
      adminCtx.setApproval('1')
    }
  }, [adminCtx, requestData.department]);

  useEffect(() => {
    const getRequestDetails = async () => {
      const request = await axios.get(`http://localhost:8001/api/request/getrequestdetails/${id}`);
      setRequestData(request.data.request);
      setRefresh(false);
    };
    getRequestDetails();
  }, [refresh, id]);

  const handleUpdateCancel = () => {
    setRefresh(true);
    setOpenApproval(false);
    if (searchParams !== null) {
      setSearchParams('');
    }
  };

  const handleApprovalClick = () => {
    if (adminCtx.department.length !== 0) {
      setOpenApproval(true);
      if (adminCtx.approval === '1') {
        setSearchParams(`?${new URLSearchParams({ approval: '1' })}`)
      } else if (adminCtx.approval === '2') {
        setSearchParams(`?${new URLSearchParams({ approval: '2' })}`)
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please select department',
        text: 'Please enter valid fields'
      });
    }
  };

  return (
    <Fragment>
      {/* <NavBar tab={'none'} /> */}
      {openApproval && <RequestApproval onConfirm={handleUpdateCancel} />}
      <div className={`${classes.staffDetailsHeading}`}>Request Details</div>
      <div className={`d-inline-block ${classes.detailsView}`}>
        <div className={`${classes.detailsName}`}>{requestData.subject}</div>
        <div className={`${classes.detailsName}`}>{requestData.description}</div>
        <div className={`${classes.detailsName}`}>{requestData.name}</div>
        <div className={`${classes.detailsRole} mt-2`}>{requestData.category}</div>
        <div className={`${classes.detailsRole} mt-2`}>{requestData.priority}</div>
        <div className={`${classes.detailsDepartment} badge badge-dark mt-3`}>{requestData.department}</div><br />
        <div className={`${classes.requestDetails}`}>
          Approvals
          <div className={`${classes.detailsContact} mt-2`}>HOD Approval: {requestData.approval1 === 1 ? 'approved' : 'not approved'}</div>
          <div className={`${classes.detailsContact} mt-2`}>Admin Approval: {requestData.approval2 === 1 ? 'approved' : 'not approved'}</div>
        </div>
        <button className={`btn mt-3 ${classes.updateButton}`} onClick={handleApprovalClick}>Approve/Disapprove Request</button>
      </div>
    </Fragment>
  );
};

export default RequestDetails;