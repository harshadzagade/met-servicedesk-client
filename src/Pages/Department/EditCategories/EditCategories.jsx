import React, { useEffect, useState } from 'react';
import classes from './EditCategories.module.css';
import Modal from '../../../Components/UI/Modal/Modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRef } from 'react';

const EditCategories = (props) => {
    const departmentNameRef = useRef();
    const [input, setInput] = useState('');
    const [type, setType] = useState(null);
    const [categoriesList, setCategoriesList] = useState([]);
    const [departmentName, setDepartmentName] = useState(null);
    const [isKeyReleased, setIsKeyReleased] = useState(false);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const department = await axios.get(`/api/department/departmentdetails/${props.departmentId}`);
                setCategoriesList(department.data.department.category);
                setDepartmentName(department.data.department.department);
                setType(department.data.department.type);
            } catch (error) {
                console.log(error.message);
            }
        };
        getCategories();
    }, [props.departmentId]);

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

    const handleUpdateDepartment = async (e) => {
        e.preventDefault();
        if (type === 'service' && (categoriesList.length === 0)) {
            Swal.fire({
                icon: 'error',
                title: `Please add categories`,
                text: `You haven't added any categories`
            });
        } else {
            try {
                await axios.put(`/api/department/editdepartment/${props.departmentId}`, {
                    departmentName: departmentNameRef.current.value,
                    type: type,
                    category: type === 'service' ? categoriesList : null
                });
                props.onConfirm();
            } catch (error) {
                if (error.response.status === 422 || error.response.status === 401) {
                    Swal.fire({
                        icon: 'error',
                        title: `${error.response.data.message}`,
                        text: 'Unable to edit categories'
                    });
                } else {
                    console.log(error.message);
                }
            }
        }
    };

    return (
        <Modal>
            <div>
                <h1>Update Department</h1>
            </div>
            <div className={classes.detail}>
                <div>
                    <form className={classes.myform} onSubmit={handleUpdateDepartment}>
                        <div className={`${classes.createForm}`}>
                            <label>Department:</label>
                            <input type="text" className={classes.createstaffInput} placeholder="Enter Department" defaultValue={departmentName} ref={departmentNameRef} />
                        </div>
                        <div className={classes.priority}>
                            <label>Department Type:</label>
                            <select value={type} className={classes.priSelect} onChange={(e) => setType(e.target.value)} >
                                <option value='' hidden>----- Select type -----</option>
                                <option value='regular'>regular</option>
                                <option value='service'>service</option>
                            </select>
                        </div>
                        {
                            type === 'service' &&
                            <div className={classes.deptik}>
                                <label>Categories</label>
                                <div className={`${classes.createForm}`}>
                                    <input value={input} placeholder="Enter a department" className={classes.createstaffInput} onKeyDown={onKeyDown} onKeyUp={onKeyUp} onChange={onChange} />
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
                            <button className={classes.updateBtn} type='submit' >Update</button>
                            <button className={classes.deleteBtn} onClick={props.onConfirm}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default EditCategories;