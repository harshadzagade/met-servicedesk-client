import React, { useState, useEffect, Fragment } from 'react';
import classes from './TechnicianAssignRequest.module.css';
import { useNavigate } from 'react-router-dom';
import { iswitch } from 'iswitch';
import axios from 'axios';
import SweetPagination from 'sweetpagination';
import DataPerPage from '../../../UI/DataPerPage/DataPerPage';
import Swal from 'sweetalert2';

const TechnicianAssignRequest = () => {
  const id = localStorage.getItem('id');
  const navigate = useNavigate();
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [requestList, setRequestList] = useState([]);
  const [allRequestList, setAllRequestList] = useState([]);
  const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
  const [errorMessage, setErrorMessage] = useState('');
  const [searchText, setSearchText] = useState('');

  const sortedData = React.useMemo(() => { return [...requestList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) }, [requestList]);

  useEffect(() => {
    const getList = async () => {
      try {
        const list = await axios.get(`/api/staff/technician/getassignedrequests/${id}`);
        if (list.data.requests.length === 0) {
          setErrorMessage('No requests available')
        }
        setRequestList(list.data.requests);
        setAllRequestList(list.data.requests);
      } catch (error) {
        setErrorMessage(`${error.response.data.message}`);
      }
    };
    getList();
  }, [id]);

  useEffect(() => {
    const getStaff = async () => {
      try {
        if (searchText) {
          const request = await axios.get(`/api/staff/technician/assignedrequestsearch/${id}/${searchText}`);
          setAllRequestList(request.data);
        } else {
          setAllRequestList(sortedData);
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: `${error.response.data.message}`,
          text: 'Unable to search requests'
        });
      }
    };
    getStaff();
  }, [searchText, id, sortedData]);

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

  return (
    <main>
      <div className={classes.search}>
        <div className={classes.searchfiltering}>
          <input type="text" className={`${classes.searchInput}`} placeholder={`Search here`} onChange={(e) => setSearchText(e.target.value)} />
        </div>
        <div className={classes.datapage}>
          <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
        </div>
      </div>
      <div className={`${classes.requests} `}>
        {
          allRequestList.length !== 0 ?
            <Fragment>
              {
                currentPageData.map((request) => (
                  <div key={request.id} className={classes.tikInfo} onClick={() => navigate(`/engineerrequestdetails/${request.id}`)}>
                    <div className={`${classes.tikHead}`}>
                      <h3 className={`${classes.tikTitle}`}>
                        {request.subject}
                      </h3>
                      <span className={`${classes.date}`}>
                        {getCreatedRequestDate(request.createdAt)}
                      </span>
                    </div>
                    <div className={`${classes.tikMsg}`}>
                      <p>
                        <div dangerouslySetInnerHTML={{ __html: request.description }}></div>
                      </p>
                    </div>
                    <div className={`${classes.tikOther}`}>
                      <p className={`${classes.tikId}`}>
                        {request.ticketId}
                      </p>
                      <p className={`${classes.tikPri} `} style={{ background: iswitch(request.priority, ['high', () => '#E70000'], ['moderate', () => '#FFBF00'], ['low', () => '#90EE90']) }}>
                        {request.priority}
                      </p>
                      <p className={`${classes.tikStatus}`} style={{ background: iswitch(request.status, ['pending', () => '#FF6000'], ['forwarded', () => '#9681EB'], ['attending', () => ' #30D5C8'], ['assigned', () => '#008080'], ['closed', () => '#ADE792']) }}>
                        {request.status}
                      </p>
                    </div>
                  </div>
                ))
              }
            </Fragment>
            :
            <div>{errorMessage}</div>
        }
        <SweetPagination
          currentPageData={setCurrentPageData}
          dataPerPage={numberOfPages}
          getData={allRequestList}
          navigation={true}
        />
      </div>
    </main>
  );
};

export default TechnicianAssignRequest;