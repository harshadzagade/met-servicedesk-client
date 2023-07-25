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
                const institutes = await axios.get(`/api/institute/`);
                setInstitutes(institutes.data.instituteData);
                setFilterInstitutes(institutes.data.instituteData);
                setRefresh(false);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to fetch institutes'
                });
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
                axios.delete(`/api/institute/deleteinstitute/${id}`);
                setRefresh(true);
                Swal.fire(
                    'Institute Deleted!',
                    'You have deleted institute successfully',
                    'success'
                );
            }
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: `${error.response.data.message}`,
                text: `Unable to delete institute`
            });
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
            cell: row => <div><button className='btn btn-primary' onClick={() => handleEditClick(row.id, row.institute)}>Edit</button><button className='btn btn-danger ml-2' onClick={() => handleDeleteClick(row.id)}>Delete</button></div>
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
                subHeaderComponent={<input type='text' placeholder='Search here' value={search} onChange={(e) => setSearch(e.target.value)}/>}
            />
        </div>
    );
};

export default Institute;