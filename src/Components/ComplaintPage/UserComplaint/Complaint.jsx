import React, { Fragment, useEffect, useState } from 'react';
import classes from './Complaint.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { iswitch } from 'iswitch';
import SweetPagination from 'sweetpagination';
import DataPerPage from '../../UI/DataPerPage/DataPerPage';

const Complaint = () => {
  const id = localStorage.getItem('id');
  const [allComplaint, setAllComplaint] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
  const navigate = useNavigate();

  useEffect(() => {
    const getList = async () => {
      const list = await axios.get(`http://localhost:8001/api/complaint/owncomplaints/${id}`);
      setAllComplaint(list.data.complaints);
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
  return (

    <Fragment>
      <div className={classes.usercomplaint}>
        <div className={`${classes.mainTitle}`}>
          <h1 className="tik-type-title"> Complaint</h1>

          <button className={`${classes.tikReqBtn}`} onClick={() => navigate('/newcomplaint')}>
            <span className="material-icons-sharp btn-icon">
              add
            </span>
            <span className={`${classes.btnName}`}> New Ticket</span>
          </button>
        </div>


        <div className={`${classes.filterButtons}`}>
          <button className={`${classes.button}`} data-filter="all" >Own Complaint</button>
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
            getData={allComplaint}
            navigation={true}
          />
        </div>
      </div>
    </Fragment>
  )
}
export default Complaint; 