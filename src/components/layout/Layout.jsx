import React, { useContext, useEffect } from 'react';
import Sidebar from './sidebar/Sidebar';
import classes from './Layout.module.css';
import Navbar from './navbar/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';
import getItemWithExpiry from '../../utils/expiryFunction';

const Layout = () => {
    const idReference = getItemWithExpiry('id');
    const id = idReference ? idReference.value : null;
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.pathname !== '/login' && window.location.pathname !== '/forgotpassword') {
          const interval = setInterval(() => {
            const idItem = getItemWithExpiry('id');
            const tokenItem = getItemWithExpiry('token');
            if (!idItem && !tokenItem) {
              authCtx.onLogout();
              navigate('/login');
              return;
            }
            const now = new Date().getTime();
            if (now > idItem.expiry || now > tokenItem.expiry) {
              authCtx.onLogout();
              navigate('/login');
              return;
            }
          }, 1000);
          return () => clearInterval(interval);
        }
      }, [authCtx, navigate]);
    
      useEffect(() => {
        const email = getItemWithExpiry('email');
        const now = new Date().getTime();
        if (email) {
          if (now > email.expiry) {
            authCtx.onLogout();
            navigate('/login');
            return;
          }
        }
      }, [authCtx, navigate]);
    
      useEffect(() => {
        if (window.location.pathname !== '/forgotpassword') {
          if (!id) {
            navigate('/login')
          }
        }
      }, [id, navigate]);

    return (
        <div className={classes.mainLayout}>
            <Sidebar />
            <div className={classes.rightLayout}>
                <Navbar />
                <div className={classes.content}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;