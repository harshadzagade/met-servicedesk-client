import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import AdminContext from '../../../Context/AdminContext/AdminContext';
import classes from './AdminAllStaff.module.css';
import Swal from 'sweetalert2';



const AdminAllStaff = () => {
    const id = localStorage.getItem('id');
    const [staffList, setStaffList] = useState([]);
    const [allStaffList, setAllStaffList] = useState(staffList);
    const navigate = useNavigate();
    const adminCtx = useContext(AdminContext);
    const [searchText, setSearchText] = useState('');
    const [searchType, setSearchType] = useState('Firstname');
    const [refresh, setRefresh] = useState(false);
    const [openNormalList, setOpenNormalList] = useState(false);
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const [openDepartmentList, setOpenDepartmentList] = useState(false);
    const [role, setRole] = useState('');
    const [openRoleList, setOpenRoleList] = useState(false);

 const handleRowClick = row => {
        navigate(`/adminstaffdetails/${row.id}`);
    }
     
    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.firstname,
            sortable: true,
        },
        {
            name: "Department",
            selector: (row) => row.department[0],
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Role",
            selector: (row) => row.role,
            sortable: true,
        },
        {
            name: "PhoneNo",
            selector: (row) => row.phoneNumber,
            sortable: true,
        },

    ]

    useEffect(() => {
        const getStaff = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/api/staff/admin/allstaff/${id}/${adminCtx.department}`)
                setStaffList(response.data.totalStaff);
                setAllStaffList(response.data.totalStaff);
            } catch (error) {
                console.log(error.response.data.message);
            }
        };
        getStaff();
    }, [id , adminCtx.department ])


 useEffect(() => {
        const getDepartments = async () => {
            const departments = await axios.get(`http://localhost:8001/api/staff/departments`);
            setDepartments(departments.data.departments);
        };
        getDepartments();
    }, [openDepartmentList]);

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

            case 'E-Mail':
                setOpenDepartmentList(false);
                setOpenRoleList(false);
                setOpenNormalList(true);
                staffList.filter((a) => a.email.startsWith(searchText)).map((data) => {
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
        <div className={classes.AdminAllStaff}>
             <div className={classes.allstaff}>
            
                <h2>Staff List</h2>
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
            
            <DataTable 
                columns={columns}
                data={allStaffList}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='368px'
                highlightOnHover
                subHeader
                onRowClicked={handleRowClick}
             
            />
        </div>
    )


    }

export default AdminAllStaff;