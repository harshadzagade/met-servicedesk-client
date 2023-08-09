import React, { useEffect, useReducer } from 'react';
import jwtDecode from "jwt-decode";
import AuthContext from './AuthContext';

const defaultAuthState = {
    isLoggedIn: false,
    email: localStorage.getItem('email') || ''
};

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { isLoggedIn: action.val, email: state.email };
        case "EMAIL":
            return { isLoggedIn: state.isLoggedIn, email: action.val };
        default:
            return defaultAuthState;
    }
};

const AuthProvider = props => {
    const [authState, dispatchAuthAction] = useReducer(authReducer, defaultAuthState);

    useEffect(() => {
        const checkToken = () => {
            const storageToken = localStorage.getItem('token');
            if (storageToken) {
                const token = jwtDecode(storageToken);
                const email = authState.email
                if (email === token.email) {
                    dispatchAuthAction({ type: "LOGIN", val: true });
                }
            }
        };
        checkToken();
    }, [authState.email]);

    const logoutHandler = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        dispatchAuthAction({ type: "LOGIN", val: false });
        dispatchAuthAction({ type: "EMAIL", val: '' });
    };

    const loginHandler = email => {
        dispatchAuthAction({ type: "LOGIN", val: true });
        dispatchAuthAction({ type: "EMAIL", val: email });
        localStorage.setItem('email', email);
    };

    const authContext = {
        isLoggedIn: authState.isLoggedIn,
        email: authState.email,
        onLogout: logoutHandler,
        onLogin: loginHandler
    };
    return (
        <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>
    );
};

export default AuthProvider;