import React, { Fragment, useRef, useState } from 'react';
import '../../../css/style.css';
import classes from './NewTicket.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from '../../sidebar/Sidebar';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const NewTicket = () => {
    const behalfRef = useRef();
    const departmentRef = useRef();
    const priorityRef = useRef();
    const requesttypeRef = useRef();
    const subjectRef = useRef();
    const descriptionRef = useRef();
    const attachmentRef = useRef();
    const navigate = useNavigate();
    const [editorData,setEditorData] = useState('');

    const [behalf, setBhalf] = useState([]);
    const [newRequest, setNewRequest] = useState('');
    const [department, setDepartment] = useState('');
    const [priority, setPriority] = useState('');
    const [requestType, setRequestType] = useState('');
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
            staffId: 1,
            behalf: false,
            subject: subjectRef.current.value,
            description: descriptionRef.current.value,
            department: department,
            priority: priority,
            category: requestType,
            isRepeated: false
            // attachment: dataFile
        };
        try {
            await axios.post('/api/request/', data);
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
     const handleeditorChange = (e,editor) => {
        setEditorData(editor.getData());
    }
        return (
            <Sidebar>

                <div className="main-title">
                    <h1 className="tik-type-title">Create new request</h1>
                </div>
                <div className="create-staffform ">
                    <div className="form-staff">
                        <form className="create-staff">
                            <div className="behalf">
                                <span>Behalf Email</span>
                                <input type="text" className="behalf-input" placeholder="Select Your priority" ref={behalfRef} />
                            </div>
                            <div className="dept-tik">
                                <span>Department</span>
                                <select className="dept-select" onChange={(e) => setDepartment(e.target.value)}>
                                    <option value="" hidden>----- Select Categories -----</option>
                                    <option value="ERP">Erp</option>
                                    <option value="Management">Management</option>
                                    <option value="Network">Network</option>
                                </select>

                            </div>
                            <div className="priority">
                                <span>Priority</span>
                                <select className="pri-select" onChange={(e) => setPriority(e.target.value)}>
                                    <option value="" hidden>----- Select Categories -----</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>

                                <span>Request Type</span>
                                <select className="rtype-select" onChange={(e) => setRequestType(e.target.value)}>
                                    <option value="" hidden>----- Select Categories -----</option>
                                    <option value="">Hardware</option>
                                    <option value="">Software</option>
                                    <option value="">Network</option>
                                </select>
                            </div>
                            <div className="subject">
                                <span>Subject</span>
                                <input type="text" className="sub-input" placeholder="Select Your priority" ref={subjectRef} />
                            </div>
                            <div className="des">
                            <span>Description</span>
                            <CKEditor
                                   onChange={(e,editor) =>{ handleeditorChange(e,editor) }}
                                    editor={ClassicEditor}
                                    >
                                </CKEditor>
                            </div>

                            <div className="attachment">

                                <span>Attachment</span>
                                <input type="file" className="attach-input" placeholder="choose file" />

                                <button className="button-form" onClick={handleSubmitClick}>Submit</button>
                            </div>
                        </form>

                    </div>

                </div >

            </Sidebar>
        )

};

export default NewTicket;