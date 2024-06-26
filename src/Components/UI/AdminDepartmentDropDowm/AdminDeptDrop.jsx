import React, { useEffect, useState, useContext } from 'react';
import classes from './AdminDeptDrop.module.css'
import axios from 'axios';
import AdminContext from '../../Context/AdminContext/AdminContext';
import getItemWithExpiry from '../../../Utils/expiryFunction';
import { useNavigate } from 'react-router-dom';

const AdminDeptDrop = (props) => {
  const navigate = useNavigate();
  const adminCtx = useContext(AdminContext);
  const idReference = getItemWithExpiry('id');
  const id = idReference ? idReference.value : null;
  const [departments, setDepartments] = useState([]);

  const handleDepartmentClick = (department) => {
    adminCtx.setDepartment(department);
    navigate('/');
    sessionStorage.setItem('tab', 'home');
  };

  useEffect(() => {
    const getDepartments = async () => {
      try {
        if (id) {
          const departments = await axios.get(`/api/staff/admin/admindepartments/${id}`);
          setDepartments(departments.data.departments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getDepartments();
  }, [id, props]);

  return (
    <div className="btn-group ">
      <button type="button" className={`${classes.searchButton} dropdown-toggle`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {adminCtx.department === '' ? 'Department' : adminCtx.department}
      </button>
      <div className="dropdown-menu">
        {departments.map((department, key) => (<li key={key} value={department} onClick={() => handleDepartmentClick(department)}>{department}</li>))}
      </div>
    </div>
  );
};

export default AdminDeptDrop;