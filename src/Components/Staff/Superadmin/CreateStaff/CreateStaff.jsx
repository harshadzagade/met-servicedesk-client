import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import classes from './CreateStaff.module.css';


const CreateStaff = () => {

    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const phoneRef = useRef();
    const extensionRef = useRef();
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [departmentList, setDepartmentList] = useState([]);
    const [isKeyReleased, setIsKeyReleased] = useState(false);

    // const [departmentItems, setDepartmentItems] = useState([]);
    // const [departmentValue, setDepartmentValue] = useState('');
    // const [role, setRole] = useState('demo');

    // const handleKeyDown = evt => {
    //     if (["Enter", "Tab", ","].includes(evt.key)) {
    //         evt.preventDefault();
    //         const value = departmentValue.trim().match(/^[a-z0-9]+$/i)
    //         try {
    //             let toBeAdded = value.filter(department => !departmentItems.includes(department));
    //             setDepartmentItems([...departmentItems, ...toBeAdded]);
    //         } catch (error) {
    //             console.log('Please enter valid department name');
    //         }
    //         setDepartmentValue('');
    //     }
    // };

    // const handleChange = evt => {
    //     setDepartmentValue(evt.target.value);
    // };

    // const handleDelete = item => {
    //     setDepartmentItems(departmentItems.filter(i => i !== item));
    // };

    // const handlePaste = evt => {
    //     evt.preventDefault();
    //     let paste = evt.clipboardData.getData("text");
    //     var departments = paste.match(/^[a-z0-9]+$/i);
    //     try {
    //         let toBeAdded = departments.filter(department => !departmentItems.includes(department));
    //         setDepartmentItems([...departmentItems, ...toBeAdded]);
    //     } catch (error) {
    //         console.log('Please enter valid department name');
    //     }
    // };

    const handleSubmitClick = async (e) => {
        e.preventDefault();
        const data = {
            firstname: firstnameRef.current.value,
            lastname: lastnameRef.current.value,
            email: emailRef.current.value.toLowerCase(),
            password: passwordRef.current.value,
            department: departmentList,
            // role: role,
            phoneNumber: +phoneRef.current.value,
            contactExtension: +extensionRef.current.value
        };
        try {
            await axios.post('/api/staff/superadmin/createStaff', data);
            Swal.fire(
                'Staff Created!',
                'You have created staff successfully',
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

    //department function 
    //set the department functionality
    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };

    useEffect(() => {
        setDepartmentList(departmentList);
    }, [departmentList]);

    const onKeyDown = (e) => {
        const { key } = e;
        const trimmedInput = input.toUpperCase().trim();

        if (key === 'Enter' && trimmedInput.length && !departmentList.includes(trimmedInput)) {
            e.preventDefault();
            setDepartmentList(prevState => [...prevState, trimmedInput]);
            setInput('');
        }

        if (key === "Backspace" && !input.length && departmentList.length && isKeyReleased) {
            const tagsCopy = [...departmentList];
            const poppedTag = tagsCopy.pop();
            e.preventDefault();
            setDepartmentList(tagsCopy);
            setInput(poppedTag);
        }

        setIsKeyReleased(false);
    };

    const onKeyUp = () => {
        setIsKeyReleased(true);
    };


    const deleteTag = (index) => {
        setDepartmentList(prevState => prevState.filter((tag, i) => i !== index))
    };
    return (
        <div >
            <main>
                <div className={classes.staffform}>
                    <h2>Create staff</h2>
                    <div className={`${classes.createStaffform}`}>
                        <div className={`${classes.formStaff}`}>
                            <form method='POST' onSubmit={handleSubmitClick}>
                                <div className={classes.names}>
                                    <div className={`${classes.createForm}`}>
                                        <span>First Name</span>
                                        <input type="text" className={classes.createstaffInput} placeholder="Enter your name" ref={firstnameRef} />
                                    </div>
                                    <div className={`${classes.createForm}`}>
                                        <span>Last Name</span>
                                        <input type="text" className={classes.createstaffInput} placeholder="Enter your last name" ref={lastnameRef} />
                                    </div>
                                </div>
                                <div className={classes.emailpass}>
                                    <div className={`${classes.createForm}`}>
                                        <span>Email</span>
                                        <input type="text" className={classes.createstaffInput} placeholder="Enter your email" ref={emailRef} />
                                    </div>
                                    <div className={`${classes.createForm}`}>
                                        <span>Password</span>
                                        <input type="password" className={classes.createstaffInput} placeholder="Enter your password" ref={passwordRef} />
                                    </div>
                                </div>
                                <div className={classes.deptik}>
                                    <label>Department</label>
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
                                            {departmentList.map((tag, index) => (
                                                <div className={classes.tag}>
                                                    {tag} &nbsp;
                                                    <button className={classes.tag} onClick={() => deleteTag(index)}>x</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                                <div className={classes.phone}>
                                     <div className={`${classes.createForm}`}>
                                    <span>Phone No.</span>
                                    <input type="text" className={classes.createstaffInput} placeholder="Enter your phone number" ref={phoneRef} />
                                </div>
                                    <div className={`${classes.createForm}`}>
                                        <span>Extension</span>
                                        <input type="text" className={classes.createstaffInput} placeholder="enter contact" ref={extensionRef} />
                                    </div>
                                </div>


                                <button type="submit" className={`${classes.createButton}`} >Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>



    );
};

export default CreateStaff;