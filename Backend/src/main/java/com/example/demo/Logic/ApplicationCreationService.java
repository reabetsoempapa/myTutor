package com.example.demo.Logic;

import com.example.demo.Collection.ApplicationCreation;
import com.example.demo.Email.EmailService;
import com.example.demo.Repository.ApplicationCreationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;

@AllArgsConstructor
@Service
public class ApplicationCreationService {

    private final ApplicationCreationRepository applicationCreationRepository;
    private final EmailService emailService;
    // Method to get an application creation by department
    public ApplicationCreation getApplicationCreation(String department){
        Optional<ApplicationCreation> optionalApplicationCreation = applicationCreationRepository.findApplicationCreationByDepartment(department);
        return optionalApplicationCreation.orElse(null);

    }
    // Method to get all application creations
    public List<ApplicationCreation> getAllApplicationCreations(){
        return applicationCreationRepository.findAll();
    }

    // Method to add an application creation
    public void addApplicationCreation (ApplicationCreation applicationCreation){

        applicationCreationRepository.insert(applicationCreation);
    }
    // Method to delete an application creation by department
    public void deleteApplicationCreation(String department){
        applicationCreationRepository.deleteById(department);
    }

}
