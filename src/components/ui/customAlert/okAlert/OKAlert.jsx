import React from 'react';
import classes from './OKAlert.module.css';
import { motion } from 'framer-motion';

function OKAlert({ message, onClose }) {
    return (
        <div className={classes.customAlert}>
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.1 }} className={classes.customAlertContent}>
                <span className={classes.header}>{message.header}</span>
                <div className={classes.bottomContent}>
                    <motion.svg initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, ease: [0, 0.71, 0.2, 1.01], scale: { type: "spring", damping: 10, stiffness: 100, restDelta: 0.001 } }} xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                    </motion.svg>
                    <span className={classes.submessage}>{message.submessage}</span>
                    <button className={classes.customAlertOkButton} onClick={onClose}>
                        OK
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default OKAlert;