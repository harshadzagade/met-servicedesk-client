import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import AdminContext from '../../../Context/AdminContext/AdminContext';
import classes from './AdminAllStaff.module.css';
import getItemWithExpiry from '../../../../Utils/expiryFunction';

const AdminAllStaff = () => {
    const id = getItemWithExpiry('id');
    const [staffList, setStaffList] = useState([]);
    const [allStaffList, setAllStaffList] = useState(staffList);
    const navigate = useNavigate();
    const adminCtx = useContext(AdminContext);
    const [searchText, setSearchText] = useState('');

    const sortedData = React.useMemo(() => { return [...staffList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) }, [staffList]);

    const handleRowClick = row => {
        navigate(`/adminstaffdetails/${row.id}`);
    };

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
            selector: (row) => row.role === 'technician' ? 'engineer' : row.role,
            sortable: true,
        },
        {
            name: "PhoneNo",
            selector: (row) => row.phoneNumber,
            sortable: true,
        },
    ];

    useEffect(() => {
        const getStaff = async () => {
            try {
                const response = await axios.get(`/api/staff/admin/allstaff/${id}/${adminCtx.department}`)
                setStaffList(response.data.totalStaff);
                setAllStaffList(response.data.totalStaff);
            } catch (error) {
                console.log(error.message);
            }
        };
        getStaff();
    }, [id, adminCtx.department]);

    useEffect(() => {
        const getStaff = async () => {
            try {
                if (searchText) {
                    const staff = await axios.get(`/api/staff/admin/searchalldepartmentstaff/${adminCtx.department}/${searchText}`);
                    setAllStaffList(staff.data);
                } else {
                    setAllStaffList(sortedData);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getStaff();
    }, [searchText, adminCtx.department, sortedData]);

    return (
        <div className={classes.AdminAllStaff}>
            <div className={classes.allstaff}>
                <h2 className={classes.title}>Staff List</h2>
                <input type="text" className={`${classes.searchInput}`} placeholder={`Search here`} onChange={(e) => setSearchText(e.target.value)} />
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
    );
};

export default AdminAllStaff;