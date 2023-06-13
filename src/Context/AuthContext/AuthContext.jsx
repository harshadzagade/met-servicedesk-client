import React from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    email: localStorage.getItem('email') || '',
    onLogout: () => { },
    onLogin: (email) => { }
});

export default AuthContext;