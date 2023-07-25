import React, { useEffect, useState, useContext } from 'react';
import classes from './AdminDeptDrop.module.css'
import axios from 'axios';
import AdminContext from '../../Context/AdminContext/AdminContext';

const AdminDeptDrop = (props) => {
  const adminCtx = useContext(AdminContext);
  const id = localStorage.getItem('id');
  const [departments, setDepartments] = useState([]);

  const handleDepartmentClick = (department) => {
    adminCtx.setDepartment(department);
  };

  useEffect(() => {
    const getDepartments = async () => {
      try {
        if (id) {
          const departments = await axios.get(`/api/staff/admin/admindepartments/${id}`);
          setDepartments(departments.data.departments);
        }
      } catch (error) {
        console.log(error.response.data.message);
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
        {departments.map((department) => (<li value={department} onClick={() => handleDepartmentClick(department)}>{department}</li>))}
      </div>
    </div>
  );
};

export default AdminDeptDrop;