import React, { Fragment, useRef, useState, useEffect, useContext } from 'react';
import classes from './NewComplaint.module.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminContext from '../../../Context/AdminContext/AdminContext';
import { Bars } from 'react-loader-spinner';
import getItemWithExpiry from '../../../../Utils/expiryFunction';

const NewCompaint = () => {
    const id = getItemWithExpiry('id');
    const adminCtx = useContext(AdminContext);
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
    const [staff, setStaff] = useState({});

    useEffect(() => {
        const getStaffDetails = async () => {
            try {
                const staff = await axios.get(`/api/staff/staffdetails/${id}`);
                setStaff(staff.data.staff);
            } catch (error) {
                console.log(error.message);
            }
        };
        getStaffDetails();
    }, [id]);

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
                console.log(error.message);
            }
        };
        getDepartments();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            try {
                if (department.length !== 0) {
                    const categories = await axios.get(`/api/department/categoriesbydepartment/${department}`);
                    setCategories(categories.data.categories);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getCategories();
    }, [department]);

    const handleSubmitClick = async (e) => {
        e.preventDefault();
        if (editorData.length === 0) {
            Swal.fire({
                icon: 'error',
                title: `Please enter description`,
                text: 'Please enter valid fields'
            });
        } else {
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
            formData.append('staffDepartment', staff.role === 'admin' ? adminCtx.department : staff.department[0]);
            formData.append('priority', priority);
            formData.append('category', requestType);
            formData.append('isRepeated', isRepeated);
            try {
                setShowLoading(true);
                await axios.post('/api/complaint/', formData);
                Swal.fire(
                    'Concern Created!',
                    'You have created concern successfully',
                    'success'
                );
                navigate('/concern', { state: { refreshSuperHome: true } });
            } catch (error) {
                if (error.response.status === 422 || error.response.status === 401) {
                    Swal.fire({
                        icon: 'error',
                        title: `${error.response.data.message}`,
                        text: 'Unable to create concern'
                    });
                } else {
                    console.log(error.message);
                }
            } finally {
                setShowLoading(false);
            }
        }
    }

    // ckeditor
    const handleeditorChange = (e, editor) => {
        setEditorData(editor.getData());
    }

    //assign
    return (
        <Fragment>
            {showLoading && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <h1>Registering Concern</h1>
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
            {!showLoading && <div className={classes.newcomplaint} >
                <h2>Create new concern</h2>
                <div className={classes.createStaffform}>
                    <div className={classes.formStaff}>
                        <form onSubmit={handleSubmitClick}>
                            <div className={classes.behalf}>
                                <span>Behalf Email</span>
                                <div className={classes.behalftoogle}>
                                    <input type="checkbox" defaultChecked={isToggled} onClick={() => { setIsToggled(!isToggled) }} id="toggle-btn" />
                                    <label htmlFor="toggle-btn"></label>
                                    {isToggled && <input className={`${classes.behalfField} `} type="text" name="behalf" placeholder="Behalf email" autoComplete='true' required ref={behalfEmailRef} />}
                                </div>
                            </div>
                            <div className={classes.priReq}>
                                <div className={classes.deptTik}>
                                    <span>Department</span>
                                    <select className={classes.deptSelect} onChange={(e) => setDepartment(e.target.value)} required>
                                        <option value="" hidden>----- Select Department -----</option>
                                        {
                                            departments.map((department, key) => (
                                                <option key={key} value={department}>{department}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className={classes.priority}>
                                    <span>Priority</span>
                                    <select className={classes.priSelect} onChange={(e) => setPriority(e.target.value)} required>
                                        <option value="" hidden>----- Select Priority -----</option>
                                        <option value="high">High</option>
                                        <option value="moderate">Moderate</option>
                                        <option value="low">Low</option>
                                    </select>
                                </div>
                                <div className={classes.reqType}>
                                    <span>Concern Type</span>
                                    <select className={classes.rtypeSelect} onChange={(e) => setRequestType(e.target.value)} required>
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
                                <input type="text" cols="40" rows="5" className={classes.subInput} placeholder="Enter Subject" ref={subjectRef} required />
                            </div>
                            <div className={classes.description}>
                                <span>Description</span>
                                <CKEditor onChange={(e, editor) => { handleeditorChange(e, editor) }} editor={ClassicEditor} required />
                            </div>
                            <div className={classes.attachment}>
                                <div className={classes.attachmentSection}>
                                    <span>Attachment</span>
                                    <input type="file" multiple className={classes.attachInput} placeholder="choose file" onChange={handleFileChange} />
                                </div>
                                <div className={classes.repeat}>
                                    <span className='mt-4'>Repeated concern:</span>
                                    <div className={classes.isRepeat}>
                                        <input type="checkbox" defaultChecked={isRepeated} onClick={() => { setIsRepeated(!isRepeated) }} id="toggle-repeat" />
                                        <label htmlFor="toggle-repeat"></label>
                                    </div>
                                </div>
                            </div>
                            <button className={classes.buttonForm} type='submit'>Submit</button>
                        </form>
                    </div>
                </div >
            </div>}
        </Fragment>
    );
};

export default NewCompaint;