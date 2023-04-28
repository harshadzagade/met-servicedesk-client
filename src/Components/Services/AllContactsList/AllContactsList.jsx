import React, { Fragment, useEffect, useState } from 'react';
import classes from './AllContactsList.module.css';
import axios from 'axios';
import SingleContact from './SingleContact/SingleContact';
import SmallSingleContact from './SmallSingleContact/SmallSingleContact';

const AllContactsList = () => {
    const windowWidth = window.innerWidth;
    const [contactsList, setContactsList] = useState([]);
    const [smallDevice, setSmallDevice] = useState(false);

    useEffect(() => {
        if (windowWidth < 768) {
            setSmallDevice(true);
        } else {
            setSmallDevice(false);
        }
    }, [windowWidth]);

    useEffect(() => {
        const getList = async () => {
            const list = await axios.get(`http://localhost:8001/staff/contacts`);
            setContactsList(list.data.contacts);
        };
        getList();
    }, []);
    return (
        <Fragment>
            {contactsList.length > 0 ?
                <Fragment>
                    {smallDevice &&
                        <Fragment>
                            {
                                contactsList.map((contact) =>
                                    <SmallSingleContact key={contact.id} id={contact.id} name={contact.firstname + ' ' + contact.lastname} phone={contact.phoneNumber} extension={contact.contactExtension} />
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
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Contact Extension</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        contactsList.map((contact) =>
                                            <SingleContact key={contact.id} id={contact.id} name={contact.firstname + ' ' + contact.lastname} phone={contact.phoneNumber} extension={contact.contactExtension} />
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </Fragment>
                :
                <div className={`${classes.contactsNoData}`}>No staff added</div>
            }
        </Fragment>
    );
};

export default AllContactsList;