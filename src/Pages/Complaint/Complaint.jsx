import React, { Fragment, useEffect, useState } from 'react';
import '../../css/style.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import UserComplaint from '../../Components/ComplaintPage/UserComplaint/Complaint';
import SuperAdminComplaint from '../../Components/ComplaintPage/SuperAdminComplaint/SuperAdminComplaint';
import AdminComplaint from '../../Components/ComplaintPage/AdminComplaint/AdminComplaint';
import TechnicianComplaint from '../../Components/ComplaintPage/TechnicianComplaint/TechnicianComplaint';
import SubadminComplaint from '../../Components/ComplaintPage/SubadminComplaint/SubadminComplaint';
import getItemWithExpiry from '../../Utils/expiryFunction';

const Complaint = () => {
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
                };
            } catch (error) {
                console.log(error.message);
            }
        }
        checkAuth();
    }, [id, navigate, refresh]);

    return (
        <Fragment>
            {isSuperAdmin && <SuperAdminComplaint />}
            {isAdmin && <AdminComplaint />}
            {isSubadmin && <SubadminComplaint />}
            {isTechnician && <TechnicianComplaint />}
            {isUser && <UserComplaint />}
        </Fragment>
    );
};

export default Complaint; 