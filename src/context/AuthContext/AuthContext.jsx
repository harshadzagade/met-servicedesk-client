import React from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    email: '',
    onLogout: () => { },
    onLogin: (email) => { },
    employeeInfo: {},
    setEmployeeInfoId: (id) => { }
});

export default AuthContext;