import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import classes from './AllStaffComplaint.module.css';
import RequestDetails from '../ComplaintDetails/ComplaintDetails';
import DataPerPage from '../../../UI/DataPerPage/DataPerPage';
import Sweetpagination from 'sweetpagination';

const AllStaffComplaint = () => {
    const [staffComplaintList, setStaffComplaintList] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
    const [searchType, setSearchType] = useState('Subject');
    const [searchText, setSearchText] = useState('');
    const [allStaffComplaintList, setAllStaffComplaintList] = useState(staffComplaintList);
    const [openDetails, setOpenDetails] = useState(false);
    const [detailsId, setDetailsId] = useState(null);

    useEffect(() => {
        const getList = async () => {
            const list = await axios.get(`http://localhost:8001/api/complaint/allcomplaints`);
            setStaffComplaintList(list.data.complaints);
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
        let arr = [];
        switch (searchType) {
            case 'Subject':
                staffComplaintList.filter((a) => a.subject.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'Name':
                staffComplaintList.filter((a) => a.name.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'Department':
                staffComplaintList.filter((a) => a.department.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'Category':
                staffComplaintList.filter((a) => a.category.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'Priority':
                staffComplaintList.filter((a) => a.priority.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'Status':
                staffComplaintList.filter((a) => a.status.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            default:
                break;
        }
        if (searchText.length !== 0) {
            setAllStaffComplaintList(arr);
        } else {
            setAllStaffComplaintList(staffComplaintList)
        }
    }, [searchText, staffComplaintList, searchType]);

    return (
        <Fragment>
            {openDetails && <RequestDetails onConfirm={handleUpdateCancel} id={detailsId} />}
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
                </div>
            </div>
            {
                allStaffComplaintList.length > 0 ?
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
                            getData={allStaffComplaintList}
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