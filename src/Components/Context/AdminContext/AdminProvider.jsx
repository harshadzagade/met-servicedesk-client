import { useState } from "react";
import AdminContext from "./AdminContext";

const AdminProvider = props => {
    const [department, setDepartment] = useState('');
    const [approval, setApproval] = useState('');

    const setDepartmentHandler = department => {
        sessionStorage.setItem('department', department);
        setDepartment(department);
    };

    const setApprovalHandler = value => {
        sessionStorage.setItem('approval', approval);
        setApproval(value);
    };

    const adminContext = {
        department: department || sessionStorage.getItem('department') || '',
        approval: approval || sessionStorage.getItem('approval'),
        setDepartment: setDepartmentHandler,
        setApproval: setApprovalHandler
    };
    return (
        <AdminContext.Provider value={adminContext}>{props.children}</AdminContext.Provider>
    );
};

export default AdminProvider;