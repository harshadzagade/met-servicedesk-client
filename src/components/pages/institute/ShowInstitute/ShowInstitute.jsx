import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Col, Row } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const ShowInstitute = ({ onEdit }) => {
    const [institutes, setInstitutes] = useState([]);
    const [filteredInstitutes, setFilteredInstitutes] = useState([]);  
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchInstitutes = async () => {
            try {
                const response = await axios.get('https://hello.helpdesk.met.edu/api/institute/');
                if (Array.isArray(response.data.instituteData)) {
                    setInstitutes(response.data.instituteData);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchInstitutes();
    }, []);

    useEffect(() => {
        setFilteredInstitutes(institutes);
    }, [ institutes ]);

    useEffect(() => {
        const result = institutes.filter((item) => {
            const combinedFields = [ 
                item.institute,
            ].join(' ').toLowerCase();
            return combinedFields.includes(search.toLowerCase());
        });
        setFilteredInstitutes(result);
    }, [search, institutes]);

    const handleEdit = (institute) => { 
        console.log(institute);
        onEdit(institute);
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`https://hello.helpdesk.met.edu/api/institute/deleteinstitute/${id}`);
                setInstitutes(institutes.filter( institute => institute.id !== id));
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Institute has been deleted.'
                });
            } catch (error) {
                console.error('Error deleting Institute:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'There was an error deleting the Institute.'
                });
            }
        }
    };

    const columns = [
        {
            name: "Institute",
            selector: (row) => row.institute,
            sortable: true,
        },
        {
            name: "Action",
            cell: row =>
                <div>
                    <button className='btn btn-primary' onClick={() => handleEdit(row)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                    </button>
                    <button className='btn btn-danger ml-2' onClick={() => handleDelete(row.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                        </svg>
                    </button>
                </div>
        }
    ];

    return (
        <div>
            <Row>
                <Col xs={12} md={12} sm>
                    <DataTable
                        columns={columns}
                        data={filteredInstitutes}
                        pagination
                        fixedHeader
                        selectableRowsHighlight
                        highlightOnHover
                        subHeader
                        subHeaderComponent={
                            <input type="text"
                                placeholder="Search Here" value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        }
                    />
                </Col>
            </Row>
        </div>
    );
};

export default ShowInstitute;