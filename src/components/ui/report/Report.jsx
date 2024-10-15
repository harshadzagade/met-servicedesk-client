import React, { useContext, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Col, Container, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import Select from 'react-select';
import classes from './Report.module.css';
import axios from 'axios';
import AuthContext from '../../../context/AuthContext/AuthContext';
import AdminContext from '../../../context/AdminContext/AdminContext';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom';


const Report = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const adminCtx = useContext(AdminContext);
    const department = adminCtx.department;
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState([]);
    const [modal, setModal] = useState(false);
    const [technicians, setTechnicians] = useState([]);
    const [institutes, setInstitutes] = useState([]);

    const toggle = () => setModal(!modal);

    const [filterOptions, setFilterOptions] = useState({
        engineer: '',
        complaint: false,
        request: false,
        institutes: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://hello.helpdesk.met.edu/api/report/departmentreport/${department}`);
                setData(response.data.report);
                setFilter(response.data.report);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [department]);

    useEffect(() => {
        const fetchInstitutes = async () => {
            try {
                const response = await axios.get('https://hello.helpdesk.met.edu/api/institute/');
                const instituteOptions = response.data.instituteData.map(institute => ({
                    value: institute.id,
                    label: institute.institute,
                }));
                setInstitutes(instituteOptions);
            } catch (error) {
                console.log(error);
            }
        };
        fetchInstitutes();
    }, []);

    useEffect(() => {
        const filteredData = data.filter((item) => {
            const { isComplaint, isRequest, institute } = item;
            const { engineer, complaint, request, institutes } = filterOptions;

            return (
                (!engineer || item.technicianId === engineer) &&
                (!complaint || isComplaint) &&
                (!request || isRequest) &&
                (institutes.length === 0 || institutes.includes(institute))
            );
        });
        setFilter(filteredData);
    }, [filterOptions, data]);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            [name]: checked,
        }));
    };

    const handleEngineerChange = (e) => {
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            engineer: e.target.value,
        }));
    };

    const handleInstituteChange = (selectedOptions) => {
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            institutes: selectedOptions.map(option => option.value),
        }));
    };

    useEffect(() => {
        const fetchTechnicians = async () => {
            try {
                const response = await axios.get(`https://hello.helpdesk.met.edu/api/staff/admin/admindepartmenttechnicians/${authCtx.employeeInfo.id}/${adminCtx.department}`);
                setTechnicians(response.data.technicians);
            } catch (error) {
                console.error('Error fetching technicians:', error);
                navigate('/request');
            }
        };

        fetchTechnicians();
    }, [authCtx.employeeInfo.id, adminCtx.department, navigate]);

    const columns = [
        {
            name: "Ticket Type",
            selector: (row) => (row.isRequest && 'Request') || (row.isComplaint && 'Complaint'),
            sortable: true,
        },
        {
            name: "Subject",
            selector: (row) => row.subject,
            sortable: true,
        },
        {
            name: "Category",
            selector: (row) => row.category,
        },
        {
            name: "Priority",
            selector: (row) => row.priority,
        }
    ];

    const closeBtn = (
        <button className="close" onClick={toggle} type="button">
            &times;
        </button>
    );

    return (
        <div>
            <Container>
                <Row>
                    <Col xs={12} md={12} sm>
                        <div className={classes.table}>
                            <DataTable
                                title={`${department}'s Report`}
                                columns={columns}
                                data={filter}
                                pagination
                                fixedHeader
                                selectableRowsHighlight
                                highlightOnHover
                                subHeader
                                subHeaderComponent={
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <CSVLink data={filter.map(item => ({ ...item, description: item.description.replace(/<p>|<\/p>/g, '') }))} filename={`${department}'s Report.csv`}>
                                            <Button className='mr-2' color="danger">
                                                Download Report
                                            </Button>
                                        </CSVLink>
                                        <Button onClick={toggle}>
                                            <i className="fas fa-filter"></i>
                                        </Button>
                                        <Modal isOpen={modal} toggle={toggle}>
                                            <ModalHeader toggle={toggle} close={closeBtn}>Filter</ModalHeader>
                                            <ModalBody>
                                                <FormGroup>
                                                    <Label for="engineers">Engineers</Label>
                                                    <Input type="select" id="engineers" className='w-100 p-1' value={filterOptions.engineer} onChange={handleEngineerChange}>
                                                        <option value="">Select</option>
                                                        {technicians.map((technician) => (
                                                            <option key={technician.id} value={technician.id}>
                                                                {`${technician.firstname} ${technician.lastname} ${technician.busyStatus}`}
                                                            </option>
                                                        ))}
                                                    </Input>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="institutes">Institutes</Label>
                                                    <Select
                                                        id="institutes"
                                                        isMulti
                                                        options={institutes}
                                                        onChange={handleInstituteChange}
                                                        value={institutes.filter(option => filterOptions.institutes.includes(option.value))}
                                                    />
                                                </FormGroup>
                                                <div>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            name="complaint"
                                                            checked={filterOptions.complaint}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                        Complaint
                                                    </label>
                                                </div>
                                                <div>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            name="request"
                                                            checked={filterOptions.request}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                        Request
                                                    </label>
                                                </div>
                                            </ModalBody>
                                        </Modal>
                                        <input
                                            type="text"
                                            className={classes.form_control}
                                            placeholder="Search Here"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                    </div>
                                }
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Report;
