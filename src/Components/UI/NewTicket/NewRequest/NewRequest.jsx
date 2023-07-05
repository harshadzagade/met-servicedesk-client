import React, { Fragment, useRef, useState } from 'react';
import classes from './NewRequest.module.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const NewRequest = () => {
    const id = localStorage.getItem('id');
    const behalfEmailRef = useRef();
    const subjectRef = useRef();
    const navigate = useNavigate();
    const [department, setDepartment] = useState('');
    const [priority, setPriority] = useState('');
    const [requestType, setRequestType] = useState('');
    const [editorData, setEditorData] = useState('');
    const [isToggled, setIsToggled] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isRepeated, setIsRepeated] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const handleFileChange = (event) => {
        const files = event.target.files;
        const selectedFilesArray = [...selectedFiles];
        for (let i = 0; i < files.length; i++) {
            selectedFilesArray.push(files[i]);
        }
        setSelectedFiles(selectedFilesArray);
    };

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const departments = await axios.get(`/api/department/departments`);
                setDepartments(departments.data.departments);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to fetch departments'
                });
            }
        };
        getDepartments();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            try {
                if (department.length !== 0) {
                    console.log(department.length);
                    const categories = await axios.get(`/api/department/categoriesbydepartment/${department}`);
                    setCategories(categories.data.categories);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Unable to fetch categories'
                });
            }
        };
        getCategories();
    }, [department]);

    useEffect(() => {
        const showLoadingAlert = () => {
            let timerInterval
            Swal.fire({
                title: 'Registering request',
                html: 'Please wait...<b></b>',
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })
        };
        if (showLoading) {
            showLoadingAlert();
        }
    }, [showLoading]);

    const handleSubmitClick = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append('file', file);
        });
        formData.append('staffId', id);
        formData.append('behalf', isToggled);
        formData.append('behalfEmailId', isToggled ? behalfEmailRef.current.value : null);
        formData.append('subject', subjectRef.current.value);
        formData.append('description', editorData);
        formData.append('department', department);
        formData.append('priority', priority);
        formData.append('category', requestType);
        formData.append('isRepeated', isRepeated);
        /* const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        }; */
        // const dataFile = new FormData();
        // dataFile.append('file', file);
        // dataFile.append('fileName', file.name);
        // const data = {
        //     staffId: id,
        //     behalf: isToggled,
        //     behalfEmailId: isToggled ? behalfEmailRef.current.value : null,
        //     subject: subjectRef.current.value,
        //     description: editorData,
        //     department: department,
        //     priority: priority,
        //     category: requestType,
        //     isRepeated: false,
        //     attachment: formData
        // };
        try {
            setShowLoading(true);
            await axios.post('/api/request/', formData);
            setShowLoading(false);
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
    }


    // ckeditor
    const handleeditorChange = (e, editor) => {
        setEditorData(editor.getData());
    }



    return (
        <Fragment >

            <div className={classes.newrequest} >
                <h2>Create new request</h2>
                <div className={classes.createStaffform}>
                    <div className={classes.formStaff}>
                        <form >
                            <div className={classes.behalf}>
                                <span>Behalf Email</span>
                                <div className={classes.behalftoogle}>
                                    <input type="checkbox" defaultChecked={isToggled} onClick={() => { setIsToggled(!isToggled) }} id="toggle-btn" />
                                    <label for="toggle-btn"></label>
                                    {isToggled && <input className={`${classes.behalfField} `} type="text" name="behalf" placeholder="Behalf email" autoComplete='true' required ref={behalfEmailRef} />}
                                </div>
                            </div>

                            <div className={classes.deptTik}>
                                <span>Department</span>
                                <select className={classes.deptSelect} onChange={(e) => setDepartment(e.target.value)}>
                                    <option value="" hidden>----- Select Department -----</option>
                                    {
                                        departments.map((department, key) => (
                                            <option key={key} value={department}>{department}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className={classes.priReq}>
                                <div className={classes.priority}>
                                    <span>Priority</span>
                                    <select className={classes.priSelect} onChange={(e) => setPriority(e.target.value)}>
                                        <option value="" hidden>----- Select Priority -----</option>
                                        <option value="high">High</option>
                                        <option value="moderate">Moderate</option>
                                        <option value="low">Low</option>
                                    </select>
                                </div>

                                <div className={classes.reqType}>
                                    <span>Request Type</span>
                                    <select className={classes.rtypeSelect} onChange={(e) => setRequestType(e.target.value)}>
                                        <option value="" hidden>----- Select Type -----</option>
                                        {
                                            categories.map((category, key) => (
                                                <option key={key} value={category}>{category}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className={classes.subject}>
                                <span>Subject</span>
                                <input type="text" className={classes.subInput} placeholder="Enter Subject" ref={subjectRef} />
                            </div>

                            <div className={classes.description}>
                                <span>Description</span>
                                <CKEditor
                                    onChange={(e, editor) => { handleeditorChange(e, editor) }}
                                    editor={ClassicEditor}
                                >
                                </CKEditor>
                            </div>

                            <div className={classes.attachment}>
                                <div className={classes.attachmentSection}>
                                    <span>Attachment</span>
                                    <input type="file" multiple className={classes.attachInput} placeholder="choose file" onChange={handleFileChange} />
                                </div>
                                <div className={classes.repeat}>
                                    <span>Repeated Request:</span>
                                    <div className={classes.isRepeat}>
                                        <input type="checkbox" defaultChecked={isRepeated} onClick={() => { setIsRepeated(!isRepeated) }} id="toggle-repeat" />
                                        <label htmlFor="toggle-repeat"></label>
                                    </div>
                                </div>

                            </div>
                            <button className={classes.buttonForm} onClick={handleSubmitClick}>Submit</button>
                        </form>
                    </div>
                </div >
            </div>
        </Fragment>
    )

};

export default NewRequest;