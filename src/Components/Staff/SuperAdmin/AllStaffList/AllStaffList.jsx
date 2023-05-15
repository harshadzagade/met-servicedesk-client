import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import SingleStaff from './SingleStaff/SingleStaff';
import classes from './AllStaffList.module.css';
import SmallSingleStaff from './SmallSingleStaff/SmallSingleStaff';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useNavigate } from 'react-router-dom';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Swal from 'sweetalert2';

const AllStaffList = () => {
    const id = localStorage.getItem('id');
    const navigate = useNavigate();
    const [staffList, setStaffList] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (selectedRows.length === 0) {
            setShowAlert(false);
        } else {
            setShowAlert(true);
        }
    }, [selectedRows])

    useEffect(() => {
        const getList = async () => {
            const list = await axios.get(`http://localhost:8001/staff/superadmin/allstaff/${id}`);
            setStaffList(list.data.totalStaff);
        };
        getList();
        setRefresh(false);
    }, [id, refresh]);

    const dataFormatter = (data, row) => {
        return <span style={{ cursor: 'pointer' }} onClick={() => navigate(`/superadmin/${row.id}`)}>{data}</span>
    };

    const selectRow = {
        mode: 'checkbox',
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                setSelectedRows([...selectedRows, row]);
            } else {
                let arr = [];
                for (let index = 0; index < selectedRows.length; index++) {
                    const element = selectedRows[index];
                    if (element.id !== row.id) {
                        arr.push(element);
                    }
                }
                setSelectedRows(arr);
            }
        },
        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                setSelectedRows(rows);
            } else {
                setSelectedRows([])
            }
        }
    }

    const columns = [
        {
            text: "Name",
            dataField: `firstname`,
            sort: true,
            formatter: dataFormatter,
            filter: textFilter()
        },
        {
            text: "Email",
            dataField: "email",
            formatter: dataFormatter
        },
        {
            text: "Role",
            dataField: "role",
            formatter: dataFormatter
        },
        {
            text: "Department",
            dataField: "department",
            formatter: dataFormatter
        }
    ];

    const handleMultipleDelete = async () => {
        try {
            if (selectedRows.length !== 0) {
                await axios.delete('http://localhost:8001/staff/superadmin/deletemultiple', { data: selectedRows });
                setRefresh(true);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `${error.response.data.message}`,
                text: 'Please enter valid credentials'
            });
        }
    };

    return (
        <Fragment>
            {showAlert && <div class="alert alert-danger" role="alert">Want to delete elements?&nbsp;<button className='btn btn-danger' onClick={handleMultipleDelete}>Delete</button></div>}
            <BootstrapTable
                keyField='id'
                data={staffList}
                columns={columns}
                striped
                hover
                condensed
                pagination={paginationFactory({ sizePerPageList: [10, 20, 30, 40, 50] })}
                selectRow={selectRow}
                filter={filterFactory()}
            />
        </Fragment>
    );
};

export default AllStaffList;