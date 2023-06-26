import React, { useContext, useEffect, useState } from 'react';
import classes from './Rightside.module.css';
import axios from 'axios';
import RequestedDetails from '../UI/RequestedDetails/RequestedDetails';
import ComplaintedDetails from '../UI/ComplaintedDetails/ComplaintedDetails';
import TicketDetailsContext from '../Context/TicketDetailsContext/TicketDetailsContext';
import { Fragment } from 'react';

const Rightside = () => {
  const ticketCtx = useContext(TicketDetailsContext);
  const [staffInfo, setStaffInfo] = useState({ firstname: '', lastname: '', role: '', department: '' });
  const id = localStorage.getItem('id');

  useEffect(() => {
    const getStaffInfo = async () => {
      try {
        if (id) {
          const staff = await axios.get(`/api/staff/staffdetails/${id}`);
          setStaffInfo({ firstname: staff.data.staff.firstname, lastname: staff.data.staff.lastname, role: staff.data.staff.role, department: staff.data.staff.department });
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getStaffInfo();
  }, [id]);
  return (

    <Fragment>
   

    <div className={classes.right} hidden={window.location.pathname === '/login' || window.location.pathname === '/forgotpassword' || window.location.pathname === '/passwordreset' ? true : false}>
      <div className={classes.top}>
        {/* <label className={classes.dropdown}>
          <div className={classes.ddButton}>
            Department
          </div>
          <input type="checkbox" className={classes.ddInput} id="test" />
          <ul className={classes.ddMenu}>
            <li>Erp</li>
            <li>Networking</li>
            <li>Management</li>
          </ul>
        </label> */}

      
      </div>


      {ticketCtx.ticketType === 'complaint' && <ComplaintedDetails />}
      {ticketCtx.ticketType === 'request' && <RequestedDetails />}


      {/* <div className"menu-wrap">
              <ul className"menu">
                <li className"menu-item">
                  <a href="#">
                    <span className="material-icons-sharp"> person </span>
                  </a>
                  <ul className"drop-menu">
                    <li className"drop-menu-item">
                      <a href="#">{staffInfo.department}</a>
                    </li>
                    <li className"drop-menu-item">
                      <a href="#">{staffInfo.role}</a>
                    </li>
                    <li className"drop-menu-item">
                      <a href="#">{staffInfo.firstname}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            */}



      {/* 
            <h3>Department:{staffInfo.department}</h3>
            <h3>Role:{staffInfo.role}</h3>
            <h3>Name:{staffInfo.firstname}</h3> */}


      {/* <div className="assion-to">
          <h2>Assign To</h2>
          <div className="updates">
            <div className="update">
              <div className="profile-photo">
                <img src={image} alt="" />
              </div>
              <div className="assion-msg">
                <p>Anirudha mhatre </p>
              </div>
              <div className="dropdown">
                <button className="dropbtn">
                  <div className="more-vert">
                    <span className="material-icons-sharp">
                      more_vert
                    </span>
                  </div>
                </button>
                <div className="dropdown-content">
                  <a href="#">Forward Ticket</a>
                </div>
              </div>
            </div>

            <div className="update">
              <div className="profile-photo">
                <img src={image} alt="" />
              </div>
              <div className="assion-msg">
                <p>Anirudha mhatre </p>
              </div>
              <div className="dropdown">
                <button className="dropbtn">
                  <div className="more-vert">
                    <span className="material-icons-sharp">
                      more_vert
                    </span>
                  </div>
                </button>
                <div className="dropdown-content">
                  <a href="#">Forward Ticket</a>
                </div>
              </div>
            </div>

            <div className="update">
              <div className="profile-photo">
                <img src={image} alt="" />
              </div>
              <div className="assion-msg">
                <p>Anirudha mhatre </p>
              </div>
              <div className="dropdown">
                <button className="dropbtn">
                  <div className="more-vert">
                    <span className="material-icons-sharp">
                      more_vert
                    </span>
                  </div>
                </button>
                <div className="dropdown-content">
                  <a href="#">Forward Ticket</a>
                </div>
              </div>
            </div>
            <button className="assion-btn">Show more</button>
          </div>
        </div> */}
    </div>
    </Fragment>


  )
}

export default Rightside;