import axios from 'axios';
import React, { Fragment, useRef, useState } from 'react';
import OKAlert from '../../ui/customAlert/okAlert/OKAlert';

const Policies = () => {
    const policyNameRef = useRef();
    const [file, setFile] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const allowedFileTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf'];

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && allowedFileTypes.includes(selectedFile.type)) {
            setFile(selectedFile);
        } else {
            handleShowAlert('Invalid file type', 'Please select a valid Word document (doc, docx) or PDF file');
            e.target.value = '';
        }
    };

    const handleFileUpload = async () => {
        try {
            if (!policyNameRef.current.value) {
                const error = new Error('Please enter required field');
                error.statusCode = 422;
                throw error;
            }
            const formData = new FormData();
            formData.append('policyName', policyNameRef.current.value);
            formData.append('policyFile', file);
            await axios.post('http://localhost:8001/api/policy/addpolicy', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setFile(null);
            const fileInput = document.getElementById('fileInput');
            if (fileInput) {
                fileInput.value = '';
            }
        } catch (error) {
            if (error.statusCode === 422) {
                handleShowAlert('Invalid input', error.message);
            } else {
                console.log(error.message);
            }
        }
    };

    const handleShowAlert = (header, submessage) => {
        setAlertMessage({ header: header, submessage: submessage });
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    return (
        <Fragment>
            {
                showAlert &&
                <OKAlert message={alertMessage} onClose={handleCloseAlert} />
            }
            <input type='text' placeholder='Policy Name' ref={policyNameRef} />
            <input type='file' id='fileInput' onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload File</button>
        </Fragment>
    );
};

export default Policies;