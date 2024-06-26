import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuperadminRequest from '../../Components/RequestPage/SuperadminRequest/SuperadminRequest';
import UserRequest from '../../Components/RequestPage/UserRequest/UserRequest';
import AdminRequest from '../../Components/RequestPage/AdminRequest/AdminRequest';
import Technician from '../../Components/RequestPage/TechnicianRequest/Technician';
import SubadminRequest from '../../Components/RequestPage/SubadminRequest/SubadminRequest';
import getItemWithExpiry from '../../Utils/expiryFunction';

const Request = () => {
    const navigate = useNavigate();
    const location = useLocation() || null;
    const idReference = getItemWithExpiry('id');
    const id = idReference ? idReference.value : null;
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

                    case 'engineer':
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
                        break;
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        checkAuth();
    }, [id, navigate, refresh]);

    return (
        <Fragment>
            {isSuperAdmin && <SuperadminRequest />}
            {isAdmin && <AdminRequest />}
            {isSubadmin && <SubadminRequest />}
            {isTechnician && <Technician />}
            {isUser && <UserRequest />}
        </Fragment>
    );
};

export default Request;