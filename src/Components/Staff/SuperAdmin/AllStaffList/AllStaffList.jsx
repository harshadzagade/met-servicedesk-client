import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import classes from './AllStaffList.module.css';
import { useNavigate } from 'react-router-dom';
import SweetPagination from 'sweetpagination';
import Swal from 'sweetalert2';

const AllStaffList = () => {
    const id = localStorage.getItem('id');
    const navigate = useNavigate();
    const [staffList, setStaffList] = useState([]);

    const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const getList = async () => {
            try {
                const list = await axios.get(`http://localhost:8001/api/staff/superadmin/allstaff/${id}`);
                setStaffList(list.data.totalStaff);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Please enter valid credentials'
                });
            }
        };
        getList();
        setRefresh(false);
    }, [id, refresh]);

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
                    <div className={`${classes.tableParent}`}>
                        <table>
                            <thead>
                                <tr className={`${classes.tableHeadingRow}`}>
                                    <th scope="col">Name</th>
                                    <th scope="col">E-Mail</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Department</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentPageData.length > 0 && currentPageData.map((field) => (
                                        <tr className={`${classes.tableField}`} key={field.id}>
                                            <td data-label="name" onClick={() => navigate(`/superadmin/${field.id}`)}>{field.firstname + ' ' + field.lastname}</td>
                                            <td data-label="email" onClick={() => navigate(`/superadmin/${field.id}`)}>{field.email}</td>
                                            <td data-label="role" onClick={() => navigate(`/superadmin/${field.id}`)}>{field.role}</td>
                                            <td data-label="department" onClick={() => navigate(`/superadmin/${field.id}`)}>{field.department}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

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