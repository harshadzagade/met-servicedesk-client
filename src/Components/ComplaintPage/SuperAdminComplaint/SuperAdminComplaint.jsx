import React, { useState } from 'react';
import classes from './SuperAdminComplaint.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { iswitch } from 'iswitch';
import SweetPagination from 'sweetpagination';

import axios from 'axios';
import DataPerPage from '../../UI/DataPerPage/DataPerPage';
import Swal from 'sweetalert2';


const SuperAdminComplaint = () => {
    const navigate = useNavigate();
    const [complaintList, setComplaintList] = useState([]);
    const [allComplaintList, setAllComplaintList] = useState(complaintList);
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
    const [searchType, setSearchType] = useState('Subject');
    const [searchText, setSearchText] = useState('');
    const [isNormalSearch, setIsNormalSearch] = useState(true);
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const [openDepartmentList, setOpenDepartmentList] = useState(false);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [openCategoryList, setOpenCategoryList] = useState(false);
    const [priority, setPriority] = useState('');
    const [openPriorityList, setOpenPriorityList] = useState(false);
    const [status, setStatus] = useState('');
    const [openStatusList, setOpenStatusList] = useState(false);

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await axios.get(`http://localhost:8001/api/complaint/complaintdepartments`);
            setDepartments(departments.data.departments);
        };
        getDepartments();
    }, [openDepartmentList]);

    useEffect(() => {
        const getCategories = async () => {
            const categories = await axios.get(`http://localhost:8001/api/complaint/complaintcategories`);
            setCategories(categories.data.categories);
        };
        getCategories();
    }, [openCategoryList]);


    useEffect(() => {
        const getList = async () => {
            const list = await axios.get(`http://localhost:8001/api/complaint/allcomplaints`);
            setComplaintList(list.data.complaints);
            console.log(list.data.complaints);
        };
        getList();
    }, []);



    useEffect(() => {
        const getRequestByDepartment = async () => {
            try {
                if ((openDepartmentList && department.length === 0) || (openDepartmentList && department === 'allDepartments')) {
                    setAllComplaintList(complaintList);
                } else {
                    const complaints = await axios.get(`http://localhost:8001/api/complaint/complaintsbydepartment/${department}`);
                    setAllComplaintList(complaints.data.complaints);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to fetch complaints'
                });
            }
        };
        if (openDepartmentList) {
            getRequestByDepartment();
        }
    }, [department, openDepartmentList, complaintList]);

    useEffect(() => {
        const getRequestByCategory = async () => {
            try {
                if ((openCategoryList && category.length === 0) || (openCategoryList && category === 'allCategories')) {
                    setAllComplaintList(complaintList);
                } else {
                    const complaints = await axios.get(`http://localhost:8001/api/complaint/complaintsbycategory/${category}`);
                    setAllComplaintList(complaints.data.complaints);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to fetch complaints'
                });
            }
        };
        if (openCategoryList) {
            getRequestByCategory();
        }
    }, [category, openCategoryList, complaintList]);

    useEffect(() => {
        const getRequestByPriority = async () => {
            try {
                if ((openPriorityList && priority.length === 0) || (openPriorityList && priority === 'allPriorities')) {
                    setAllComplaintList(complaintList);
                } else {
                    const complaints = await axios.get(`http://localhost:8001/api/complaint/complaintsbypriority/${priority}`);
                    setAllComplaintList(complaints.data.complaints);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to fetch complaints'
                });
            }
        };
        if (openPriorityList) {
            getRequestByPriority();
        }
    }, [priority, openPriorityList, complaintList]);

    useEffect(() => {
        const getRequestByStatus = async () => {
            try {
                if ((openStatusList && status.length === 0) || (openStatusList && status === 'allStatus')) {
                    setAllComplaintList(complaintList);
                } else {
                    const complaints = await axios.get(`http://localhost:8001/api/complaint/complaintsbystatus/${status}`);
                    setAllComplaintList(complaints.data.complaints);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to fetch complaints'
                });
            }
        };
        if (openStatusList) {
            getRequestByStatus();
        }
    }, [status, openStatusList, complaintList]);


    useEffect(() => {
        let arr = [];
        switch (searchType) {
            case 'Subject':
                setOpenDepartmentList(false);
                setOpenCategoryList(false);
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
                setOpenDepartmentList(false);
                setOpenCategoryList(false);
                setOpenPriorityList(false);
                setOpenStatusList(false);
                setIsNormalSearch(true);
                complaintList.filter((a) => a.name.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'Department':
                setOpenDepartmentList(true);
                setOpenCategoryList(false);
                setOpenPriorityList(false);
                setOpenStatusList(false);
                setIsNormalSearch(false);
                break;

            case 'Category':
                setOpenDepartmentList(false);
                setOpenCategoryList(true);
                setOpenPriorityList(false);
                setOpenStatusList(false);
                setIsNormalSearch(false);
                break;

            case 'Priority':
                setOpenDepartmentList(false);
                setOpenCategoryList(false);
                setOpenPriorityList(true);
                setOpenStatusList(false);
                setIsNormalSearch(false);
                break;

            case 'Status':
                setOpenDepartmentList(false);
                setOpenCategoryList(false);
                setOpenPriorityList(false);
                setOpenStatusList(true);
                setIsNormalSearch(false);
                complaintList.filter((a) => a.status.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;



            default:
                break;
        }
        if (searchText.length !== 0) {
            setAllComplaintList(arr);
        } else {
            setAllComplaintList(complaintList)
        }
    }, [searchText, complaintList, searchType]);

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
        <main>
            <div className={classes.superadmincomplaint}>
            <div className={`${classes.mainTitle}`}>
                    <h1 className="tik-type-title">Complaint</h1>
                </div>
                {isNormalSearch && <input type="text" className={`${classes.searchInput}`} placeholder={`Please search ${searchType}`} onChange={(e) => setSearchText(e.target.value)} />}
                {
                    openDepartmentList &&
                    <select value={department} className={`${classes.optionSearchBox}`} name="departments" required onChange={(e) => setDepartment(e.target.value)}>
                        <option value='' hidden>Select Your Department</option>
                        <option value={'allDepartments'}>All Departments</option>
                        {
                            departments.map((department, key) => (
                                <option key={key} value={department}>{department}</option>
                            ))
                        }
                    </select>
                }
                {
                    openCategoryList &&
                    <select value={category} className={`${classes.optionSearchBox}`} name="categories" required onChange={(e) => setCategory(e.target.value)}>
                        <option value='' hidden>Select Your Category</option>
                        <option value={'allCategories'}>All Categories</option>
                        {
                            categories.map((category, key) => (
                                <option key={key} value={category}>{category}</option>
                            ))
                        }
                    </select>
                }
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
                <div className="btn-group mb-1">
                    <button type="button" className={`${classes.searchButton} dropdown-toggle`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {searchType}
                    </button>
                    <div className="dropdown-menu">
                        <div className="dropdown-item" onClick={() => setSearchType('Subject')}>Subject</div>
                        <div className="dropdown-item" onClick={() => setSearchType('Name')}>Name</div>
                        <div className="dropdown-item" onClick={() => setSearchType('Department')}>Department</div>
                        <div className="dropdown-item" onClick={() => setSearchType('Category')}>Category</div>
                        <div className="dropdown-item" onClick={() => setSearchType('Priority')}>Priority</div>
                        <div className="dropdown-item" onClick={() => setSearchType('Status')}>Status</div>
                    </div>
                    <div className={classes.datapage} >
                        <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
                    </div>
                </div>

           

                <div className={`${classes.filterButtons}`}>
                    <button className={`${classes.button}`} data-filter="all" >All</button>
                </div>

                <div className={`${classes.complaint} `}>
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

                                    <p className={`${classes.tikPri} `} style={{ background: iswitch(complaint.priority, ['high', () => 'red'], ['moderate', () => '#F78D1E'], ['low', () => 'green']) }}>
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
        </main>
    )

}

export default SuperAdminComplaint



