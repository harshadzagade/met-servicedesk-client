import React, { useEffect, useState } from 'react';
import '../../css/style.css';
import classes from './Complaint.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import UserComplaint from '../../Components/ComplaintPage/UserComplaint/Complaint';
import { Fragment } from 'react';
import SuperAdminComplaint from '../../Components/ComplaintPage/SuperAdminComplaint/SuperAdminComplaint';
import AdminComplaint from '../../Components/ComplaintPage/AdminComplaint/AdminComplaint';
import TechnicianComplaint from '../../Components/ComplaintPage/TechnicianComplaint/TechnicianComplaint';

const Complaint = () => {
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
          {isSuperAdmin && <SuperAdminComplaint />}
          {isAdmin && <AdminComplaint />}
          {isTechnician && <TechnicianComplaint />}
          {isUser && <UserComplaint />}
      </Fragment>
  );
};
export default Complaint; 