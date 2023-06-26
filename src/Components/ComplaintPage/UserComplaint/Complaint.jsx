import React, { Fragment, useEffect, useState } from 'react';
import classes from './Complaint.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { iswitch } from 'iswitch';
import SweetPagination from 'sweetpagination';
import DataPerPage from '../../UI/DataPerPage/DataPerPage';

const Complaint = () => {
  const id = localStorage.getItem('id');
  const [complaintList, setComplaintList] = useState([]);
  const [allComplaintList, setAllComplaintList] = useState(complaintList);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
  const [searchType, setSearchType] = useState('Subject');
  const [searchText, setSearchText] = useState('');
  const [isNormalSearch, setIsNormalSearch] = useState(true);
  const [priority, setPriority] = useState('');
  const [openPriorityList, setOpenPriorityList] = useState(false);
  const [status, setStatus] = useState('');
  const [openStatusList, setOpenStatusList] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getList = async () => {
      const list = await axios.get(`http://localhost:8001/api/complaint/owncomplaints/${id}`);
      setComplaintList(list.data.complaints);
    };
    getList();
  }, [id]);


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

    <Fragment>
      <div className={classes.usercomplaint}>
        <div className={`${classes.mainTitle}`}>
          <h2 className="tik-type-title"> Complaint</h2>
        </div>
        <div className={classes.buttonsSection}>
          <div className={`${classes.filterButtons}`}>
            <button className={`${classes.button}`} data-filter="all" >Own Complaint</button>
          </div>
          <button className={`${classes.tikReqBtn}`} onClick={() => navigate('/newcomplaint')}>
            <span className="material-icons-sharp btn-icon">
              add
            </span>
            <span className={`${classes.btnName}`}> New Ticket</span>
          </button>
        </div>

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
            <div className="btn-group">
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

                  <p className={`${classes.tikPri} `} style={{ background: iswitch(complaint.priority, ['High', () => 'red'], ['Medium', () => '#F78D1E'], ['Low', () => 'green']) }}>
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
      </div>
    </Fragment>
  )
}
export default Complaint; 