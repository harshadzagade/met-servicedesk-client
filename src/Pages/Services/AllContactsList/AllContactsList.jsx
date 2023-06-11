import React, { Fragment, useEffect, useState } from 'react';
import classes from './AllContactsList.module.css';
import axios from 'axios';
import DataPerPage from '../../../Components/UI/DataPerPage/DataPerPage';
import Sweetpagination from 'sweetpagination';
import Swal from 'sweetalert2';

const AllContactsList = () => {
    const id = localStorage.getItem('id');
    const [contactsList, setContactsList] = useState([]);
    const [allContactsList, setAllContactsList] = useState(contactsList);
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
    const [searchType, setSearchType] = useState('Firstname');
    const [searchText, setSearchText] = useState('');
    const [showPhone, setShowPhone] = useState(false);
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
        if (contactsList.length > 0) {
            if (Object.hasOwn(contactsList[0], 'phoneNumber')) {
                setShowPhone(true);
            } else {
                setShowPhone(false);
            }
        }
    }, [contactsList]);

    useEffect(() => {
        const getList = async () => {
            const list = await axios.get(`http://localhost:8001/api/staff/contacts/${id}`);
            setContactsList(list.data.contacts);
        };
        getList();
    }, [id]);

    useEffect(() => {
        const getStaffByDepartment = async () => {
            try {
                if ((openDepartmentList && department.length === 0) || (openDepartmentList && department === 'allDepartments')) {
                    setAllContactsList(contactsList);
                } else {
                    const staff = await axios.get(`http://localhost:8001/api/staff/staffbydepartment/${department}`);
                    setAllContactsList(staff.data.staff);
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
    }, [department, openDepartmentList, contactsList]);

    useEffect(() => {
        let arr = [];
        switch (searchType) {
            case 'Firstname':
                setOpenDepartmentList(false);
                contactsList.filter((a) => a.firstname.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'Lastname':
                setOpenDepartmentList(false);
                contactsList.filter((a) => a.lastname.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'Department':
                setOpenDepartmentList(true);
                break;

            case 'Phone Number':
                setOpenDepartmentList(false);
                contactsList.filter((a) => a.phoneNumber.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;


            case 'Contact Extension':
                setOpenDepartmentList(false);
                contactsList.filter((a) => a.contactExtension.toString().startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            default:
                setOpenDepartmentList(false);
                break;
        }
        if (searchText.length !== 0) {
            setAllContactsList(arr);
        } else {
            setAllContactsList(contactsList)
        }
    }, [searchText, contactsList, searchType]);

    return (
        <Fragment>
            <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
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
                    <div className="dropdown-item" onClick={() => setSearchType('Department')}>Department</div>
                    {showPhone && <div className="dropdown-item" onClick={() => setSearchType('Phone Number')}>Phone Number</div>}
                    <div className="dropdown-item" onClick={() => setSearchType('Contact Extension')}>Contact Extension</div>
                </div>
            </div>
            {
                allContactsList.length > 0 ?
                    <Fragment>
                        <table className={`${classes.tableParent}`}>
                            <thead className={`${classes.tableHeader}`}>
                                <tr className={`${classes.tableRow}`}>
                                    <th className={`${classes.tableHead}`} scope="col">Name</th>
                                    <th className={`${classes.tableHead}`} scope="col">Department</th>
                                    {showPhone && <th className={`${classes.tableHead}`} scope="col">Phone Number</th>}
                                    <th className={`${classes.tableHead}`} scope="col">Contact Extension</th>
                                </tr>
                            </thead>
                            <tbody className={`${classes.tableBody}`}>
                                {
                                    currentPageData.length > 0 && currentPageData.map((field) => (
                                        <tr className={`${classes.tableField} ${classes.tableRow}`} key={field.id}>
                                            <td className={`${classes.tableData}`} data-label="name">{field.firstname + ' ' + field.lastname}</td>
                                            <td className={`${classes.tableData}`} data-label="department">{field.department.toString()}</td>
                                            <td className={`${classes.tableData}`} data-label="phoneNumber">{field.phoneNumber}</td>
                                            <td className={`${classes.tableData}`} data-label="contactExtension">{field.contactExtension}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <Sweetpagination
                            currentPageData={setCurrentPageData}
                            dataPerPage={numberOfPages}
                            getData={allContactsList}
                            navigation={true}
                        />

                    </Fragment>
                    :
                    <div className={`${classes.noData}`}>No contacts added</div>
            }
        </Fragment>
    );
};

export default AllContactsList;