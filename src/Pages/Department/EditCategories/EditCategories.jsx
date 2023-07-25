import React, { useEffect, useState } from 'react';
import classes from './EditCategories.module.css';
import Modal from '../../../Components/UI/Modal/Modal';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditCategories = (props) => {
    const [input, setInput] = useState('');
    const [categoriesList, setCategoriesList] = useState([]);
    const [isKeyReleased, setIsKeyReleased] = useState(false);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const categories = await axios.get(`/api/department/categories/${props.departmentId}`);
                setCategoriesList(categories.data.categories);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to fetch categories'
                });
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

    const handleUpdateCategories = async () => {
        try {
            await axios.put(`/api/department/editcategories/${props.departmentId}`, {
                category: categoriesList
            });
            props.onConfirm();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `${error.response.data.message}`,
                text: 'Unable to update categories'
            });
        }
    };

    return (
        <Modal>
            <div>
                <h1>Update Department</h1>
            </div>
            <div className={classes.detail}>
                <div>
                    <form className={classes.myform} onSubmit={handleUpdateCategories}>
                        <div className={classes.deptik}>
                            <label>Department</label>
                            <div className={`${classes.createForm}`}>
                                <input value={input} placeholder="Enter a department" className={classes.createstaffInput} onKeyDown={onKeyDown} onKeyUp={onKeyUp} onChange={onChange} required/>
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