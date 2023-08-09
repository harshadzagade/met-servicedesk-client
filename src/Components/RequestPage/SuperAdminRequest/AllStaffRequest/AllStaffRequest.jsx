import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import classes from './AllStaffRequest.module.css';
import RequestDetails from '../RequestDetails/RequestDetails';
import DataPerPage from '../../../UI/DataPerPage/DataPerPage';
import Sweetpagination from 'sweetpagination';
import Swal from 'sweetalert2';

const AllStaffRequest = () => {
    const [requestList, setRequestList] = useState([]);
    const [allRequestList, setAllRequestList] = useState(requestList);
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
    const [searchType, setSearchType] = useState('Subject');
    const [searchText, setSearchText] = useState('');
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
    const [hodApproval, setHodApproval] = useState('');
    const [openHodApprovalList, setOpenHodApprovalList] = useState(false);
    const [adminApproval, setAdminApproval] = useState('');
    const [openAdminApprovalList, setOpenAdminApprovalList] = useState(false);

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await axios.get(`http://localhost:8001/api/request/requestdepartments`);
            setDepartments(departments.data.departments);
        };
        getDepartments();
    }, [openDepartmentList]);

    useEffect(() => {
        const getCategories = async () => {
            const categories = await axios.get(`http://localhost:8001/api/request/requestcategories`);
            setCategories(categories.data.categories);
        };
        getCategories();
    }, [openCategoryList]);

    useEffect(() => {
        const getList = async () => {
            try {
                const list = await axios.get(`http://localhost:8001/api/request/allrequests`);
                setRequestList(list.data.requests);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to fetch requests'
                });
            }
        };
        getList();
    }, []);

    const checkOpenDetails = (value, id) => {
        setOpenDetails(value);
        setDetailsId(id);
    };

    const handleDetailsCancel = () => {
        setOpenDetails(false);
    };

    useEffect(() => {
        const getRequestByDepartment = async () => {
            try {
                if ((openDepartmentList && department.length === 0) || (openDepartmentList && department === 'allDepartments')) {
                    setAllRequestList(requestList);
                } else {
                    const requests = await axios.get(`http://localhost:8001/api/request/requestsbydepartment/${department}`);
                    setAllRequestList(requests.data.requests);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to fetch requests'
                });
            }
        };
        if (openDepartmentList) {
            getRequestByDepartment();
        }
    }, [department, openDepartmentList, requestList]);

    useEffect(() => {
        const getRequestByCategory = async () => {
            try {
                if ((openCategoryList && category.length === 0) || (openCategoryList && category === 'allCategories')) {
                    setAllRequestList(requestList);
                } else {
                    const requests = await axios.get(`http://localhost:8001/api/request/requestsbycategory/${category}`);
                    setAllRequestList(requests.data.requests);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to fetch requests'
                });
            }
        };
        if (openCategoryList) {
            getRequestByCategory();
        }
    }, [category, openCategoryList, requestList]);

    useEffect(() => {
        const getRequestByPriority = async () => {
            try {
                if ((openPriorityList && priority.length === 0) || (openPriorityList && priority === 'allPriorities')) {
                    setAllRequestList(requestList);
                } else {
                    const requests = await axios.get(`http://localhost:8001/api/request/requestsbypriority/${priority}`);
                    setAllRequestList(requests.data.requests);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to fetch requests'
                });
            }
        };
        if (openPriorityList) {
            getRequestByPriority();
        }
    }, [priority, openPriorityList, requestList]);

    useEffect(() => {
        const getRequestByStatus = async () => {
            try {
                if ((openStatusList && status.length === 0) || (openStatusList && status === 'allStatus')) {
                    setAllRequestList(requestList);
                } else {
                    const requests = await axios.get(`http://localhost:8001/api/request/requestsbystatus/${status}`);
                    setAllRequestList(requests.data.requests);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to fetch requests'
                });
            }
        };
        if (openStatusList) {
            getRequestByStatus();
        }
    }, [status, openStatusList, requestList]);

    useEffect(() => {
        const getRequestByHodApproval = async () => {
            try {
                if ((openHodApprovalList && hodApproval.length === 0) || (openHodApprovalList && hodApproval === 'allHodApprovals')) {
                    setAllRequestList(requestList);
                } else {
                    const requests = await axios.get(`http://localhost:8001/api/request/requestsbyapproval1/${hodApproval}`);
                    setAllRequestList(requests.data.requests);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to fetch requests'
                });
            }
        };
        if (openHodApprovalList) {
            getRequestByHodApproval();
        }
    }, [hodApproval, openHodApprovalList, requestList]);

    useEffect(() => {
        const getRequestByAdminApproval = async () => {
            try {
                if ((openAdminApprovalList && adminApproval.length === 0) || (openAdminApprovalList && adminApproval === 'allAdminApprovals')) {
                    setAllRequestList(requestList);
                } else {
                    const requests = await axios.get(`http://localhost:8001/api/request/requestsbyapproval2/${adminApproval}`);
                    setAllRequestList(requests.data.requests);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to fetch requests'
                });
            }
        };
        if (openAdminApprovalList) {
            getRequestByAdminApproval();
        }
    }, [adminApproval, openAdminApprovalList, requestList]);

    useEffect(() => {
        let arr = [];
        switch (searchType) {
            case 'Subject':
                setOpenDepartmentList(false);
                setOpenCategoryList(false);
                setOpenPriorityList(false);
                setOpenStatusList(false);
                setOpenHodApprovalList(false);
                setOpenAdminApprovalList(false);
                setIsNormalSearch(true);
                requestList.filter((a) => a.subject.startsWith(searchText)).map((data) => {
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
                setOpenHodApprovalList(false);
                setOpenAdminApprovalList(false);
                setIsNormalSearch(true);
                requestList.filter((a) => a.name.startsWith(searchText)).map((data) => {
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
                setOpenHodApprovalList(false);
                setOpenAdminApprovalList(false);
                setIsNormalSearch(false);
                break;

            case 'Category':
                setOpenDepartmentList(false);
                setOpenCategoryList(true);
                setOpenPriorityList(false);
                setOpenStatusList(false);
                setOpenHodApprovalList(false);
                setOpenAdminApprovalList(false);
                setIsNormalSearch(false);
                break;

            case 'Priority':
                setOpenDepartmentList(false);
                setOpenCategoryList(false);
                setOpenPriorityList(true);
                setOpenStatusList(false);
                setOpenHodApprovalList(false);
                setOpenAdminApprovalList(false);
                setIsNormalSearch(false);
                break;

            case 'Status':
                setOpenDepartmentList(false);
                setOpenCategoryList(false);
                setOpenPriorityList(false);
                setOpenStatusList(true);
                setOpenHodApprovalList(false);
                setOpenAdminApprovalList(false);
                setIsNormalSearch(false);
                requestList.filter((a) => a.status.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'HOD Approval':
                setOpenDepartmentList(false);
                setOpenCategoryList(false);
                setOpenPriorityList(false);
                setOpenStatusList(false);
                setOpenHodApprovalList(true);
                setOpenAdminApprovalList(false);
                setIsNormalSearch(false);
                break;

            case 'Admin Approval':
                setOpenDepartmentList(false);
                setOpenCategoryList(false);
                setOpenPriorityList(false);
                setOpenStatusList(false);
                setOpenHodApprovalList(false);
                setOpenAdminApprovalList(true);
                setIsNormalSearch(false);
                break;

            default:
                break;
        }
        if (searchText.length !== 0) {
            setAllRequestList(arr);
        } else {
            setAllRequestList(requestList)
        }
    }, [searchText, requestList, searchType]);

    return (
        <Fragment>
            {openDetails && <RequestDetails onConfirm={handleDetailsCancel} id={detailsId} />}
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
            {
                openHodApprovalList &&
                <select value={hodApproval} className={`${classes.optionSearchBox}`} name="hod" required onChange={(e) => setHodApproval(e.target.value)}>
                    <option value='' hidden>Select Your Approval</option>
                    <option value='allHodApprovals'>All HOD Approvals</option>
                    <option value={0}>Not Updated</option>
                    <option value={1}>Approved</option>
                    <option value={2}>Disapproved</option>
                </select>
            }
            {
                openAdminApprovalList &&
                <select value={adminApproval} className={`${classes.optionSearchBox}`} name="admin" required onChange={(e) => setAdminApproval(e.target.value)}>
                    <option value='' hidden>Select Your Approval</option>
                    <option value='allAdminApprovals'>All Admin Approvals</option>
                    <option value={0}>Not Updated</option>
                    <option value={1}>Approved</option>
                    <option value={2}>Disapproved</option>
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
                    <div className="dropdown-item" onClick={() => setSearchType('HOD Approval')}>HOD Approval</div>
                    <div className="dropdown-item" onClick={() => setSearchType('Admin Approval')}>Admin Approval</div>
                </div>
            </div>
            {
                allRequestList.length > 0 ?
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
                                    <th className={`${classes.tableHead}`} scope="col">HOD Approval</th>
                                    <th className={`${classes.tableHead}`} scope="col">Admin Approval</th>
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
                                            <td className={`${classes.tableData}`} data-label="approval1">{(field.approval1 === 1 && 'approved') || (field.approval1 === 2 && 'disapproved') || (field.approval1 === null && 'not updated')}</td>
                                            <td className={`${classes.tableData}`} data-label="approval2">{(field.approval2 === 1 && 'approved') || (field.approval2 === 2 && 'disapproved') || (field.approval2 === null && 'not updated')}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <Sweetpagination
                            currentPageData={setCurrentPageData}
                            dataPerPage={numberOfPages}
                            getData={allRequestList}
                            navigation={true}
                        />

                    </Fragment>
                    :
                    <div className={`${classes.noData}`}>No request initiated</div>
            }
        </Fragment>
    );
};

export default AllStaffRequest;