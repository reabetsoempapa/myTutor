package com.example.demo.Controllers;

import com.example.demo.Collection.Course;
import com.example.demo.Collection.Tutor;
import com.example.demo.Logic.CourseService;
import com.example.demo.Logic.UserService;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/*API*/
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/v1/courses")
@AllArgsConstructor
public class CourseController {
    private final CourseService courseService;
    private final UserService userService;
    // GET endpoint to fetch all courses
    @GetMapping
    public List<Course> fetchAllCourses(){
        return courseService.getAllCourses();}
    // GET endpoint to get a course by ID
    @GetMapping("/{id}")
    public Course getCourse(@ PathVariable String id) {
        return courseService.getCourse(id);}
    // POST endpoint to add a new course
    @PostMapping
    public void addCourse(@RequestBody Course course) throws MessagingException {
        courseService.addCourse(course);}
    // DELETE endpoint to delete a course by ID
    @DeleteMapping("/{id}")
    public String deleteCourse(@PathVariable String id){
        courseService.deleteCourse(id);return "success";}
    // PUT endpoint to add a Course Convener to a course
    @PutMapping("/addCourseConvener")
    public void addCourseConvener(
            @RequestParam("courseCode") String courseCode,
            @RequestBody String courseConvener ) throws MessagingException {
            courseService.addCourseConvener(courseCode, courseConvener);}
    // PUT endpoint to update a Course Convener for a course
    @PutMapping("/updateCourseConvener")
    public void updateCourseConvener(
            @RequestParam ("courseCode") String courseCode,
            @RequestBody String courseConvener){
            courseService.updateCourseConvener(courseCode,courseConvener);}
    // PUT endpoint to add a Tutor to a course
    @PutMapping("/addTutor")
    public void addTutor(
            @RequestParam ("courseCode") String courseCode,
            @RequestBody Tutor tutor) throws MessagingException {
             userService.makeRoleTutor(tutor.getEmail());
             courseService.addTutor(courseCode,tutor);
    }
    // PUT endpoint to remove a Tutor from a course
    @PutMapping("/removeTutor")
    public void removeTutor(
            @RequestParam("courseCode") String courseCode,
            @RequestBody Tutor tutor){
            courseService.removeTutor(courseCode, tutor);}
    // PUT endpoint to update course details
    @PutMapping("/updateCourse")
    public Optional<Course> updateCourse(
            @RequestParam("courseCode") String courseCode,
            @RequestBody Course course ){
        return courseService.updateCourse(courseCode, course);}


}
