import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import SingleStaff from './SingleStaff/SingleStaff';
import classes from './AllStaffList.module.css';
import SmallSingleStaff from './SmallSingleStaff/SmallSingleStaff';
import { useNavigate } from 'react-router-dom';
import SweetPagination from 'sweetpagination';
import Swal from 'sweetalert2';

const AllStaffList = () => {
    const id = localStorage.getItem('id');
    const navigate = useNavigate();
    const [staffList, setStaffList] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    console.log(selectedData);

    const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [showAlert, setShowAlert] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (selectedData.length === 0) {
            setShowAlert(false);
        } else {
            setShowAlert(true);
        }
    }, [selectedData])

    useEffect(() => {
        const getList = async () => {
            const list = await axios.get(`http://localhost:8001/api/staff/superadmin/allstaff/${id}`);
            setStaffList(list.data.totalStaff);
        };
        getList();
        setRefresh(false);
    }, [id, refresh]);

    const handleParentCheckboxChange = (e) => {
        if (e.target.checked) {
            setSelectedData(staffList);
        } else {
            setSelectedData([]);
        }
    };

    const handleChildCheckboxChange = (e, field) => {
        if (e.target.checked) {
            setSelectedData(prevData => [...prevData, field]);
        } else {
            let arr = [];
            for (let index = 0; index < selectedData.length; index++) {
                const element = selectedData[index];
                if (element.id !== field.id) {
                    arr.push(element);
                }
            }
            setSelectedData(arr);
        }
    };

    const handleMultipleDelete = async () => {
        try {
            if (selectedData.length !== 0) {
                await axios.delete('http://localhost:8001/api/staff/superadmin/deletemultiple', { data: selectedData });
                setRefresh(true);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `${error.response.data.message}`,
                text: 'Please enter valid credentials'
            });
        }
    };

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
                    {showAlert && <div class="alert alert-danger" role="alert">Want to delete elements?&nbsp;<button className='btn btn-danger' onClick={handleMultipleDelete}>Delete</button></div>}
                    <div className={`${classes.tableParent}`}>
                        <table>
                            <thead>
                                <tr className={`${classes.tableHeadingRow}`}>
                                    <th scope="col"><input type="checkbox" className={`${classes.parentCheckbox}`} onChange={handleParentCheckboxChange} /></th>
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
                                            <td data-label="checkbox"><input type="checkbox" className={`${classes.childCheckbox}`} id='childCheckbox' onChange={(e) => handleChildCheckboxChange(e, field)} />{/* <label htmlFor='childCheckbox' className={`${classes.childCheckboxStyling}`}>-</label> */}</td>
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