package com.example.demo.Logic;



import com.example.demo.Collection.ApplicationCreation;
import com.example.demo.Email.EmailService;
import com.example.demo.Repository.ApplicationCreationRepository;
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

class ApplicationCreationServiceTest {

    @Mock
    private ApplicationCreationRepository applicationCreationRepository;

    @Mock
    private EmailService emailService;

    private ApplicationCreationService applicationCreationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        applicationCreationService = new ApplicationCreationService(applicationCreationRepository, emailService);
    }

    @Test
    void testGetApplicationCreation() {
        // Arrange
        String department = "IT";
        ApplicationCreation expectedApplicationCreation = new ApplicationCreation("CS","HJK", LocalDateTime.of(2023, 3, 12, 0, 0),"hjbefiwgi");
        when(applicationCreationRepository.findApplicationCreationByDepartment(department))
                .thenReturn(Optional.of(expectedApplicationCreation));

        // Act
        ApplicationCreation actualApplicationCreation = applicationCreationService.getApplicationCreation(department);

        // Assert
        assertEquals(expectedApplicationCreation, actualApplicationCreation);
    }

    @Test
    void testGetAllApplicationCreations() {
        // Arrange
        List<ApplicationCreation> expectedApplicationCreations = new ArrayList<>();
        when(applicationCreationRepository.findAll()).thenReturn(expectedApplicationCreations);

        // Act
        List<ApplicationCreation> actualApplicationCreations = applicationCreationService.getAllApplicationCreations();

        // Assert
        assertEquals(expectedApplicationCreations, actualApplicationCreations);
    }

    @Test
    void testAddApplicationCreation() {
        // Arrange
        ApplicationCreation applicationCreationToAdd = new ApplicationCreation("CS","HJK", LocalDateTime.of(2023, 3, 12, 0, 0),"hjbefiwgi");

        // Act
        applicationCreationService.addApplicationCreation(applicationCreationToAdd);

        // Assert
        verify(applicationCreationRepository).insert(applicationCreationToAdd);
    }

    @Test
    void testDeleteApplicationCreation() {
        // Arrange
        String departmentToDelete = "Finance";

        // Act
        applicationCreationService.deleteApplicationCreation(departmentToDelete);

        // Assert
        verify(applicationCreationRepository).deleteById(departmentToDelete);
    }
}
