import React from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    email: '',
    onLogout: () => { },
    onLogin: (email) => { }
});

export default AuthContext;