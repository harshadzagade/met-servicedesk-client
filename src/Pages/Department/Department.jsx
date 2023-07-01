import React, { useState, useEffect } from 'react';
import classes from './Department.module.css';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import EditCategories from './EditCategories/EditCategories';
import CreateDepartment from './CreateDepartment/CreateDepartment';

const Department = () => {
    const [departmentData, setDepartmentData] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openCreateDepartment, setOpenCreateDepartment] = useState(false);
    const [departmentId, setDepartmentId] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const getDepartmentData = async () => {
            try {
                const departments = await axios.get('/api/department/')
                setDepartmentData(departments.data.departmentData);
                setFilteredDepartments(departments.data.departmentData);
                setRefresh(false);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: `Unable to fetch departments`
                });
            }
        };
        getDepartmentData();
    }, [refresh]);

    const handleDeleteDepartment = async (id) => {
        Swal.fire({
            title: 'Delete Department?',
            text: "Your department will be deleted permanently",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/department/deletedepartment/${id}`);
                setRefresh(true);
                Swal.fire(
                    'Staff Deleted!',
                    'You have deleted staff successfully',
                    'success'
                );
            }
        }
        ).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: `Unable to delete department`
                });
            }
        )
    };

    const handleEditClick = (id) => {
        setOpenUpdate(true);
        setDepartmentId(id);
    };

    const columns = [
        {
            name: "Department",
            selector: (row) => row.department,
            sortable: true,
        },
        {
            name: "Categories",
            selector: (row) => row.category.toString(),
        },
        {
            name: "Action",
            cell: row => <div><button className='btn btn-primary' onClick={() => handleEditClick(row.id)}>Edit</button><button className='btn btn-danger ml-2' onClick={() => handleDeleteDepartment(row.id)}>Delete</button></div>
        }
    ]

    useEffect(() => {
        const result = departmentData.filter(department => {
            return department.department.toLowerCase().match(search.toLowerCase())
        });
        setFilteredDepartments(result);
    }, [search, departmentData]);

    const handleUpdateCancel = () => {
        setRefresh(true);
        setOpenUpdate(false);
    };

    const handleCreateCancel = () => {
        setRefresh(true);
        setOpenCreateDepartment(false);
    };

    return (
        <div className={classes.allstaff}>
            {openUpdate && <EditCategories onConfirm={handleUpdateCancel} departmentId={departmentId} />}
            {openCreateDepartment && <CreateDepartment onConfirm={handleCreateCancel} />}
            <div className={classes.allCategory}>
                <h2 className={classes.title}>Department List</h2>
                <button className={`${classes.tikReqbtn}`} onClick={() => setOpenCreateDepartment(true)}>
                    <span className="material-icons-sharp btn-icon">
                        add
                    </span>
                    <span className={`${classes.btnName}`}>Create Department</span>
                </button>
            </div>
            <DataTable
                columns={columns}
                data={filteredDepartments}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='56vh'
                selectableRows
                selectableRowsHighlight
                highlightOnHover
                subHeader
                subHeaderComponent={
                    <input type='text'
                        placeholder='Search here'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                }
            />
        </div>
    )
}

export default Department;