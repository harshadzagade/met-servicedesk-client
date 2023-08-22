import React, { useState, useEffect } from 'react';
import classes from './SuperAdminComplaint.module.css';
import { useNavigate } from 'react-router-dom';
import { iswitch } from 'iswitch';
import SweetPagination from 'sweetpagination';
import axios from 'axios';
import DataPerPage from '../../UI/DataPerPage/DataPerPage';
import Rightside from '../../Righside/Rightside';
import openSocket from 'socket.io-client';

const SuperAdminComplaint = () => {
    const navigate = useNavigate();
    const [complaintList, setComplaintList] = useState([]);
    const [allComplaintList, setAllComplaintList] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
    const [searchText, setSearchText] = useState('');

    const sortedData = React.useMemo(() => { return [...complaintList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) }, [complaintList]);

    useEffect(() => {
        const socket = openSocket('');
        const getList = async () => {
            try {
                const list = await axios.get(`/api/complaint/allcomplaints`);
                setComplaintList(list.data.complaints);
                setAllComplaintList(list.data.complaints);
            } catch (error) {
                console.log(error.message);
            }
        };
        getList();
        socket.on('complaints', () => {
            console.log('hola');
            getList();
        });
    }, []);

    useEffect(() => {
        const getStaff = async () => {
            try {
                if (searchText) {
                    const complaint = await axios.get(`/api/complaint/searchallcomplaints/${searchText}`);
                    setAllComplaintList(complaint.data);
                } else {
                    setAllComplaintList(sortedData);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getStaff();
    }, [searchText, sortedData]);

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
    }

    return (
        <main >
            <div className="container-fluid">
                <div className={`${classes.superadmincomplaint} row`}>
                    <div className="col-12 col-md-8 p-0">
                        <div className={`${classes.mainTitle}`}>
                            <h2>Concern</h2>
                        </div>
                        <div className={classes.search}>
                            <div className={classes.searchfiltering}>
                                <input
                                    type="text"
                                    className={`${classes.searchInput}`}
                                    placeholder={`Search here`}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                            </div>
                            <div className={`${classes.datapage}`}>
                                <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
                            </div>
                        </div>
                        <div className={`${classes.complaint} `}>
                            {
                                currentPageData.map((complaint) => (
                                    <div key={complaint.id} className={`${classes.tikInfo}`} onClick={() => navigate(`/concerndetails/${complaint.id}`)} >
                                        <div className={`${classes.tikHead}`}>
                                            <h3 className={`${classes.tikTitle}`}>
                                                {complaint.subject}
                                            </h3>
                                            <span className={`${classes.date}`}>
                                                {getCreatedComplaintDate(complaint.createdAt)}
                                            </span>
                                        </div>
                                        <div className={`${classes.tikMsg}`}>
                                            <span dangerouslySetInnerHTML={{ __html: complaint.description }}></span>
                                        </div>
                                        <div className={`${classes.tikOther}`}>
                                            <p className={`${classes.tikId}`} >
                                                {complaint.ticketId}
                                            </p>
                                            <p className={`${classes.tikId} `} style={{ background: iswitch(complaint.priority, ['high', () => '#E70000'], ['moderate', () => '#FFBF00'], ['low', () => '#90EE90']) }}>
                                                {complaint.priority}
                                            </p>
                                            <p className={`${classes.tikId}`} style={{ background: iswitch(complaint.status, ['pending', () => '#FF6000'], ['forwarded', () => '#9681EB'], ['attending', () => ' #30D5C8'], ['assigned', () => '#008080'], ['closed', () => '#ADE792']) }}>
                                                {complaint.status}
                                            </p>
                                            <p className={`${classes.tikAssigned}`}>
                                                {complaint.assignedName ? 'Assigned to ' + complaint.assignedName : 'Not assigned yet'}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                            <SweetPagination currentPageData={setCurrentPageData} dataPerPage={numberOfPages} getData={allComplaintList} navigation={true} />
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mt-4 mt-md-0">
                        {/* Sidebar Component */}
                        <Rightside />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SuperAdminComplaint;



