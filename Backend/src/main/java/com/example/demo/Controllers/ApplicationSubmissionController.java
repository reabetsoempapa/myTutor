package com.example.demo.Controllers;

import com.example.demo.Collection.ApplicationSubmission;
import com.example.demo.Email.EmailService;
import com.example.demo.Logic.ApplicationSubmissionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")

@RequestMapping("api/v1/applicationsubmission")
@AllArgsConstructor
public class ApplicationSubmissionController {
    private final ApplicationSubmissionService applicationSubmissionService;
    private final EmailService emailService;
    // GET endpoint to fetch all application submissions
    @GetMapping
    public List<ApplicationSubmission> fetchAllApplicationSubmissions(){
        return applicationSubmissionService.getAllApplicationSubmissions();
    }
    // GET endpoint to get an application submission by student number
    @GetMapping("/applicationsubmission/{studentNumber}")
    public ApplicationSubmission getAllApplicationSubmission(@PathVariable String studentNumber) {
        return applicationSubmissionService.getApplicationSubmission(studentNumber);}
    // POST endpoint to add an application submission
    @PostMapping
    public void addApplicationSubmission(@RequestBody ApplicationSubmission applicationSubmission){

        applicationSubmissionService.addApplicationSubmission(applicationSubmission);
    }
    // DELETE endpoint to delete an application submission by ID
    @DeleteMapping("/{id}")
    public void deleteApplicationSubmission(@PathVariable String id){
        applicationSubmissionService.deleteApplicationSubmission(id);}
}

