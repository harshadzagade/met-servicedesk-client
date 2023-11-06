import React, { useEffect, useState } from 'react';
import classes from './Policies.module.css';
import axios from 'axios';
import getItemWithExpiry from '../../Utils/expiryFunction';

const Policies = () => {
  const idReference = getItemWithExpiry('id');
  const id = idReference ? idReference.value : null;
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSubadmin, setIsSubadmin] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await axios.get(`/api/staff/check/${id}`);
        switch (res.data.role) {
          case 'superadmin':
            setIsSuperAdmin(true);
            setIsAdmin(false);
            setIsSubadmin(false);
            setIsUser(false);
            break;

          case 'admin':
            setIsSuperAdmin(false);
            setIsAdmin(true);
            setIsSubadmin(false);
            setIsUser(false);
            break;

          case 'subadmin':
            setIsSuperAdmin(false);
            setIsAdmin(false);
            setIsSubadmin(true);
            setIsUser(false);
            break;

          case 'user':
            setIsSuperAdmin(false);
            setIsAdmin(false);
            setIsSubadmin(false);
            setIsUser(true);
            break;

          default:
            break;
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    checkRole();
  }, [id]);

  return (
    <div className="row " >

      {(isSuperAdmin || isAdmin || isSubadmin) && <div className="col-4">
        <div className={`${classes.downloadpdf}  nopadding`}>
          <img src="/assets/img/pdfimg.jpg" alt="" className="img-fluid" />
          <a href="/assets/PDF/Step by Step guide of helpdesk service for admin - New.pdf" target="_blank">Admin Module PDF</a>
        </div>
      </div>}
      {(isSuperAdmin || isUser) && <div className="col-4">
        <div className={`${classes.downloadpdf}  nopadding`}>
          <img src="/assets/img/pdfimg.jpg" alt="" className="img-fluid" />
          <a href="/assets/PDF/Step by Step guide of helpdesk service for Staff New.pdf" target="_blank">User Module PDF</a>
        </div>
      </div>
      }
      <div className="col-4">
        <div className={`${classes.downloadpdf}  nopadding`}>
          <img src="/assets/img/pdfimg.jpg" alt="" className="img-fluid" />
          <a href="/assets/PDF/Holiday List 2023.pdf" target="_blank">Holidays PDF</a>
        </div>
      </div>
    </div>
  );
};

export default Policies;