import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import classes from './AllStaffExt.module.css';
import Swal from 'sweetalert2';

const AllStaffExt = () => {
    const id = localStorage.getItem('id');
    const [staffList, setStaffList] = useState([]);
    const [allStaffList, setAllStaffList] = useState(staffList);
    const [searchText, setSearchText] = useState('');
    const [searchType, setSearchType] = useState('Firstname');
    const [openNormalList, setOpenNormalList] = useState(false);
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const [openDepartmentList, setOpenDepartmentList] = useState(false);
    const [role, setRole] = useState('');
    const [openRoleList, setOpenRoleList] = useState(false);
    const [showPhone, setShowPhone] = useState(false);

    useEffect(() => {
        if (staffList.length > 0) {
            if (Object.hasOwn(staffList[0], 'phoneNumber')) {
                setShowPhone(true);
            } else {
                setShowPhone(false);
            }
        }
    }, [staffList]);

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await axios.get(`http://localhost:8001/api/staff/departments`);
            setDepartments(departments.data.departments);
        };
        getDepartments();
    }, [openDepartmentList]);

    const columns = showPhone ?
        [
            {
                name: "Name",
                selector: (row) => row.firstname + ' ' + row.lastname,
                sortable: true,
            },
            {
                name: "Department",
                selector: (row) => row.department[0],
                sortable: true,
            },
            {
                name: "Extension",
                selector: (row) => row.contactExtension,
                sortable: true,
            },
            {
                name: "PhoneNo",
                selector: (row) => row.phoneNumber,
                sortable: true,
            }
        ]
        :
        [
            {
                name: "Name",
                selector: (row) => row.firstname + ' ' + row.lastname,
                sortable: true,
            },
            {
                name: "Department",
                selector: (row) => row.department,
                sortable: true,
            },
            {
                name: "Extension",
                selector: (row) => row.contactExtension,
                sortable: true,
            }
        ]

    useEffect(() => {
        const getStaff = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/api/staff/contacts/${id}`);
                setStaffList(response.data.contacts);
            } catch (error) {
                console.log(error.response.data.message);
            }
        };
        getStaff();
    }, [id]);

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
                    text: 'Unable to fetch staff'
                });
            }
        };
        if (openDepartmentList) {
            getStaffByDepartment();
        }
    }, [department, openDepartmentList, staffList]);

    useEffect(() => {
        const getStaffByRole = async () => {
            try {
                if ((openRoleList && role.length === 0) || (openRoleList && role === 'allRoles')) {
                    setAllStaffList(staffList);
                } else {
                    const staff = await axios.get(`http://localhost:8001/api/staff/superadmin/staffbyrole/${role}`);
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
    }, [role, openRoleList, staffList]);

    useEffect(() => {
        let arr = [];
        switch (searchType) {
            case 'Firstname':
                setOpenDepartmentList(false);
                setOpenRoleList(false);
                setOpenNormalList(true);
                staffList.filter((a) => a.firstname.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'Lastname':
                setOpenDepartmentList(false);
                setOpenRoleList(false);
                setOpenNormalList(true);
                staffList.filter((a) => a.lastname.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'Role':
                setOpenDepartmentList(false);
                setOpenRoleList(true);
                setOpenNormalList(false);
                break;

            case 'Department':
                setOpenDepartmentList(true);
                setOpenRoleList(false);
                setOpenNormalList(false);
                break;

            case 'Extension':
                setOpenDepartmentList(false);
                setOpenRoleList(false);
                setOpenNormalList(true);
                staffList.filter((a) => a.contactExtension.toString().startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            case 'Phone Number':
                setOpenDepartmentList(false);
                setOpenRoleList(false);
                setOpenNormalList(true);
                staffList.filter((a) => a.phoneNumber.startsWith(searchText)).map((data) => {
                    return (
                        arr.push(data)
                    );
                });
                break;

            default:
                setOpenDepartmentList(false);
                setOpenRoleList(false);
                setOpenNormalList(true);
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
            <div className={classes.allstaff}>

                <h2>Contact List</h2>

                {openNormalList && <input type="text" className={`${classes.searchInput}`} placeholder={`Please search ${searchType}`} onChange={(e) => setSearchText(e.target.value)} />}
                {
                    openDepartmentList &&
                    <select value={department} className={`${classes.optionSearchBox}`} name="departments" required onChange={(e) => setDepartment(e.target.value)}>
                        <option value='' hidden>Select Your Department</option>
                        <option value={'allDepartments'}>All Departments</option>
                        {
                            departments.map((department, key) => (
                                <option key={key} value={department}>{department}</option>
                            ))
                        }
                    </select>
                }
                {
                    openRoleList &&
                    <select value={role} className={`${classes.optionSearchBox}`} name="roles" required onChange={(e) => setRole(e.target.value)}>
                        <option value='' hidden>Select Role</option>
                        <option value='allRoles'>All Roles</option>
                        <option value='admin'>Admin</option>
                        <option value='technician'>Technician</option>
                        <option value='user'>User</option>
                    </select>
                }
                <div className="btn-group ">
                    <button type="button" className={`${classes.searchButton} dropdown-toggle`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {searchType}
                    </button>
                    <div className="dropdown-menu">
                        <div className="dropdown-item" onClick={() => setSearchType('Firstname')}>Firstname</div>
                        <div className="dropdown-item" onClick={() => setSearchType('Lastname')}>Lastname</div>
                        <div className="dropdown-item" onClick={() => setSearchType('Department')}>Department</div>
                        <div className="dropdown-item" onClick={() => setSearchType('Extension')}>Extension</div>
                        {showPhone && <div className="dropdown-item" onClick={() => setSearchType('Phone Number')}>Phone Number</div>}
                    </div>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={allStaffList}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='368px'
                highlightOnHover
                subHeader
            />

        </Fragment>
    )


}

export default AllStaffExt;