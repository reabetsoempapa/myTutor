package com.example.demo.Controllers;

import com.example.demo.Collection.ApplicationCreation;
import com.example.demo.Logic.ApplicationCreationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")

@RequestMapping("api/v1/applicationcreation")
@AllArgsConstructor
public class ApplicationCreationController {
    private final ApplicationCreationService applicationCreationService;
    // GET endpoint to fetch all application creations
    @GetMapping
    public List<ApplicationCreation> fetchAllApplicationCreations(){
        return applicationCreationService.getAllApplicationCreations();
    }
    // GET endpoint to fetch all application creations
    @GetMapping("/aplliacationCreation{department}")
    public ApplicationCreation getApplicationCreation(@PathVariable String department) {
        return applicationCreationService.getApplicationCreation(department);}
    // GET endpoint to fetch all application creations
    @PostMapping
    public void addApplicationCreation(@RequestBody ApplicationCreation applicationCreation){
        applicationCreationService.addApplicationCreation(applicationCreation);}
    // DELETE endpoint to delete an application creation by ID
    @DeleteMapping("/{id}")
    public void deleteApplicationCreation(@PathVariable String id){
        applicationCreationService.deleteApplicationCreation(id);}
}
