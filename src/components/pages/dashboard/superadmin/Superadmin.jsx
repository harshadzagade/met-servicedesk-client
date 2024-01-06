import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import classes from './superadmin.module.css';
import { Col, Container, Row } from 'react-bootstrap';


const Superadmin = () => {

    const columns = [
        {
            id: "department",
            name: "Department",
            selector: (row) => row.department,
            sortable: true,
            grow: 2,
            style: {
                color: '#202124',
                fontSize: '14px',
                fontWeight: 500,
            },
        },
        {
            id: "pending",
            name: "Pending",
            selector: (row) => row.pending,
            sortable: true,
            maxWidth: "150px"
        },
        {
            id: "attending",
            name: "Attending",
            selector: (row) => row.attending,
            sortable: true,
            maxWidth: "150px"
        },
        {
            id: "closed",
            name: "Closed",
            selector: (row) => row.closed,
            sortable: true,
            maxWidth: "150px"
        },
        {
            id: "total_tik",
            name: "Total Tickets",
            selector: (row) => row.total_tik,
            sortable: true,
            maxWidth: "150px"
        },
    ];

    const [data, setData] = useState([]);
    const [search, setaSearch] = useState('');
    const [filter, setFilter] = useState([]);

    const getData = async () => {
        try {
            setData([
                {
                    department: "IT",
                    pending: 12,
                    attending: 12,
                    closed: 12,
                    total_tik: 12
                },
                {
                    department: "ERP",
                    pending: 12,
                    attending: 12,
                    closed: 12,
                    total_tik: 12
                },
                {
                    department: "HR",
                    pending: 12,
                    attending: 12,
                    closed: 12,
                    total_tik: 12
                }
            ]);
            setFilter(data);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getData();
    })

    useEffect(() => {
        const result = data.filter((item) => {
            return item.department.toLowerCase().match(search.toLocaleLowerCase());
        });
        setFilter(result);
    }, [search, data])

    const tableHeaderStyle = {
        headCells: {
            style: {
                fontWeight: 'bold',
                fontSize: "15px",
            }
        },
        rows: {
            highlightOnHoverStyle: {
                backgroundColor: 'rgb(230, 244, 244)',
                borderBottomColor: '#FFFFFF',
                borderRadius: '25px',
                outline: '1px solid #FFFFFF',
            },
        },
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col xs={12} md={4} sm>
                        <div className={classes.card}>
                            <div className={classes.card_title}>
                                Total Pending Request
                            </div>
                            <div className={classes.card_des}>
                                12
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={4} sm>
                        <div className={classes.card}>
                            <div className={classes.card_title}>
                                Total Pending Request
                            </div>
                            <div className={classes.card_des}>
                                12
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={4} sm>
                        <div className={classes.card}>
                            <div className={classes.card_title}>
                                Total Pending Request
                            </div>
                            <div className={classes.card_des}>
                                12
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col xs={12} md={8} sm>
                        <div className={classes.table}>
                            <DataTable
                                customStyles={tableHeaderStyle}
                                columns={columns}
                                data={filter}
                                defaultSortField="title"
                                pagination
                                fixedHeader
                                selectableRowsHighlight
                                highlightOnHover
                                subHeader
                                subHeaderComponent={
                                    <input type="text" className={classes.form_control}
                                        placeholder="Search Here" value={search}
                                        onChange={(e) => setaSearch(e.target.value)}
                                    />
                                }
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={4} sm>
                        <div className={classes.card}>
                            <div className={classes.card_title}>
                                Daily Ticket Raised
                            </div>
                            <div className={classes.card_des}>
                                12
                            </div>
                        </div>
                        <div className={classes.card}>
                            <div className={classes.card_title}>
                                Total Attending Tickets
                            </div>
                            <div className={classes.card_des}>
                                12
                            </div>
                        </div>
                        <div className={classes.card}>
                            <div className={classes.card_title}>
                                Total Ticket
                            </div>
                            <div className={classes.card_des}>
                                12
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Superadmin;