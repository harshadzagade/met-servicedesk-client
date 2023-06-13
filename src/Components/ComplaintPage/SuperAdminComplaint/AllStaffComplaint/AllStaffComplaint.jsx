import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import classes from './AllStaffComplaint.module.css';
import RequestDetails from '../ComplaintDetails/ComplaintDetails';
import DataPerPage from '../../../UI/DataPerPage/DataPerPage';
import Sweetpagination from 'sweetpagination';
import Swal from 'sweetalert2';

const AllStaffComplaint = () => {
    const [complaintList, setComplaintList] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
    const [searchType, setSearchType] = useState('Subject');
    const [searchText, setSearchText] = useState('');
    const [allComplaintList, setAllComplaintList] = useState(complaintList);
    const [openDetails, setOpenDetails] = useState(false);
    const [detailsId, setDetailsId] = useState(null);
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
            try {
                const list = await axios.get(`http://localhost:8001/api/complaint/allcomplaints`);
                setComplaintList(list.data.complaints);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to fetch complaints'
                });
            }
        };
        getList();
    }, []);

    const checkOpenDetails = (value, id) => {
        setOpenDetails(value);
        setDetailsId(id);
    };

    const handleUpdateCancel = () => {
        setOpenDetails(false);
    };

    useEffect(() => {
        const getComplaintByDepartment = async () => {
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
            getComplaintByDepartment();
        }
    }, [department, openDepartmentList, complaintList]);

    useEffect(() => {
        const getComplaintByCategory = async () => {
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
            getComplaintByCategory();
        }
    }, [category, openCategoryList, complaintList]);

    useEffect(() => {
        const getComplaintByPriority = async () => {
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
            getComplaintByPriority();
        }
    }, [priority, openPriorityList, complaintList]);

    useEffect(() => {
        const getComplaintByStatus = async () => {
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
            getComplaintByStatus();
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

    return (
        <Fragment>
            {openDetails && <RequestDetails onConfirm={handleUpdateCancel} id={detailsId} />}
            <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
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
            </div>
            {
                allComplaintList.length > 0 ?
                    <Fragment>
                        <table className={`${classes.tableParent}`}>
                            <thead className={`${classes.tableHeader}`}>
                                <tr className={`${classes.tableRow}`}>
                                    <th className={`${classes.tableHead}`} scope="col">Subject</th>
                                    <th className={`${classes.tableHead}`} scope="col">Name</th>
                                    <th className={`${classes.tableHead}`} scope="col">Department</th>
                                    <th className={`${classes.tableHead}`} scope="col">Category</th>
                                    <th className={`${classes.tableHead}`} scope="col">Priority</th>
                                    <th className={`${classes.tableHead}`} scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody className={`${classes.tableBody}`}>
                                {
                                    currentPageData.length > 0 && currentPageData.map((field) => (
                                        <tr className={`${classes.tableField} ${classes.tableRow}`} key={field.id} onClick={() => checkOpenDetails(true, field.id)}>
                                            <td className={`${classes.tableData}`} data-label="subject">{field.subject}</td>
                                            <td className={`${classes.tableData}`} data-label="name">{field.name}</td>
                                            <td className={`${classes.tableData}`} data-label="department">{field.department}</td>
                                            <td className={`${classes.tableData}`} data-label="category">{field.category}</td>
                                            <td className={`${classes.tableData}`} data-label="priority">{field.priority}</td>
                                            <td className={`${classes.tableData}`} data-label="status">{field.status}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <Sweetpagination
                            currentPageData={setCurrentPageData}
                            dataPerPage={numberOfPages}
                            getData={allComplaintList}
                            navigation={true}
                        />

                    </Fragment>
                    :
                    <div className={`${classes.noData}`}>No complaint initiated</div>
            }
        </Fragment>
    );
};

export default AllStaffComplaint;