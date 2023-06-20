import React from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    email: '',
    onLogout: () => { },
    onLogin: (id, email) => { }
});

export default AuthContext;