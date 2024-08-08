import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ButtonDropdown, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, Row } from 'reactstrap';
import classes from '.././report/superadmin/report.module.css';
import axios from 'axios';


const ContactList = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8001/api/staff/contacts/');
                console.log(response.data.contacts);
                setData(response.data.contacts);
                setFilter(response.data.contacts);
            } catch (error) {
                console.log(error);
            }
        };
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
    }, [search, data]);

    const columns = [
        {
            id: 'name',
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
            name: "E-Mail",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Extension Number",
            selector: (row) => row.contactExtension,
            sortable: true,
        },
        {
            name: "Mobile Number",
            selector: (row) => row.phoneNumber,
            sortable: true,
        }

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
