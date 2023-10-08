package com.example.demo.Controllers;

import static org.junit.jupiter.api.Assertions.*;

import com.example.demo.Collection.Tutorial;
import com.example.demo.Logic.TutorialService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TutorialController.class)
@AutoConfigureMockMvc
@SpringBootTest
public class TutorialControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TutorialService tutorialService;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testFetchAllTutorials() throws Exception {
        // Arrange
        List<Tutorial> tutorials = new ArrayList<>();
        // Add some tutorials to the list

        when(tutorialService.getAllTutorials()).thenReturn(tutorials);

        // Act & Assert
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/tutorials")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void testGetTutorial() throws Exception {
        // Arrange
        String tutorialId = "1";
        Tutorial tutorial = new Tutorial("TB","CSC", "TUT","Monday", "15",10); // Create a tutorial object with desired data

        when(tutorialService.getTutorial(tutorialId)).thenReturn(tutorial);

        // Act & Assert
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/tutorials/{id}", tutorialId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void testAddTutorial() throws Exception {
        // Arrange
        Tutorial tutorial = new Tutorial("TB","CSC", "TUT","Monday", "15",10); // Create a tutorial object with desired data

        // Act & Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/tutorials")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(tutorial)))
                .andExpect(status().isOk());
    }

    @Test
    void testDeleteCourse() throws Exception {
        // Arrange
        String tutorialId = "1";

        // Act & Assert
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/tutorials/{id}", tutorialId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    // Add more tests for other controller methods (addTutorTut, removeTutorFromCourse, updateTutorial)
}
