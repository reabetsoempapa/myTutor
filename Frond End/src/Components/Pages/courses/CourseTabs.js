import React, { useState, useEffect } from 'react'; // Import useEffect
import Course from './Course'; 
import './styling/courses.css';
import AddCourse from "./AddCourse";
import { Link } from 'react-router-dom';
import CourseController from '../../../Controllers/CourseController';
import LoadingPage from '../MainPages/LoadingPage';

const CourseTabs = () => {
  

  // Use useState to store the courses
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = sessionStorage.getItem("userRole");

  // Use useEffect to load courses when the component mounts
  useEffect(() => {
    const courseController = new CourseController();
    const userName = sessionStorage.getItem('username');
    courseController.loadCourses().then((data)=>{
      
      if(role === 'admin' || role ==='staffMember'){
        setCourses(data);
        setLoading(false);
        return;
      }
      const coursesByTutor = courseController.getCoursesByTutor(userName);
      if(coursesByTutor)
      setCourses(coursesByTutor);
      setLoading(false);
      
    });
    
  }, [role]);

  const [showForm, setShowForm] = useState(false);
  
  return (
    <div className="course-section">
      <div className="course-header">
        <h1>Your Courses</h1>
        {role !== 'admin'? "": <button className="manage-button" style={{ display: showForm ? 'none' : '' }} onClick={() => setShowForm(true)}>+ Add course</button>}
      </div>
      {loading && <LoadingPage elementBeingLoaded="your courses" />}
      <div className="course-tabs">
        {courses.length === 0 && loading ===false && showForm ===false? <div>No courses were found or we could not access database</div>:""}
        {courses.map(course => (
          <Link key={course.courseCode} to={`/coursePage?courseName=${course.courseName}&courseCode=${course.courseCode}`}>
            <Course courseinfo={course} />
          </Link>
        ))}
      </div>
      <div>
        {showForm ?  <AddCourse setCourses={setCourses} courses={courses} setShowForm={setShowForm}/> : ""}
      </div>
    </div>
  );
};

export default CourseTabs;



