import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import SingleStaff from './SingleStaff/SingleStaff';
import classes from './AllStaffList.module.css';
import SmallSingleStaff from './SmallSingleStaff/SmallSingleStaff';
import { useNavigate } from 'react-router-dom';
import SweetPagination from 'sweetpagination';

const AllStaffList = () => {
    const id = localStorage.getItem('id');
    const navigate = useNavigate();
    const [staffList, setStaffList] = useState([]);

    const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
    const [numberOfPages, setNumberOfPages] = useState(10);

    useEffect(() => {
        const getList = async () => {
            const list = await axios.get(`http://localhost:8001/api/staff/superadmin/allstaff/${id}`);
            setStaffList(list.data.totalStaff);
        };
        getList();
    }, [id]);
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
                    <table>
                        <thead>
                            <tr className={`bg-secondary`}>
                                <th scope="col">Name</th>
                                <th scope="col">E-Mail</th>
                                <th scope="col">Role</th>
                                <th scope="col">Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentPageData.length > 0 && currentPageData.map((field) => (
                                    <tr className={`${classes.tableField}`} key={field.id} onClick={() => navigate(`/superadmin/${field.id}`)}>
                                        <td data-label="name">{field.firstname + ' ' + field.lastname}</td>
                                        <td data-label="email">{field.email}</td>
                                        <td data-label="role">{field.role}</td>
                                        <td data-label="department">{field.department}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
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