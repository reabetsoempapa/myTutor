import React, { useState,useEffect } from 'react';
import './styling/manageCourse.css'
import CourseController from '../../../Controllers/CourseController';
import { useLocation } from 'react-router-dom';
import Course from '../../../Models/Class files/Course';
import LoadingPage from '../MainPages/LoadingPage';
import UserController from '../../../Controllers/UserController';
import UserDetails from '../users/UserDetails';

const ManageCourse = () => {
  //Get course from url
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const courseNameParam = searchParams.get('courseName');
  const courseCodeParam = searchParams.get('courseCode');
  const courseController = new CourseController();

 // Define state variables and setter functions
 const [courseName, setCourseName] = useState('');
 const [courseCode, setCourseCode] = useState('');
 const [duration, setDuration] = useState('');
 const [year, setYear] = useState('');
 const [creator, setCreator] = useState('');
 const [tutors, setTutors] = useState([]);
 const [ta,setTa] = useState('');
 const [convener,setConvener] = useState('');
 const [loading, setLoading] = useState(true);
 const [selectedUser, setSelectedUser] = useState(null);

 useEffect(() => {
   // Create a function to fetch the course data and update the state
   async function fetchCourseInfo() {
     try {
      const courseController = new CourseController();
       const course = await courseController.getCourse(courseCodeParam);

       // Update the state with the received course data
       setCourseName(course.courseName);
       setCourseCode(course.courseCode);
       setDuration(course.duration);
       setYear(course.year);
       setCreator(course.creator);
       setConvener(course.convener||'');
       setTa(course.ta||'');
       setTutors(course.tutors);
       setLoading(false);
     } catch (error) {
       console.error(error);
       setLoading(false);
     }
   }

   // Call the function to fetch the course data when the component mounts
   fetchCourseInfo();
 }, [courseCodeParam]);
 
 

  const handleTutorChange = (e, index) => {
    // const updatedTutors = [...tutors];
    // updatedTutors[index] = e.target.value;
    // setTutors(updatedTutors);
  };

  const handleAddTutor = () => {
    setTutors([...tutors, '']);
  };

  const handleRemoveTutor = (index) => {
    const confirmMessage = "Remove tutor " + tutors[index].name;
    
    // Display a confirmation dialog
    const userConfirmed = window.confirm(confirmMessage);
  
    if (userConfirmed) {
      // If the user confirmed, create a copy of the tutors array and remove the selected tutor
      const updatedTutors = [...tutors];
      updatedTutors.splice(index, 1);
      // Update the state with the new array
      setTutors(updatedTutors)
      setTimeout(()=>{
        handleUpdateCourse().then(()=>{
          console.log('Removed tutor');
        })
      },3000)
      
    }
  };
  

  const handleUpdateCourse = async ({taUpdated = '',adminUpdated=''}) => {
    setLoading(true);
    const course = await courseController.getCourse(courseCode);
    if(course){
      course.duration = duration;
      course.year = year;
      course.tutors = tutors;
      course.ta = taUpdated || ta;
      course.convener = adminUpdated || convener;
      const updatedCourseStatus = await courseController.updateCourse(course);
      if (updatedCourseStatus === true) alert("Updated successfully!");
      else alert("Something went wrong :(");
  }else{
      const updatedCourseStatus = await courseController.updateCourse(new Course(courseName,courseCode,duration,year,creator,ta,convener));
      if (updatedCourseStatus === true) alert("- Updated successfully!");
      else alert("Something went wrong :(");
  }
  setLoading(false);

  };
 const handleDeleteCourse = async ()=>{
    const deleted = await courseController.removeCourse(courseCode);
    if(deleted) alert("Course removed");
    else alert("Something went wrong");
 }

  // Define state variables and setter functions for user search
  const [searchQuery, setSearchQuery] = useState('');
  const [matchingUsers, setMatchingUsers] = useState([]);

  // Create a UserController instance
  const userController = new UserController();

  // Handle user search based on the searchQuery
  const handleUserSearch = () => {
    setSelectedUser(null);//Clear selected users;
    userController.loadUsers().then(()=>{
      const matchingUsers = userController.getUsersInorder('ascending').filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMatchingUsers(matchingUsers);
    })
    
  };
  // Function to handle the user click and open UserDetails component
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="manage-course">
      {loading && <LoadingPage elementBeingLoaded={'course information'}/>}
      <h2>Manage Course - {courseNameParam}</h2>
      
      <label>
        Course Name:
        <input
          type="text"
          value={courseName}
          disabled
        />
      </label>
      <label>
        Course Code:
        <input
          type="text"
          value={courseCode}
          disabled
        />
      </label>
      <label>
        Duration:
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </label>
      <label>
        Year:
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </label>
      <label>
        Creator:
        <input
          type="text"
          value={creator}
          disabled
        />
      </label>
      <label>
        TA:
        <input
          type="text"
          value={ta}
          disabled
        />
      </label>
      <label>
        Convener:
        <input
          type="text"
          value={convener?convener.username:""}
          disabled
        />
      </label>
      <h3>Tutors/Participants</h3>
      {tutors.map((tutor, index) => (
        <div key={index}>
          <input
            type="text"
            value={tutor.name+" - "+tutor.studentID}
            onChange={(e) => handleTutorChange(e, index)}
          />
          <button onClick={() => handleRemoveTutor(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddTutor} className='tutor-button'>Add Tutor</button>
      <button onClick={handleUpdateCourse} className='tutor-button'>Update Course</button>
      <button onClick={handleDeleteCourse} className='tutor-button'>Remove course</button>
      <a href='#searchPerson'>🔍</a>
<hr></hr>

      {/* Add User Search Input Field */}
      <label id='searchPerson'>
        Search User:
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleUserSearch}>Search</button>
      </label>

      {/* Display Matching Users */}
      {matchingUsers.length > 0 && selectedUser===null && (
        <div className='searchResults'>
          <h3>Results:</h3><br></br>
          <ul>
            {matchingUsers.map((user, index) => (
              <li key={index}>{user.username+" - "+user.role} <button className="tutor-button" onClick={() => handleUserClick(user)}>
              View Details
            </button></li>
              
            ))}
          </ul>
        </div>
      )}

      {/* Render UserDetails component when a user is selected */}
      {selectedUser && (
        <UserDetails
          user={selectedUser}
          role={selectedUser.role}
          setSelectedUser={setSelectedUser}
          course={handleUpdateCourse}
          setConvener={setConvener}
          setTa={setTa}
          onClose={() => setSelectedUser(null)} // Close UserDetails component
        />
      )}
      <p id='searchEnd'></p>
    </div>
  );
};

export default ManageCourse;

