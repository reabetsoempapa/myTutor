package com.example.demo.Controllers;
import com.example.demo.Collection.CourseConvener;
import com.example.demo.Logic.CourseConvenerService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*API*/
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/v1/courseConvener")
@AllArgsConstructor

public class CourseConvenerController {
    private final CourseConvenerService courseConvenerService;
    // GET endpoint to fetch all course conveners
    @GetMapping
    public List<CourseConvener> fetchAllCourseConveners(){
        return courseConvenerService.getAllCourseConveners();}
    // GET endpoint to get a course convener by ID
    @GetMapping("/{id}")
    public CourseConvener getCourseConvener(@PathVariable String id) {
        return courseConvenerService.getCourseConvener(id);}
    // POST endpoint to add a new course convener
    @PostMapping
    public void addCourseConvener(@RequestBody CourseConvener course){
        courseConvenerService.addCourseConvener(course);}
    // DELETE endpoint to delete a course convener by ID
    @DeleteMapping("/{id}")
    public String deleteCourseConvener(@PathVariable String id){
        courseConvenerService.deleteCourseConvener(id);return "success";}

    // PUT endpoint to change the course convened by a convener
    @PutMapping("/updateCourseConvened")
    public void changeCourse(
            @RequestParam("courseCode") String courseCode,
            @RequestBody CourseConvener courseConvener ){
        courseConvenerService.updateCourseConvened(courseCode, courseConvener);}



    // PUT endpoint to update course convener details
    @PutMapping("/updateCourseConvener")
    public void updateCourseConvener(
            @RequestParam("courseCode") String courseCode,
            @RequestBody CourseConvener course ){
            courseConvenerService.updateCourseConvener(courseCode, course);}



}


