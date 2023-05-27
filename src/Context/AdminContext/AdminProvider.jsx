import { useState } from "react";
import AdminContext from "./AdminContext";

const AdminProvider = props => {
    const [department, setDepartment] = useState('');

    const setDepartmentHandler = department => {
        sessionStorage.setItem('department', department);
        setDepartment(department);
    }

    const adminContext = {
        department: department,
        setDepartment: setDepartmentHandler
    };
    return (
        <AdminContext.Provider value={adminContext}>{props.children}</AdminContext.Provider>
    );
};

export default AdminProvider;