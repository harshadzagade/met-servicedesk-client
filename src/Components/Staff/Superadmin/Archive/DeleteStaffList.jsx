import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import classes from './DeleteStaffList.module.css'

const DeleteStaffList = () => {
  const navigate = useNavigate();
  const id = useParams();
  const [staffList, setStaffList] = useState([]);
  const [allStaffList, setAllStaffList] = useState(staffList);
  const [searchText, setSearchText] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getList = async () => {
      try {
        const list = await axios.get(`/api/trash/`);
        setStaffList(list.data.allStaff);
      } catch (error) {
        console.log(error.message);
      }
    };
    getList();
    setRefresh(false);
  }, [refresh, id.staffId]);


  const handleRestoreClick = (id) => {
    Swal.fire({
      title: 'Restore Staff?',
      text: "Your staff will be restored",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, restore it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/trash/staffdetails/restore/${id}`);
        setRefresh(true);
        Swal.fire(
          'Restored Staff!',
          'You have successfully restored a staff',
          'success'
        )
      }
    }).catch((error) => {
      console.log(error.message);
    });
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: 'Delete All Staff?',
      text: "All of your staff will be deleted permanently",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/trash/staffdetails/remove/${id}`);
        setRefresh(true);
        Swal.fire(
          'Deleted Staff!',
          'You have successfully deleted a staff',
          'success'
        )
      }
    }).catch((error) => {
      console.log(error.message);
    });
  };

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
      selector: (row) => row.department[0],
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    {
      name: "Delete/Restore",
      cell: row =>
        <div>
          <button className='btn btn-danger' onClick={() => handleDeleteClick(row.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
            </svg>
          </button>
          <button className='btn btn-success ml-2' onClick={() => handleRestoreClick(row.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
              <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
            </svg>
          </button>
        </div>
    },
  ];

  useEffect(() => {
    let arr = [];
    staffList.filter((a) => a.email.toLowerCase().startsWith(searchText)).map((data) => {
      return (
        arr.push(data)
      );
    });
    if (searchText.length !== 0) {
      setAllStaffList(arr);
    } else {
      setAllStaffList(staffList)
    }
  }, [searchText, staffList]);

  const handleRowClick = row => {
    navigate(`/archivestaff/${row.id}`);
  }

  return (
    <div>
      <div className={classes.allStaff}>
        <h2 className={classes.title}>Deleted Employees List</h2>
        <input type="text" className={`${classes.searchInput}`} placeholder={`Please search E-mail`} onChange={(e) => setSearchText(e.target.value)} />
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
    </div>
  );
};

export default DeleteStaffList;