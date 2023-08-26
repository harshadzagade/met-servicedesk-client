import React, { Fragment, useEffect, useState } from 'react';
import classes from './TechnicianReport.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import getItemWithExpiry from '../../../Utils/expiryFunction';

const TechnicianReport = () => {
    const id = getItemWithExpiry('id');
    const [reportList, setReportList] = useState([]);
    const navigate = useNavigate();
    const [allReportList, setAllReportList] = useState([]);
    const [searchType, setSearchType] = useState('Subject');
    const [searchText, setSearchText] = useState('');
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

    useEffect(() => {
        const getCategories = async () => {
            const categories = await axios.get(`http://localhost:8001/api/report/reportcategories/categories`);
            setCategories(categories.data.categories);
        };
        getCategories();
    }, [openCategoryList]);

    useEffect(() => {
        const getList = async () => {
            if (id) {
                try {
                    switch (ticketType) {
                        case 'allTicketTypes':
                            const full = await axios.get(`http://localhost:8001/api/report/${id}`);
                            setReportList(full.data.report);
                            break;

                        case 'requests':
                            const requests = await axios.get(`http://localhost:8001/api/report/request/${id}`);
                            setReportList(requests.data.report);
                            break;

                        case 'complaints':
                            const complaints = await axios.get(`http://localhost:8001/api/report/complaint/${id}`);
                            setReportList(complaints.data.report);
                            break;

                        default:
                            const defaultValue = await axios.get(`http://localhost:8001/api/report/${id}`);
                            setReportList(defaultValue.data.report);
                            break;
                    }
                } catch (error) {
                    console.log(error.message);
                }
            }
        };
        getList();
        setRefresh(false);
    }, [id, refresh, ticketType]);

    useEffect(() => {
        const getReportByCategory = async () => {
            try {
                if ((openCategoryList && category.length === 0) || (openCategoryList && category === 'allCategories')) {
                    setAllReportList(sortedData);
                } else {
                    const report = await axios.get(`http://localhost:8001/api/report/reportbycategory/${category}`);
                    setAllReportList(report.data.report);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if (openCategoryList) {
            getReportByCategory();
        }
    }, [category, openCategoryList, sortedData]);

    useEffect(() => {
        const getRequestByPriority = async () => {
            try {
                if ((openPriorityList && priority.length === 0) || (openPriorityList && priority === 'allPriorities')) {
                    setAllReportList(sortedData);
                } else {
                    const report = await axios.get(`http://localhost:8001/api/report/reportbypriority/${priority}`);
                    setAllReportList(report.data.report);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if (openPriorityList) {
            getRequestByPriority();
        }
    }, [priority, openPriorityList, sortedData]);

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
                const csv = await axios.post('http://localhost:8001/api/report/reportcsv', { reportData: allReportList });
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
        navigate(`/reportdetails/${row.id}`);
    };

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
        if (fromDate && toDate) {
            getEntriesAsPerDate();
        }
    }, [fromDate, toDate, sortedData]);

    const handleFromDateChange = (e) => {
        setFromDate(e.target.value);
    };

    const handleToDateChange = (e) => {
        setToDate(e.target.value);
    };
    return (
        <div className='mt-3'>
            <Fragment>
                <div className={classes.h2}>
                    <div className='d-flex'>
                        <h2>Report</h2>
                        <a href={`data:text/csv;charset=utf-8,${escape(csvFile)}`} download="report_data.csv" className={`${classes.generate} d-none d-sm-inline-block btn btn-sm  shadow-sm mb-2 ml-3`}>
                            <i className="fas fa-download fa-sm "></i>
                            Download Report
                        </a>
                    </div>
                </div>
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
                        <div className="dropdown-menu dropdown-menu-right">
                            <div className="dropdown-item" onClick={() => setSearchType('Ticket Type')}>Ticket Type</div>
                            <div className="dropdown-item" onClick={() => setSearchType('Subject')}>Subject</div>
                            <div className="dropdown-item" onClick={() => setSearchType('Category')}>Category</div>
                            <div className="dropdown-item" onClick={() => setSearchType('Priority')}>Priority</div>
                        </div>
                    </div>
                </div>
            </Fragment>
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

export default TechnicianReport;