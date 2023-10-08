package com.example.demo.Controllers;

import com.example.demo.Collection.ApplicationSubmission;
import com.example.demo.Repository.ApplicationSubmissionRepository;
import com.example.demo.Logic.ApplicationSubmissionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@DataMongoTest
@DirtiesContext
public class ApplicationSubmissionServiceIntegrationTest {

    @Autowired
    private ApplicationSubmissionRepository applicationSubmissionRepository;

    private ApplicationSubmissionService applicationSubmissionService;

    @BeforeEach
    void setUp() {
        applicationSubmissionService = new ApplicationSubmissionService(applicationSubmissionRepository);
    }

    @Test
    void testAddAndGetApplicationSubmission() {
        // Arrange
        ApplicationSubmission submissionToAdd = new ApplicationSubmission("MPPREA001","Reabetsoe","MPAPA","moo","3","50", LocalDateTime.of(2023, 3, 12, 0, 0));


        // Act
        applicationSubmissionService.addApplicationSubmission(submissionToAdd);

        // Assert
        ApplicationSubmission retrievedSubmission = applicationSubmissionService.getApplicationSubmission("12345");
        assertEquals(submissionToAdd, retrievedSubmission);
    }

    @Test
    void testGetAllApplicationSubmissions() {
        // Arrange
        ApplicationSubmission submission1 = new ApplicationSubmission("MPPREA001","Reabetsoe","MPAPA","moo","3","50", LocalDateTime.of(2023, 3, 12, 0, 0));

        ApplicationSubmission submission2 = new ApplicationSubmission("MPPREA001","Reabetsoe","MPAPA","moo","3","50", LocalDateTime.of(2023, 3, 12, 0, 0));
        applicationSubmissionRepository.save(submission1);
        applicationSubmissionRepository.save(submission2);

        // Act
        List<ApplicationSubmission> submissions = applicationSubmissionService.getAllApplicationSubmissions();

        // Assert
        assertEquals(2, submissions.size());
        assertTrue(submissions.contains(submission1));
        assertTrue(submissions.contains(submission2));
    }
}
