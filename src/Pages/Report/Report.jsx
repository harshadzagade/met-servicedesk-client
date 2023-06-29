import React, { useEffect, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuperadminReport from '../../Components/ReportPage/SuperadminReport/SuperadminReport';
import AdminReport from '../../Components/ReportPage/AdminReport/AdminReport';
import TechnicianReport from '../../Components/ReportPage/TechnicianReport/TechnicianReport';


const Report = () => {
    const id = localStorage.getItem('id');
    const navigate = useNavigate();
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
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
                        setIsTechnician(false);
                        break;

                    case 'admin':
                        setIsSuperAdmin(false);
                        setIsAdmin(true);
                        setIsTechnician(false);
                        break;

                    case 'technician':
                        setIsSuperAdmin(false);
                        setIsAdmin(false);
                        setIsTechnician(true);
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
            {isSuperAdmin && <SuperadminReport />}
            {isAdmin && <AdminReport />}
            {isTechnician && <TechnicianReport />}
        </Fragment>
    );
};

export default Report;