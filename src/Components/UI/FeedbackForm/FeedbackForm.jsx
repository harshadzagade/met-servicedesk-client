import React, { Fragment, useState } from 'react';
import Modal from '../Modal/Modal';
import classes from './FeedbackForm.module.css';
import { useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Bars } from 'react-loader-spinner';

const FeedbackForm = (props) => {
    const feedbackRef = useRef();
    const [showLoading, setShowLoading] = useState(false);

    const handleSubmit = async () => {
        const feedbackData = {
            ticketType: props.ticketType,
            ticketId: props.ticketId,
            department: props.department,
            feedback: feedbackRef.current.value
        };
        setShowLoading(true);
        try {
            await axios.post('/api/feedback', feedbackData);
            Swal.fire(
                'Feedback Submitted!',
                'You have submitted feedback successfully',
                'success'
            );
            props.onConfirm();
        } catch (error) {
            if (error.response.status === 401 || error.response.status === 403 || error.response.status === 422) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to send feedback'
                });
            } else {
                console.log(error.message);
            }
        } finally {
            setShowLoading(false);
        }
    };
    return (
        <Modal>
            {showLoading && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <h1>Registering Feedback</h1>
                    <div className='d-flex justify-content-center'>
                        <Bars
                            height="80"
                            width="80"
                            color="#CE1212"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div>
                </div>
            )}
            {
                !showLoading &&
                <Fragment>
                <div className={classes.feedback}>
                    <h2>Feedback:</h2>
                    <textarea className={classes.textArea} rows="4" cols="50" ref={feedbackRef} required />
                </div>
                <div className={classes.btn}>
                    <button className={classes.submitbtn} onClick={handleSubmit}>Submit</button>
                    <button className={classes.cancelbtn} onClick={props.onConfirm}>Cancel</button>
                </div>
            </Fragment>}
        </Modal>
    );
};

export default FeedbackForm;