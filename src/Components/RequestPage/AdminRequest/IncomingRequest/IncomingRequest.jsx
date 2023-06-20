import React, { useEffect, useState } from 'react';
import classes from './IncomingRequest.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SweetPagination from 'sweetpagination';
import { iswitch } from 'iswitch';
import AdminContext from '../../../Context/AdminContext/AdminContext';
import { useContext } from 'react';

const IncomingRequest = () => {
  const adminCtx = useContext(AdminContext);
  const [allRequest, setAllRequest] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
  const [errorMessage, setErrorMessage] = useState('');

  const handleRequestClick = (id) => {
    adminCtx.setApproval('2');
    navigate(`/adminrequestdetails/${id}`);
  };

  useEffect(() => {
    const getList = async () => {
      try {
        const list = await axios.get(`http://localhost:8001/api/staff/admin/requests/incoming/${adminCtx.department}`);
        if (list.data.requests.length === 0) {
          setErrorMessage('No requests available')
        }
        setAllRequest(list.data.requests);
      } catch (error) {
        setErrorMessage(`${error.response.data.message}`);
      }
    };
    if (adminCtx.department) {
      getList();
    } else {
      setErrorMessage('Please select department')
    }
  }, [adminCtx.department]);


  const navigate = useNavigate()
  return (

    <main>

      <div className={`${classes.requests} `}>
        {
          currentPageData.map((request) => (
            <div key={request.id} className={classes.tikInfo} onClick={() => handleRequestClick(request.id)}>
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
    </main>

  )
}
export default IncomingRequest