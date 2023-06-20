import React, { useContext, useEffect, useState } from 'react';
import classes from './/UserRequest.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { iswitch } from 'iswitch';
import SweetPagination from 'sweetpagination';
import DataPerPage from '../../UI/DataPerPage/DataPerPage';

const UserRequest = () => {
  const id = localStorage.getItem('id');
  const navigate = useNavigate();
  const [allRequest, setAllRequest] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());

  useEffect(() => {
    const getList = async () => {
      const list = await axios.get(`http://localhost:8001/api/request/ownrequests/${id}`);
      setAllRequest(list.data.requests);

    };
    getList();
  }, []);

  const handleRequestDetailsClick = (id) => {
    navigate(`/requestdetails/${id}`);
  };

  const getCreatedRequestDate = (createdAt) => {
    const date = new Date(createdAt);
    return (date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + formatAMPM(date));
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
}

  return (

    <main>
      <div className={classes.userreq}>
        <div className={`${classes.mainTitle}`}>
          <h1 className="tik-type-title">Request</h1>
          <button className={`${classes.tikReqBtn}`} onClick={() => navigate('/newrequest')}>
            <span className="material-icons-sharp btn-icon">
              add
            </span>
            <span className={`${classes.btnName}`}> New Ticket</span>
          </button>
        </div>
        <div className={`${classes.filterButtons}`}>
          <button className={`${classes.button}`} data-filter="all" >Own request</button>
          <div className={classes.datapage}>
            <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
          </div>
        </div>

        <div className={`${classes.requests} `}>
          {
            currentPageData.map((request) => (
              <div key={request.id} className={`${classes.tikInfo}`} onClick={() => handleRequestDetailsClick(request.id)} >
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
                    #{request.id}
                  </p>
                  <p className={`${classes.tikPri} `} style={{ background: iswitch(request.priority, ['High', () => 'red'], ['Medium', () => '#F78D1E'], ['Low', () => 'green']) }}>
                    {request.priority}
                  </p>
                  <p className={`${classes.tikId}`}>
                    {request.status}
                  </p>
                </div>
              </div>
            ))
          }
          <SweetPagination
            currentPageData={setCurrentPageData}
            dataPerPage={numberOfPages}
            getData={allRequest}
            navigation={true}
          />
        </div>
      </div>
    </main>
  )
}
export default UserRequest; 