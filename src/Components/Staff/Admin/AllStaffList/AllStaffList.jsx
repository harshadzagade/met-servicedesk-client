import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import classes from './AllStaffList.module.css';
import { useNavigate } from 'react-router-dom';
import SweetPagination from 'sweetpagination';
import Swal from 'sweetalert2';
import DataPerPage from '../../../UI/DataPerPage/DataPerPage';
import AdminContext from '../../../../Context/AdminContext/AdminContext';

const AllStaffList = () => {
    const navigate = useNavigate();
    const id = localStorage.getItem('id');
    const adminCtx = useContext(AdminContext);
    const [staffList, setStaffList] = useState([]);
    const [allStaffList, setAllStaffList] = useState(staffList);
    const [searchText, setSearchText] = useState('');
    const [searchType, setSearchType] = useState('Firstname');
    const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [errorMessage, setErrorMessage] = useState('');
    const [role, setRole] = useState('');
    const [openRoleList, setOpenRoleList] = useState(false);
    console.log(allStaffList);

    useEffect(() => {
        const getList = async () => {
            try {
                const list = await axios.get(`http://localhost:8001/api/staff/admin/allstaff/${id}/${adminCtx.department}`);
                if (list.data.totalStaff.length === 0) {
                    setErrorMessage('No staff available')
                }
                setStaffList(list.data.totalStaff);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to fetch staff'
                });
            }
        };
        if (adminCtx.department) {
            getList();
        } else {
            setErrorMessage('Please select department')
        }
    }, [id, adminCtx.department]);

    useEffect(() => {
        const getStaffByRole = async () => {
            try {
                if ((openRoleList && role.length === 0) || (openRoleList && role === 'allRoles')) {
                    setAllStaffList(staffList);
                } else {
                    const staff = await axios.get(`http://localhost:8001/api/staff/admin/staffbyrole/${adminCtx.department}/${role}`);
                    setAllStaffList(staff.data.staff);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to fetch staff'
                });
            }
        };
        if (openRoleList) {
            getStaffByRole();
        }
    }, [adminCtx.department, role, openRoleList, staffList]);

    useEffect(() => {
        let arr = [];
        switch (searchType) {
            case 'Firstname':
                setOpenRoleList(false);
                staffList.filter((a) => a.firstname.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'Lastname':
                setOpenRoleList(false);
                staffList.filter((a) => a.lastname.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'E-Mail':
                setOpenRoleList(false);
                staffList.filter((a) => a.email.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'Role':
                setOpenRoleList(true);
                break;

            default:
                setOpenRoleList(false);
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
            {!openRoleList && <input type="text" className={`${classes.searchInput}`} placeholder={`Please search ${searchType}`} onChange={(e) => setSearchText(e.target.value)} />}
                {
                    openRoleList &&
                    <select value={role} className={`${classes.optionSearchBox}`} name="roles" required onChange={(e) => setRole(e.target.value)}>
                        <option value='' hidden>Select Role</option>
                        <option value='allRoles'>All Roles</option>
                        <option value='technician'>Technician</option>
                        <option value='user'>User</option>
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
                                </tr>
                            </thead>
                            <tbody className={`${classes.tableBody}`}>
                                {
                                    currentPageData.length > 0 && currentPageData.map((field) => (
                                        <tr className={`${classes.tableField} ${classes.tableRow}`} key={field.id} onClick={() => navigate(`/admin/${field.id}`)}>
                                            <td className={`${classes.tableData}`} data-label="name">{field.firstname + ' ' + field.lastname}</td>
                                            <td className={`${classes.tableData}`} data-label="email">{field.email}</td>
                                            <td className={`${classes.tableData}`} data-label="role">{field.role}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <SweetPagination
                            currentPageData={setCurrentPageData}
                            dataPerPage={numberOfPages}
                            getData={allStaffList}
                            navigation={true}
                        />

                    </Fragment>
                    :
                    <div className={`${classes.noData}`}>{errorMessage}</div>
            }
        </Fragment>
    );
};

export default AllStaffList;