import React, { useEffect, useReducer, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import AuthContext from './AuthContext';
import getItemWithExpiry from '../../utils/expiryFunction';
import axios from 'axios';

const defaultAuthState = {
    isLoggedIn: false,
    email: ''
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
    const [employeeDetails, setEmployeeDetails] = useState(null);

    useEffect(() => {
        const checkToken = () => {
            const storageToken = getItemWithExpiry('token');
            if (storageToken) {
                const token = jwtDecode(storageToken.value);
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
        localStorage.removeItem('department');
        localStorage.removeItem('email');
        sessionStorage.removeItem('department');
        sessionStorage.removeItem('approval');
        sessionStorage.removeItem('tab');
        dispatchAuthAction({ type: "LOGIN", val: false });
        dispatchAuthAction({ type: "EMAIL", val: '' });
    };

    const loginHandler = email => {
        dispatchAuthAction({ type: "LOGIN", val: true });
        dispatchAuthAction({ type: "EMAIL", val: email });
    };

    const employeeInfoHandler = async (id) => {
        try {
            const employeeData = await axios.get(`https://hello.helpdesk.met.edu/api/staff/staffdetails/${id}`);
            setEmployeeDetails(employeeData.data.staff);
        } catch (error) {
            console.log(error.message);
        }
    };

    const authContext = {
        isLoggedIn: authState.isLoggedIn,
        email: authState.email,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        employeeInfo: employeeDetails,
        setEmployeeInfoId: employeeInfoHandler
    };

    return (
        <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>
    );
};

export default AuthProvider;