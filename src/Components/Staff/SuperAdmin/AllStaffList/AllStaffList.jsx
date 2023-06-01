import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import classes from './AllStaffList.module.css';
import { useNavigate } from 'react-router-dom';
import SweetPagination from 'sweetpagination';
import Swal from 'sweetalert2';
import DataPerPage from '../../../UI/DataPerPage/DataPerPage';

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
                staffList.length > 0 ?
                <Fragment>
                    <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
                    <table className={`${classes.tableParent}`}>
                        <thead className={`${classes.tableHeader}`}>
                            <tr className={`${classes.tableRow}`}>
                                <th className={`${classes.tableHead}`} scope="col">Name</th>
                                <th className={`${classes.tableHead}`} scope="col">E-Mail</th>
                                <th className={`${classes.tableHead}`} scope="col">Role</th>
                                <th className={`${classes.tableHead}`} scope="col">Department</th>
                            </tr>
                        </thead>
                        <tbody className={`${classes.tableBody}`}>
                            {
                                currentPageData.length > 0 && currentPageData.map((field) => (
                                    <tr className={`${classes.tableField} ${classes.tableRow}`} key={field.id}>
                                        <td className={`${classes.tableData}`} data-label="name" onClick={() => navigate(`/superadmin/${field.id}`)}>{field.firstname + ' ' + field.lastname}</td>
                                        <td className={`${classes.tableData}`} data-label="email" onClick={() => navigate(`/superadmin/${field.id}`)}>{field.email}</td>
                                        <td className={`${classes.tableData}`} data-label="role" onClick={() => navigate(`/superadmin/${field.id}`)}>{field.role}</td>
                                        <td className={`${classes.tableData}`} data-label="department" onClick={() => navigate(`/superadmin/${field.id}`)}>{field.department}</td>
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
                :
                <div className={`${classes.homeNoData}`}>No staff added</div>
            }
        </Fragment>
    );
};

export default AllStaffList;