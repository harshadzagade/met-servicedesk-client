import React from "react";

const DepartmentContext = React.createContext({
    department: '',
    setDepartment: (department) => { }
});

export default DepartmentContext;