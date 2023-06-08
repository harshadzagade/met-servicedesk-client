import React from 'react';
import classes from './SingleStaffComplaint.module.css';

const SingleStaffComplaint = (props) => {
    return (
        <tr className={`${classes.singleTableRow}`} onClick={() => props.setOpenDetails(true, props.id)}>
            <th scope="row">{props.subject}</th>
            <td>{props.name}</td>
            <td>{props.department}</td>
            <td>{props.category}</td>
            <td>{props.priority}</td>
            <td>{props.status}</td>
        </tr>
    );
};

export default SingleStaffComplaint;