import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import classes from './Allstaff.module.css'
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';

const AllStaff = () => {
    const navigate = useNavigate();
    const [staffList, setStaffList] = useState([]);
    const [allStaffList, setAllStaffList] = useState([]);
    const [query, setQuery] = useState('');
    const sortedData = React.useMemo(() => { return [...staffList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) }, [staffList]);

    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.firstname + ' ' + row.lastname,
            sortable: true,
        },
        {
            name: "Department",
            selector: (row) => row.department.toString(),
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
    ];

    useEffect(() => {
        const getList = async () => {
            try {
                const list = await axios.get('/api/staff/superadmin/allstafflist/fullstaff');
                setStaffList(list.data.totalStaff);
                setAllStaffList(list.data.totalStaff)
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to fetch staff'
                });
            }
        };
        getList();
    }, []);

    useEffect(() => {
        const getStaff = async () => {
            try {
                if (query) {
                    const staff = await axios.get(`/api/staff/superadmin/searchallstaff/${query}`);
                    setAllStaffList(staff.data);
                } else {
                    setAllStaffList(sortedData);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to search staff'
                });
            }
        };
        getStaff();
    }, [query, sortedData]);

    const handleRowClick = row => {
        navigate(`/singlestaff/${row.id}`);
    };

    return (
        <Fragment>
            <div className={`${classes.allstaff} `}>
                <h2 className={classes.title}>Employees List</h2>
                <input type="text" className={`${classes.searchInput} mb-1`} placeholder={`Search here`} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <DataTable
                columns={columns}
                data={allStaffList}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='auto'
                highlightOnHover
                subHeader
                onRowClicked={handleRowClick}
            />
        </Fragment>
    );
};

export default AllStaff;









