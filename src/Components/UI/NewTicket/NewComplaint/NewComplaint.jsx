import React, { Fragment, useRef, useState } from 'react';
import classes from './NewComplaint.module.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect } from 'react';


const NewCompaint = () => {
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

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await axios.get(`/api/staff/departments`);
            setDepartments(departments.data.departments);
        };
        getDepartments();
    }, []);

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
            description: editorData,
            department: department,
            priority: priority,
            category: requestType,
            isRepeated: false
            // attachment: dataFile
        };
        try {
            await axios.post('/api/complaint/', data);
            Swal.fire(
                'Complaint Created!',
                'You have created Complaint successfully',
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

            <div className={classes.newcomplaint} >
                <h1 >Create new complaint</h1>

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
                                    <option value="" hidden>----- Select Categories -----</option>
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
                                        <option value="" hidden>----- Select Categories -----</option>
                                        <option value="high">High</option>
                                        <option value="moderate">Moderate</option>
                                        <option value="low">Low</option>
                                    </select>
                                </div>

                                <div className={classes.reqType}>
                                    <span>Request Type</span>
                                    <select className={classes.rtypeSelect} onChange={(e) => setRequestType(e.target.value)}>
                                        <option value="" hidden>----- Select Categories -----</option>
                                        <option value="Hardware">Hardware</option>
                                        <option value="Software">Software</option>
                                        <option value="Network">Network</option>
                                    </select>
                                </div>
                            </div>

                            <div className={classes.subject}>
                                <span>Subject</span>
                                <input type="text" className={classes.subInput} placeholder="Select Your priority" ref={subjectRef} />
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
                                <span>Attachment</span>
                                <input type="file" className={classes.attachInput} placeholder="choose file" />
                                <button className={classes.buttonForm} onClick={handleSubmitClick}>Submit</button>
                            </div>

                        </form>
                    </div>
                </div >
            </div>
        </Fragment>
    )

};

export default NewCompaint;