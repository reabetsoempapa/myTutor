import React, { useState } from 'react';
import './styling/applicationform.css';
import { useLocation } from 'react-router-dom';
import ConfirmationPage from './ConfirmationPage';

const ApplicationForm = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const courseName = searchParams.get('courseName');
    const courseCode = searchParams.get('courseCode');

    // State to store form data
    const [formData, setFormData] = useState({
        studNo: '',
        name: '',
        surname: '',
        email: '',
        yearOfStudy: '1st year',
        course: courseName,
        courses: [{ course: '', mark: '' }],
        consentChecked: false,
    });

    const [showConfirmation, setShowConfirmation] = useState(false);

    // Function to handle changes in form inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('course') || name.startsWith('mark')) {
            // Handle course and mark inputs dynamically
            const index = parseInt(name.replace(/\D/g, ''), 10) - 1;
            const field = name.startsWith('course') ? 'course' : 'mark';

            const updatedCourses = [...formData.courses];
            updatedCourses[index] = {
                ...updatedCourses[index],
                [field]: value,
            };

            setFormData((prevData) => ({
                ...prevData,
                courses: updatedCourses,
            }));
        } else {
            // Handle other form inputs
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    // Function to add a new course input field
    const handleAddCourse = () => {
        setFormData((prevData) => ({
            ...prevData,
            courses: [...prevData.courses, { course: '', mark: '' }],
        }));
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.consentChecked) {
            alert('Please confirm your consent before submitting the form.');
        } else {
            setShowConfirmation(true);
        }
    };

    return (
        <div>
            {showConfirmation ? (
                <ConfirmationPage formData={formData} />
            ) : (
                <div className="form-container">
                    <h2>Tutor Application Form</h2>
                    <div className="instructions">
                        <h2>Instructions</h2>
                        <p>
                            Please fill out the form below to apply as a tutor for{' '}
                            <i>
                                <b>
                                    {courseName} - {courseCode}
                                </b>
                            </i>
                            .
                        </p>
                        <br />
                    </div>
                    <br />
                    <form onSubmit={handleSubmit}>
                        {/* Form input fields */}
                        <label htmlFor="studNo">Student Number</label>
                        <input
                            type="text"
                            id="studNo"
                            name="studNo"
                            onChange={handleInputChange}
                            value={formData.studNo}
                            required
                        />

                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleInputChange}
                            value={formData.name}
                            required
                        />

                        <label htmlFor="surname">Surname</label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            onChange={handleInputChange}
                            value={formData.surname}
                            required
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleInputChange}
                            value={formData.email}
                            required
                        />
                        <label htmlFor="yearOfStudy">Year of study from January</label>
                        <select
                            id="yearOfStudy"
                            name="yearOfStudy"
                            onChange={handleInputChange}
                            value={formData.yearOfStudy}
                            required
                        >
                            
                            <option value="2nd year">2nd year</option>
                            <option value="3rd year">3rd year</option>
                            <option value="Post grad">Post grad-tutor applicant</option>
                            <option value="1st year">Post grad-TA applicant</option>
                        </select>

                        <h4>Course history</h4>
                        <hr/>
                        <label htmlFor="course">Department</label>
                        <input
                            type="text"
                            id="course"
                            name="course"
                            value={formData.course}
                            readOnly
                        />

                        
                        <p>
                            Enter courses completed for this department and mark obtained for each course
                        </p>
                        {formData.courses.map((course, index) => (
                            <div key={index}>
                                <label htmlFor={`course${index + 1}`}>Course {index + 1}</label>
                                <input
                                    type="text"
                                    id={`course${index + 1}`}
                                    name={`course${index + 1}`}
                                    placeholder="Course Name"
                                    value={course.course}
                                    onChange={handleInputChange}
                                />
                                Mark:
                                <input
                                    type="number"
                                    name={`mark${index + 1}`}
                                    placeholder="Mark"
                                    value={course.mark}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ))}

                        <button type="button" onClick={handleAddCourse}>
                            Add course
                        </button>
                        <br />

                        <label>
                            <input
                                type="checkbox"
                                name="consentChecked"
                                checked={formData.consentChecked}
                                onChange={handleInputChange}
                            />
                            I confirm that by submitting this form I consent to my academic record being checked by the department.
                        </label>
                        <hr />

                        <button type="submit">Submit</button>
                        <button type="reset" onClick={() => console.log('Cancelled')}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ApplicationForm;


