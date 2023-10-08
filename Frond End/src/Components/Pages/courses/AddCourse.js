import React, { useState,useRef, useEffect } from 'react';
import './styling/addCourse.css';
import Course from '../../../Models/Class files/Course';
import CourseController from '../../../Controllers/CourseController';

const AddCourse = ({ setCourses, courses, setShowForm }) => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [duration, setDuration] = useState('');
  const [year, setYear] = useState('');
  const [creator, setCreator] = useState('Amahle Jenete');
  const firstInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const courseController = new CourseController();
    const newCourse = new Course(
      courseName,
      courseCode,
      duration,
      year,
      creator,
    );
    setCourses([...courses, newCourse]);
    courseController.addCourse(newCourse);
    setCourseName('');
    setCourseCode('');
    setDuration('');
    setYear('');
    setCreator('');
    setShowForm(false);
  };
  useEffect(()=>{
    firstInputRef.current.focus();
  },[])

  return (
    <div className="add-course-container">
      <h1 className="add-course-heading">ADD A COURSE</h1>
      <form onSubmit={handleSubmit} className="add-course-form">
        <label>
          Course Name:
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            ref={firstInputRef}
            required
          />
        </label>
        <br />
        <label>
          Course Code:
          <input
            type="text"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
        Duration:
            <select value={duration} onChange={(e)=>setDuration(e.target.value)} required>
            <option value="">Select Duration</option>
            <option value="jan_june">January - June</option>
            <option value="july_nov">July - November</option>
            <option value="whole_year">Whole Year</option>
            <option value="summer">Summer Course</option>
            <option value="winter">Winter Course</option>
            <option value="other">Other</option>
            </select>
            {duration === 'other' && (
        <input
          type="text"
          placeholder="Enter custom duration"
          onBlur={(e)=>setDuration(e.target.value)}
        />
      )}
        </label>
        <br />
        <label>
          Year:
          <input
            type="number"
            min={2023}
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit" className="add-course-button">Add Course</button>
        <button type="cancel" className="cancel-course-button" onClick={()=> setShowForm(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default AddCourse;
