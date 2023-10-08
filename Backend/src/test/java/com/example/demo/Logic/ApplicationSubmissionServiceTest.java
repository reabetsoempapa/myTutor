package com.example.demo.Logic;


import com.example.demo.Collection.ApplicationSubmission;
import com.example.demo.Repository.ApplicationSubmissionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ApplicationSubmissionServiceTest {

    @Mock
    private ApplicationSubmissionRepository applicationSubmissionRepository;

    private ApplicationSubmissionService applicationSubmissionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        applicationSubmissionService = new ApplicationSubmissionService(applicationSubmissionRepository);
    }

    @Test
    void testGetApplicationSubmission() {
        // Arrange
        String studentNumber = "12345";
        ApplicationSubmission expectedSubmission = new ApplicationSubmission("MPPREA001","Reabetsoe","MPAPA","moo","3","50", LocalDateTime.of(2023, 3, 12, 0, 0));
        when(applicationSubmissionRepository.findApplicationSubmissionByStudentNumber(studentNumber))
                .thenReturn(Optional.of(expectedSubmission));

        // Act
        ApplicationSubmission actualSubmission = applicationSubmissionService.getApplicationSubmission(studentNumber);

        // Assert
        assertEquals(expectedSubmission, actualSubmission);
    }

    @Test
    void testGetAllApplicationSubmissions() {
        // Arrange
        List<ApplicationSubmission> expectedSubmissions = new ArrayList<>();
        when(applicationSubmissionRepository.findAll()).thenReturn(expectedSubmissions);

        // Act
        List<ApplicationSubmission> actualSubmissions = applicationSubmissionService.getAllApplicationSubmissions();

        // Assert
        assertEquals(expectedSubmissions, actualSubmissions);
    }

    @Test
    void testAddApplicationSubmission() {
        // Arrange
        ApplicationSubmission expectedSubmission = new ApplicationSubmission("MPPREA001","Reabetsoe","MPAPA","moo","3","50", LocalDateTime.of(2023, 3, 12, 0, 0));

        ApplicationSubmission submissionToAdd = new ApplicationSubmission("MPPREA001","Reabetsoe","MPAPA","moo","3","50", LocalDateTime.of(2023, 3, 12, 0, 0));

        // Act
        applicationSubmissionService.addApplicationSubmission(submissionToAdd);

        // Assert
        verify(applicationSubmissionRepository).insert(submissionToAdd);
    }

    @Test
    void testDeleteApplicationSubmission() {
        // Arrange
        String studentNumberToDelete = "67890";

        // Act
        applicationSubmissionService.deleteApplicationSubmission(studentNumberToDelete);

        // Assert
        verify(applicationSubmissionRepository).deleteById(studentNumberToDelete);
    }
}
