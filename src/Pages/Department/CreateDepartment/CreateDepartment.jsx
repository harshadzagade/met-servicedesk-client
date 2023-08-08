import React, { useRef, useState } from 'react';
import classes from './CreateDepartment.module.css';
import Modal from '../../../Components/UI/Modal/Modal';
import Swal from 'sweetalert2';
import axios from 'axios';

const CreateDepartment = (props) => {
  const departmentRef = useRef();
  const [input, setInput] = useState('');
  const [categoriesList, setCategoriesList] = useState([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [departmentType, setDepartmentType] = useState('');

  //department function 
  //set the department functionality
  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (key === ',' && trimmedInput.length && !categoriesList.includes(trimmedInput)) {
      e.preventDefault();
      setCategoriesList(prevState => [...prevState, trimmedInput]);
      setInput('');
    }

    if (key === "Backspace" && !input.length && categoriesList.length && isKeyReleased) {
      const tagsCopy = [...categoriesList];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setCategoriesList(tagsCopy);
      setInput(poppedTag);
    }
    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  const deleteTag = (index) => {
    setCategoriesList(prevState => prevState.filter((tag, i) => i !== index))
  };

  const handleCreateDepartment = async (e) => {
    e.preventDefault();
    if (departmentType === 'service' && (categoriesList.length === 0)) {
      Swal.fire({
        icon: 'error',
        title: `Please add categories`,
        text: `You haven't added any categories`
      });
    } else {
      try {
        const data = {
          department: departmentRef.current.value.toUpperCase().trim(),
          type: departmentType,
          category: departmentType === 'service' ? categoriesList : null
        };
        await axios.post(`/api/department/createdepartment`, data);
        props.onConfirm();
        Swal.fire(
          'Department Created!',
          'You have created department successfully',
          'success'
        );
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: `${error.response.data.message}`,
          text: 'Unable to create department'
        });
      }
    }
  };

  return (
    <Modal>
      <div >
        <h1 >Create Department</h1>
      </div>
      <div className={classes.detail}>
        <div >
          <form className={classes.myform} onSubmit={handleCreateDepartment}>
            <div className={`${classes.createForm}`}>
              <label>Department:</label>
              <input type="text" className={classes.createstaffInput} placeholder="Enter Department" required ref={departmentRef} />
            </div>
            <div className={classes.priority}>
              <label>Department Type:</label>
              <select className={classes.priSelect} onChange={(e) => setDepartmentType(e.target.value)} required>
                <option value='' hidden>----- Select type -----</option>
                <option value='regular'>regular</option>
                <option value='service'>service</option>
              </select>
            </div>
            {
              departmentType === 'service' &&
              <div className={classes.deptik}>
                <label>Category:</label>
                <div className={`${classes.createForm}`}>
                  <input
                    value={input}
                    placeholder="Enter a department"
                    className={classes.createstaffInput}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    onChange={onChange}
                  />
                  <div className={classes.departmentParent}>
                    {categoriesList.map((tag, index) => (
                      <div key={index} className={classes.tag}>
                        {tag} &nbsp;
                        <button className={classes.tag} onClick={() => deleteTag(index)}>x</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }
            <div className={classes.detailsBtns}>
              <button className={classes.updateBtn} type='submit'>Create</button>
              <button className={classes.deleteBtn} onClick={props.onConfirm}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CreateDepartment;