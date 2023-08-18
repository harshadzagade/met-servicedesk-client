import React, { useState, useEffect } from 'react';
import classes from './Institute.module.css';
import CreateInstitute from '../../Pages/Institute/CreateInstitute/CreateInstitute';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Swal from 'sweetalert2';
import EditInstitute from './EditInstitute/EditInstitute';

const Institute = () => {
    const [institutes, setInstitutes] = useState([]);
    const [search, setSearch] = useState('');
    const [filterInstitutes, setFilterInstitutes] = useState([]);
    const [openCreateInstitute, setOpenCreateInstitute] = useState(false);
    const [openEditInstitute, setOpenEditInstitute] = useState(false);
    const [instituteName, setInstituteName] = useState(null);
    const [instituteId, setInstituteId] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const getInstitutes = async () => {
            try {
                const institutes = await axios.get(`http://localhost:8001/api/institute/`);
                setInstitutes(institutes.data.instituteData);
                setFilterInstitutes(institutes.data.instituteData);
                setRefresh(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        getInstitutes();
    }, [refresh]);

    const handleDeleteClick = async (id) => {
        Swal.fire({
            title: 'Delete Institute?',
            text: "Your institute will be deleted permanently",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8001/api/institute/deleteinstitute/${id}`);
                setRefresh(true);
                Swal.fire(
                    'Institute Deleted!',
                    'You have deleted institute successfully',
                    'success'
                );
            }
        }).catch((error) => {
            console.log(error.message);
        });
    };

    const handleEditClick = (id, institute) => {
        setInstituteId(id);
        setInstituteName(institute);
        setOpenEditInstitute(true);
    };

    const columns = [
        {
            name: "Institute Name",
            selector: (row) => row.institute,
            sortable: true,
        },
        {
            name: "Action",
            cell: row =>
                <div>
                    <button className='btn btn-primary' onClick={() => handleEditClick(row.id, row.institute)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                    </button>
                    <button className='btn btn-danger ml-2' onClick={() => handleDeleteClick(row.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                        </svg>
                    </button>
                </div>
        }
    ];

    useEffect(() => {
        const result = institutes.filter(institute => {
            if (institute.institute) {
                return institute.institute.toLowerCase().match(search.toLowerCase());
            } else {
                return null;
            }
        });
        setFilterInstitutes(result);
    }, [search, institutes]);

    const handleCreateCancel = () => {
        setRefresh(true);
        setOpenCreateInstitute(false);
    };

    const handleEditCancel = () => {
        setRefresh(true);
        setOpenEditInstitute(false);
    };

    return (
        <div className={classes.allstaff}>
            {openCreateInstitute && <CreateInstitute onConfirm={handleCreateCancel} />}
            {openEditInstitute && <EditInstitute onConfirm={handleEditCancel} instituteId={instituteId} instituteName={instituteName} />}
            <div className={classes.allCategory}>
                <h2 className={classes.title}>Institute</h2>
                <button className={`${classes.tikReqbtn}`} onClick={() => setOpenCreateInstitute(true)}>
                    <span className="material-icons-sharp btn-icon">
                        add
                    </span>
                    <span className={`${classes.btnName}`}>Create Institute</span>
                </button>
            </div>
            <DataTable
                columns={columns}
                data={filterInstitutes}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='56vh'
                selectableRows
                selectableRowsHighlight
                highlightOnHover
                subHeader
                subHeaderComponent={<input type='text' placeholder='Search here' value={search} onChange={(e) => setSearch(e.target.value)} />}
            />
        </div>
    );
};

export default Institute;