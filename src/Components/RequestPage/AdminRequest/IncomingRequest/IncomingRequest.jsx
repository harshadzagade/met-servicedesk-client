import React, { useEffect, useState } from 'react';
import classes from './IncomingRequest.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SweetPagination from 'sweetpagination';
import { iswitch } from 'iswitch';
import AdminContext from '../../../Context/AdminContext/AdminContext';
import { useContext } from 'react';
import DataPerPage from '../../../UI/DataPerPage/DataPerPage';

const IncomingRequest = () => {
  const navigate = useNavigate();
  const adminCtx = useContext(AdminContext);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [errorMessage, setErrorMessage] = useState('');
  const [requestList, setRequestList] = useState([]);
  const [allRequestList, setAllRequestList] = useState(requestList);
  const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
  const [searchType, setSearchType] = useState('Subject');
  const [searchText, setSearchText] = useState('');
  const [isNormalSearch, setIsNormalSearch] = useState(true);
  const [priority, setPriority] = useState('');
  const [openPriorityList, setOpenPriorityList] = useState(false);
  const [status, setStatus] = useState('');
  const [openStatusList, setOpenStatusList] = useState(false);

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
        setRequestList(list.data.requests);
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


  useEffect(() => {
    let arr = [];
    switch (searchType) {
      case 'Subject':
        setOpenPriorityList(false);
        setOpenStatusList(false);
        setIsNormalSearch(true);
        requestList.filter((a) => a.subject.startsWith(searchText)).map((data) => {
          return (
            arr.push(data)
          );
        });
        break;

      case 'Name':
        setOpenPriorityList(false);
        setOpenStatusList(false);
        setIsNormalSearch(true);
        requestList.filter((a) => a.name.startsWith(searchText)).map((data) => {
          return (
            arr.push(data)
          );
        });
        break;

      case 'Priority':
        setOpenPriorityList(true);
        setOpenStatusList(false);
        setIsNormalSearch(false);
        const checkPriorities = requestList.filter((a) => a.priority.startsWith(priority)).map((data) => {
          return (
            arr.push(data)
          );
        });
        if (priority === 'allPriorities') {
          arr = requestList;
        } else if (checkPriorities.length === 0) {
          arr = [];
        }
        break;

      case 'Status':
        setOpenPriorityList(false);
        setOpenStatusList(true);
        setIsNormalSearch(false);
        const checkStatus = requestList.filter((a) => a.status.startsWith(status)).map((data) => {
          return (
            arr.push(data)
          );
        });
        if (status === 'allStatus') {
          arr = requestList;
        } else if (checkStatus.length === 0) {
          arr = [];
        }
        break;

      default:
        break;
    }
    if (searchText.length !== 0 || priority.length !== 0 || status.length !== 0) {
      setAllRequestList(arr);
    } else {
      setAllRequestList(requestList)
    }
  }, [searchText, requestList, searchType, priority, status]);

  return (

    <main>
      <div className={classes.search}>
        <div className={classes.searchfiltering}>
          {isNormalSearch && <input type="text" className={`${classes.searchInput}`} placeholder={`Please search ${searchType}`} onChange={(e) => setSearchText(e.target.value)} />}
          {
            openPriorityList &&
            <select value={priority} className={`${classes.searchInput}`} name="priorities" required onChange={(e) => setPriority(e.target.value)}>
              <option value='' hidden>Select Your Priority</option>
              <option value='allPriorities'>All Priorities</option>
              <option value='high'>High</option>
              <option value='moderate'>Moderate</option>
              <option value='low'>Low</option>
            </select>
          }
          {
            openStatusList &&
            <select value={status} className={`${classes.searchInput}`} name="status" required onChange={(e) => setStatus(e.target.value)}>
              <option value='' hidden>Select Your Status</option>
              <option value='allStatus'>All Status</option>
              <option value='pending'>Pending</option>
              <option value='assigned'>Assigned</option>
              <option value='attending'>Attending</option>
              <option value='forwarded'>Forwarded</option>
              <option value='closed'>Closed</option>
              <option value='disapproved'>Disapproved</option>
            </select>
          }
          <div className="btn-group ">
            <button type="button" className={`${classes.searchButton} dropdown-toggle`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {searchType}
            </button>
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => setSearchType('Subject')}>Subject</div>
              <div className="dropdown-item" onClick={() => setSearchType('Name')}>Name</div>
              <div className="dropdown-item" onClick={() => setSearchType('Priority')}>Priority</div>
              <div className="dropdown-item" onClick={() => setSearchType('Status')}>Status</div>
            </div>
          </div>
        </div>
        <div className={classes.datapage}>
          <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
        </div>
      </div>
      
      <div className={`${classes.requests} `}>
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
                <p>
                  <div dangerouslySetInnerHTML={{ __html: request.description }}></div>
                </p>
              </div>
              <div className={`${classes.tikOther}`}>
                <p className={`${classes.tikId}`}>
                  #{request.id}
                </p>
                <p className={`${classes.tikPri} `} style={{ background: iswitch(request.priority, ['high', () => 'red'], ['medium', () => '#F78D1E'], ['low', () => 'green']) }}>
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
          getData={allRequestList}
          navigation={true}
        />
      </div>
    </main>

  )
}
export default IncomingRequest