import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import classes from './AllStaffExt.module.css';
import Swal from 'sweetalert2';

const AllStaffExt = () => {
    const id = localStorage.getItem('id');
    const [staffList, setStaffList] = useState([]);
    const [allStaffList, setAllStaffList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [showPhone, setShowPhone] = useState(false);
    
    const sortedData = React.useMemo(() => { return [...staffList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) }, [staffList]);

    useEffect(() => {
        if (sortedData.length > 0) {
            if (Object.hasOwn(sortedData[0], 'phoneNumber')) {
                setShowPhone(true);
            } else {
                setShowPhone(false);
            }
        }
    }, [sortedData]);

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
                name: "E-Mail",
                selector: (row) => row.email,
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
                name: "E-Mail",
                selector: (row) => row.email,
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
                const response = await axios.get(`/api/staff/contacts/${id}`);
                setStaffList(response.data.contacts);
                setAllStaffList(response.data.contacts);
            } catch (error) {
                console.log(error.response.data.message);
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
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to search staff'
                });
            }
        };
        getStaff();
    }, [id, searchText, sortedData]);

    return (
        <Fragment>
            <div className={classes.allstaff}>
                <h2 className={classes.title}>Contact List</h2>
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