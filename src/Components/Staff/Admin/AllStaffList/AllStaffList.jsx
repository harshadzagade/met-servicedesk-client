import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import SingleStaff from './SingleStaff/SingleStaff';
import classes from './AllStaffList.module.css';
import SmallSingleStaff from './SmallSingleStaff/SmallSingleStaff';
import AdminContext from '../../../../Context/AdminContext/AdminContext';

const AllStaffList = () => {
    const id = localStorage.getItem('id');
    const departmentCtx = useContext(AdminContext);
    const windowWidth = window.innerWidth;
    const [staffList, setStaffList] = useState([]);
    const [smallDevice, setSmallDevice] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (windowWidth < 768) {
            setSmallDevice(true);
        } else {
            setSmallDevice(false);
        }
    }, [windowWidth]);

    useEffect(() => {
        const getList = async () => {
            try {
                const list = await axios.get(`http://localhost:8001/api/staff/admin/allstaff/${id}/${departmentCtx.department}`);
                if (list.data.totalStaff.length === 0) {
                    setErrorMessage('No staff available')
                }
                setStaffList(list.data.totalStaff);
            } catch (error) {
                setErrorMessage(`${error.response.data.message}`);
            }
        };
        if (departmentCtx.department) {
            getList();
        } else {
            setErrorMessage('Please select department')
        }
    }, [id, departmentCtx.department]);
    return (
        <Fragment>
            {staffList.length > 0 ?
                <Fragment>
                    {smallDevice &&
                        <Fragment>
                            {
                                staffList.map((staff) =>
                                    <SmallSingleStaff key={staff.id} id={staff.id} name={staff.firstname + ' ' + staff.lastname} email={staff.email} role={staff.role} department={staff.department} />
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
                                            <SingleStaff key={staff.id} id={staff.id} name={staff.firstname + ' ' + staff.lastname} email={staff.email} role={staff.role} department={staff.department} />
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </Fragment>
                :
                <div className={`${classes.homeNoData}`}>{errorMessage}</div>
            }
        </Fragment>
    );
};

export default AllStaffList;