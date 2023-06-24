import React, { useState, useEffect, Fragment } from 'react';
import classes from './SuperadminReport.module.css';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const SuperadminReport = () => {
    const [reportList, setReportList] = useState([]);
    const navigate = useNavigate();
    const [allReportList, setAllReportList] = useState([]);
    const [staffDepartments, setStaffDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [departmentStaff, setDepartmentStaff] = useState([]);
    const [searchType, setSearchType] = useState('Subject');
    const [searchText, setSearchText] = useState('');
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [isNormalSearch, setIsNormalSearch] = useState(true);
    const [ticketType, setTicketType] = useState('allTicketTypes');
    const [openTicketTypeList, setOpenTicketTypeList] = useState(false);
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
                        text: 'Unable to fetch report'
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
                    text: 'Unable to fetch staff'
                });
            }
        };
        getStaffByDepartment();
    }, [selectedDepartment, staffDepartments]);

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
                    text: 'Unable to fetch report'
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
                    text: 'Unable to fetch report'
                });
            }
        };
        if (openPriorityList) {
            getRequestByPriority();
        }
    }, [priority, openPriorityList, reportList]);

    useEffect(() => {
        let arr = [];
        switch (searchType) {
            case 'Ticket Type':
                setOpenTicketTypeList(true);
                setOpenCategoryList(false);
                setOpenPriorityList(false);
                setIsNormalSearch(false);
                break;

            case 'Subject':
                setOpenTicketTypeList(false);
                setOpenCategoryList(false);
                setOpenPriorityList(false);
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
                setIsNormalSearch(false);
                break;

            case 'Priority':
                setOpenTicketTypeList(false);
                setOpenCategoryList(false);
                setOpenPriorityList(true);
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

    const columns = ticketType === 'allTicketTypes' ?
        [
            {
                name: "Ticket Type",
                selector: (row) => (row.isRequest && 'Request') || (row.isComplaint && 'Complaint'),
                sortable: true,
            },
            {
                name: "Subject",
                selector: (row) => row.subject,
                sortable: true,
            },
            {
                name: "Category",
                selector: (row) => row.category,
            },
            {
                name: "Priority",
                selector: (row) => row.priority,
            }
        ]
        :
        [
            {
                name: "Subject",
                selector: (row) => row.subject,
                sortable: true,
            },
            {
                name: "Category",
                selector: (row) => row.category,
            },
            {
                name: "Priority",
                selector: (row) => row.priority,
            }
        ]



    const handleRowClick = row => {
        navigate(`/reportdetails/${row.id}`);
    }
    return (
        <div>
            <div className={`${classes.basicSelection}`}>
                <h2 className={classes.h2}>Report</h2>
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
                        <select value={ticketType} className={`${classes.searchInput}`} name="ticket" required onChange={(e) => setTicketType(e.target.value)}>
                            <option value='' hidden>Select Your Ticket Type</option>
                            <option value='allTicketTypes'>All Ticket Types</option>
                            <option value='requests'>Requests</option>
                            <option value='complaints'>Complaints</option>
                        </select>
                    }
                    {
                        openCategoryList &&
                        <select value={category} className={`${classes.searchInput}`} name="categories" required onChange={(e) => setCategory(e.target.value)}>
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
                        <select value={priority} className={`${classes.searchInput}`} name="priorities" required onChange={(e) => setPriority(e.target.value)}>
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
                        </div>
                    </div>
                </Fragment>
            }
            <DataTable
                columns={columns}
                data={allReportList}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='400px'
                selectableRows
                selectableRowsHighlight
                onRowClicked={handleRowClick}
                highlightOnHover
                subHeader

            />
        </div>
    );
};

export default SuperadminReport;