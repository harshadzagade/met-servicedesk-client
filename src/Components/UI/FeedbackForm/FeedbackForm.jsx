import React from 'react';
import Modal from '../Modal/Modal';
import classes from './FeedbackForm.module.css';
import { useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const FeedbackForm = (props) => {
    const feedbackRef = useRef();

    const handleSubmit = async () => {
        const feedbackData = {
            ticketType: props.ticketType,
            ticketId: props.ticketId,
            feedback: feedbackRef.current.value
        };
        try {
            await axios.post('http://localhost:8001/api/feedback', feedbackData);
            Swal.fire(
                'Feedback Submitted!',
                'You have submitted feedback successfully',
                'success'
            );
            props.onConfirm();
        } catch (error) {
            if (error.response.status === 403) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to send feedback'
                });
            } else {
                console.log(error.message);
            }
        }
    };
    return (
        <Modal>
            <div className={classes.feedback}>
                <h2>Feedback:</h2>
                <textarea className={classes.textArea} rows="15" cols="50" ref={feedbackRef} />
            </div>
            <div className={classes.btn}>
                <button className={classes.submitbtn} onClick={handleSubmit}>Submit</button>
                <button className={classes.submitbtn} onClick={props.onConfirm}>Cancel</button>
            </div>
        </Modal>
    );
};

export default FeedbackForm;