import React, { Fragment, useEffect, useState } from 'react';
import DataPerPage from '../../Components/UI/DataPerPage/DataPerPage';
import classes from './Report.module.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import Sweetpagination from 'sweetpagination';
import ReportDetails from './ReportDetails/ReportDetails';

const Report = () => {
    const [reportList, setReportList] = useState([]);
    const [allReportList, setAllReportList] = useState([]);
    const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
    const [staffDepartments, setStaffDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [departmentStaff, setDepartmentStaff] = useState([]);
    const [searchType, setSearchType] = useState('Subject');
    const [searchText, setSearchText] = useState('');
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);
    const [detailsId, setDetailsId] = useState(null);
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [refresh, setRefresh] = useState(false);
    const [isNormalSearch, setIsNormalSearch] = useState(true);
    const [ticketType, setTicketType] = useState('allTicketTypes');
    const [openTicketTypeList, setOpenTicketTypeList] = useState(false);
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const [openDepartmentList, setOpenDepartmentList] = useState(false);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [openCategoryList, setOpenCategoryList] = useState(false);
    const [priority, setPriority] = useState('');
    const [openPriorityList, setOpenPriorityList] = useState(false);

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await axios.get(`http://localhost:8001/api/staff/departments`);
            setStaffDepartments(departments.data.departments);
        };
        getDepartments();
    }, []);

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await axios.get(`http://localhost:8001/api/report/reportdepartments/departments`);
            setDepartments(departments.data.departments);
        };
        getDepartments();
    }, [openDepartmentList]);

    useEffect(() => {
        const getCategories = async () => {
            const categories = await axios.get(`http://localhost:8001/api/report/reportcategories/categories`);
            setCategories(categories.data.categories);
        };
        getCategories();
    }, [openCategoryList]);

    useEffect(() => {
        const getList = async () => {
            if (selectedStaff) {
                try {
                    if (selectedDepartment.length !== 0) {
                        switch (ticketType) {
                            case 'allTicketTypes':
                                const full = await axios.get(`http://localhost:8001/api/report/${selectedStaff}`);
                                setReportList(full.data.report);
                                break;

                            case 'requests':
                                const requests = await axios.get(`http://localhost:8001/api/report/request/${selectedStaff}`);
                                setReportList(requests.data.report);
                                break;

                            case 'complaints':
                                const complaints = await axios.get(`http://localhost:8001/api/report/complaint/${selectedStaff}`);
                                setReportList(complaints.data.report);
                                break;

                            default:
                                const defaultValue = await axios.get(`http://localhost:8001/api/report/${selectedStaff}`);
                                setReportList(defaultValue.data.report);
                                break;
                        }
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: `${error.response.data.message}`,
                        text: 'Unable to fetch requests'
                    });
                }
            }
        };
        getList();
        setRefresh(false);
    }, [selectedStaff, refresh, ticketType, selectedDepartment]);

    useEffect(() => {
        const getStaffByDepartment = async () => {
            try {
                if (selectedDepartment.length !== 0) {
                    const staff = await axios.get(`http://localhost:8001/api/staff/staffbydepartment/${selectedDepartment}`);
                    setDepartmentStaff(staff.data.staff);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Please enter valid credentials'
                });
            }
        };
        getStaffByDepartment();
    }, [selectedDepartment, staffDepartments]);

    useEffect(() => {
        const getRequestByDepartment = async () => {
            try {
                if ((openDepartmentList && department.length === 0) || (openDepartmentList && department === 'allDepartments')) {
                    setAllReportList(reportList);
                } else {
                    const report = await axios.get(`http://localhost:8001/api/report/reportbydepartment/${department}`);
                    setAllReportList(report.data.report);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Please enter valid credentials'
                });
            }
        };
        if (openDepartmentList) {
            getRequestByDepartment();
        }
    }, [department, openDepartmentList, reportList]);

    useEffect(() => {
        const getRequestByCategory = async () => {
            try {
                if ((openCategoryList && category.length === 0) || (openCategoryList && category === 'allCategories')) {
                    setAllReportList(reportList);
                } else {
                    const report = await axios.get(`http://localhost:8001/api/report/reportbycategory/${category}`);
                    setAllReportList(report.data.report);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Please enter valid credentials'
                });
            }
        };
        if (openCategoryList) {
            getRequestByCategory();
        }
    }, [category, openCategoryList, reportList]);

    useEffect(() => {
        const getRequestByPriority = async () => {
            try {
                if ((openPriorityList && priority.length === 0) || (openPriorityList && priority === 'allPriorities')) {
                    setAllReportList(reportList);
                } else {
                    const report = await axios.get(`http://localhost:8001/api/report/reportbypriority/${priority}`);
                    setAllReportList(report.data.report);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Please enter valid credentials'
                });
            }
        };
        if (openPriorityList) {
            getRequestByPriority();
        }
    }, [priority, openPriorityList, reportList]);

    const checkOpenDetails = (value, id) => {
        setOpenDetails(value);
        setDetailsId(id);
    };

    const handleDetailsCancel = () => {
        setOpenDetails(false);
    };

    useEffect(() => {
        let arr = [];
        switch (searchType) {
            case 'Ticket Type':
                setOpenTicketTypeList(true);
                setOpenCategoryList(false);
                setOpenPriorityList(false);
                setOpenDepartmentList(false);
                setIsNormalSearch(false);
                break;

            case 'Subject':
                setOpenTicketTypeList(false);
                setOpenCategoryList(false);
                setOpenPriorityList(false);
                setOpenDepartmentList(false);
                setIsNormalSearch(true);
                reportList.filter((a) => a.subject.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'Category':
                setOpenTicketTypeList(false);
                setOpenCategoryList(true);
                setOpenPriorityList(false);
                setOpenDepartmentList(false);
                setIsNormalSearch(false);
                break;

            case 'Priority':
                setOpenTicketTypeList(false);
                setOpenCategoryList(false);
                setOpenPriorityList(true);
                setOpenDepartmentList(false);
                setIsNormalSearch(false);
                break;

            case 'Department':
                setOpenTicketTypeList(false);
                setOpenCategoryList(false);
                setOpenPriorityList(false);
                setOpenDepartmentList(true);
                setIsNormalSearch(false);
                break;

            default:
                break;
        }
        if (searchText.length !== 0) {
            setAllReportList(arr);
        } else {
            setAllReportList(reportList)
        }
    }, [searchText, reportList, searchType]);

    return (
        <Fragment>
            {openDetails && <ReportDetails onConfirm={handleDetailsCancel} id={detailsId} />}
            <div className={`${classes.basicSelection}`}>
                <div className={`${classes.departmentSelection}`}>
                    <div>Department:&nbsp;</div>
                    <select className={`${classes.dropdownSelect}`} onChange={(e) => setSelectedDepartment(e.target.value)}>
                        <option value='' hidden>Select department</option>
                        {
                            staffDepartments.map((department, key) => (
                                <option key={key} value={department}>{department}</option>
                            ))
                        }
                    </select>
                </div>
                {
                    departmentStaff.length !== 0 &&
                    <div className={`${classes.staffSelection}`}>
                        <div>Staff:&nbsp;</div>
                        <select className={`${classes.dropdownSelect}`} onChange={(e) => setSelectedStaff(e.target.value)}>
                            <option value='' hidden>Select staff</option>
                            {
                                departmentStaff.map((staff, key) => (
                                    <option key={key} value={staff.id}>{staff.firstname + ' ' + staff.lastname}</option>
                                ))
                            }
                        </select>
                    </div>
                }
            </div>
            {
                selectedStaff &&
                <Fragment>
                    {isNormalSearch && <input type="text" className={`${classes.searchInput}`} placeholder={`Please search ${searchType}`} onChange={(e) => setSearchText(e.target.value)} />}
                    {
                        openTicketTypeList &&
                        <select value={ticketType} className={`${classes.optionSearchBox}`} name="ticket" required onChange={(e) => setTicketType(e.target.value)}>
                            <option value='' hidden>Select Your Ticket Type</option>
                            <option value='allTicketTypes'>All Ticket Types</option>
                            <option value='requests'>Requests</option>
                            <option value='complaints'>Complaints</option>
                        </select>
                    }
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
                    <div className="btn-group mb-1">
                        <button type="button" className={`${classes.searchButton} dropdown-toggle`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {searchType}
                        </button>
                        <div className="dropdown-menu">
                            <div className="dropdown-item" onClick={() => setSearchType('Ticket Type')}>Ticket Type</div>
                            <div className="dropdown-item" onClick={() => setSearchType('Subject')}>Subject</div>
                            <div className="dropdown-item" onClick={() => setSearchType('Category')}>Category</div>
                            <div className="dropdown-item" onClick={() => setSearchType('Priority')}>Priority</div>
                            <div className="dropdown-item" onClick={() => setSearchType('Department')}>Department</div>
                        </div>
                    </div>
                </Fragment>
            }
            {
                allReportList.length > 0 ?
                    <Fragment>
                        <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
                        <table className={`${classes.tableParent}`}>
                            <thead className={`${classes.tableHeader}`}>
                                <tr className={`${classes.tableRow}`}>
                                    {ticketType === 'allTicketTypes' && <th className={`${classes.tableHead}`} scope="col">Ticket Type</th>}
                                    <th className={`${classes.tableHead}`} scope="col">Subject</th>
                                    <th className={`${classes.tableHead}`} scope="col">Category</th>
                                    <th className={`${classes.tableHead}`} scope="col">Priority</th>
                                    <th className={`${classes.tableHead}`} scope="col">Department</th>
                                </tr>
                            </thead>
                            <tbody className={`${classes.tableBody}`}>
                                {
                                    currentPageData.length > 0 && currentPageData.map((field) => (
                                        <tr className={`${classes.tableField} ${classes.tableRow}`} key={field.id} onClick={() => checkOpenDetails(true, field.id)}>
                                            {ticketType === 'allTicketTypes' && <td className={`${classes.tableData}`}>{(field.isRequest && 'Request') || (field.isComplaint && 'Complaint')}</td>}
                                            <td className={`${classes.tableData}`}>{field.subject}</td>
                                            <td className={`${classes.tableData}`}>{field.category}</td>
                                            <td className={`${classes.tableData}`}>{field.priority}</td>
                                            <td className={`${classes.tableData}`}>{field.department}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <Sweetpagination
                            currentPageData={setCurrentPageData}
                            dataPerPage={numberOfPages}
                            getData={allReportList}
                            navigation={true}
                        />

                    </Fragment>
                    :
                    <div className={`${classes.noData}`}>No reports available</div>
            }
        </Fragment>
    );
};

export default Report;