package com.example.demo.Logic;

import com.example.demo.Collection.ApplicationSubmission;
import com.example.demo.Repository.ApplicationSubmissionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;
@AllArgsConstructor
@Service
public class ApplicationSubmissionService {
    private final ApplicationSubmissionRepository applicationSubmissionRepository;

    // Method to get an application submission by student number
    public ApplicationSubmission getApplicationSubmission(String studentNumber) {
        Optional<ApplicationSubmission> optionalApplicationSubmission = applicationSubmissionRepository.findApplicationSubmissionByStudentNumber(studentNumber);

        return optionalApplicationSubmission.orElse(null);
    }
    // Method to get all application submissions
    public List<ApplicationSubmission>getAllApplicationSubmissions(){
            return applicationSubmissionRepository.findAll();
    }
    // Method to add an application submission
    public void addApplicationSubmission(ApplicationSubmission applicationSubmission){
            applicationSubmissionRepository.insert(applicationSubmission);
    }
    // Method to delete an application submission by student number
    public void deleteApplicationSubmission (String studentNumber){
            applicationSubmissionRepository.deleteById(studentNumber);
    }
}