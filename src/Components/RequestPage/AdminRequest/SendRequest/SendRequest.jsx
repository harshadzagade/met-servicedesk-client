import axios from 'axios';
import React, { Fragment, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import classes from './SendRequest.module.css';
import ToggleSwitch from '../../../UI/ToggleSwitch/ToggleSwitch';

const SendRequest = () => {
    const id = localStorage.getItem('id');
    const behalfEmailRef = useRef();
    const subjectRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    const navigate = useNavigate();

    const [departmentItems, setDepartmentItems] = useState([]);
    const [departmentValue, setDepartmentValue] = useState('');
    const [isToggled, setIsToggled] = useState(false);
    const [isRepeated, setIsRepeated] = useState(false);
    const [priority, setPriority] = useState('');
    // const [file, setFile] = useState(null);
    // console.log(file);
    // console.log(URL.createObjectURL(file));

    const handleKeyDown = evt => {
        if (["Enter", "Tab", ","].includes(evt.key)) {
            evt.preventDefault();
            const value = departmentValue.trim().match(/^[a-z0-9]+$/i)
            try {
                let toBeAdded = value.filter(department => !departmentItems.includes(department));
                setDepartmentItems([...departmentItems, ...toBeAdded]);
            } catch (error) {
                console.log('Please enter valid department name');
            }
            setDepartmentValue('');
        }
    };

    const handleChange = evt => {
        setDepartmentValue(evt.target.value);
    };

    const handleDelete = item => {
        setDepartmentItems(departmentItems.filter(i => i !== item));
    };

    const handlePaste = evt => {
        evt.preventDefault();
        let paste = evt.clipboardData.getData("text");
        var departments = paste.match(/^[a-z0-9]+$/i);
        try {
            let toBeAdded = departments.filter(department => !departmentItems.includes(department));
            setDepartmentItems([...departmentItems, ...toBeAdded]);
        } catch (error) {
            console.log('Please enter valid department name');
        }
    };

    const handleSubmitClick = async (e) => {
        e.preventDefault();
        /* const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        }; */
        // const dataFile = new FormData();
        // dataFile.append('file', file);
        // dataFile.append('fileName', file.name);
        const data = {
            staffId: id,
            behalf: isToggled,
            behalfEmailId: isToggled ? behalfEmailRef.current.value : null,
            subject: subjectRef.current.value,
            description: descriptionRef.current.value,
            department: departmentItems[0],
            category: categoryRef.current.value,
            priority: priority,
            isRepeated: isRepeated
            // attachment: dataFile
        };
        try {
            await axios.post('http://localhost:8001/api/request/', data);
            Swal.fire(
                'Request Created!',
                'You have created request successfully',
                'success'
            );
            navigate('/', { state: { refreshSuperHome: true } });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `${error.response.data.message}`,
                text: 'Please enter valid fields'
            });
        }
    };
    return (
        <Fragment>
            <form className={`d-inline-block ${classes.sendRequestForm}`} method="POST" onSubmit={handleSubmitClick}>
                <div className='d-flex ml-2'>
                    <h4 className='mt-1 mr-3'>Behalf?</h4><ToggleSwitch label='Behalf' toggled={isToggled} onClick={() => { setIsToggled(!isToggled) }} />
                    {isToggled && <input className={`${classes.behalfField} form-control`} type="text" name="behalf" placeholder="Behalf email" autoComplete='true' required ref={behalfEmailRef} />}
                </div>
                <input className={`${classes.sendRequestInput} form-control`} type="text" name="subject" placeholder="Subject" autoComplete='true' required ref={subjectRef} /><br />
                <textarea className={`${classes.sendRequestInput} form-control`} name="description" placeholder="Description" autoComplete='true' required ref={descriptionRef} /><br />
                <input className={`${classes.sendRequestInput} ${classes.departmentMargins} form-control`} type="text" name="department" placeholder="Department" autoComplete='true' required={departmentItems.length === 0} value={departmentValue} onKeyDown={handleKeyDown} onChange={handleChange} onPaste={handlePaste} /><br />
                {departmentItems.map(item => (
                    <div className={`${classes.tagItem}`} key={item}>
                        {item}
                        <button type='button' className={`${classes.tag}`} onClick={() => handleDelete(item)}>&times;</button>
                    </div>
                ))}
                {departmentItems.length === 0 && <br />}
                <div className={`d-inline-flex`}>
                    <select className={`${classes.sendSmallRequestInput} form-control`} name="priority" required onChange={(e) => setPriority(e.target.value)}>
                        <option hidden>Select Your Priority</option>
                        <option value='high'>High</option>
                        <option value='moderate'>Moderate</option>
                        <option value='low'>Low</option>
                    </select>
                    <input className={`${classes.sendSmallRequestInput} form-control`} type="text" name="category" placeholder="Category" autoComplete='true' required ref={categoryRef} />
                </div><br /><br />
                <div className='d-flex ml-2 mb-4'>
                    <div className={`${classes.isRepeated} mt-1 mr-3`}>Repeated request?</div><ToggleSwitch toggled={isRepeated} onClick={() => { setIsRepeated(!isRepeated) }} />
                </div>
                {/* <input type="file" onChange={(e) => setFile(e.target.files)} /> */}
                <button className={`btn ${classes.sendButton}`} type="submit">Create</button>
            </form>
        </Fragment>
    );
};

export default SendRequest;