import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './SingleStaffRequest.module.css';

const SingleStaffRequest = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        // navigate(`/superadmin/${props.id}`);
    };
    return (
        <tr className={`${classes.singleTableRow}`} onClick={handleClick}>
            <th scope="row">{props.subject}</th>
            <td>{props.name}</td>
            <td>{props.department}</td>
            <td>{props.category}</td>
            <td>{props.priority}</td>
            <td>{props.status}</td>
            <td>{props.approval1 === 1? 'approved' : 'not approved'}</td>
            <td>{props.approval2 === 1? 'approved' : 'not approved'}</td>
        </tr>
    );
};

export default SingleStaffRequest;