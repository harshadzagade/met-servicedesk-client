import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import classes from './AllStaffExt.module.css';
import getItemWithExpiry from '../../../Utils/expiryFunction';

const AllStaffExt = () => {
    const idReference = getItemWithExpiry('id');
    const id = idReference ? idReference.value : null;
    const [staffList, setStaffList] = useState([]);
    const [allStaffList, setAllStaffList] = useState([]);
    const [searchText, setSearchText] = useState('');

    const sortedData = React.useMemo(() => { return [...staffList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) }, [staffList]);
    const columns = [
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
                name: "E-Mail",
                selector: (row) => row.email,
                sortable: true,
            },
            {
                name: "Extension Number",
                selector: (row) => row.contactExtension,
                sortable: true,
            },
            {
                name: "Mobile Number",
                selector: (row) => row.phoneNumber,
                sortable: true,
            }
        ]
    useEffect(() => {
        const getStaff = async () => {
            try {
                const response = await axios.get(`/api/staff/contacts/${id}`);
                setStaffList(response.data.contacts);
                setAllStaffList(response.data.contacts);
            } catch (error) {
                console.log(error.message);
            }
        };
        getStaff();
    }, [id]);

    useEffect(() => {
        const getStaff = async () => {
            try {
                if (searchText) {
                    const staff = await axios.get(`/api/staff/contactsearch/${id}/${searchText}`);
                    setAllStaffList(staff.data);
                } else {
                    setAllStaffList(sortedData);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getStaff();
    }, [id, searchText, sortedData]);

    return (
        <Fragment>
            <div className={classes.allstaff}>
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
            />
        </Fragment>
    );
};

export default AllStaffExt;