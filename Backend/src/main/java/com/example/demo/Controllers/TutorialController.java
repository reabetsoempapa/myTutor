package com.example.demo.Controllers;
import com.example.demo.Collection.Tutor;
import com.example.demo.Collection.Tutorial;
import com.example.demo.Logic.TutorialService;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/tutorials")
@CrossOrigin(origins = "http://localhost:3000")

@AllArgsConstructor

public class TutorialController {

        private final TutorialService tutorialService;
    // GET endpoint to fetch all tutorials
       @GetMapping
        public List<Tutorial> fetchAllTutorials(){
            return tutorialService.getAllTutorials();}
    // GET endpoint to get a tutorial by ID
        @GetMapping("/{id}")
        public Tutorial getTutorial(@PathVariable String id) {
            return tutorialService.getTutorial(id);}
    // POST endpoint to add a new tutorial
        @PostMapping
        public void addTutorial(@RequestBody Tutorial tutorial){
            tutorialService.addTutorial(tutorial);}
    // DELETE endpoint to delete a tutorial by ID
        @DeleteMapping("/{id}")
        public void deleteCourse(@PathVariable String id){
            tutorialService.deleteTutorial(id);}

    // PUT endpoint to add a tutor to a tutorial
        @PutMapping("/addTutor")
        public void addTutorTut(
                @RequestParam ("tutorialID") String tutorialID,
                @RequestBody Tutor tutor) throws MessagingException {
            tutorialService.addTutor(tutorialID,tutor);
        }
    // PUT endpoint to remove a tutor from a tutorial
        @PutMapping("/removeTutor")
        public void removeTutorFromCourse(
                @RequestParam("courseCode") String tutorialID,
                @RequestBody Tutor tutor){
            tutorialService.removeTutor(tutorialID, tutor);
        }
    // PUT endpoint to update tutorial details
    @PutMapping("/updateTutorial")
    public void updateTutorial(
            @RequestParam("tutorialID") String tutorialID,
            @RequestBody Tutorial tutorial) throws MessagingException {
        tutorialService.updateTutorial(tutorialID,tutorial);
    }}