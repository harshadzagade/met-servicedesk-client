import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuperAdmin from '../../Components/Staff/Superadmin/SuperAdmin';
import Admin from '../../Components/Staff/Admin/Admin';
import DashBoard from '../../Components/UI/DashBoard/DashBoard';
import Technician from '../../Components/Staff/Technician/Technician';
import User from '../../Components/Staff/User/User';
import Subadmin from '../../Components/Staff/Subadmin/Subadmin';
import getItemWithExpiry from '../../Utils/expiryFunction';

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation() || null;
    const id = getItemWithExpiry('id');

    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSubadmin, setIsSubadmin] = useState(false);
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
                            setIsSubadmin(false);
                            setIsTechnician(false);
                            setIsUser(false);
                            break;

                        case 'admin':
                            setIsSuperAdmin(false);
                            setIsAdmin(true);
                            setIsSubadmin(false);
                            setIsTechnician(false);
                            setIsUser(false);
                            break;

                        case 'subadmin':
                            setIsSuperAdmin(false);
                            setIsAdmin(false);
                            setIsSubadmin(true);
                            setIsTechnician(false);
                            setIsUser(false);
                            break;

                        case 'technician':
                            const now = new Date();
                            const expirationTime = now.getTime() + 8 * 60 * 60 * 1000;
                            const department = {
                                value: staff.data.staff.department[0],
                                expiry: expirationTime
                            };
                            localStorage.setItem('department', JSON.stringify(department));
                            setIsSuperAdmin(false);
                            setIsAdmin(false);
                            setIsSubadmin(false);
                            setIsTechnician(true);
                            setIsUser(false);
                            break;

                        case 'user':
                            setIsSuperAdmin(false);
                            setIsAdmin(false);
                            setIsSubadmin(false);
                            setIsTechnician(false);
                            setIsUser(true);
                            break;

                        default:
                            navigate(`/404`);
                    }
                };
            } catch (error) {
                console.log(error.message);
            }
        }
        checkAuth();
    }, [id, navigate, refresh]);

    return (
        <Fragment>
            <DashBoard />
            {isSuperAdmin && <SuperAdmin />}
            {isAdmin && <Admin />}
            {isSubadmin && <Subadmin />}
            {isTechnician && <Technician />}
            {isUser && <User />}
        </Fragment>
    );
};

export default Home;