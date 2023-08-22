import React from 'react';
import classes from './CreateInstitute.module.css';
import Modal from '../../../Components/UI/Modal/Modal';
import { useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const CreateInstitute = (props) => {
  const instituteRef = useRef();

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/institute/createinstitute`, { institute: instituteRef.current.value });
      props.onConfirm();
      Swal.fire(
        'Institute Created!',
        'You have created institute successfully',
        'success'
      );
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Unable to create institute',
        text: `${error.message}`
      });
    }
  };

  return (
    <Modal>
      <div>
        <h1>Create Institute</h1>
      </div>
      <div className={classes.detail}>
        <form onSubmit={handleCreateSubmit}>
          <div className={classes.myform} >
            <div className={`${classes.institue}`}>
              <label>Institute:</label>
              <input type="text" className={classes.createstaffInput} placeholder="Enter Institute" ref={instituteRef} required />
            </div>
            <div className={classes.detailsBtns}>
              <button className={classes.updateBtn} type='submit'>Create</button>
              <button className={classes.deleteBtn} onClick={props.onConfirm}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateInstitute;