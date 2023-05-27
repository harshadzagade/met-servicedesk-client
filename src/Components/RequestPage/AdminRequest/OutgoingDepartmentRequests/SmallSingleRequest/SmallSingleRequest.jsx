import React, { useContext } from 'react';
import Card from '../../../../UI/Card/Card';
import classes from './SmallSingleRequest.module.css';
import { useNavigate } from 'react-router-dom';
import AdminContext from '../../../../../Context/AdminContext/AdminContext';

const SmallSingleRequest = (props) => {
    const navigate = useNavigate();
    const adminCtx = useContext(AdminContext);
    const handleRequestClick = () => {
        adminCtx.setApproval('1');
        navigate(`/requestdetails/${props.id}`);
    };
    return (
        <Card className={`${classes.smallSingleComponent} mt-2 mx-3 py-2 px-2`} onClick={handleRequestClick}>
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