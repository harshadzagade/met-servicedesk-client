import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuperadminRequest from '../../Components/RequestPage/SuperadminRequest/SuperadminRequest';
import UserRequest from '../../Components/RequestPage/UserRequest/UserRequest';
import AdminRequest from '../../Components/RequestPage/AdminRequest/AdminRequest';
import Technician from '../../Components/RequestPage/TechnicianRequest/Technician';

const Request = () => {
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
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
        checkAuth();
    }, [id, navigate, refresh]);

    return (
        <Fragment>
            {isSuperAdmin && <SuperadminRequest />}
            {isAdmin && <AdminRequest />}
            {isTechnician && <Technician />}
            {isUser && <UserRequest />}
        </Fragment>
    );
};

export default Request;