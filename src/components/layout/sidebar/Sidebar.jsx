import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import classes from './Sidebar.module.css';

const Sidebar = () => {
    return (
        // <div className='bg-dark col-auto min-vh-100 d-flex justify-content-between flex-column'>
        //     <div>
        //         <div className="logo">
        //             <img src="path/to/your/logo.png" alt="Logo" />
        //         </div>

        //         <Nav pills vertical>
        //             <NavItem className='text-white fs-4'>
        //                 <NavLink tag={Link} to='/' className='nav-link text-white fs-5 active'>
        //                     <i className='bi bi-speedometer'></i>
        //                     <span className='ms-3 d-none d-sm-inline'>
        //                         Dashboard
        //                     </span>
        //                 </NavLink>
        //             </NavItem>
        //             <NavItem className='text-white fs-4'>
        //                 <NavLink tag={Link} to='/some-route' className='nav-link text-white fs-5'>
        //                     <span className='ms-3 d-none d-sm-inline'>
        //                         Another Route
        //                     </span>
        //                 </NavLink>
        //             </NavItem>
        //             {/* Add more NavItems as needed */}
        //         </Nav>
        //         {/* End of your existing code */}
        //     </div>
        // </div>

        <div className={`bg-white ${classes.sidebar} p-3`}>
            <div>
                <i className='bi bi-bootstrap-fill me-3 fs-4'></i>
                <span className='brand-name fs-4'>
                    MET
                </span>
                <hr  className='text-dark'/>
                <div className={`list-group list-group-flush ${classes.listgroup}`}>
                    <a className='list-group-item list-group-item-action py-1 fs-4' href='#'>
                        <i className='bi bi-speedometer'></i>
                        <span className='ms-3 fs-5 d-none d-sm-inline'>
                            Dashboard
                        </span>
                    </a>
                    <a className='list-group-item list-group-item-action py-2' href='#'>
                        <i className='bi bi-speedometer'></i>
                        <span className='ms-3 fs-5 d-none d-sm-inline'>
                            Dashboard
                        </span>
                    </a>
                    <a className='list-group-item list-group-item-action py-2' href='#'>
                        <i className='bi bi-speedometer'></i>
                        <span className='ms-3 fs-5 d-none d-sm-inline'>
                            Dashboard
                        </span>
                    </a>
                    <a className='list-group-item list-group-item-action py-2' href='#'>
                        <i className='bi bi-speedometer'></i>
                        <span className='ms-3 fs-5 d-none d-sm-inline'>
                            Dashboard
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
