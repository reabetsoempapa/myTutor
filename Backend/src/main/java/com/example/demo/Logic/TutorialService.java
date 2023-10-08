package com.example.demo.Logic;

import com.example.demo.Collection.Tutor;
import com.example.demo.Collection.Tutorial;
import com.example.demo.Email.EmailService;
import com.example.demo.Repository.TutorialRepository;
import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TutorialService {
    private final TutorialRepository tutorialRepository;
    private final EmailService emailService;

    public TutorialService(TutorialRepository tutorialRepository, EmailService emailService) {
        this.tutorialRepository = tutorialRepository;
        this.emailService = emailService;
    }
    // Method to get a tutorial by its tutorial ID
    public Tutorial getTutorial(String id){
        Optional<Tutorial> optionalTutorial = tutorialRepository.findTutorialByTutorialID(id);

        return optionalTutorial.orElse(null);
    }
    // Method to get all tutorials
    public List<Tutorial> getAllTutorials(){
        return tutorialRepository.findAll();
    }
    // Method to add a tutorial
    public void addTutorial (Tutorial tutorial){
        tutorialRepository.insert(tutorial);
    }
    // Method to delete a tutorial by its tutorial ID
    public void deleteTutorial(String tutorialID){
        tutorialRepository.deleteById(tutorialID);
    }

    // Method to add a tutor to a tutorial
   public void addTutor(String tutorialID, Tutor tutor) throws MessagingException {
        Optional<Tutorial> tutorial =  tutorialRepository.findTutorialByTutorialID(tutorialID);
        if(tutorial.isPresent()){
            Tutorial actual_tutorial = tutorial.get();
            actual_tutorial.getTutTutors().add(tutor);

        }else{
            System.out.println("Tutorial not Found");
        }}
    // Method to remove a tutor from a tutorial
    public void removeTutor(String tutorialID, Tutor tutor){
        Optional<Tutorial> tutorial =  tutorialRepository.findTutorialByTutorialID(tutorialID);
        if(tutorial.isPresent()){
            Tutorial actual_tutorial = tutorial.get();
            actual_tutorial.getTutTutors().remove(tutor);
        }else{
            System.out.println("Tutorial not Found");
        }}


    // Method to update tutorial details
   public void updateTutorial(String tutorialID, Tutorial tutorial) throws MessagingException {
        Optional<Tutorial> tut = tutorialRepository.findTutorialByTutorialID(tutorialID);
        if (tut.isPresent()){
          Tutorial actualTUT =  tut.get();


            actualTUT.setVenue(tutorial.getVenue());
            actualTUT.setTime(tutorial.getTime());
            actualTUT.setTitle(tutorial.getTitle());
            for(int i=0; i<tutorial.getTutTutors().size();i++){
                if (actualTUT.getTutTutors().contains(tutorial.getTutTutors().get(i))) {
                    continue;
                } else {
                    emailService.sendTutorialAddition(tutorial.getTutTutors().get(i), Optional.of(tutorial));
                    System.out.println("HERE");
                }
            }
            actualTUT.setTutTutors(tutorial.getTutTutors());

            actualTUT.setDayOfWeek(tutorial.getDayOfWeek());
            actualTUT.setNumberOfTutors(tutorial.getNumberOfTutors());
            actualTUT.setCourseCode(tutorial.getCourseCode());
            tutorialRepository.save(actualTUT);

        }
    }}

