import React, { useState } from 'react';
import './styling/createApplication.css'; // Updated CSS file name
import ApplicationController from '../../../Controllers/ApplicationController';

const CreateApplication = () => {
    const [department, setDepartment] = useState('Computer Science Department');
    const [description, setDescription] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [closingDate, setClosingDate] = useState(new Date().toLocaleDateString());
    const randomId = Math.floor(Math.random() * 1000000);
    const accessLink = `http://196.42.122.14:3000/applications/accessapplications?courseCode=${randomId}&courseName=${department}&cd=${closingDate}&description=${description}`;

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleCopyLink = () => {
        const textField = document.createElement('textarea');
        textField.innerText = accessLink;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
    };

    const handleSubmit = () => {
        const applicationController = new ApplicationController();
        const application = applicationController.createApplication(
            randomId,
            description,
            department,
            closingDate,
            accessLink
        );
        console.log(application);
        setSubmitted(true);
    };

    return (
        <div>
            <form className="create-application-container"> 
                <label htmlFor="department">Department</label>
                <br />
                <input
                    type="text"
                    id="department"
                    value={department}
                    disabled
                    placeholder=""
                    onChange={(e) => setDepartment(e.target.value)}
                />
                <br />
                <label htmlFor="closingDate">Closing date</label>
                <br />
                <input
                    type="date"
                    id="closingDate"
                    value={closingDate}
                    placeholder=""
                    onChange={(e) => setClosingDate(e.target.value)}
                />
                <br />
                <label htmlFor="description">Description</label>
                <br />
                <textarea
                    id="description"
                    type="text"
                    value={description}
                    onChange={handleDescriptionChange}
                />
            </form>
            {!submitted ? (
                <button className="create-application-button" onClick={handleSubmit}>
                    Submit
                </button>
            ) : (
                <div className="access-link-container">
                    <p>Submitted! Access via:</p>
                    <input value={accessLink} readOnly />
                    <button className="copy-link-button" onClick={handleCopyLink}>
                        Copy
                    </button>
                </div>
            )}
        </div>
    );
};

export default CreateApplication;



