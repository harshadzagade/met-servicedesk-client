import React from 'react';
import classes from './SingleContact.module.css';

const SingleContact = (props) => {
    return (
        <tr className={`${classes.singleTableRow}`}>
            <th scope="row">{props.name}</th>
            <td>{props.department}</td>
            {props.showPhone && <td>{props.phone}</td>}
            <td>{props.extension}</td>
        </tr>
    );
};

export default SingleContact;