import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuperAdmin from '../../Components/Staff/Superadmin/SuperAdmin';
import Admin from '../../Components/Staff/Admin/Admin';
import DashBoard from '../../Components/UI/DashBoard/DashBoard';
import Technician from '../../Components/Staff/Technician/Technician';
import User from '../../Components/Staff/User/User';

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation() || null;
    const id = localStorage.getItem('id');

    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isTechnician, setIsTechnician] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [refresh, setRefresh] = useState(false);

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
                const staff = await axios.get(`/api/staff/staffdetails/${id}`);
                if (staff.data.staff.isNew === true) {
                    navigate('/passwordreset');
                } else {
                    const res = await axios.get(`/api/staff/check/${id}`);
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
                            localStorage.setItem('department', staff.data.staff.department[0]);
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
        <div className='container-fluid'>
            <DashBoard />
            {isSuperAdmin && <SuperAdmin />}
            {isAdmin && <Admin />}
            {isTechnician && <Technician />}
            {isUser && <User />}
        </div>
    );
};

export default Home;