import React, { Fragment, useEffect, useState } from 'react';
import classes from './AllContactsList.module.css';
import axios from 'axios';
import SingleContact from '../SingleContact/SingleContact';
import SmallSingleContact from '../SmallSingleContact/SmallSingleContact';

const AllContactsList = () => {
    const id = localStorage.getItem('id');
    const windowWidth = window.innerWidth;
    const [contactsList, setContactsList] = useState([]);
    const [showPhone, setShowPhone] = useState(false);
    const [smallDevice, setSmallDevice] = useState(false);

    useEffect(() => {
        if (contactsList.length > 0) {
            if (Object.hasOwn(contactsList[0], 'phoneNumber')) {
                setShowPhone(true);
            } else {
                setShowPhone(false);
            }
        }
    }, [contactsList])

    useEffect(() => {
        if (windowWidth < 768) {
            setSmallDevice(true);
        } else {
            setSmallDevice(false);
        }
    }, [windowWidth]);

    useEffect(() => {
        const getList = async () => {
            const list = await axios.get(`http://localhost:8001/api/staff/contacts/${id}`);
            setContactsList(list.data.contacts);
        };
        getList();
    }, [id]);
    
    return (
        <Fragment>
            {contactsList.length > 0 ?
                <Fragment>
                    {smallDevice &&
                        <Fragment>
                            {
                                contactsList.map((contact, key) =>
                                    <SmallSingleContact key={key} name={contact.firstname + ' ' + contact.lastname} department={contact.department} phone={contact.phoneNumber} extension={contact.contactExtension} showPhone={showPhone} />
                                )
                            }
                        </Fragment>
                    }
                    {!smallDevice &&
                        <div className={`mx-3 mt-3`}>
                            <table className={`table ${classes.largeTable} overflow-hidden`}>
                                <thead className={`thead-light`}>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Department</th>
                                        {showPhone && <th scope="col">Phone Number</th>}
                                        <th scope="col">Contact Extension</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        contactsList.map((contact, key) =>
                                            <SingleContact key={key} name={contact.firstname + ' ' + contact.lastname} department={contact.department} phone={contact.phoneNumber} extension={contact.contactExtension} showPhone={showPhone} />
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </Fragment>
                :
                <div className={`${classes.contactsNoData}`}>No contacts added</div>
            }
        </Fragment>
    );
};

export default AllContactsList;