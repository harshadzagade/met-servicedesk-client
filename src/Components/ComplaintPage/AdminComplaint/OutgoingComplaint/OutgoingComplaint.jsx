import React, { Fragment, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Sweetpagination from 'sweetpagination';
import { iswitch } from 'iswitch';
import classes from './OutgoingComplaint.module.css'
import { useNavigate } from 'react-router-dom';
import AdminContext from '../../../Context/AdminContext/AdminContext';
import DataPerPage from '../../../UI/DataPerPage/DataPerPage';
import getItemWithExpiry from '../../../../Utils/expiryFunction';
import openSocket from 'socket.io-client';

const OutgoingComplaint = () => {
  const navigate = useNavigate();
  const idReference = getItemWithExpiry('id');
  const id = idReference ? idReference.value : null;
  const adminCtx = useContext(AdminContext);
  const [complaintList, setComplaintList] = useState([]);
  const [allComplaintList, setAllComplaintList] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
  const [errorMessage, setErrorMessage] = useState('');
  const [searchText, setSearchText] = useState('');

  const sortedData = React.useMemo(() => { return [...complaintList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) }, [complaintList]);

  useEffect(() => {
    const getList = async () => {
      try {
        const list = await axios.get(`/api/staff/admin/complaints/outgoing/${id}/${adminCtx.department}`);
        if (list.data.complaints.length === 0) {
          setErrorMessage('No complaints available')
        }
        setComplaintList(list.data.complaints);
        setAllComplaintList(list.data.complaints);
      } catch (error) {
        setErrorMessage(`${error.message}`);
      }
    };
    if (adminCtx.department) {
      getList();
    } else {
      setErrorMessage('Please select department')
    }
  }, [id, adminCtx.department]);

  useEffect(() => {
    const socket = openSocket('');
    const getList = async () => {
      try {
        if (searchText) {
          const complaint = await axios.get(`/api/staff/admin/complaints/outgoingcomplaintsearch/${adminCtx.department}/${searchText}`);
          setAllComplaintList(complaint.data);
          if (complaint.data.length === 0) {
            setErrorMessage('No such data')
          }
        } else {
          setAllComplaintList(sortedData);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getList();
    socket.on('complaints', () => {
      getList();
    });
    socket.on('complaintStatus', () => {
      getList();
    });
  }, [searchText, adminCtx.department, sortedData]);

  const getCreatedComplaintDate = (createdAt) => {
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
      <div className={classes.searchfiltering}>
        <input type="text" className={`${classes.searchInput}`} placeholder={`Search here`} onChange={(e) => setSearchText(e.target.value)} />
      </div>
      <div className={`${classes.complaint} `}>
        {
          (allComplaintList.length !== 0) ?
            <Fragment>
              {
                currentPageData.map((complaint) => (
                  <div key={complaint.id} className={`${classes.tikInfo}`} onClick={() => navigate(`/admincomplaintdetails/${complaint.id}`)} >
                    <div className={`${classes.tikHead}`}>
                      <h3 className={`${classes.tikTitle}`}>
                        {complaint.subject}
                      </h3>
                      <span className={`${classes.date}`}>
                        {getCreatedComplaintDate(complaint.createdAt)}
                      </span>
                    </div>
                    <div className={`${classes.tikMsg}`}>
                        <div dangerouslySetInnerHTML={{ __html: complaint.description }}></div>
                    </div>
                    <div className={`${classes.tikOther}`}>
                      <p className={`${classes.tikId}`}>
                        {complaint.ticketId}
                      </p>
                      <p className={`${classes.tikPri} `} style={{ background: iswitch(complaint.priority, ['high', () => '#E70000'], ['moderate', () => '#FFBF00'], ['low', () => '#165C49']) }}>
                        {complaint.priority}
                      </p>
                      <p className={`${classes.tikStatus}`} style={{ background: iswitch(complaint.status, ['pending', () => '#FF6000'], ['forwarded', () => '#FF5C89'], ['attending', () => ' #483DF6'], ['assigned', () => '#B954B6'], ['closed', () => '#437C28']) }}>
                        {complaint.status}
                      </p>
                      <p className={`${classes.tikAssigned}`}>
                        {complaint.assignedName ? 'Assigned to ' + complaint.assignedName : 'Not assigned yet'}
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
        {complaintList.length > 10 &&<div className={classes.datapage}>
          <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
        </div>}
        <Sweetpagination
          currentPageData={setCurrentPageData}
          dataPerPage={numberOfPages}
          getData={allComplaintList}
          navigation={true}
        />
      </div>
    </main>
  );
};

export default OutgoingComplaint;