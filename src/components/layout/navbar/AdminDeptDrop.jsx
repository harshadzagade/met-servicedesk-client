import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AdminContext from '../../../context/AdminContext/AdminContext';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import AuthContext from '../../../context/AuthContext/AuthContext';

const AdminDeptDrop = () => {
  const navigate = useNavigate();
  const adminCtx = useContext(AdminContext);
  const authCtx = useContext(AuthContext);
  const id = authCtx?.employeeInfo?.id;
  const [departments, setDepartments] = useState([]);

  const handleDepartmentClick = (department) => {
    console.log(department);
    adminCtx.setDepartment(department);
    navigate('/');
    sessionStorage.setItem('tab', 'home');
  };

  useEffect(() => {
    const getDepartments = async () => {
      try {
        if (id) {
          const response = await axios.get(`https://hello.helpdesk.met.edu/api/staff/admin/admindepartments/${id}`);
          setDepartments(response.data.departments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getDepartments();
  }, [id]);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="default" className={`m-0 text-white`}>
        {adminCtx.department === '' && departments.length > 0 ? departments[0] : adminCtx.department === '' ? 'Department' : adminCtx.department}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {departments.map((department, key) => (
          <Dropdown.Item key={key} onClick={() => handleDepartmentClick(department)}>
            {department}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AdminDeptDrop;
