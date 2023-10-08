import Course from "../Models/Class files/Course";
import BackendService from "../Service/BackendService";
import ENDPOINTS from "../Service/EndPoints";

// Define a class called CourseController
export default class CourseController {
  constructor() {
    // Initialize the 'courses' array and the 'backendService'
    this.courses = [];
    this.backendService = new BackendService("http://196.47.228.182:8080/api/v1");

    // Load courses when the controller is initialized
    this.loadCourses().then((coursess) => {
      this.courses = coursess;
    });
  }

  // Asynchronous method to load courses from the backend
  async loadCourses() {
    try {
      // Fetch courses from the backend using the provided endpoint
      const backCourses = await this.backendService.get(ENDPOINTS.ALLCOURSES);

      // Add new courses to the 'courses' array if they don't already exist
      backCourses.forEach((element) => {
        if (this.courses.every((course) => course.courseCode !== element.courseCode)) {
          this.courses.push(Course.fromJSONType(element));
        }
      });
    } catch (error) {
      console.log(error);
    }

    return this.courses; // Return the loaded courses
  }

  // Asynchronous method to update a course
  async updateCourse(course) {
    try {
      // Send a PUT request to update the course on the backend
      const backCourses = await this.backendService.put(ENDPOINTS.COURSE_UPDATE + course.courseCode, course);
      console.log(backCourses);
    } catch (error) {
      console.log(error);
    }

    // Update the corresponding course in the 'courses' array
    const index = this.courses.findIndex((app) => app.courseCode === course.courseCode);
    if (index >= 0) {
      this.courses[index] = course;
      return true; // Course updated successfully
    } else {
      alert("Could not update Courses!");
      return false; // Course not found, update failed
    }
  }

  // Asynchronous method to add a new course
  async addCourse(course) {
    try {
      // Send a POST request to add the course to the backend
      const backCourses = await this.backendService.post(ENDPOINTS.ALLCOURSES, course);
      console.log(backCourses);
    } catch (error) {
      console.log(error);
    }

    this.courses.push(course); // Add the course to the 'courses' array
  }

  // Asynchronous method to get a course by its courseCode
  async getCourse(courseCode) {
    await this.loadCourses(); // Ensure that courses are loaded
    return this.courses.find((course) => course.courseCode === courseCode);
  }

  // Method to get courses associated with a tutor's username
  getCoursesByTutor(tutorUsername) {
    // Filter the courses to find those that have a tutor with matching username
    const coursesByTutor = this.courses.filter((course) =>
      course.tutors.some((tutor) => tutor.email === tutorUsername)
    );
    return coursesByTutor;
  }

  // Asynchronous method to remove a course by its courseCode
  async removeCourse(courseCode) {
    try {
      // Send a DELETE request to remove the course from the backend
      await this.backendService.delete(`courses/${courseCode}`);
      return true; // Course removed successfully
    } catch (error) {
      console.log(error);
      return false; // Course removal failed
    }
  }
}
