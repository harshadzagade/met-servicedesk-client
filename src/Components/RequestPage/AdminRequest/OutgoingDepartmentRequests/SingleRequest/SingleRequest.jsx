import React, { useContext } from 'react';
import classes from './SingleRequest.module.css';
import { useNavigate } from 'react-router-dom';
import AdminContext from '../../../../../Context/AdminContext/AdminContext';

const SingleRequest = (props) => {
    const navigate = useNavigate();
    const adminCtx = useContext(AdminContext);
    const handleRequestClick = () => {
        adminCtx.setApproval('1');
        navigate(`/requestdetails/${props.id}`);
    };
    return (
        <tr className={`${classes.singleTableRow}`} onClick={handleRequestClick}>
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