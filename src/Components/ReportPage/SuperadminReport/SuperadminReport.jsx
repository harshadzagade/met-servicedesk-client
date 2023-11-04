import React, { useState, useEffect, Fragment } from 'react';
import classes from './SuperadminReport.module.css';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { useLocation, useNavigate } from 'react-router-dom';

const SuperadminReport = () => {
    const location = useLocation();
    const [reportList, setReportList] = useState([]);
    const navigate = useNavigate();
    const [allReportList, setAllReportList] = useState([]);
    const [staffDepartments, setStaffDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(location.state ? location.state.department : null);
    const [departmentStaff, setDepartmentStaff] = useState([]);
    const [searchType, setSearchType] = useState('Subject');
    const [searchText, setSearchText] = useState('');
    const [selectedStaff, setSelectedStaff] = useState(location.state ? location.state.staff : null);
    const [refresh, setRefresh] = useState(false);
    const [isNormalSearch, setIsNormalSearch] = useState(true);
    const [ticketType, setTicketType] = useState('allTicketTypes');
    const [openTicketTypeList, setOpenTicketTypeList] = useState(false);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [openCategoryList, setOpenCategoryList] = useState(false);
    const [priority, setPriority] = useState('');
    const [openPriorityList, setOpenPriorityList] = useState(false);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [csvFile, setCsvFile] = useState('');

    const sortedData = React.useMemo(() => { return [...reportList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) }, [reportList]);

    const convertDate = (stringDate) => {
        const validDateStr = new Date(stringDate).toDateString();
        const date = new Date(validDateStr);
        const timestamp = date.toISOString();
        return timestamp;
    };

    useEffect(() => {
        const getEntriesAsPerDate = async () => {
            const filteredData = sortedData.filter(report => {
                const date = new Date(report.createdAt);
                return date >= new Date(convertDate(fromDate)) && date <= new Date(convertDate(toDate));
            });
            setAllReportList(filteredData);
        };
        getEntriesAsPerDate();
    }, [fromDate, toDate, sortedData]);

    const handleFromDateChange = (e) => {
        setFromDate(e.target.value);
    };

    const handleToDateChange = (e) => {
        setToDate(e.target.value);
    };

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const departments = await axios.get(`/api/staff/departments`);
                setStaffDepartments(departments.data.departments);
            } catch (error) {
                console.log(error.message);
            }
        };
        getDepartments();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const categories = await axios.get(`/api/report/reportcategories/categories/${selectedDepartment}`);
                setCategories(categories.data.categories);
            } catch (error) {
                console.log(error.message);
            }
        };
        getCategories();
    }, [openCategoryList, selectedDepartment]);

    useEffect(() => {
        const getList = async () => {
            if (selectedStaff) {
                try {
                    if (selectedDepartment.length !== 0) {
                        switch (ticketType) {
                            case 'allTicketTypes':
                                const full = await axios.get(`/api/report/${selectedStaff}`);
                                setReportList(full.data.report);
                                break;

                            case 'requests':
                                const requests = await axios.get(`/api/report/request/${selectedStaff}`);
                                setReportList(requests.data.report);
                                break;

                            case 'complaints':
                                const complaints = await axios.get(`/api/report/complaint/${selectedStaff}`);
                                setReportList(complaints.data.report);
                                break;

                            default:
                                const defaultValue = await axios.get(`/api/report/${selectedStaff}`);
                                setReportList(defaultValue.data.report);
                                break;
                        }
                    }
                } catch (error) {
                    console.log(error.message);
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
                    const staff = await axios.get(`/api/staff/staffbydepartment/${selectedDepartment}`);
                    setDepartmentStaff(staff.data.staff);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getStaffByDepartment();
    }, [selectedDepartment, staffDepartments]);

    useEffect(() => {
        const getReportByCategory = async () => {
            try {
                if ((openCategoryList && category.length === 0) || (openCategoryList && category === 'allCategories')) {
                    setAllReportList(sortedData);
                } else {
                    const report = await axios.get(`/api/report/reportbycategory/${category}/${selectedStaff}`);
                    setAllReportList(report.data.report);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if (openCategoryList) {
            getReportByCategory();
        }
    }, [category, openCategoryList, sortedData, selectedStaff]);

    useEffect(() => {
        const getRequestByPriority = async () => {
            try {
                if ((openPriorityList && priority.length === 0) || (openPriorityList && priority === 'allPriorities')) {
                    setAllReportList(sortedData);
                } else {
                    const report = await axios.get(`/api/report/reportbypriority/${priority}/${selectedStaff}`);
                    setAllReportList(report.data.report);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if (openPriorityList) {
            getRequestByPriority();
        }
    }, [priority, openPriorityList, sortedData, selectedStaff]);

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
                sortedData.filter((a) => a.subject.toLowerCase().startsWith(searchText.toLowerCase())).map((data) => {
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
            setAllReportList(sortedData)
        }
    }, [searchText, sortedData, searchType]);

    useEffect(() => {
        const setCsvData = async () => {
            try {
                const csv = await axios.post('/api/report/reportcsv', { reportData: allReportList });
                setCsvFile(csv.data)
            } catch (error) {
                console.log(error.message);
            }
        };
        setCsvData();
    }, [allReportList]);

    const columns = ticketType === 'allTicketTypes' ?
        [
            {
                name: "Ticket Type",
                selector: (row) => (row.isRequest && 'Request') || (row.isComplaint && 'Concern'),
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
        navigate(`/reportdetails/${row.id}`, { state: { department: selectedDepartment, staff: selectedStaff } });
    };

    useEffect(() => {
        if (selectedStaff === null) {
            setReportList([]);
            setAllReportList([]);
        }
    }, [selectedDepartment, selectedStaff]);

    const handleDepartmentSelect = (e) => {
        setSelectedDepartment(e.target.value);
        setSelectedStaff(null);
    };

    return (
        <div>
            <div className={`${classes.basicSelection}`}>
                <div className={classes.h2}>
                    <div className='d-flex'>
                        <a href={`data:text/csv;charset=utf-8,${escape(csvFile)}`} download="report_data.csv" className={`${classes.generate} d-none d-sm-inline-block btn btn-sm  shadow-sm mb-2 ml-3`}>
                            <i className="fas fa-download fa-sm "></i>
                            Download Report
                        </a>
                    </div>
                </div>
                <div className={`${classes.departmentSelection}`}>
                    <div>Department:&nbsp;</div>
                    <select value={selectedDepartment} className={`${classes.dropdownSelect}`} onChange={handleDepartmentSelect}>
                        <option value='' hidden>Select</option>
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
                        <div>Engineer:&nbsp;</div>
                        <select value={selectedStaff} className={`${classes.dropdownSelect}`} onChange={(e) => setSelectedStaff(e.target.value)}>
                            <option value='' hidden>Select</option>
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
                    <div className={classes.searching}>
                        <div className={classes.dateNsearch}>
                            <div style={{ zIndex: 2 }}>
                                From:
                                <input type="date" className={classes.dateStyle} onChange={handleFromDateChange} />
                            </div>
                            <div style={{ zIndex: 2 }}>
                                To:
                                <input type="date" className={classes.dateStyle} onChange={handleToDateChange} />
                            </div>
                        </div>
                        {isNormalSearch && <input type="text" className={`${classes.searchInput}`} placeholder={`Search here`} onChange={(e) => setSearchText(e.target.value)} />}
                        {
                            openTicketTypeList &&
                            <select value={ticketType} className={`${classes.searchInput}`} name="ticket" required onChange={(e) => setTicketType(e.target.value)}>
                                <option value='' hidden>Select Your Ticket Type</option>
                                <option value='allTicketTypes'>All Ticket Types</option>
                                <option value='requests'>Requests</option>
                                <option value='complaints'>Concerns</option>
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
                            <div className="dropdown-menu dropdown-menu-right">
                                <div className="dropdown-item" onClick={() => setSearchType('Ticket Type')}>Ticket Type</div>
                                <div className="dropdown-item" onClick={() => setSearchType('Subject')}>Subject</div>
                                <div className="dropdown-item" onClick={() => setSearchType('Category')}>Category</div>
                                <div className="dropdown-item" onClick={() => setSearchType('Priority')}>Priority</div>
                            </div>
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