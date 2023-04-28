import React from 'react';
import styles from './Card.module.css';

const Card = (props) => {
    const classes = `${styles.card} ` + props.className; // so as to allow other classes to append it, video number 40 udemy
    return (
        <div className={classes} onClick={props.onClick}>{props.children}</div>
    );
};

export default Card;