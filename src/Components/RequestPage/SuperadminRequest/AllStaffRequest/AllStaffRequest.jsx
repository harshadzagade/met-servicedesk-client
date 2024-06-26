import React, { Fragment, useState, useEffect } from 'react'
import classes from './AllStaffRequest.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SweetPagination from 'sweetpagination';
import { iswitch } from 'iswitch';
import DataPerPage from '../../../UI/DataPerPage/DataPerPage';
import Rightside from '../../../Righside/Rightside';
import openSocket from 'socket.io-client';

const AllStaffRequest = () => {
    const navigate = useNavigate();
    const [requestList, setRequestList] = useState([]);
    const [allRequestList, setAllRequestList] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
    const [searchText, setSearchText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const sortedData = React.useMemo(() => { return [...requestList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) }, [requestList]);

    useEffect(() => {
        const socket = openSocket('');
        const getList = async () => {
            try {
                const list = await axios.get(`/api/request/allrequests`);
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
        socket.on('requests', () => {
            getList();
        });
        socket.on('requestStatus', () => {
            getList();
        });
    }, []);

    useEffect(() => {
        const getStaff = async () => {
            try {
                if (searchText) {
                    const request = await axios.get(`/api/request/searchallrequests/${searchText}`);
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
    }, [searchText, sortedData]);

    const getCreatedRequestDate = (createdAt) => {
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
            <div className="container-fluid">
                <div className={`${classes.staffrequestform} row`}>
                    <div className="col-8 col-md-8 p-0">
                        <div>
                            <div className={classes.searchfiltering}>
                                <input type="text" className={`${classes.searchInput}`} placeholder={`Search here`} onChange={(e) => setSearchText(e.target.value)} />
                            </div>
                        </div>
                        <div className={`${classes.requests} `}>
                            {
                                (allRequestList.length !== 0) ?

                                    <Fragment>
                                        {
                                            currentPageData.map((request) => (
                                                <div key={request.id} className={classes.tikInfo} onClick={() => navigate(`/requestdetails/${request.id}`)}>
                                                    <div className={`${classes.tikHead}`}>
                                                        <h3 className={`${classes.tikTitle}`}>
                                                            {request.subject}
                                                        </h3>
                                                        <span className={`${classes.date}`}>
                                                            {getCreatedRequestDate(request.createdAt)}
                                                        </span>
                                                    </div>
                                                    <div className={`${classes.tikMsg}`}>
                                                            <span dangerouslySetInnerHTML={{ __html: request.description }} />
                                                    </div>
                                                    <div className={`${classes.tikOther}`}>
                                                        <p className={`${classes.tikId}`}>
                                                            {request.ticketId}
                                                        </p>
                                                        <p className={`${classes.tikPri} `} style={{ background: iswitch(request.priority, ['high', () => '#E70000'], ['moderate', () => '#FFBF00'], ['low', () => '#165C49']) }}>
                                                            {request.priority}
                                                        </p>
                                                        <p className={`${classes.tikStatus}`} style={{ background: iswitch(request.status, ['pending', () => '#FF6000'], ['forwarded', () => '#FF5C89'], ['attending', () => ' #483DF6'], ['assigned', () => '#B954B6'], ['closed', () => '#437C28'], ['disapproved', () => '#FF0000']) }}>
                                                            {request.status}
                                                        </p>
                                                        <p className={`${classes.tikAssigned}`}>
                                                            {request.assignedName ? 'Assigned to ' + request.assignedName : 'Not assigned yet'}
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
                            {requestList.length > 10 && <div className={classes.datapage} >
                                <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
                            </div>}
                            <SweetPagination
                                currentPageData={setCurrentPageData}
                                dataPerPage={numberOfPages}
                                getData={allRequestList}
                                navigation={true}
                            />
                        </div>
                    </div>
                    <div className='col-4'>
                        <Rightside />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AllStaffRequest;