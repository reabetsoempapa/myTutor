import React, { useEffect, useState } from 'react';
import CourseController from '../../../Controllers/CourseController';
import './styling/userDetails.css';
import ApplicationSubmissionController from '../../../Controllers/ApplicationSubmissionController';
import { Link } from 'react-router-dom';

const UserDetails = ({ user, role,setSelectedUser,course, setTa,setConvener }) => {
  const [courses, setCourses] = useState([]);
  const [allsubmission,setAllSubmission] = useState(null);

  useEffect(() => {
    const courseController = new CourseController();
    courseController.loadCourses().then((courseList) => {
      const coursesByTutor = courseController.getCoursesByTutor(user.username);
      setCourses(coursesByTutor);
    });
    if(role==='tutor'){const applicationSubmissionController = new ApplicationSubmissionController();
    
    applicationSubmissionController.getAllSubmissions().then((subs)=>{
        const submissionFromUser = subs.find(sub=> user.username.toLowerCase().includes(sub.studentNumber.toLowerCase()));
        if(submissionFromUser)setAllSubmission(submissionFromUser);
    });}

  }, [user.username,role]); // Added user.username as a dependency to trigger the effect when it changes

  const handleClick = (e) => {
    // Show a confirmation dialog
    if(role.includes('admin')|| role.includes('TA')){
      
      const confirmed = window.confirm("I agree that by adding this user to the course, I permit them to make changes to the course\n\nClick Ok to permit and add user or cancel.");
      
      e.preventDefault();
      if (confirmed){
        if(role.includes('admin')){
            setConvener(user);
            course({adminUpdated:user});
        }
        else if (role.includes('TA')){
            setTa(user.username);
            course({taUpdated:user.username});
        }
        return;
      }
      else {
        return;
      }
    }
    
    const confirmed = window.confirm('Instructions:\nAdding a student to course\n1. Submit an applicant for this student\nOR Ask them to submit it.\n2. Go to applications and add them to a course\n\nClick OK to submit it or cancel');

    // If the user confirms, navigate to the link
    if (confirmed) {
      // This will programmatically navigate the user to the specified link
      window.location.href = 'http://localhost:3000/applications/accessapplications?courseCode=128338&courseName=Computer Science Department&cd=2023/09/21&description=';
    } else {
      // If the user cancels, prevent the default behavior of the button
      e.preventDefault();
    }
  };

  return (
    <div className="user-details">
      <p><strong>Username:</strong> {user.username}  </p>
      <p><strong>Role:</strong> {user.role}</p>
      <br></br>
      {role.endsWith('tutor') && <p><strong></strong> {allsubmission? allsubmission.courseHistory:""}</p>}
      <br></br>
      <div className="course-list">
        {courses.length > 0 ? (
          <>
            <strong>Courses:</strong><br></br>
            <ul>
              {courses.map((course, index) => (
                <li key={index}>
                  {index + 1}. {course.courseCode}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p><em>Does not belong to any course</em></p>
        )}
<Link to={'http://localhost:3000/applications/accessapplications?courseCode=128338&courseName=Computer Science Department&cd=2023/09/21&description='}>
        <button onClick={handleClick}>Add to course</button>
      </Link>
        <button onClick={()=>{setSelectedUser(null)}}>Close</button>
      </div>
    </div>
  );
};

export default UserDetails;

