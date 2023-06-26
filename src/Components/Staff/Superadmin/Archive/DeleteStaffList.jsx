import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import classes from './DeleteStaffList.module.css'

const DeleteStaffList = () => {
  const navigate = useNavigate();
  const id = useParams();
  const [search, setSearch] = useState("");
  const [staffList, setStaffList] = useState([]);
  const [allStaffList, setAllStaffList] = useState(staffList);
  const [searchText, setSearchText] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getList = async () => {
      const list = await axios.get(`/api/trash/`);
      setStaffList(list.data.allStaff);
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
      Swal.fire({
        icon: 'error',
        title: `${error.response.data.message}`,
        text: 'Unable to restore staff'
      });
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
      Swal.fire({
        icon: 'error',
        title: `${error.response.data.message}`,
        text: 'Unable to delete staff'
      });
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
    {
      name: "Delete",
      cell: row => <button className={classes.delete} onClick={() => handleDeleteClick(row.id)}>Detele</button>
    },
    {
      name: "Restore",
      cell: row => <button className={classes.restore} onClick={() => handleRestoreClick(row.id)}>Restore</button>
    }
  ]


  useEffect(() => {
    let arr = [];
    staffList.filter((a) => a.email.startsWith(searchText)).map((data) => {
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
    navigate(`/singlestaff/${row.id}`);
  }

  return (

    <div>
      <div className={classes.allStaff}>
        <h2>Delete Staff</h2>
        <input type="text" className={`${classes.searchInput}`} placeholder={`Please search E-mail`} onChange={(e) => setSearchText(e.target.value)} />
      </div>
      <DataTable
        columns={columns}
        data={allStaffList}
        pagination
        fixedHeader
        fixedHeaderScrollHeight='380px'
        highlightOnHover
        subHeader
        onRowClicked={handleRowClick}
      />
    </div>
  )


}


export default DeleteStaffList;