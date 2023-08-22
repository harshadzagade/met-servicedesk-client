import React, { useRef } from 'react';
import classes from './EditInstitute.module.css';
import Modal from '../../../Components/UI/Modal/Modal';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditInstitute = (props) => {
  const instituteRef = useRef();

  const handleEditSubmit = async () => {
    try {
      await axios.put(`/api/institute/editinstitute/${props.instituteId}`, { instituteName: instituteRef.current.value });
      props.onConfirm();
      Swal.fire(
        'Institute Edited!',
        'You have edited institute successfully',
        'success'
      );
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Unable to edit institute',
        text: `${error.message}`
      });
    }
  };

  return (
    <Modal>
      <div>
        <h1>Edit Institute</h1>
      </div>
      <div className={classes.detail}>
        <div>
          <div className={classes.myform} >
            <div className={`${classes.institue}`}>
              <label>Institute:</label>
              <input type="text" className={classes.createstaffInput} defaultValue={props.instituteName} placeholder="Enter Institute" ref={instituteRef} required />
            </div>
            <div className={classes.detailsBtns}>
              <button className={classes.updateBtn} onClick={handleEditSubmit}>Edit</button>
              <button className={classes.deleteBtn} onClick={props.onConfirm}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditInstitute;