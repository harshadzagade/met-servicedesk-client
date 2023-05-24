import { useState } from "react";
import DepartmentContext from "./DepartmentContext";

const DepartmentProvider = props => {
    const [department, setDepartment] = useState('');

    const setDepartmentHandler = department => {
        sessionStorage.setItem('department', department);
        setDepartment(department);
    }

    const departmentContext = {
        department: department,
        setDepartment: setDepartmentHandler
    };
    return (
        <DepartmentContext.Provider value={departmentContext}>{props.children}</DepartmentContext.Provider>
    );
};

export default DepartmentProvider;