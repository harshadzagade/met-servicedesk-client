import React from "react";

const AdminContext = React.createContext({
    department: '',
    setDepartment: (department) => { }
});

export default AdminContext;