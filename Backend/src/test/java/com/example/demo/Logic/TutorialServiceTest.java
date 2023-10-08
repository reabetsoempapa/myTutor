package com.example.demo.Logic;

import com.example.demo.Collection.Tutor;
import com.example.demo.Collection.Tutorial;
import com.example.demo.Email.EmailService;
import com.example.demo.Repository.TutorialRepository;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TutorialServiceTest {
    @Mock
    private TutorialRepository tutorialRepository;

    private TutorialService tutorialService;
    private EmailService emailService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        tutorialService = new TutorialService(tutorialRepository, null); // Null for emailService since we don't need it for this test
    }

    @Test
    void testGetTutorial() {
        // Arrange
        String tutorialID = "1";
        String courseCode = "CS101";
        String title = "Introduction to Programming";
        String dayOfWeek = "Monday";
        String time = "10:00 AM";
        int numberOfTutors = 2;

        Tutorial expectedTutorial = new Tutorial(tutorialID, courseCode, title,  dayOfWeek,  time,  numberOfTutors);
        when(tutorialRepository.findTutorialByTutorialID(tutorialID)).thenReturn(Optional.of(expectedTutorial));

        // Act
        Tutorial actualTutorial = tutorialService.getTutorial(tutorialID);

        // Assert
        assertEquals(expectedTutorial, actualTutorial);
    }

    @Test
    void testGetTutorialWhenNotFound() {
        // Arrange
        String tutorialId = "2";
        when(tutorialRepository.findTutorialByTutorialID(tutorialId)).thenReturn(Optional.empty());

        // Act
        Tutorial actualTutorial = tutorialService.getTutorial(tutorialId);

        // Assert
        assertEquals(null, actualTutorial);
    }
    @Test
    void testGetAllTutorials() {
        // Arrange
        List<Tutorial> expectedTutorials = new ArrayList<>();
        when(tutorialRepository.findAll()).thenReturn(expectedTutorials);

        // Act
        List<Tutorial> actualTutorials = tutorialService.getAllTutorials();

        // Assert
        assertEquals(expectedTutorials, actualTutorials);
    }

    @Test
    void testAddTutorial() {
        // Arrange
        Tutorial tutorialToAdd = new Tutorial("1", "CS101", "Introduction to Programming", "Monday", "10:00 AM", 2);

        // Act
        tutorialService.addTutorial(tutorialToAdd);

        // Assert
        verify(tutorialRepository).insert(tutorialToAdd);
    }

    @Test
    void testDeleteTutorial() {
        // Arrange
        String tutorialIdToDelete = "1";

        // Act
        tutorialService.deleteTutorial(tutorialIdToDelete);

        // Assert
        verify(tutorialRepository).deleteById(tutorialIdToDelete);
    }


}
