import React, { useContext, useState } from 'react';
import classes from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import getItemWithExpiry from '../../../utils/expiryFunction';
import { Button, Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AuthContext from '../../../context/AuthContext/AuthContext';
import AdminDeptDrop from '../AdminDeptDrop/AdminDeptDrop'; // Import the AdminDeptDrop component

const NavBar = ({ Toggle }) => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const [staffInfo, setStaffInfo] = useState({ firstname: '', lastname: '', role: '', department: '' });
    const idReference = getItemWithExpiry('id');
    const id = idReference ? idReference.value : null;

    useEffect(() => {
        const getStaffInfo = async () => {
            try {
                if (id) {
                    const staff = await axios.get(`https://hello.helpdesk.met.edu/api/staff/staffdetails/${id}`);
                    setStaffInfo({ firstname: staff.data.staff.firstname, lastname: staff.data.staff.lastname, role: staff.data.staff.role, department: staff.data.staff.department });
                    authCtx?.setEmployeeInfoId(id);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getStaffInfo();
    }, [id]);

    const handleLogoutClick = (e) => {
        e.preventDefault()
        Swal.fire({
          title: 'Log Out?',
          text: "You will be signed out from your current login",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, logout!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            authCtx.onLogout();
            navigate('/login');
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
    
            Toast.fire({
              icon: 'success',
              title: 'Logged out successfully'
            })
          }
        });
      };

    return (
        <div>
            <Navbar className={classes.navbar} expand="lg">
                <Container fluid>
                    <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
                        <Button
                            variant="dark"
                            className=" d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
                        >
                            <i className="fas fa-ellipsis-v"></i>
                        </Button>
                        <Navbar.Brand
                            onClick={Toggle}
                            className="mr-2 pe-auto"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-list text-white" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5.5 0 1 0 0 1H3a.5.5.5 0 1 0 0 1" />
                            </svg>
                        </Navbar.Brand>
                    </div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
                        <span className="navbar-toggler-bar burger-lines"></span>
                        <span className="navbar-toggler-bar burger-lines"></span>
                        <span className="navbar-toggler-bar burger-lines"></span>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="nav mr-auto " navbar>
                            <AdminDeptDrop /> {/* Use AdminDeptDrop component */}
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <Dropdown as={Nav.Item}>
                                <Dropdown.Toggle
                                    aria-expanded={false}
                                    aria-haspopup={true}
                                    as={Nav.Link}
                                    data-toggle="dropdown"
                                    id="navbarDropdownMenuLink"
                                    variant="default"
                                    className="m-0 text-white"
                                >
                                    <span className="no-icon text-white">
                                        {staffInfo.firstname + ' ' + staffInfo.lastname}
                                    </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink" className={classes.dropbtnbox}>
                                    <Dropdown.Item
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        href="#pablo"
                                        onClick={(e) => handleLogoutClick(e)}
                                    >
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;
