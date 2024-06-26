import React, { useEffect, useState } from 'react';
import classes from './UpdateStaffDetails.module.css';
import Modal from '../../../UI/Modal/Modal';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Fragment } from 'react';
import { Bars } from 'react-loader-spinner';
import getItemWithExpiry from '../../../../Utils/expiryFunction';

const UpdateStaffDetails = (props) => {
    const idReference = getItemWithExpiry('id');
    const subadminId = idReference ? idReference.value : null;
    const id = useParams();
    const [staff, setStaff] = useState({});
    const [updateRole, setUpdateRole] = useState(staff.role);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const staff = await axios.get(`/api/staff/staffdetails/${id.staffId}`);
                setStaff(staff.data.staff);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchStaff();
    }, [id.staffId]);

    useEffect(() => {
        setUpdateRole(staff.role);
    }, [staff]);

    const handleSubmitClick = async (id, role) => {
        try {
            setShowLoading(true);
            await axios.put(`/api/staff/subadmin/staffdetails/updateStaff/${id}`, { subadminId: subadminId, role: role });
            Swal.fire(
                'Updated employee role',
                'You have updated employee role successfully',
                'success'
            );
        } catch (error) {
            if (error.response.status === 422 || error.response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to update employee'
                });
            } else {
                console.log(error.message);
            }
        } finally {
            setShowLoading(false);
        }
        props.onConfirm();
    };

    const handleChange = (e) => {
        setUpdateRole(e.target.value);
    };

    return (
        <Modal>


            <Fragment>
                <div>
                    <h1>Update Role</h1>
                </div>
                <div className={classes.detail}>
                    {showLoading && (
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
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
                    {!showLoading &&
                        <div>
                            <div className={classes.myform}>
                                <div className={classes.department}>
                                    <label className="ld">Role:</label>
                                    <select className={`${classes.selectUSer} dept-select`} value={updateRole} name='role' onChange={handleChange}>
                                        <option value="engineer">Engineer</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                                <div className={classes.detailsBtns}>
                                    <button className={classes.updateBtn} onClick={() => handleSubmitClick(id.staffId, updateRole)}>Update</button>
                                    <button className={classes.deleteBtn} onClick={() => props.onConfirm()}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </Fragment>
        </Modal>
    );
};

export default UpdateStaffDetails;