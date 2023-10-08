import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styling/coursePage.css';
import CourseController from '../../../Controllers/CourseController';

const CoursePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const courseName = searchParams.get('courseName');
  const courseCode = searchParams.get('courseCode');
  const role = sessionStorage.getItem('userRole');
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const courseController = new CourseController();
    courseController.getCourse(courseCode).then((courseR) => {
      if (courseR) setCourse(courseR);
    });
  }, [courseCode]);

  return (
    <div className={`course-page ${course ? 'sidebar-open' : ''}`}>
      <div id="sidebar">
        {role === 'admin' ? (
          <>
            <Link to={`/applications?courseName=${courseName}&courseCode=${courseCode}`} className="tile">
              <div className="tile-icon">📟</div>
              Applications
            </Link>
            <Link to={`/manageCourse?courseName=${courseName}&courseCode=${courseCode}`} className="tile">
              <div className="tile-icon">👨‍💼</div>
              Course & Tutors
            </Link>
          </>
        ) : null}
        <Link to={`/tutorials?courseName=${courseName}&courseCode=${courseCode}`} className="tile">
          <div className="tile-icon">〽️</div>
          Tutorials
        </Link>
        {role.includes('utor') ? null : (
          <Link to="/manualcheckin" className="tile">
            <div className="tile-icon">📹</div>
            Record Session
          </Link>
        )}
        <Link to="/checkin" className="tile">
          <div className="tile-icon">✅</div>
          Check-In
        </Link>
        <Link to="/attendance" className="tile">
          <div className="tile-icon">📜</div>
          Attendance
        </Link>
      </div>
      <div id="content" className="course-details-container">
  <h3 id="header" className="course-headerr">
    {courseName} - {courseCode}
  </h3>
  <div className="course-details">
    {course ? (
      <div className="course-info">
        <div>
          <strong>Duration:</strong> {course.duration}
        </div>
        <div>
          <strong>Year:</strong> {course.year}
        </div>
        <div>
          <strong>Creator:</strong> {course.creator}
        </div>
            <div>
              <strong>TA:</strong> {course.ta}
            </div>
            <div>
              <strong>Convener:</strong> {course.convener}
            </div>
            <div>
              <strong>Tutors:</strong>
            </div>
            <ul className="tutors-list">
              {course.tutors.map((tutor, index) => (
                <li key={index} className="tutor-item">
                  {index+1}. {tutor.name} - {tutor.studentID}
                </li>
              ))}
            </ul>
      </div>
    ) : (
      'Loading course info...'
    )}
  </div>
</div>


    </div>
  );
};

export default CoursePage;



