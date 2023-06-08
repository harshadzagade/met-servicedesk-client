import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SingleStaff from './SingleStaff/SingleStaff';
import SmallSingleStaff from './SmallSingleStaff/SmallSingleStaff';
import Swal from 'sweetalert2';
import classes from './AllStaffList.module.css';

const AllStaffList = () => {
    const navigate = useNavigate();
    const windowWidth = window.innerWidth;
    const [staffList, setStaffList] = useState([]);
    const [refresh, setRefresh] = useState(false);
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
            const list = await axios.get(`http://localhost:8001/api/trash/`);
            setStaffList(list.data.allStaff);
        };
        getList();
        setRefresh(false);
    }, [refresh]);

    const handleRestoreAllClick = () => {
        Swal.fire({
            title: 'Restore All Staff?',
            text: "All of your staff will be restored",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, restore it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:8001/api/trash/restoreall/');
                navigate('/', { state: { refreshSuperHome: true } });
                Swal.fire(
                    'Restored All Staff!',
                    'You have successfully restored all staff',
                    'success'
                )
            }
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: `${error.response.data.message}`,
                text: 'Unable to restore any staff'
            });
        });
    };

    const handleDeleteAllClick = () => {
        Swal.fire({
            title: 'Delete All Staff?',
            text: "All of your staff will be deleted permanently",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:8001/api/trash/removeall/');
                setRefresh(true);
                Swal.fire(
                    'Deleted All Staff!',
                    'You have successfully deleted all staff',
                    'success'
                )
            }
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: `${error.response.data.message}`,
                text: 'Unable to delete any staff'
            });
        });
    };

    return (
        <Fragment>
            {staffList.length > 0 ?
                <div>
                    <div className={`${classes.trashButtons}`}>
                        <button className={`${classes.restoreAllButton}`} onClick={handleRestoreAllClick}>Restore All Staff</button>
                        <button className={`${classes.deleteAllButton}`} onClick={handleDeleteAllClick}>Delete All Staff</button>
                    </div>
                </div>
                :
                <div className={`${classes.trashNoData}`}>No staff deleted</div>
            }
            {staffList.length > 0 &&
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
                            <table className={`table overflow-hidden ${classes.largeTable}`}>
                                <thead className={`thead-light`}>
                                    <tr>
                                        <th scope={`col`}>Name</th>
                                        <th scope={`col`}>E-Mail</th>
                                        <th scope={`col`}>Role</th>
                                        <th scope={`col`}>Department</th>
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
                </Fragment>}
        </Fragment>
    );
};

export default AllStaffList;