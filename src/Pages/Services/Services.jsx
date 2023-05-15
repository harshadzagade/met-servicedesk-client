import React, { Fragment } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import AllContactsList from './AllContactsList/AllContactsList';

const Services = () => {
    return (
        <Fragment>
            <NavBar tab={'services'} />
            <AllContactsList />
        </Fragment>
    );
};

export default Services;