import React, { useEffect, useState } from 'react';
import classes from './User.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const User = () => {
    const [userDetails , setUserDetails] = useState({});
    const id = localStorage.getItem('id');

    useEffect (() => {
        const getUserName = async () => {
            try {
                const staff = await axios.get(`/api/staff/staffdetails/${id}`);
                setUserDetails(staff.data.staff);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to fetch staff'
                  });
            }
        }
        getUserName();
    }, [id]);

    return (
        <div className="row">
            <h1 className="d-flex justify-content-center mt-5">
                Welcome {userDetails.firstname}
            </h1>
            <div className="col-4">
                <div className={classes.step}>
                    <h2>Concern Tickets</h2>

                    <br />
                    <div>
                        <ol>
                            <li>1.	&nbsp;Log in to the Help Desk portal using your company credentials.</li>
                            <li>2.	&nbsp;Click on the "Submit a Ticket" button.</li>
                            <li>3. 	&nbsp;Select the "Concern" ticket type.</li>
                            <li>4.	&nbsp;Fill out the ticket form, providing detailed information about the issue you are facing.</li>
                            <li>5.	&nbsp;Attach any relevant files or screenshots, if applicable.</li>
                            <li>6.	&nbsp;Click "Submit" to send the ticket to the Help Desk.</li>
                        </ol>
                    </div>  
                </div>

            </div>
            <div className="col-4">
                <div className={classes.step}>
                    <h2>Request Tickets</h2>
                    
                    <br />
                    <div>
                        <ol>
                            <li>1.	&nbsp;Log in to the Help Desk portal using your company credentials.</li>
                            <li>2.	&nbsp;Click on the "Submit a Ticket" button.</li>
                            <li>3. 	&nbsp;Select the "Concern" ticket type.</li>
                            <li>4.	&nbsp;Fill out the ticket form, providing detailed information about the issue you are facing.</li>
                            <li>5.	&nbsp;Attach any relevant files or screenshots, if applicable.</li>
                            <li>6.	&nbsp;Click "Submit" to send the ticket to the Help Desk.</li>
                        </ol>
                    </div>  
                </div>
            </div>
            <div className="col-4">
                <div className={classes.step}>
                    <h2>Contact List</h2>
                    
                    <br />
                    <div>
                        <ol>
                            <li>1.	&nbsp;Log in to the Help Desk portal using your company credentials.</li>
                            <li>2.	&nbsp;Click on the "Submit a Ticket" button.</li>
                            <li>3. 	&nbsp;Select the "Concern" ticket type.</li>
                            <li>4.	&nbsp;Fill out the ticket form, providing detailed information about the issue you are facing.</li>
                            <li>5.	&nbsp;Attach any relevant files or screenshots, if applicable.</li>
                            <li>6.	&nbsp;Click "Submit" to send the ticket to the Help Desk.</li>
                        </ol>
                    </div>  
                </div>
            </div>

        </div>
    );
};

export default User;