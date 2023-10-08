package com.example.demo.Logic;

import static org.junit.jupiter.api.Assertions.*;
import com.example.demo.Collection.Course;
import com.example.demo.Collection.Tutor;
import com.example.demo.Email.EmailService;
import com.example.demo.Repository.CourseRepository;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
class CourseServiceTest {

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private EmailService emailService;

    private CourseService courseService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        courseService = new CourseService(courseRepository, emailService);
    }

    @Test
    void testGetCourse() {
        // Arrange
        String courseCode = "CS101";
        Course expectedCourse = new Course(courseCode, "Introduction to Programming");
        when(courseRepository.findCourseByCourseCode(courseCode)).thenReturn(Optional.of(expectedCourse));

        // Act
        Course actualCourse = courseService.getCourse(courseCode);

        // Assert
        assertEquals(expectedCourse, actualCourse);
    }

    @Test
    void testGetAllCourses() {
        // Arrange
        List<Course> expectedCourses = new ArrayList<>();
        when(courseRepository.findAll()).thenReturn(expectedCourses);

        // Act
        List<Course> actualCourses = courseService.getAllCourses();

        // Assert
        assertEquals(expectedCourses, actualCourses);
    }

    @Test
    void testAddCourse() throws MessagingException {
        // Arrange
        Course courseToAdd = new Course("CS101", "Introduction to Programming");

        // Act
        assertDoesNotThrow(() -> courseService.addCourse(courseToAdd));

        // Assert
        verify(courseRepository).insert(courseToAdd);
    }

    @Test
    void testDeleteCourse() {
        // Arrange
        String courseCodeToDelete = "CS101";

        // Act
        courseService.deleteCourse(courseCodeToDelete);

        // Assert
        verify(courseRepository).deleteById(courseCodeToDelete);
    }

    @Test
    void testAddCourseConvener() throws MessagingException {
        // Arrange
        String courseCode = "CS101";
        String courseConvener = "John Doe";
        Course course = new Course(courseCode, "Introduction to Programming");

        // Mock repository behavior
        when(courseRepository.findCourseByCourseCode(courseCode)).thenReturn(Optional.of(course));

        // Act
        assertDoesNotThrow(() -> courseService.addCourseConvener(courseCode, courseConvener));

        // Assert
        verify(emailService).sendAdditionCourseconvener(Optional.of(course), courseConvener);
        assertEquals(courseConvener, course.getCourseConvener());
    }

    @Test
    void testAddTutor() throws MessagingException {
        // Arrange
        String courseCode = "CS101";
        Course course = new Course(courseCode, "Introduction to Programming");
        Tutor tutorToAdd = new Tutor();

        // Mock repository behavior
        when(courseRepository.findCourseByCourseCode(courseCode)).thenReturn(Optional.of(course));

        // Act
        courseService.addTutor(courseCode, tutorToAdd);

        // Assert
        verify(courseRepository).save(course);
        assertTrue(course.getTutors().contains(tutorToAdd));
    }

    @Test
    void testRemoveTutor() {
        // Arrange
        String courseCode = "CS101";
        Course course = new Course(courseCode, "Introduction to Programming");
        Tutor tutorToRemove = new Tutor();
        course.getTutors().add(tutorToRemove);

        // Mock repository behavior
        when(courseRepository.findCourseByCourseCode(courseCode)).thenReturn(Optional.of(course));

        // Act
        courseService.removeTutor(courseCode, tutorToRemove);

        // Assert
        verify(courseRepository).save(course);
        assertFalse(course.getTutors().contains(tutorToRemove));
    }

    @Test
    void testUpdateCourse() {
        // Arrange
        String courseCode = "CS101";
        Course existingCourse = new Course(courseCode, "Introduction to Programming");
        Course updatedCourse = new Course(courseCode, "Advanced Programming");

        // Mock repository behavior
        when(courseRepository.findCourseByCourseCode(courseCode)).thenReturn(Optional.of(existingCourse));

        // Act
        Optional<Course> result = courseService.updateCourse(courseCode, updatedCourse);

        // Assert
        verify(courseRepository).save(existingCourse);
        assertTrue(result.isPresent());
        assertEquals("Advanced Programming", result.get().getCourseName());
    }

    @Test
    void testUpdateCourseConvener() {
        // Arrange
        String courseCode = "CS101";
        String newCourseConvener = "Jane Smith";
        Course course = new Course(courseCode, "Introduction to Programming");

        // Mock repository behavior
        when(courseRepository.findCourseByCourseCode(courseCode)).thenReturn(Optional.of(course));

        // Act
        courseService.updateCourseConvener(courseCode, newCourseConvener);

        // Assert
        assertEquals(newCourseConvener, course.getCourseConvener());
    }
}