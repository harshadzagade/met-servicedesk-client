import axios from 'axios';
import React, { useState } from 'react';

const Policies = () => {
    const [file, setFile] = useState(null);
    const [policyName, setPolicyName] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handlePolicyNameChange = (e) => {
        setPolicyName(e.target.value);
    };

    const handleFileUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('policyName', policyName);
            formData.append('policyFile', file);
            await axios.post('http://localhost:8001/api/policy/addpolicy', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setFile(null);
            setPolicyName('');
            const fileInput = document.getElementById('fileInput');
            if (fileInput) {
                fileInput.value = '';
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <input type='text' placeholder='Policy Name' value={policyName} onChange={handlePolicyNameChange} />
            <input type='file' id='fileInput' onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload File</button>
        </div>
    );
};

export default Policies;