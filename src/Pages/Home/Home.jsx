import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import { useLocation, useNavigate } from 'react-router-dom';
import SuperAdmin from '../../Staff/SuperAdmin/SuperAdmin';
import Admin from '../../Staff/Admin/Admin';
import Technician from '../../Staff/Technician/Technician';
import User from '../../Staff/User/User';

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation() || null;

    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isTechnician, setIsTechnician] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const id = localStorage.getItem('id');

    useEffect(() => {
        setRefresh(false);
        if (location.state) {
            if (location.state.refreshSuperHome) {
                setRefresh(true);
            }
        }
        setRefresh(false);
    }, [refresh, location]);

    useEffect(() => {
        setRefresh(false);
        if (!id) {
            navigate('/login')
        }
        const checkAuth = async () => {
            setRefresh(true);
            try {
                const staff = await axios.get(`http://localhost:8001/staff/staffdetails/${id}`);
                if (staff.data.staff.isNew === true) {
                    navigate('/passwordreset');
                } else {
                    const res = await axios.get(`http://localhost:8001/staff/check/${id}`);
                    switch (res.data.role) {
                        case 'superadmin':
                            setIsSuperAdmin(true);
                            setIsAdmin(false);
                            setIsTechnician(false);
                            setIsUser(false);
                            break;

                        case 'admin':
                            setIsSuperAdmin(false);
                            setIsAdmin(true);
                            setIsTechnician(false);
                            setIsUser(false);
                            break;

                        case 'technician':
                            setIsSuperAdmin(false);
                            setIsAdmin(false);
                            setIsTechnician(true);
                            setIsUser(false);
                            break;

                        case 'user':
                            setIsSuperAdmin(false);
                            setIsAdmin(false);
                            setIsTechnician(false);
                            setIsUser(true);
                            break;

                        default:
                            navigate(`/404`);
                    }
                };
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
        checkAuth();
    }, [id, navigate, refresh]);

    return (
        <Fragment>
            <NavBar tab={'none'} />
            {isSuperAdmin && <SuperAdmin />}
            {isAdmin && <Admin />}
            {isTechnician && <Technician />}
            {isUser && <User />}
        </Fragment>
    );
};

export default Home;