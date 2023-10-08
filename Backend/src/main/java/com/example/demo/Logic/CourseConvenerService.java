package com.example.demo.Logic;

import com.example.demo.Collection.CourseConvener;
import com.example.demo.Repository.CourseConvenerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseConvenerService {
 private final CourseConvenerRepository courseConvenerRepository;

    public CourseConvenerService(CourseConvenerRepository courseConvenerRepository) {
        this.courseConvenerRepository = courseConvenerRepository;
    }
   // Method to get all course conveners
    public List<CourseConvener> getAllCourseConveners() {
        return  courseConvenerRepository.findAll();
    }
   // Method to get a course convener by employee ID
    public CourseConvener getCourseConvener(String employeeID) {
       Optional<CourseConvener> optionalCourseConvener = courseConvenerRepository.findCourseConvenerByEmployeeID(employeeID);
       return optionalCourseConvener.orElse(null);
    }
   // Method to add a course convener
    public void addCourseConvener(CourseConvener courseConvener) {
       courseConvenerRepository.insert(courseConvener);
    }
   // Method to delete a course convener by employee ID
    public void deleteCourseConvener(String employeeID) {
       Optional<CourseConvener> optionalCourseConvener = courseConvenerRepository.findCourseConvenerByEmployeeID(employeeID);
       if(optionalCourseConvener.isPresent()){
          courseConvenerRepository.deleteById(employeeID);
       }
       }

   // Method to update course convener details.
    public void updateCourseConvener(String courseCode, CourseConvener course) {
    }
   // Method to update the course that a course convener is responsible for.
    public void updateCourseConvened(String courseCode, CourseConvener courseConvener) {

    }
}
