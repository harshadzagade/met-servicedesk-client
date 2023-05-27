import React, { useContext, useEffect, useState } from 'react';
import Card from '../../../../UI/Card/Card';
import classes from './SmallSingleRequest.module.css';
import { useNavigate } from 'react-router-dom';
import DepartmentContext from '../../../../../Context/DepartmentContext/DepartmentContext';

const SmallSingleRequest = (props) => {
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
        <Card className={`${classes.smallSingleComponent} mt-2 mx-3 py-2 px-2`} onClick={() => navigate(`/requestdetails/${props.id}`, { state: { approval: approvalNumber } })}>
            <div className={`${classes.leftElements}`}>
                <div className={`${classes.name}`}>{props.subject}</div>
                <div className={`${classes.role}`}>{props.category}</div>
            </div>
            <div className={`${classes.rightElements}`}>
                <div className={`text-secondary ${classes.email}`}>{props.name}</div>
                <div className={`${classes.department} badge badge-dark`}>{props.department}</div>
            </div>
            <div className={`${classes.rightElements}`}>
                <div className={`text-secondary ${classes.email}`}>HOD Approval: {props.approval1 === 1? 'approved' : 'not approved'}</div>
                <div className={`${classes.department} badge badge-danger`}>{props.status}</div>
            </div>
            <div className={`${classes.rightElements}`}>
                <div className={`text-secondary ${classes.email}`}>Admin Approval: {props.approval2 === 1? 'approved' : 'not approved'}</div>
                <div className={`${classes.department} badge badge-primary`}>{props.priority}</div>
            </div>
        </Card>
    );
};

export default SmallSingleRequest;