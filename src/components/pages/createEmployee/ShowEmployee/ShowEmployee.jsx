import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import classes from '../../department/Department.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const roles = ['admin', 'subadmin', 'engineer', 'user'];
const departmentTypes = ['IT', 'HR', 'Finance', 'Marketing']; // Example department types, adjust as needed

const ShowEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);  
    const [search, setSearch] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editForm, setEditForm] = useState({});

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('https://hello.helpdesk.met.edu/api/staff/superadmin/allstafflist');
                if (Array.isArray(response.data.totalStaff)) {
                    setEmployees(response.data.totalStaff);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    useEffect(() => {
        setFilteredEmployees(employees);
    }, [employees]);

    useEffect(() => {
        const result = employees.filter((item) => {
            const combinedFields = [ 
                item.firstname,
                item.lastname,
                item.department,
                item.email,
                item.role,
                item.phoneNumber
            ].join(' ').toLowerCase();
            return combinedFields.includes(search.toLowerCase());
        });
        setFilteredEmployees(result);
    }, [search, employees]);

    const handleRowClick = (row) => {
        setSelectedEmployee(row);
    };

    const toggleEditModal = (employee) => {
        setEditForm(employee || {});
        setIsEditModalOpen(!isEditModalOpen);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm({
            ...editForm,
            [name]: value
        });
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(`https://hello.helpdesk.met.edu/api/staff/superadmin/staffdetails/updateStaff/${editForm.id}`, editForm);
            setEmployees(employees.map(emp => (emp.id === editForm.id ? editForm : emp)));
            toggleEditModal();
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Employee has been updated.'
            });
        } catch (error) {
            console.error('Error updating employee:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an error updating the employee.'
            });
        }
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
                await axios.delete(`https://hello.helpdesk.met.edu/api/staff/superadmin/deletestaff/${id}`);
                setEmployees(employees.filter(employee => employee.id !== id));
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Employee has been deleted.'
                });
            } catch (error) {
                console.error('Error deleting employee:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'There was an error deleting the employee.'
                });
            }
        }
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
            name: "Mobile No.",
            selector: (row) => row.phoneNumber,
            sortable: true,
        }
    ];

    return (
        <div>
            <Row>
                <Col xs={12} md={12} sm>
                    <DataTable
                        columns={columns}
                        data={filteredEmployees}
                        pagination
                        fixedHeader
                        selectableRowsHighlight
                        highlightOnHover
                        onRowClicked={handleRowClick}
                        expandableRows
                        expandableRowsComponent={({ data }) => (
                            <div>
                                <p><strong>ID:</strong> {data.id}</p>
                                <p><strong>Name:</strong> {data.firstname} {data.lastname}</p>
                                <p><strong>Department:</strong> {data.department}</p>
                                <p><strong>Email:</strong> {data.email}</p>
                                <p><strong>Role:</strong> {data.role}</p>
                                <p><strong>Mobile No.:</strong> {data.phoneNumber}</p>
                                <button onClick={() => toggleEditModal(data)} className="btn btn-warning btn-sm">Edit</button>
                                <button onClick={() => handleDelete(data.id)} className="btn btn-danger btn-sm">Delete</button>
                            </div>
                        )}
                        subHeader
                        subHeaderComponent={
                            <input type="text" className={classes.form_control}
                                placeholder="Search Here" value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        }
                    />
                </Col>
            </Row>

            <Modal isOpen={isEditModalOpen} toggle={toggleEditModal}>
                <ModalHeader toggle={toggleEditModal}>Edit Employee</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="firstname">First Name</Label>
                            <Input type="text" name="firstname" id="firstname" value={editForm.firstname || ''} onChange={handleEditChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastname">Last Name</Label>
                            <Input type="text" name="lastname" id="lastname" value={editForm.lastname || ''} onChange={handleEditChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="department">Department</Label>
                            <Input type="text" name="department" id="department" value={editForm.department || ''} onChange={handleEditChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" value={editForm.email || ''} onChange={handleEditChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="role">Role</Label>
                            <Input type="select" name="role" id="role" value={editForm.role || ''} onChange={handleEditChange}>
                                {roles.map((role) => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="phoneNumber">Mobile No.</Label>
                            <Input type="text" name="phoneNumber" id="phoneNumber" value={editForm.phoneNumber || ''} onChange={handleEditChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="departmentType">Department Type</Label>
                            <Input type="select" name="departmentType" id="departmentType" value={editForm.departmentType || ''} onChange={handleEditChange}>
                                {departmentTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleEditSubmit}>Save</Button>
                    <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ShowEmployee;
