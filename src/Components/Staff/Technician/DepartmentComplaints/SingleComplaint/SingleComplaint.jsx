import React from 'react';
import classes from './SingleComplaint.module.css';
import { useNavigate } from 'react-router-dom';

const SingleComplaint = (props) => {
    const navigate = useNavigate();
    return (
        <tr className={`${classes.singleTableRow}`} onClick={() => navigate(`/technician/complaintdetails/${props.id}`)}>
            <th scope="row">{props.subject}</th>
            <td>{props.name}</td>
            <td>{props.department}</td>
            <td>{props.category}</td>
            <td>{props.priority}</td>
            <td>{props.status}</td>
        </tr>
    );
};

export default SingleComplaint;