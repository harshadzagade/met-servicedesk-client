import React, { useContext, useEffect, useState } from 'react';
import classes from './SingleRequest.module.css';
import { useNavigate } from 'react-router-dom';
import DepartmentContext from '../../../../../Context/DepartmentContext/DepartmentContext';

const SingleRequest = (props) => {
    const navigate = useNavigate();
    const departmentCtx = useContext(DepartmentContext);
    const [approvalNumber, setApprovalNumber] = useState(1);
    useEffect(() => {
        if (departmentCtx.department === props.department) {
            setApprovalNumber(2);
        } else {
            setApprovalNumber(1);
        }
    }, [approvalNumber, departmentCtx.department, props.department]);
    return (
        <tr className={`${classes.singleTableRow}`} onClick={() => navigate(`/requestdetails/${props.id}`, { state: { approval: approvalNumber } })}>
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