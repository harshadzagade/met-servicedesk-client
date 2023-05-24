import React from 'react';
import classes from './DataPerPage.module.css'

const DataPerPage = (props) => {
    return (
        <label className={`${classes.dropdown}`}>
            Show Rows
            <div className={`${classes.ddButton}`}>
                {props.numberOfPages}
            </div>
            <input type="checkbox" className={`${classes.ddInput}`} id="test" />
            <ul className={`${classes.ddMenu}`}>
                <li onClick={() => props.setNumberOfPages(10)}>10</li>
                <li onClick={() => props.setNumberOfPages(20)}>20</li>
                <li onClick={() => props.setNumberOfPages(30)}>30</li>
            </ul>
        </label>
    );
};

export default DataPerPage;