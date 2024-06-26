import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import classes from './AllStaff.module.css';
import Swal from 'sweetalert2';
import getItemWithExpiry from '../../../../Utils/expiryFunction';

const AllStaff = () => {
    const idReference = getItemWithExpiry('id');
    const id = idReference ? idReference.value : null;
    const [staffList, setStaffList] = useState([]);
    const [allStaffList, setAllStaffList] = useState([]);
    const [subadminDetails, setSubadminDetails] = useState({});
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const sortedData = React.useMemo(() => { return [...staffList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) }, [staffList]);

    const handleRowClick = row => {
        navigate(`/subadminstaffdetails/${row.id}`);
    };

    useEffect(() => {
        const getSubadminDetails = async () => {
            try {
                const subadmin = await axios.get(`/api/staff/staffdetails/${id}`);
                setSubadminDetails(subadmin.data.staff);
            } catch (error) {
                console.log(error.message);
            }
        };
        getSubadminDetails();
    }, [id]);

    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            id: "name",
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
            name: "Mobile No.",
            selector: (row) => row.phoneNumber,
            sortable: true,
        },
    ];

    useEffect(() => {
        const getStaff = async () => {
            try {
                const response = await axios.get(`/api/staff/subadmin/allstaff/${id}/${subadminDetails.department}`)
                setStaffList(response.data.totalStaff);
                setAllStaffList(response.data.totalStaff);
            } catch (error) {
                console.log(error.message);
            }
        };
        getStaff();
    }, [id, subadminDetails.department]);

    useEffect(() => {
        const getStaff = async () => {
            try {
                if (searchText) {
                    const staff = await axios.get(`/api/staff/subadmin/searchalldepartmentstaff/${subadminDetails.department}/${searchText}`);
                    setAllStaffList(staff.data);
                } else {
                    setAllStaffList(sortedData);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.message}`,
                    text: 'Unable to search staff'
                });
            }
        };
        getStaff();
    }, [searchText, subadminDetails.department, sortedData]);

    return (
        <div className={classes.AdminAllStaff}>
            <div className={classes.allstaff}>
                <h2 className={classes.title}>Employee List</h2>
                <input type="text" className={`${classes.searchInput}`} placeholder={`Search here`} onChange={(e) => setSearchText(e.target.value)} />
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
                defaultSortFieldId="name"
                defaultSortAsc={true}
            />
        </div>
    );
};

export default AllStaff;