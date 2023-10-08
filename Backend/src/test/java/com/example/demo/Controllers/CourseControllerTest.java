package com.example.demo.Controllers;
import com.example.demo.Collection.Course;
import com.example.demo.Logic.CourseService;
import com.example.demo.Logic.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import java.util.ArrayList;
import java.util.List;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CourseController.class)
@AutoConfigureMockMvc
public class CourseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CourseService courseService;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testFetchAllCourses() throws Exception {
        // Arrange
        List<Course> courses = new ArrayList<>();
        // Add some courses to the list

        when(courseService.getAllCourses()).thenReturn(courses);

        // Act & Assert
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/courses")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void testGetCourse() throws Exception {
        // Arrange
        String courseId = "1";
        Course course = new Course("CSC","FG");

        when(courseService.getCourse(courseId)).thenReturn(course);

        // Act & Assert
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/courses/{id}", courseId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    // Add more tests for other controller methods (addCourse, deleteCourse, addCourseConvener, etc.)
}
