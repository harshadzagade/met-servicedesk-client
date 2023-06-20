import React from "react";

const AdminContext = React.createContext({
    department: '',
    approval: '',
    setDepartment: (department) => { },
    setApproval: (approval) => { }
});

export default AdminContext;