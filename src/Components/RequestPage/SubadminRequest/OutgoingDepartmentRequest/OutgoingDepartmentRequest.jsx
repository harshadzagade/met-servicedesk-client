import React, { Fragment, useContext, useState, useEffect } from 'react';
import classes from './OutgoingDepartmentRequest.module.css';
import axios from 'axios';
import { iswitch } from 'iswitch';
import Sweetpagination from 'sweetpagination';
import { useNavigate } from 'react-router-dom';
import DataPerPage from '../../../UI/DataPerPage/DataPerPage';
import SubadminContext from '../../../Context/SubadminContext/SubadminContext';
import getItemWithExpiry from '../../../../Utils/expiryFunction';
import openSocket from 'socket.io-client';

const OutgoingDepartmentRequest = () => {
  const idReference = getItemWithExpiry('id');
  const id = idReference ? idReference.value : null;
  const navigate = useNavigate();
  const subadminCtx = useContext(SubadminContext);
  const [requestList, setRequestList] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [allRequestList, setAllRequestList] = useState([]);
  const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
  const [errorMessage, setErrorMessage] = useState('');
  const [searchText, setSearchText] = useState('');
  const [subadminDetails, setSubadminDetails] = useState({});

  const sortedData = React.useMemo(() => { return [...requestList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) }, [requestList]);

  useEffect(() => {
    const getSubadminDetails = async () => {
      try {
        const subadmin = await axios.get(`/api/staff/staffdetails/${id}`);
        setSubadminDetails(subadmin.data.staff);
      } catch (error) {
        console.log(error.message);
      }
    };
    getSubadminDetails();
  }, [id]);

  useEffect(() => {
    const socket = openSocket('');
    const getList = async () => {
      try {
        const list = await axios.get(`/api/staff/subadmin/requests/outgoing/${id}/${subadminDetails.department}`);
        if (list.data.requests.length === 0) {
          setErrorMessage('No requests available')
        }
        setRequestList(list.data.requests);
        setAllRequestList(list.data.requests);
      } catch (error) {
        setErrorMessage(`${error.message}`);
      }
    };
    getList();
    socket.on('requests', () => {
      getList();
    });
    socket.on('requestStatus', () => {
      getList();
    });
  }, [subadminDetails.department, id]);

  useEffect(() => {
    const getStaff = async () => {
      try {
        if (searchText) {
          const request = await axios.get(`/api/staff/subadmin/requests/outgoingrequestsearch/${subadminDetails.department}/${searchText}`);
          setAllRequestList(request.data);
          if (request.data.length === 0) {
            setErrorMessage('No such data')
          }
        } else {
          setAllRequestList(sortedData);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getStaff();
  }, [searchText, subadminDetails.department, sortedData]);

  const getCreatedRequestDate = (createdAt) => {
    if (createdAt === null) {
      return null;
    }
    const date = new Date(createdAt);
    return (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + formatAMPM(date));
  };

  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return strTime;
  };

  const handleRequestClick = (id) => {
    subadminCtx.setApproval('1');
    navigate(`/subadminrequestdetails/${id}`);
  };

  return (
    <main>
      <div className={classes.searchfiltering}>
        <input type="text" className={`${classes.searchInput}`} placeholder={`Search here`} onChange={(e) => setSearchText(e.target.value)} />
      </div>
      <div className={`${classes.requests} `}>
        {
          allRequestList.length !== 0 ?
            <Fragment>
              {
                currentPageData.map((request) => (
                  <div key={request.id} className={classes.tikInfo} onClick={() => handleRequestClick(request.id)}>
                    <div className={`${classes.tikHead}`}>
                      <h3 className={`${classes.tikTitle}`}>
                        {request.subject}
                      </h3>
                      <span className={`${classes.date}`}>
                        {getCreatedRequestDate(request.createdAt)}
                      </span>
                    </div>
                    <div className={`${classes.tikMsg}`}>
                      <div dangerouslySetInnerHTML={{ __html: request.description }}></div>
                    </div>
                    <div className={`${classes.tikOther}`}>
                      <p className={`${classes.tikId}`}>
                        {request.ticketId}
                      </p>
                      <p className={`${classes.tikPri} `} style={{ background: iswitch(request.priority, ['high', () => '#E70000'], ['moderate', () => '#FFBF00'], ['low', () => '#165C49']) }}>
                        {request.priority}
                      </p>
                      <p className={`${classes.tikStatus}`} style={{ background: iswitch(request.status, ['pending', () => '#FF6000'], ['forwarded', () => '#FF5C89'], ['attending', () => ' #483DF6'], ['assigned', () => '#B954B6'], ['closed', () => '#437C28'], ['disapproved', () => '#FF0000']) }}>
                        {request.status}
                      </p>
                      <p className={`${classes.tikAssigned}`}>
                        {request.assignedName ? 'Assigned to ' + request.assignedName : 'Not assigned yet'}
                      </p>
                    </div>
                  </div>
                ))
              }
            </Fragment>
            :
            <div className={classes.errorMsg}>
              <h2>{errorMessage}</h2>
            </div>
        }
        {requestList.length > 10 && <div className={classes.datapage}>
          <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
        </div>}
        <Sweetpagination
          currentPageData={setCurrentPageData}
          dataPerPage={numberOfPages}
          getData={allRequestList}
          navigation={true}
        />
      </div>
    </main>
  );
};

export default OutgoingDepartmentRequest;