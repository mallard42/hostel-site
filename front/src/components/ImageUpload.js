import React, { Fragment, useState } from 'react';
import axios from 'axios';

import Alert from './Alert';

const ImageUpload = () => {
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');

    const onChange = e => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const onSubmit = async e => {
        // e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await axios.post('http://localhost:5000/upload', formData);
            const { fileName, filePath } = res.data;

            setUploadedFile({ fileName, filePath });
            setMessage('File Uploaded');
        } catch(err) {
            if(err.response.status === 500) {
                setMessage('There was a probleme with the server !');
            }
            else {
                setMessage(err.response.data.msg);
            }
        }
    }

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                {message ? <Alert message={message} status="info"/> : null}
                <div className="custom-file">
                    <input type="file" id="customFile" onChange={onChange}/>
                    <label className="custom-file-label" htmlFor="customFile" >{fileName}</label>
                </div>
                <input type="submit" value="Upload" className="btn btn-primary" />
            </form>  
            { uploadedFile ? <div className="row">
                <img src={uploadedFile.filePath} alt=""/>
            </div> : null }
        </Fragment>
    )
}

export default ImageUpload;