import React, { useEffect, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuperadminReport from '../../Components/ReportPage/SuperadminReport/SuperadminReport';
import AdminReport from '../../Components/ReportPage/AdminReport/AdminReport';
import TechnicianReport from '../../Components/ReportPage/TechnicianReport/TechnicianReport';
import SubadminReport from '../../Components/ReportPage/SubadminReport/SubadminReport';
import getItemWithExpiry from '../../Utils/expiryFunction';

const Report = () => {
    const id = getItemWithExpiry('id');
    const navigate = useNavigate();
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSubadmin, setIsSubadmin] = useState(false);
    const [isTechnician, setIsTechnician] = useState(false);
    const [refresh, setRefresh] = useState(false);

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
                        break;

                    case 'admin':
                        setIsSuperAdmin(false);
                        setIsAdmin(true);
                        setIsSubadmin(false);
                        setIsTechnician(false);
                        break;

                    case 'subadmin':
                        setIsSuperAdmin(false);
                        setIsAdmin(false);
                        setIsSubadmin(true);
                        setIsTechnician(false);
                        break;

                    case 'engineer':
                        setIsSuperAdmin(false);
                        setIsAdmin(false);
                        setIsSubadmin(false);
                        setIsTechnician(true);
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
            {isSuperAdmin && <SuperadminReport />}
            {isAdmin && <AdminReport />}
            {isSubadmin && <SubadminReport />}
            {isTechnician && <TechnicianReport />}
        </Fragment>
    );
};

export default Report;