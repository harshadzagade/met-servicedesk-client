import React, { Fragment, useEffect, useState } from 'react';
import classes from './SubadminActivities.module.css';
import axios from 'axios';
import DataPerPage from '../../Components/UI/DataPerPage/DataPerPage';
import Sweetpagination from 'sweetpagination';

const SubadminActivities = () => {
    const id = localStorage.getItem('id');
    const [search, setSearch] = useState('');
    const [subadminActivities, setSubadminActivities] = useState([]);
    const [allSubadminActivities, setAllSubadminActivities] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());

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
        const getStaff = async () => {
            try {
                const activities = await axios.get(`http://localhost:8001/api/staff/admin/subadminactivities/${id}`);
                if (activities.data.activities.activities) {
                    setSubadminActivities(activities.data.activities.activities);
                    setAllSubadminActivities(activities.data.activities.activities);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getStaff();
    }, [id]);

    useEffect(() => {
        if (subadminActivities) {
            const result = subadminActivities.filter(activity => {
                if (activity.activity) {
                    return activity.activity.toLowerCase().match(search.toLowerCase());
                } else {
                    return null;
                }
            });
            setAllSubadminActivities(result);
        }
    }, [search, subadminActivities]);

    return (
        <Fragment>
            <div className={classes.allstaff}>
                <div className={classes.upper}>
                    <h2 className={classes.title}>Sub-Admin Activity List</h2>
                    <input type="text" className={classes.search} placeholder='Search here' onChange={(e) => setSearch(e.target.value)} />
                    <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
                </div>
                {
                    currentPageData.map((activity, key) => (
                        <div className={classes.flair} key={key}>
                            <div className={classes.activity}>
                                <span>{activity.activity}</span>
                                <div className={classes.date}>
                                    <span>{getActivityDate(activity.dateTime)}</span>
                                </div>
                            </div>
                        </div>
                    ))
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