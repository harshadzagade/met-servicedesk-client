import React from 'react';
import classes from './DataPerPage.module.css';

const DataPerPage = (props) => {
    return (
        // <label className={`${classes.dropdown}`}>
        //     <div className={`${classes.ddButton}`}>
        //         {props.numberOfPages}
        //     </div>
        //     <input type="checkbox" className={`${classes.ddInput}`} id="test" />
        //     <ul className={`${classes.ddMenu}`}>
        //         <li onClick={() => props.setNumberOfPages(10)}>10</li>
        //         <li onClick={() => props.setNumberOfPages(25)}>25</li>
        //         <li onClick={() => props.setNumberOfPages(50)}>50</li>
        //     </ul>
        // </label>
        <div>
            <ul class={classes.menumain}>
                <li className={classes.mainItem}>{props.numberOfPages}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-caret-up-fill mb-1" viewBox="0 0 16 16">
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                </svg>
                    <ul class={classes.submenu}>
                        <li className={classes.childItems} onClick={() => props.setNumberOfPages(10)}>10</li>
                        <li className={classes.childItems} onClick={() => props.setNumberOfPages(25)}>25</li>
                        <li className={classes.childItems} onClick={() => props.setNumberOfPages(50)}>50</li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default DataPerPage;