import React, { useEffect } from 'react';
import './styling/ConfirmationPage.css'
import ApplicationSubmissionController from '../../../Controllers/ApplicationSubmissionController';

const ConfirmationPage = ({ formData }) => {

    // // Extract relevant student details from formData
    // const studentDetails = `
    //     Student Number: ${formData.studNo}
    //     Name: ${formData.name}
    //     Surname: ${formData.surname}
    //     Email: ${formData.email}
    //     Year of Study: ${formData.yearOfStudy}
    //     Course History:
    //     ${formData.courses.map((course, index) => `
    //         Course ${index + 1}:
    //         Course Name: ${course.course}
    //         Mark: ${course.mark}%
    //     `).join('')}
    // `;

   

    useEffect(()=>{
        if (sessionStorage.getItem('block')) return;
        sessionStorage.setItem('block',true);
        const applicationSubmissionController = new ApplicationSubmissionController();
        
    // Department is equivalent to the course in this context
    const department = formData.course;
    const courseHistory = `${formData.courses.map((course, index) => `
     ${course.course} - ${course.mark}%`).join('')}
`;
        // Create an application submission
    const submission = applicationSubmissionController.createSubmission(
        formData.name,
        formData.studNo, // Add the student number
        formData.email, // Add the email
        formData.yearOfStudy, // Add the year of study
        department,
        courseHistory
    );
    submission.then((value)=> console.log(value)).catch((error) => console.error(error));;
    },[formData])
    
    return (
        <div className="confirmation-container">
            <h2 className="confirmation-title">Thank you, your form was submitted!</h2>
            <div className="confirmation-details">
                <p><strong>Student Number:</strong> {formData.studNo}</p>
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Surname:</strong> {formData.surname}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Course:</strong> {formData.course}</p>
                <p><strong>Year of Study:</strong> {formData.yearOfStudy}</p>
            </div>
            <p className="course-history-title">Course history:</p>
            <ul className="course-list">
                {formData.courses.map((course, index) => (
                    <li key={index} className="course-item">
                        <strong>Course Name:</strong> {course.course}, <strong>Mark:</strong> {course.mark}%
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ConfirmationPage;

