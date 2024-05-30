import React from 'react';
import { ListGroup, ListGroupItem, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/MET-logo.png';
import classes from './Sidebar.module.css';

const Sidebar = () => {
    return (
        <div className={` ${classes.sidebar} p-3`}>
            <div>
                <i className='bi bi-bootstrap-fill me-3 fs-4'></i>
                <span className='brand-name fs-4'>
                    <img src={Logo} alt="MET" className={classes.logo} />
                </span>
                <hr className='text-dark' />
                <ListGroup flush className={classes.listgroup}>
                    <ListGroupItem tag={Link} to="/" className={`py-2 ${classes.listgroupitem}`}>
                        <i className='bi bi-speedometer'></i>
                        <span className='ms-3 fs-5 d-none d-sm-inline'>
                            Dashboard
                        </span>
                    </ListGroupItem>
                    <ListGroupItem tag={Link} to="/department" className={`py-2 ${classes.listgroupitem}`}>
                        <i className='bi bi-speedometer'></i>
                        <span className='ms-3 fs-5 d-none d-sm-inline'>
                            Department
                        </span>
                    </ListGroupItem>
                    <ListGroupItem tag={Link} to="/institute" className={`py-2 ${classes.listgroupitem}`}>
                        <i className='bi bi-speedometer'></i>
                        <span className='ms-3 fs-5 d-none d-sm-inline'>
                            Institute
                        </span>
                    </ListGroupItem>
                    <ListGroupItem tag={Link} to="/createstaff" className={`py-2 ${classes.listgroupitem}`}>
                        <i className='bi bi-speedometer'></i>
                        <span className='ms-3 fs-5 d-none d-sm-inline'>
                            Create Employee
                        </span>
                    </ListGroupItem>
                    <ListGroupItem tag={Link} to="/complaint" className={`py-2 ${classes.listgroupitem}`}>
                        <i className='bi bi-speedometer'></i>
                        <span className='ms-3 fs-5 d-none d-sm-inline'>
                            Complaint
                        </span>
                    </ListGroupItem>
                    <ListGroupItem tag={Link} to="/request" className={`py-2 ${classes.listgroupitem}`}>
                        <i className='bi bi-speedometer'></i>
                        <span className='ms-3 fs-5 d-none d-sm-inline'>
                            Request
                        </span>
                    </ListGroupItem>
                    <ListGroupItem tag={Link} to="/report" className={`py-2 ${classes.listgroupitem}`}>
                        <i className='bi bi-speedometer'></i>
                        <span className='ms-3 fs-5 d-none d-sm-inline'>
                            Report
                        </span>
                    </ListGroupItem>
                    <ListGroupItem tag={Link} to="/archive" className={`py-2 ${classes.listgroupitem}`}>
                        <i className='bi bi-speedometer'></i>
                        <span className='ms-3 fs-5 d-none d-sm-inline'>
                            Archive
                        </span>
                    </ListGroupItem>
                    <ListGroupItem tag={Link} to="/contact_list" className={`py-2 ${classes.listgroupitem}`}>
                        <i className='bi bi-speedometer'></i>
                        <span className='ms-3 fs-5 d-none d-sm-inline'>
                            Contact List
                        </span>
                    </ListGroupItem>
                    <ListGroupItem tag={Link} to="/policies" className={`py-2 ${classes.listgroupitem}`}>
                        <i className='bi bi-speedometer'></i>
                        <span className='ms-3 fs-5 d-none d-sm-inline'>
                            Policies
                        </span>
                    </ListGroupItem>
                </ListGroup>
            </div>
        </div>
    );
};

export default Sidebar;
