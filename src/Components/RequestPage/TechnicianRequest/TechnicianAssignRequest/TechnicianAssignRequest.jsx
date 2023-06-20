import React from 'react';
import classes from './TechnicianAssignRequest.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { iswitch } from 'iswitch';
import { useEffect } from 'react';
import axios from 'axios';
import SweetPagination from 'sweetpagination';

const TechnicianAssignRequest = () => {
  const id = localStorage.getItem('id');
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
  const [allRequest, setAllRequest] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
      const getList = async () => {
          try {
              const list = await axios.get(`http://localhost:8001/api/staff/technician/getassignedrequests/${id}`);
              if (list.data.requests.length === 0) {
                  setErrorMessage('No requests available')
              }
              setAllRequest(list.data.requests);
          } catch (error) {
              setErrorMessage(`${error.response.data.message}`);
          }
      };
      getList();
  }, [id]);
  const navigate = useNavigate();
  return (

    <main>
      <div className={`${classes.requests} `}>
        {
          currentPageData.map((request) => (
            <div key={request.id} className={classes.tikInfo} onClick={() => navigate(`/technicianRequestDetails/${request.id}`)}>
              <div className={`${classes.tikHead}`}>
              
                <h3 className={`${classes.tikTitle}`}>
                  {request.subject}
                </h3>

            
                <span className={`${classes.date}`}>
                  {request.createdAt}
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
                  #{request.status}
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
    </main>
  )
}

export default TechnicianAssignRequest