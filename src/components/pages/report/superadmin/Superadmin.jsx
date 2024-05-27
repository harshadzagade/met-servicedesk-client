import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ButtonDropdown, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, Row } from 'reactstrap';
import classes from './report.module.css';

const Data = [
    {
        isRequest: true,
        subject: 'Sample Subject 1',
        category: 'Sample Category 1',
        priority: 'High',
        staff: {
            id: 1,
            name: 'John Doe',
        },
        // ... other fields
    },
    {
        isRequest: false,
        subject: 'Sample Subject 2',
        category: 'Sample Category 2',
        priority: 'Medium',
        staff: {
            id: 2,
            name: 'Jane Doe',
        },
        // ... other fields
    },
    {
        isRequest: false,
        subject: 'Demo',
        category: 'ERP',
        priority: 'Medium',
        staff: {
            id: 3,
            name: 'Bob Smith',
        },
        // ... other fields
    },

]

const Superadmin = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState([]);
    const [dropdownOpen, setOpen] = useState(false);
    const [dropdownText, setDropdownText] = useState('Dept');
    const [selectedDept, setSelectedDept] = useState('');
    const [staffDropdownOpen, setStaffDropdownOpen] = useState(false);
    const [staffData, setStaffData] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            try {
                setData(Data)
                setFilter(Data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const result = data.filter((item) => {
            const combinedFields = [
                item.isRequest,
                item.subject,
                item.category,
                item.priority
            ].join(' ').toLowerCase();
            return combinedFields.includes(search.toLowerCase());
        });
        setFilter(result);
    }, [data, search]);

    const handleDeptSelect = (dept) => {
        setSelectedDept(dept);
        setDropdownText(dept === '' ? 'All' : dept);
        // Filter staff based on selected department
        const staffInDept = Data.filter((item) => item.staff && item.staff.department === dept);
        setStaffData(staffInDept);
        setSelectedDept('');
    };

    const columns = [
        {
            name: 'Ticket Type',
            selector: 'isRequest',
            cell: (row) => (row.isRequest ? 'Request' : 'Complaint'),
        },
        {
            name: 'Subject',
            selector: 'subject',
        },
        {
            name: 'Category',
            selector: 'category',
        },
        {
            name: 'Priority',
            selector: 'priority',
        },
    ];

    return (
        <div>
            <Container>
                <Row>
                    <Col xs={12} md={12} sm>
                        <div className={classes.table}>
                            <div className='d-flex justify-content-between align-items-center '>
                                <ButtonDropdown toggle={() => { setOpen(!dropdownOpen) }}
                                    isOpen={dropdownOpen}>
                                    <DropdownToggle className="bg-primary" caret>
                                        <i className="fa fa-filter"></i>
                                        <span className="ms-2">{dropdownText}</span>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => handleDeptSelect('')}>All</DropdownItem>
                                        <DropdownItem onClick={() => handleDeptSelect('ERP')}>ERP</DropdownItem>
                                        <DropdownItem onClick={() => handleDeptSelect('NETWORK')}>NETWORK</DropdownItem>
                                        <DropdownItem onClick={() => handleDeptSelect('MAINTENANCE')}>MAINTAINENCE</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                                {/* Staff Dropdown */}
                                {staffData.length > 0 && (
                                    <ButtonDropdown toggle={() => { setStaffDropdownOpen(!staffDropdownOpen) }} isOpen={staffDropdownOpen} className="ms-2">
                                        <DropdownToggle className="bg-primary" caret>
                                            <i className="fa fa-filter"></i>
                                            <span className="ms-2">Staff</span>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {staffData.map((staff) => (
                                                <DropdownItem key={staff.staff.id} onClick={() => setSelectedDept(staff.staff.name)}>
                                                    {staff.staff.name}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                )}
                            </div>
                            <DataTable
                                title="Report Table"
                                columns={columns}
                                data={filter}
                                pagination
                                fixedHeader
                                selectableRowsHighlight
                                highlightOnHover
                                subHeader
                                subHeaderComponent={
                                    <input type="text" className={classes.form_control}
                                        placeholder="Search Here" value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                }

                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Superadmin;
