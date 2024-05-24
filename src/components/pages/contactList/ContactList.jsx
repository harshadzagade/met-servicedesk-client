import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ButtonDropdown, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, Row } from 'reactstrap';
import classes from '.././report/superadmin/report.module.css';

const Data = [
    {
        name: 'John Doe',
        dept: 'IT',
        email: 'pDqjK@example.com',
        extn:"364",
    },
    {
        name: 'Jane Doe',
        dept: 'HR',
        email: 'pDqjK@example.com',
        extn:"364",
    },

]

const ContactList = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState([]);
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
                item.name,
                item.dept,
                item.email,
                item.extn
            ].join(' ').toLowerCase();
            return combinedFields.includes(search.toLowerCase());
        });
        setFilter(result);
    }, [data, search]);

    const columns = [
        {
            name: 'Name',
            selector: 'name',
        },
        {
            name: 'Department',
            selector: 'dept',
        },
        {
            name: 'E-mail',
            selector: 'email',
        },
        {
            name: 'Extension Number',
            selector: 'extn',
        },
    ];

    return (
        <div>
            <Container>
                <Row>
                    <Col xs={12} md={12} sm>
                        <div className={classes.table}>
                            
                            <DataTable
                                title="Contact List"
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

export default ContactList;
