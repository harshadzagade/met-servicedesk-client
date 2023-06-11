import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import classes from './AllStaffRequest.module.css';
import RequestDetails from '../RequestDetails/RequestDetails';
import DataPerPage from '../../../UI/DataPerPage/DataPerPage';
import Sweetpagination from 'sweetpagination';

const AllStaffRequest = () => {
    const [staffRequestList, setStaffRequestList] = useState([]);
    const [allStaffRequestList, setAllStaffRequestList] = useState(staffRequestList);
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
    const [searchType, setSearchType] = useState('Subject');
    const [searchText, setSearchText] = useState('');
    const [openDetails, setOpenDetails] = useState(false);
    const [detailsId, setDetailsId] = useState(null);

    useEffect(() => {
        const getList = async () => {
            const list = await axios.get(`http://localhost:8001/api/request/allrequests`);
            setStaffRequestList(list.data.requests);
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
        let arr = [];
        switch (searchType) {
            case 'Subject':
                staffRequestList.filter((a) => a.subject.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'Name':
                staffRequestList.filter((a) => a.name.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'Department':
                staffRequestList.filter((a) => a.department.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'Category':
                staffRequestList.filter((a) => a.category.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'Priority':
                staffRequestList.filter((a) => a.priority.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'Status':
                staffRequestList.filter((a) => a.status.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'HOD Approval':
                console.log('Not made it yet');
                break;

            case 'Admin Approval':
                console.log('Not made it yet');
                break;

            default:
                break;
        }
        if (searchText.length !== 0) {
            setAllStaffRequestList(arr);
        } else {
            setAllStaffRequestList(staffRequestList)
        }
    }, [searchText, staffRequestList, searchType]);

    return (
        <Fragment>
            {openDetails && <RequestDetails onConfirm={handleDetailsCancel} id={detailsId} />}
            <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
            <input type="text" className={`${classes.searchInput}`} placeholder={`Please search ${searchType}`} onChange={(e) => setSearchText(e.target.value)} />
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
                allStaffRequestList.length > 0 ?
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
                                            <td className={`${classes.tableData}`} data-label="approval1">{field.approval1 === 1 ? 'approved' : 'not approved'}</td>
                                            <td className={`${classes.tableData}`} data-label="approval2">{field.approval2 === 1 ? 'approved' : 'not approved'}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <Sweetpagination
                            currentPageData={setCurrentPageData}
                            dataPerPage={numberOfPages}
                            getData={allStaffRequestList}
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