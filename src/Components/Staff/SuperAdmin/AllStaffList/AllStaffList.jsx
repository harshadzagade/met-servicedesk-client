import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import classes from './AllStaffList.module.css';
import { useNavigate } from 'react-router-dom';
import SweetPagination from 'sweetpagination';
import Swal from 'sweetalert2';
import DataPerPage from '../../../UI/DataPerPage/DataPerPage';
import CustomCheckbox from '../../../UI/Checkbox/CustomCheckbox';

const AllStaffList = () => {
    const id = localStorage.getItem('id');
    const navigate = useNavigate();
    const [staffList, setStaffList] = useState([]);
    const [allStaffList, setAllStaffList] = useState(staffList);
    const [searchText, setSearchText] = useState('');
    const [searchType, setSearchType] = useState('Firstname');
    const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [refresh, setRefresh] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState([]);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const [openDepartmentList, setOpenDepartmentList] = useState(false);

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await axios.get(`http://localhost:8001/api/staff/departments`);
            setDepartments(departments.data.departments);
        };
        getDepartments();
    }, [openDepartmentList]);

    useEffect(() => {
        if (selectedStaff.length !== 0) {
            setShowDeleteButton(true);
        } else {
            setShowDeleteButton(false);
        }
    }, [selectedStaff]);

    const handleCheckboxChange = (event, staff) => {
        const isChecked = event.target.checked;
        setSelectedStaff(prevSelectedItems => {
            if (isChecked) {
                return [...prevSelectedItems, staff];
            } else {
                return prevSelectedItems.filter(id => id !== staff);
            }
        });
    };

    const handleMultipleDelete = async () => {
        Swal.fire({
            title: 'Delete Staff?',
            text: "Your staff will be moved to archive",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                if (selectedStaff.length !== 0) {
                    axios.delete('http://localhost:8001/api/staff/superadmin/deletemultiple', { data: selectedStaff });
                    setRefresh(true);
                }
                Swal.fire(
                    'Staff Deleted!',
                    'You have deleted staff successfully',
                    'success'
                )
            }
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: `${error.response.data.message}`,
                text: 'Unable to delete staff'
            });
        });
    };

    useEffect(() => {
        const getList = async () => {
            try {
                const list = await axios.get(`http://localhost:8001/api/staff/superadmin/allstaff/${id}`);
                setStaffList(list.data.totalStaff);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to fetch staff'
                });
            }
        };
        getList();
        setRefresh(false);
    }, [id, refresh]);

    useEffect(() => {
        const getStaffByDepartment = async () => {
            try {
                if ((openDepartmentList && department.length === 0) || (openDepartmentList && department === 'allDepartments')) {
                    setAllStaffList(staffList);
                } else {
                    const staff = await axios.get(`http://localhost:8001/api/staff/staffbydepartment/${department}`);
                    setAllStaffList(staff.data.staff);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Please enter valid credentials'
                });
            }
        };
        if (openDepartmentList) {
            getStaffByDepartment();
        }
    }, [department, openDepartmentList, staffList]);

    useEffect(() => {
        let arr = [];
        switch (searchType) {
            case 'Firstname':
                setOpenDepartmentList(false);
                staffList.filter((a) => a.firstname.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'Lastname':
                setOpenDepartmentList(false);
                staffList.filter((a) => a.lastname.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'E-Mail':
                setOpenDepartmentList(false);
                staffList.filter((a) => a.email.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'Role':
                setOpenDepartmentList(false);
                staffList.filter((a) => a.role.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'Department':
                setOpenDepartmentList(true);
                break;

            default:
                setOpenDepartmentList(false);
                break;
        }
        if (searchText.length !== 0) {
            setAllStaffList(arr);
        } else {
            setAllStaffList(staffList)
        }
    }, [searchText, staffList, searchType]);

    return (
        <Fragment>
            <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
            <div className='mt-3'>
                {!openDepartmentList && <input type="text" className={`${classes.searchInput}`} placeholder={`Please search ${searchType}`} onChange={(e) => setSearchText(e.target.value)} />}
                {openDepartmentList && <select value={department} className={`${classes.departmentSearchBox}`} name="departments" required onChange={(e) => setDepartment(e.target.value)}>
                    <option value='' hidden>Select Your Department</option>
                    <option value={'allDepartments'}>All Departments</option>
                    {
                        departments.map((department, key) => (
                            <option key={key} value={department}>{department}</option>
                        ))
                    }
                </select>}
                <div className="btn-group mb-1">
                    <button type="button" className={`${classes.searchButton} dropdown-toggle`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {searchType}
                    </button>
                    <div className="dropdown-menu">
                        <div className="dropdown-item" onClick={() => setSearchType('Firstname')}>Firstname</div>
                        <div className="dropdown-item" onClick={() => setSearchType('Lastname')}>Lastname</div>
                        <div className="dropdown-item" onClick={() => setSearchType('E-Mail')}>E-Mail</div>
                        <div className="dropdown-item" onClick={() => setSearchType('Role')}>Role</div>
                        <div className="dropdown-item" onClick={() => setSearchType('Department')}>Department</div>
                    </div>
                </div>
            </div>
            {
                allStaffList.length > 0 ?
                    <Fragment>
                        <table className={`${classes.tableParent}`}>
                            <thead className={`${classes.tableHeader}`}>
                                <tr className={`${classes.tableRow}`}>
                                    <th className={`${classes.tableHead}`} scope="col">Select Staff</th>
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
                                            <td>
                                                <CustomCheckbox
                                                    checked={selectedStaff.includes(field)}
                                                    onChange={event => handleCheckboxChange(event, field)}
                                                />
                                            </td>
                                            <td className={`${classes.tableData}`} data-label="name" onClick={() => navigate(`/superadmin/${field.id}`)}>{field.firstname + ' ' + field.lastname}</td>
                                            <td className={`${classes.tableData}`} data-label="email" onClick={() => navigate(`/superadmin/${field.id}`)}>{field.email}</td>
                                            <td className={`${classes.tableData}`} data-label="role" onClick={() => navigate(`/superadmin/${field.id}`)}>{field.role}</td>
                                            <td className={`${classes.tableData}`} data-label="department" onClick={() => navigate(`/superadmin/${field.id}`)}>{field.department.toString()}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        {showDeleteButton && <button className={`btn btn-danger ${classes.multiDeleteButton}`} onClick={handleMultipleDelete}>Delete Rows</button>}

                        <SweetPagination
                            currentPageData={setCurrentPageData}
                            dataPerPage={numberOfPages}
                            getData={allStaffList}
                            navigation={true}
                        />

                    </Fragment>
                    :
                    <div className={`${classes.noData}`}>No staff added</div>
            }
        </Fragment>
    );
};

export default AllStaffList;