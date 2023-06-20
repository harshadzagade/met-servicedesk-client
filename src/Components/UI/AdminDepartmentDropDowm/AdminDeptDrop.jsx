import React from 'react';
import classes from './AdminDeptDrop.module.css'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
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
      const departments = await axios.get(`http://localhost:8001/api/staff/admin/admindepartments/${id}`);
      setDepartments(departments.data.departments);
    };
    getDepartments();
  }, [id,props]);
  return (
    <label className={classes.dropdown}>
      <div className={classes.ddButton}>
        {adminCtx.department === '' ? 'Department' : adminCtx.department}
      </div>
      <input type="checkbox" className={classes.ddInput} id="test" />
      <ul className={classes.ddMenu}>
        {departments.map((department) => (<li value={department} onClick={() => handleDepartmentClick(department)}>{department}</li>))}
      </ul>
    </label>
  )
}

export default AdminDeptDrop