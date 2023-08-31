import React, { Fragment, useContext, useEffect, useState } from 'react';
import classes from './SubadminActivities.module.css';
import axios from 'axios';
import DataPerPage from '../../Components/UI/DataPerPage/DataPerPage';
import Sweetpagination from 'sweetpagination';
import getItemWithExpiry from '../../Utils/expiryFunction';
import openSocket from 'socket.io-client';
import { useNavigate } from 'react-router';
import AdminContext from '../../Components/Context/AdminContext/AdminContext';

const SubadminActivities = () => {
    const id = getItemWithExpiry('id');
    const adminCtx = useContext(AdminContext);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [subadminActivities, setSubadminActivities] = useState([]);
    const [allSubadminActivities, setAllSubadminActivities] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());

    const sortedData = React.useMemo(() => {
        if (!Array.isArray(subadminActivities)) {
            console.error('subadminActivities is not an array');
            return [];
        }
        if (subadminActivities.some(activity => !activity.dateTime)) {
            console.error('Some activities are missing the dateTime property');
            return [];
        }
        return [...subadminActivities].sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
    }, [subadminActivities]);

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

    useEffect(() => {
        const socket = openSocket('')
        const getActivities = async () => {
            try {
                const activities = await axios.get(`/api/staff/admin/subadminactivities/${id}/${adminCtx.department}`);
                if (activities.data.activities) {
                    setSubadminActivities(activities.data.activities.activities);
                    setAllSubadminActivities(activities.data.activities.activities);
                } else {
                    setSubadminActivities([]);
                    setAllSubadminActivities([]);
                }
            } catch (error) {
                if (error.response.status === 401) {
                    setSubadminActivities([]);
                    setAllSubadminActivities([]);
                } else {
                    console.log(error.message);
                }
            }
        };
        getActivities();
        socket.on('subadminactivities', () => {
            getActivities();
        });
    }, [id, adminCtx]);

    useEffect(() => {
        if (sortedData) {
            const result = sortedData.filter(activity => {
                if (activity.activity) {
                    return activity.activity.toLowerCase().match(search.toLowerCase());
                } else {
                    return null;
                }
            });
            setAllSubadminActivities(result);
        }
    }, [search, sortedData]);

    const handleActivityClick = (activity) => {
        if (activity.data.type === 'role') {
            navigate(`/adminstaffdetails/${activity.data.id}`);
            sessionStorage.setItem('tab', 'home');
        } else if (activity.data.type === 'request') {
            navigate(`/adminrequestdetails/${activity.data.id}`)
            sessionStorage.setItem('tab', 'request');
        }
    };

    return (
        <Fragment>
            <div className={classes.allstaff}>
                <div className={classes.upper}>
                    <h2 className={classes.title}>Sub-Admin Activity List</h2>
                    <input type="text" className={classes.search} placeholder='Search here' onChange={(e) => setSearch(e.target.value)} />
                    <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
                </div>
                {
                    allSubadminActivities !== null ?
                        <Fragment>
                            {
                                currentPageData.map((activity, key) => (
                                    <div className={classes.flair} key={key} onClick={() => handleActivityClick(activity)}>
                                        <div className={classes.activity}>
                                            <span>{activity.activity}</span>
                                            <div className={classes.date}>
                                                <span>{getActivityDate(activity.dateTime)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </Fragment>
                        :
                        <div>No subadmin activities available</div>
                }
                <Sweetpagination
                    currentPageData={setCurrentPageData}
                    dataPerPage={numberOfPages}
                    getData={allSubadminActivities}
                    navigation={true}
                />
            </div>
        </Fragment>
    );
};

export default SubadminActivities;