import React from 'react';
import classes from './OwnTechComplaint.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { iswitch } from 'iswitch';
import SweetPagination from 'sweetpagination';
import AdminContext from '../../../Context/AdminContext/AdminContext';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import DataPerPage from '../../../UI/DataPerPage/DataPerPage';

const OwnTechComplaint = () => {
  const id = localStorage.getItem('id');
  const adminCtx = useContext(AdminContext);
  const navigate = useNavigate();
  const [complaintList, setComplaintList] = useState([]);
  const [allComplaintList, setAllComplaintList] = useState(complaintList);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
  const [errorMessage, setErrorMessage] = useState('');
  const [searchType, setSearchType] = useState('Subject');
  const [searchText, setSearchText] = useState('');
  const [isNormalSearch, setIsNormalSearch] = useState(true);
  const [priority, setPriority] = useState('');
  const [openPriorityList, setOpenPriorityList] = useState(false);
  const [status, setStatus] = useState('');
  const [openStatusList, setOpenStatusList] = useState(false);


  useEffect(() => {
    const getList = async () => {
      try {
        const list = await axios.get(`/api/complaint/owncomplaints/${id}`);
        if (list.data.complaints.length === 0) {
          setErrorMessage('No complaints available')
        }
        setComplaintList(list.data.complaints);
      } catch (error) {
        setErrorMessage(`${error.response.data.message}`);
      }
    };
    getList();
  }, [id, numberOfPages]);

  const getCreatedComplaintDate = (createdAt) => {
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
        complaintList.filter((a) => a.subject.startsWith(searchText)).map((data) => {
          return (
            arr.push(data)
          );
        });
        break;

      case 'Name':
        setOpenPriorityList(false);
        setOpenStatusList(false);
        setIsNormalSearch(true);
        complaintList.filter((a) => a.name.startsWith(searchText)).map((data) => {
          return (
            arr.push(data)
          );
        });
        break;

      case 'Priority':
        setOpenPriorityList(true);
        setOpenStatusList(false);
        setIsNormalSearch(false);
        const checkPriorities = complaintList.filter((a) => a.priority.startsWith(priority)).map((data) => {
          return (
            arr.push(data)
          );
        });
        if (priority === 'allPriorities') {
          arr = complaintList;
        } else if (checkPriorities.length === 0) {
          arr = [];
        }
        break;

      case 'Status':
        setOpenPriorityList(false);
        setOpenStatusList(true);
        setIsNormalSearch(false);
        const checkStatus = complaintList.filter((a) => a.status.startsWith(status)).map((data) => {
          return (
            arr.push(data)
          );
        });
        if (status === 'allStatus') {
          arr = complaintList;
        } else if (checkStatus.length === 0) {
          arr = [];
        }
        break;

      default:
        break;
    }
    if (searchText.length !== 0 || priority.length !== 0 || status.length !== 0) {
      setAllComplaintList(arr);
    } else {
      setAllComplaintList(complaintList)
    }
  }, [searchText, complaintList, searchType, priority, status]);





  return (
    <main>
      <div className={classes.search}>
        <div className={classes.searchfiltering}>
          {isNormalSearch && <input type="text" className={`${classes.searchInput}`} placeholder={`Please search ${searchType}`} onChange={(e) => setSearchText(e.target.value)} />}
          {
            openPriorityList &&
            <select value={priority} className={`${classes.optionSearchBox}`} name="priorities" required onChange={(e) => setPriority(e.target.value)}>
              <option value='' hidden>Select Your Priority</option>
              <option value='allPriorities'>All Priorities</option>
              <option value='high'>High</option>
              <option value='moderate'>Moderate</option>
              <option value='low'>Low</option>
            </select>
          }
          {
            openStatusList &&
            <select value={status} className={`${classes.optionSearchBox}`} name="status" required onChange={(e) => setStatus(e.target.value)}>
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
          <div className="btn-group mb-1">
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
          currentPageData.map((complaint) => (
            <div key={complaint.id} className={`${classes.tikInfo}`} onClick={() => navigate(`/complaintdetails/${complaint.id}`)} >
              <div className={`${classes.tikHead}`}>
                <h3 className={`${classes.tikTitle}`}>
                  {complaint.subject}
                </h3>
                <span className={`${classes.date}`}>
                  {getCreatedComplaintDate(complaint.createdAt)}
                </span>
              </div>
              <div className={`${classes.tikMsg}`}>
                <p>
                  <div dangerouslySetInnerHTML={{ __html: complaint.description }}></div>
                </p>
              </div>
              <div className={`${classes.tikOther}`}>
                <p className={`${classes.tikId}`}>
                  #{complaint.id}
                </p>
                <p className={`${classes.tikPri} `} style={{ background: iswitch(complaint.priority, ['high', () => 'red'], ['moderate', () => '#F78D1E'], ['low', () => 'green']) }}>
                  {complaint.priority}
                </p>
                <p className={`${classes.tikId}`}>
                  {complaint.status}
                </p>
              </div>
            </div>
          ))
        }
        <SweetPagination
          currentPageData={setCurrentPageData}
          dataPerPage={numberOfPages}
          getData={allComplaintList}
          navigation={true}
        />
      </div>
    </main>
  )
}

export default OwnTechComplaint