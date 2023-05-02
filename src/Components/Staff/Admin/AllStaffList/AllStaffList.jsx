import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import SingleStaff from './SingleStaff/SingleStaff';
import classes from './AllStaffList.module.css';
import SmallSingleStaff from './SmallSingleStaff/SmallSingleStaff';

const AllStaffList = () => {
    const id = localStorage.getItem('id');
    const windowWidth = window.innerWidth;
    const [staffList, setStaffList] = useState([]);
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
            const list = await axios.get(`http://localhost:8001/staff/admin/allstaff/${id}`);
            setStaffList(list.data.totalStaff);
        };
        getList();
    }, [id]);
    return (
        <Fragment>
            {staffList.length > 0 ?
                <Fragment>
                    {smallDevice &&
                        <Fragment>
                            {
                                staffList.map((staff) =>
                                    <SmallSingleStaff key={staff.id} id={staff.id} name={staff.name} email={staff.email} role={staff.role} department={staff.department} />
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
                                        <th scope="col">E-Mail</th>
                                        <th scope="col">Role</th>
                                        <th scope="col">Department</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        staffList.map((staff) =>
                                            <SingleStaff key={staff.id} id={staff.id} name={staff.name} email={staff.email} role={staff.role} department={staff.department} />
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </Fragment>
                :
                <div className={`${classes.homeNoData}`}>No staff added</div>
            }
        </Fragment>
    );
};

export default AllStaffList;