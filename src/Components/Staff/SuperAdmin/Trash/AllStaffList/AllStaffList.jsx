import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import classes from './AllStaffList.module.css';
import Sweetpagination from 'sweetpagination';
import DataPerPage from '../../../../UI/DataPerPage/DataPerPage';

const AllStaffList = () => {
    const navigate = useNavigate();
    const [staffList, setStaffList] = useState([]);
    const [allStaffList, setAllStaffList] = useState(staffList);
    const [searchText, setSearchText] = useState('');
    const [searchType, setSearchType] = useState('Firstname');
    const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [refresh, setRefresh] = useState(false);
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const [openDepartmentList, setOpenDepartmentList] = useState(false);

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await axios.get(`http://localhost:8001/api/staff/trashdepartments`);
            setDepartments(departments.data.departments);
        };
        getDepartments();
    }, [openDepartmentList]);

    useEffect(() => {
        const getList = async () => {
            try {
                const list = await axios.get(`http://localhost:8001/api/trash/`);
                setStaffList(list.data.allStaff);
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
    }, [refresh]);

    useEffect(() => {
        const getStaffByDepartment = async () => {
            try {
                if ((openDepartmentList && department.length === 0) || (openDepartmentList && department === 'allDepartments')) {
                    setAllStaffList(staffList);
                } else {
                    const staff = await axios.get(`http://localhost:8001/api/staff/trashstaffbydepartment/${department}`);
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

    const handleRestoreAllClick = () => {
        Swal.fire({
            title: 'Restore All Staff?',
            text: "All of your staff will be restored",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, restore it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:8001/api/trash/restoreall/');
                navigate('/', { state: { refreshSuperHome: true } });
                Swal.fire(
                    'Restored All Staff!',
                    'You have successfully restored all staff',
                    'success'
                )
            }
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: `${error.response.data.message}`,
                text: 'Unable to restore any staff'
            });
        });
    };

    const handleDeleteAllClick = () => {
        Swal.fire({
            title: 'Delete All Staff?',
            text: "All of your staff will be deleted permanently",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:8001/api/trash/removeall/');
                setRefresh(true);
                Swal.fire(
                    'Deleted All Staff!',
                    'You have successfully deleted all staff',
                    'success'
                )
            }
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: `${error.response.data.message}`,
                text: 'Unable to delete any staff'
            });
        });
    };

    return (
        <Fragment>
            {
                staffList.length > 0 ?
                    <div>
                        <div className={`${classes.trashButtons}`}>
                            <button className={`${classes.restoreAllButton}`} onClick={handleRestoreAllClick}>Restore All Staff</button>
                            <button className={`${classes.deleteAllButton}`} onClick={handleDeleteAllClick}>Delete All Staff</button>
                        </div>
                    </div>
                    :
                    <div className={`${classes.trashNoData}`}>No staff deleted</div>
            }
            <Fragment>
                <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
                <div className='mt-3'>
                    {!openDepartmentList && <input type="text" className={`${classes.searchInput}`} placeholder={`Please search ${searchType}`} onChange={(e) => setSearchText(e.target.value)} />}
                    {
                        openDepartmentList &&
                        <select value={department} className={`${classes.departmentSearchBox}`} name="departments" required onChange={(e) => setDepartment(e.target.value)}>
                            <option value='' hidden>Select Your Department</option>
                            <option value={'allDepartments'}>All Departments</option>
                            {
                                departments.map((department, key) => (
                                    <option key={key} value={department}>{department}</option>
                                ))
                            }
                        </select>
                    }
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
                                                <td className={`${classes.tableData}`} data-label="department" onClick={() => navigate(`/superadmin/${field.id}`)}>{field.department.toString()}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                            <Sweetpagination
                                currentPageData={setCurrentPageData}
                                dataPerPage={numberOfPages}
                                getData={allStaffList}
                                navigation={true}
                            />

                        </Fragment>
                        :
                        <div className={`${classes.noData}`}>No staff deleted</div>
                }
            </Fragment>
        </Fragment>
    );
};

export default AllStaffList;