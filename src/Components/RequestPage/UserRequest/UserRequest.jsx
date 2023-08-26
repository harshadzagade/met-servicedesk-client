import React, { useEffect, useState } from "react";
import classes from ".//UserRequest.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { iswitch } from "iswitch";
import SweetPagination from "sweetpagination";
import DataPerPage from "../../UI/DataPerPage/DataPerPage";
import Rightside from "../../Righside/Rightside";
import getItemWithExpiry from "../../../Utils/expiryFunction";
import { Fragment } from "react";

const UserRequest = () => {
  const id = getItemWithExpiry('id');
  const navigate = useNavigate();
  const [requestList, setRequestList] = useState([]);
  const [allRequestList, setAllRequestList] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const sortedData = React.useMemo(() => { return [...requestList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) }, [requestList]);

  useEffect(() => {
    const getList = async () => {
      try {
        const list = await axios.get(`http://localhost:8001/api/request/ownrequests/${id}`);
        if (list.data.requests.length === 0) {
          setErrorMessage('No requests available')
        }
        setRequestList(list.data.requests);
        setAllRequestList(list.data.requests);
      } catch (error) {
        console.log(error.message);
      }
    };
    getList();
  }, [id]);

  useEffect(() => {
    const getStaff = async () => {
      try {
        if (searchText) {
          const request = await axios.get(`http://localhost:8001/api/request/ownrequestsearch/${id}/${searchText}`);
          setAllRequestList(request.data);
          if (request.data.length === 0) {
            setErrorMessage('No such data')
          }
        } else {
          setAllRequestList(sortedData);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getStaff();
  }, [searchText, id, sortedData]);

  const handleRequestDetailsClick = (id) => {
    navigate(`/requestdetails/${id}`);
  };

  const getCreatedRequestDate = (createdAt) => {
    const date = new Date(createdAt);
    return (date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + formatAMPM(date));
  };

  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
    return strTime;
  };

  return (
    <main>
      <div className="container-fluid">
        <div className={`${classes.userreq} row`}>
          <div className="col-8">
            <div className={classes.buttonsSection}>
              <div className={`${classes.filterButtons}`}>
                <h2 className="tik-type-title">Request</h2>
              </div>
              <button className={`${classes.tikReqBtn}`} onClick={() => navigate("/newrequest")}>
                <span className="material-icons-sharp btn-icon">add</span>
                <span className={`${classes.btnName}`}> New Ticket</span>
              </button>
            </div>
            <div className={classes.search}>
              <div className={classes.searchfiltering}>
                <input type="text" className={`${classes.searchInput}`} placeholder={`Search here`} onChange={(e) => setSearchText(e.target.value)} />
              </div>
              <div className={classes.datapage}>
                <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
              </div>
            </div>
            <div className={`${classes.requests} `}>
              {
                (allRequestList.length !== 0) ?
                  <Fragment>
                    {
                      currentPageData.map((request) => (
                        <div key={request.id} className={`${classes.tikInfo}`} onClick={() => handleRequestDetailsClick(request.id)}>
                          <div className={`${classes.tikHead}`}>
                            <h3 className={`${classes.tikTitle}`}>{request.subject}</h3>
                            <span className={`${classes.date}`}>
                              {getCreatedRequestDate(request.createdAt)}
                            </span>
                          </div>
                          <div className={`${classes.tikMsg}`}>
                            <p><div dangerouslySetInnerHTML={{ __html: request.description }} /></p>
                          </div>
                          <div className={`${classes.tikOther}`}>
                            <p className={`${classes.tikId}`}>{request.ticketId}</p>
                            <p className={`${classes.tikPri} `} style={{ background: iswitch(request.priority, ['high', () => '#FF0000'], ['moderate', () => '#FFFF00'], ['low', () => '#90EE90']) }}>
                              {request.priority}
                            </p>
                            <p className={`${classes.tikStatus}`} style={{ background: iswitch(request.status, ['pending', () => '#D3D3D3'], ['disapproved', () => '#FF0000'], ['forwarded', () => '#FFA500'], ['attending', () => ' #00FFFF'], ['assigned', () => '#0000FF'], ['closed', () => '#A9A9A9']) }}>
                              {request.status}
                            </p>
                          </div>
                        </div>
                      ))}
                  </Fragment>
                  :
                  <div>{errorMessage}</div>
              }
              <SweetPagination
                currentPageData={setCurrentPageData}
                dataPerPage={numberOfPages}
                getData={allRequestList}
                navigation={true}
              />
            </div>
          </div>
          <div className="col-4">
            <Rightside />
          </div>
        </div>
      </div>
    </main>
  );
};
export default UserRequest;
