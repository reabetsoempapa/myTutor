import React, { useEffect, useState } from 'react';
import CourseController from '../../../Controllers/CourseController';
import LoadingPage from '../MainPages/LoadingPage';
import Tutor from '../../../Models/Class files/Tutor';
import TutorController from '../../../Controllers/TutorController';
import UserController from '../../../Controllers/UserController';

const ReviewApplicant = ({ applicant }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourses,setSelectedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  // const belongToCourse = courses.map((course) => {
  //   console.log(course.tutors +"--"+ applicant.studentNumber);
  //   const isStudentInTutors = course.tutors.some((tutor) => tutor.studentID === applicant.studentNumber);
  //   return {
  //     courseName: course.courseCode, // Replace with the actual property you want
  //     belongs: isStudentInTutors,
  //   };
  // // });

  // console.log(belongToCourse);

  useEffect(() => {
    const loadCourses = async () => {
      const courseController = new CourseController();
      const data = await courseController.loadCourses();
      setCourses(data);
    };

    loadCourses();
  }, []);

    const updateChanges = ()=>{
        setLoading(true);
        if(selectedCourses.length === 0){
            
            alert("No changes made");
            return
        }
        else {
            const courseController = new CourseController();
            let countUpdates = 0;
            selectedCourses.forEach((courseCode)=>{
                courseController.getCourse(courseCode).then((course)=>{
                course.tutors.push(new Tutor(applicant.studentNumber,"",applicant.studentNumber,applicant.name,applicant.email,applicant.phone));
                courseController.updateCourse(course).then(()=>{
                    countUpdates++;
                    setLoading(false);
                    alert("Updated successfully !\n"+countUpdates+" - updates made\n"+applicant+" added to course(s) "+courseCode);
                });
                })
                
            });
            
            
        }
        const tutorController = new TutorController();
        
        
        try {
          tutorController.createTutor(applicant.studentNumber,applicant.name,applicant.email,applicant.phone);
          const userController = new UserController();
          userController.loadUsers().then(()=>{
          const user = userController.findUser(applicant.email);
          console.log(user);
          if(user){
            user.role = 'tutor';
            userController.updateUser(user).then((value)=>{
              console.log("Updated user: "+value)
            })
          }
        })
        } catch (error) {
          console.log(error);
        }
        
        }

    // Handle checkbox change
    const handleCheckboxChange = (courseCode) => {
        if (selectedCourses.includes(courseCode)) {
        // If the course is already in the selectedCourses, remove it
        setSelectedCourses(selectedCourses.filter((code) => code !== courseCode));
        } else {
        // If the course is not in selectedCourses, add it
        setSelectedCourses([...selectedCourses, courseCode]);
        }
    };
  return (
    <>
    <td className='selectableCourses'>
        {loading && <LoadingPage elementBeingLoaded={'updates'}/>}
      {courses.map((course) => (
        <div key={course.courseCode}>
          <input
            type='checkbox'
            onChange={() => handleCheckboxChange(course.courseCode)}
            disabled={course.tutors.some((tutor) => tutor.studentID === applicant.studentNumber)}
            checked={selectedCourses.includes(course.courseCode) || course.tutors.some((tutor) => tutor.studentID === applicant.studentNumber)}
          />
          {course.courseCode}
        </div>
      ))}
      <input type='text' placeholder='Search course'/>
    </td>
    <td>
        <button className="approve" onClick={updateChanges}>Update</button>
    </td>
    </>
  );
};

export default ReviewApplicant;

