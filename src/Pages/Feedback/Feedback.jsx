import React, { Fragment, useContext, useEffect, useState } from 'react';
import classes from './Feedback.module.css';
import AdminContext from '../../Components/Context/AdminContext/AdminContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
  const navigate = useNavigate();
  const adminCtx = useContext(AdminContext);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const getFeedback = async () => {
      try {
        const feedback = await axios.get(`/api/feedback/allfeedbacks/${adminCtx.department}`);
        setFeedback(feedback.data.feedback);
      } catch (error) {
        console.log(error.message);
      }
    };
    getFeedback();
  }, [adminCtx.department])

  const getActivityDate = (createdAt) => {
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

  const handleFeedbackClick = (ticketId, ticketType) => {
    const id = ticketId.slice(8);
    if (ticketType === 'request') {
      navigate(`/requestdetails/${id}`);
      sessionStorage.setItem('tab', 'request');
    } else if (ticketType === 'complaint') {
      sessionStorage.setItem('tab', 'complaint');
      navigate(`/concerndetails/${id}`);
    }
  };

  return (
    <Fragment>
      <div className={classes.allstaff}>
        <div className={classes.upper}>
          <h2 className={classes.title}>Feedback</h2>
          <input type="text" className={classes.search} placeholder='Search here' />
        </div>
        {
          feedback.map((feedback) => (
            <div className={classes.flair} onClick={() => handleFeedbackClick(feedback.ticketId, feedback.ticketType)}>
              <div className={classes.activity} key={feedback.ticketId}>
                <div className={classes.detalis}>
                  <span>{feedback.ticketId}</span>
                  <span> {(feedback.ticketType === 'request' && 'Request') || (feedback.ticketType === 'complaint' && 'Concern')}</span>
                  <span>{feedback.feedback}</span>
                </div>
                <div className={classes.date}>
                  <span>{getActivityDate(feedback.createdAt)}</span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </Fragment>
  )
}

export default Feedback