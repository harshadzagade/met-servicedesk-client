import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import AdminContext from '../../../Context/AdminContext/AdminContext';
import AdminDeptDrop from '../../../UI/AdminDepartmentDropDowm/AdminDeptDrop';
import classes from './AdminAllStaff.module.css';



const AdminAllStaff = () => {
    const id = localStorage.getItem('id');
    const [staff, setStaff] = useState([]);
    const [search, setSearch] = useState("");
    const [filterStaff, setFilterStaff] = useState([]);
    const navigate = useNavigate();
    const adminCtx = useContext(AdminContext);
    // const [refresh, setRefresh] = useState(false);

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
            name: "PhoneNo",
            selector: (row) => row.phoneNumber,
            sortable: true,
        },

    ]

    useEffect(() => {
        const getStaff = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/api/staff/admin/allstaff/${id}/${adminCtx.department}`)
                setStaff(response.data.totalStaff);
                setFilterStaff(response.data.totalStaff);
            } catch (error) {
                console.log(error.response.data.message);
            }
        };
        getStaff();
    }, [id , adminCtx.department ])

    useEffect(() => {
        const result = staff.filter(singleStaff => {
            return singleStaff.firstname.toLowerCase().match(search.toLowerCase())
        });
        setFilterStaff(result);
    }, [search, staff]);

    const handleRowClick = row => {
        navigate(`/adminstaffdetails/${row.id}`);
    }
     
    return (
        <div className={classes.AdminAllStaff}>
            <AdminDeptDrop />
            <DataTable title="Staff List"
                columns={columns}
                data={filterStaff}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='400px'
                highlightOnHover
                subHeader
                onRowClicked={handleRowClick}
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

export default AdminAllStaff;