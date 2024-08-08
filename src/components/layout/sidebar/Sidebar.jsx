import React, { useContext } from 'react';
import { ListGroup, ListGroupItem, } from 'reactstrap';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/MET-logo.png';
import classes from './Sidebar.module.css';
import AuthContext from '../../../context/AuthContext/AuthContext';
import AdminContext from '../../../context/AdminContext/AdminContext';



const Sidebar = () => {
    const authCtx = useContext(AuthContext);
    const role = authCtx.employeeInfo ? authCtx.employeeInfo.role : 'checking...';
    console.log(role);
    const adminCtx = useContext(AdminContext);
    const department = adminCtx.department;

    return (
        <div className={` ${classes.sidebar} p-3`}>
            <div>
                <i className='bi bi-bootstrap-fill me-3 fs-4'></i>
                <span className='brand-name fs-4'>
                    <img src={Logo} alt="MET" className={classes.logo} />
                </span>
                <hr className='text-dark' />
                <ListGroup flush className={classes.listgroup}>
                    { (role === 'superadmin' || role === 'admin' || role === 'engineer' || role === 'subadmin') &&
                        <ListGroupItem tag={Link} to="/" className={`py-2 ${classes.listgroupitem}`}>
                            <i className='bi bi-speedometer'></i>
                            <span className='ms-3 fs-5 d-none d-sm-inline'>
                                Dashboard
                            </span>
                        </ListGroupItem>
                    }
                    { role === 'Superadmin' &&
                        <ListGroupItem tag={Link} to="/department" className={`py-2 ${classes.listgroupitem}`}>
                            <i className='bi bi-speedometer'></i>
                            <span className='ms-3 fs-5 d-none d-sm-inline'>
                                Department
                            </span>
                        </ListGroupItem>
                    }
                    { role === 'Superadmin' &&
                        <ListGroupItem tag={Link} to="/institute" className={`py-2 ${classes.listgroupitem}`}>
                            <i className='bi bi-speedometer'></i>
                            <span className='ms-3 fs-5 d-none d-sm-inline'>
                                Institute
                            </span>
                        </ListGroupItem>
                    }
                    {((role === 'admin' && department === 'NETWORK') || role === 'Superadmin') &&
                        <ListGroupItem tag={Link} to="/createstaff" className={`py-2 ${classes.listgroupitem}`}>
                            <i className='bi bi-speedometer'></i>
                            <span className='ms-3 fs-5 d-none d-sm-inline'>
                                Create Employee
                            </span>
                        </ListGroupItem>
                    }
                    { (role === 'superadmin' || role === 'admin' || role === 'engineer' || role === 'user' || role === 'subadmin') &&
                        <ListGroupItem tag={Link} to="/complaint" className={`py-2 ${classes.listgroupitem}`}>
                            <i className='bi bi-speedometer'></i>
                            <span className='ms-3 fs-5 d-none d-sm-inline'>
                                Complaint
                            </span>
                        </ListGroupItem>
                    }
                    { (role === 'superadmin' || role === 'admin' || role === 'engineer' || role === 'user' || role === 'subadmin') &&
                        <ListGroupItem tag={Link} to="/request" className={`py-2 ${classes.listgroupitem}`}>
                            <i className='bi bi-speedometer'></i>
                            <span className='ms-3 fs-5 d-none d-sm-inline'>
                                Request
                            </span>
                        </ListGroupItem>
                    }
                    { (role === 'superadmin' || role === 'admin' || role === 'engineer' || role === 'subadmin') &&
                        <ListGroupItem tag={Link} to="/report" className={`py-2 ${classes.listgroupitem}`}>
                            <i className='bi bi-speedometer'></i>
                            <span className='ms-3 fs-5 d-none d-sm-inline'>
                                Report
                            </span>
                        </ListGroupItem>
                    }
                    { role === 'superadmin' &&
                        <ListGroupItem tag={Link} to="/archive" className={`py-2 ${classes.listgroupitem}`}>
                            <i className='bi bi-speedometer'></i>
                            <span className='ms-3 fs-5 d-none d-sm-inline'>
                                Archive
                            </span>
                        </ListGroupItem>
                    }
                    { (role === 'superadmin' || role === 'admin' || role === 'engineer' || role === 'user' || role === 'subadmin') &&
                        <ListGroupItem tag={Link} to="/contact_list" className={`py-2 ${classes.listgroupitem}`}>
                            <i className='bi bi-speedometer'></i>
                            <span className='ms-3 fs-5 d-none d-sm-inline'>
                                Contact List
                            </span>
                        </ListGroupItem>
                    }
                    { (role === 'superadmin' || role === 'admin' || role === 'engineer' || role === 'user' || role === 'subadmin') &&
                        <ListGroupItem tag={Link} to="/policies" className={`py-2 ${classes.listgroupitem}`}>
                            <i className='bi bi-speedometer'></i>
                            <span className='ms-3 fs-5 d-none d-sm-inline'>
                                Policies
                            </span>
                        </ListGroupItem>
                    }
                </ListGroup>
            </div>
        </div>
    );
};

export default Sidebar;
