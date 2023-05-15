import React, { Fragment, useEffect, useState } from 'react';
import NavBar from '../../../NavBar/NavBar';
import AllStaffList from './AllStaffList/AllStaffList';
import { useLocation } from 'react-router-dom';

const Trash = () => {
    const location = useLocation() || null;
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        setRefresh(false);
        if (location.state) {
            if (location.state.refreshTrash) {
                setRefresh(true);
            }
        }
        setRefresh(false);
    }, [refresh, location]);
    return (
        <Fragment>
            <NavBar tab={'trash'} />
            <AllStaffList />
        </Fragment>
    );
};

export default Trash;