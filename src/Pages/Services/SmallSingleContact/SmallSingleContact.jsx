import React from 'react';
import Card from '../../../Components/UI/Card/Card';
import classes from './SmallSingleContact.module.css';

const SmallSingleContact = (props) => {
    return (
        <Card className={`${classes.smallSingleComponent} mt-2 mx-3 py-2 px-2`}>
            <div className={`${classes.leftElements}`}>
                <div className={`${classes.name}`}>{props.name}</div>
                <div className={`${classes.extension}`}>{props.extension}</div>
            </div>
            {
                props.showPhone &&
                <div className={`${classes.rightElements}`}>
                    <div className={`text-secondary ${classes.phone}`}>{props.phone}</div>
                    <div className={`${classes.department} badge badge-dark`}>{props.department}</div>
                </div>
            }
        </Card>
    );
};

export default SmallSingleContact;