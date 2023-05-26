import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
// import SingleStaff from './SingleStaff/SingleStaff';
import classes from './AllStaffList.module.css';
// import SmallSingleStaff from './SmallSingleStaff/SmallSingleStaff';
import { useNavigate } from 'react-router-dom';
import SweetPagination from 'sweetpagination';

const AllStaffList = () => {
    const id = localStorage.getItem('id');
    const navigate = useNavigate();
    const [staffList, setStaffList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchType, setSearchType] = useState('firstname');

    const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
    const [numberOfPages, setNumberOfPages] = useState(10);

    useEffect(() => {
        const getList = async () => {
            const list = await axios.get(`http://localhost:8001/api/staff/superadmin/allstaff/${id}`);
            setStaffList(list.data.totalStaff);
        };
        getList();
    }, [id]);

    // useEffect(() => {
    //     let arr = [];
    //     staffList.filter((a) => a.email.startsWith(searchText)).map((data) => {
    //         return (
    //             arr.push(data)
    //         );
    //     });
    //     setStaffList(arr);
    // }, [searchText]);

    return (
        <Fragment>
            {
                staffList.length > 2 &&
                <Fragment>
                    <label className={`${classes.dropdown}`}>
                        Show Rows
                        <div className={`${classes.ddButton}`}>
                            {numberOfPages}
                        </div>
                        <input type="checkbox" className={`${classes.ddInput}`} id="test" />
                        <ul className={`${classes.ddMenu}`}>
                            <li onClick={() => setNumberOfPages(10)}>10</li>
                            <li onClick={() => setNumberOfPages(20)}>20</li>
                            <li onClick={() => setNumberOfPages(30)}>30</li>
                        </ul>
                    </label>
                    <div className='mt-3'>
                        <input type="text" className={`${classes.searchInput}`} onChange={(e) => setSearchText(e.target.value)} />
                        <div className="btn-group mb-1">
                            <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {searchType}
                            </button>
                            <div className="dropdown-menu">
                                <div className="dropdown-item" onClick={() => setSearchType('firstname')}>Firstname</div>
                                <div className="dropdown-item" onClick={() => setSearchType('lastname')}>Lastname</div>
                                <div className="dropdown-item" onClick={() => setSearchType('email')}>E-Mail</div>
                                <div className="dropdown-item" onClick={() => setSearchType('role')}>Role</div>
                                <div className="dropdown-item" onClick={() => setSearchType('department')}>Department</div>
                            </div>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr className={`bg-secondary`}>
                                <th scope="col">Name</th>
                                <th scope="col">E-Mail</th>
                                <th scope="col">Role</th>
                                <th scope="col">Department</th>
                            </tr>
                        </thead>

                        {
                            searchType === 'firstname' && (
                                <tbody>
                                    {currentPageData.length > 0 && currentPageData.filter((a) => a.firstname.toLowerCase().startsWith(searchText)).map((field) => (
                                        <tr className={`${classes.tableField}`} key={field.id} onClick={() => navigate(`/superadmin/${field.id}`)}>
                                            <td data-label="name">{field.firstname + ' ' + field.lastname}</td>
                                            <td data-label="email">{field.email}</td>
                                            <td data-label="role">{field.role}</td>
                                            <td data-label="department">{field.department}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            )
                        }
                        {
                            searchType === 'lastname' && (
                                <tbody>
                                    {currentPageData.length > 0 && currentPageData.filter((a) => a.lastname.toLowerCase().startsWith(searchText)).map((field) => (
                                        <tr className={`${classes.tableField}`} key={field.id} onClick={() => navigate(`/superadmin/${field.id}`)}>
                                            <td data-label="name">{field.firstname + ' ' + field.lastname}</td>
                                            <td data-label="email">{field.email}</td>
                                            <td data-label="role">{field.role}</td>
                                            <td data-label="department">{field.department}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            )
                        }
                        {
                            searchType === 'email' && (
                                <tbody>
                                    {currentPageData.length > 0 && currentPageData.filter((a) => a.email.toLowerCase().startsWith(searchText)).map((field) => (
                                        <tr className={`${classes.tableField}`} key={field.id} onClick={() => navigate(`/superadmin/${field.id}`)}>
                                            <td data-label="name">{field.firstname + ' ' + field.lastname}</td>
                                            <td data-label="email">{field.email}</td>
                                            <td data-label="role">{field.role}</td>
                                            <td data-label="department">{field.department}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            )
                        }
                        {
                            searchType === 'role' && (
                                <tbody>
                                    {currentPageData.length > 0 && currentPageData.filter((a) => a.role.toLowerCase().startsWith(searchText)).map((field) => (
                                        <tr className={`${classes.tableField}`} key={field.id} onClick={() => navigate(`/superadmin/${field.id}`)}>
                                            <td data-label="name">{field.firstname + ' ' + field.lastname}</td>
                                            <td data-label="email">{field.email}</td>
                                            <td data-label="role">{field.role}</td>
                                            <td data-label="department">{field.department}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            )
                        }
                        {
                            searchType === 'department' && (
                                <tbody>
                                    {currentPageData.length > 0 && currentPageData.filter((a) => a.department.toLowerCase().startsWith(searchText)).map((field) => (
                                        <tr className={`${classes.tableField}`} key={field.id} onClick={() => navigate(`/superadmin/${field.id}`)}>
                                            <td data-label="name">{field.firstname + ' ' + field.lastname}</td>
                                            <td data-label="email">{field.email}</td>
                                            <td data-label="role">{field.role}</td>
                                            <td data-label="department">{field.department}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            )
                        }
                    </table>

                    <SweetPagination
                        currentPageData={setCurrentPageData}
                        dataPerPage={numberOfPages}
                        getData={staffList}
                        navigation={true}
                    />
                </Fragment>
            }
        </Fragment>
    );
};

export default AllStaffList;