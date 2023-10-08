import React, { useState } from 'react';
import './styling/ViewApplicationSubmissions.css'; // Updated CSS file name
import ApplicationSubmissionController from '../../../Controllers/ApplicationSubmissionController';
import ReviewApplicant from './ReviewApplicant';

const ViewApplicationSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const submissionController = new ApplicationSubmissionController();

    // Function to load application submissions
    const loadSubmissions = () => {
        submissionController.getAllSubmissions().then((subs)=>{setSubmissions(subs);})
        
    };

    

    return (
        <div className="view-application-submissions-container">
            <h2 className="view-application-submissions-title">Application Submissions ({submissions? submissions.length: ""})</h2>
            <table>
                <thead>
                    <tr>
                        <th>Student Details</th>
                        <th>Date Submitted</th>
                        <th>Marks</th>
                        <th>Add to course</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.map((submission, index) => (
                        <tr key={index}>
                            <td>{submission.studentDetails()}</td>{}
                            <td>{submission.dateSubmitted}</td>
                            <td>{submission.courseHistory}</td>
                            <ReviewApplicant applicant={submission}/>
                            
                        </tr>
                        
                    ))}
                </tbody>
            </table>
            <button className="view-submissions-button" onClick={loadSubmissions}>
                Load Submissions
            </button>
        </div>
    );
};

export default ViewApplicationSubmissions;
