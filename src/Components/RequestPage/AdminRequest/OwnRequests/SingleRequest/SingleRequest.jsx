import React from 'react';
import classes from './SingleRequest.module.css';
import { useNavigate } from 'react-router-dom';

const SingleRequest = (props) => {
    const navigate = useNavigate();
    return (
        <tr className={`${classes.singleTableRow}`} onClick={() => navigate(`/requestdetails/${props.id}`)}>
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

export default SingleRequest;