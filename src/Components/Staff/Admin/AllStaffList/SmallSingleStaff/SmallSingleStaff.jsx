import React from 'react';
import Card from '../../../../UI/Card/Card';
import { useNavigate } from 'react-router-dom';
import classes from './SmallSingleStaff.module.css';

const SmallSingleStaff = (props) => {
    const navigate = useNavigate();
    return (
        <Card className={`${classes.smallSingleComponent} mt-2 mx-3 py-2 px-2`} onClick={() => { navigate(`/admin/${props.id}`); }}>
            <div className={`${classes.leftElements}`}>
                <div className={`${classes.name}`}>{props.name}</div>
                <div className={`${classes.role}`}>{props.role}</div>
            </div>
            <div className={`${classes.rightElements}`}>
                <div className={`text-secondary ${classes.email}`}>{props.email}</div>
                <div className={`${classes.department} badge badge-dark`}>{props.department}</div>
            </div>
        </Card>
    );
};

export default SmallSingleStaff;