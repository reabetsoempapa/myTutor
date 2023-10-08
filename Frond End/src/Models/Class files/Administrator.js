class Administrator {
    constructor(employeeId, name) {
      this.employeeId = employeeId;
      this.name = name;
      this.tutors = [];
      this.tutorials = [];
      this.courses = [];
    }
  
    addTutors(tutors) {
      for (const tutor of tutors) {
        this.tutors.push(tutor);
      }
    }
  
    removeTutors(...tutors) {
      for (const tutor of tutors) {
        const index = this.tutors.indexOf(tutor);
        if (index !== -1) {
          this.tutors.splice(index, 1);
        }
      }
    }
  
    addTutorials(...tutorials) {
      for (const tutorial of tutorials) {
        this.tutorials.push(tutorial);
      }
    }
  
    removeTutorials(...tutorials) {
      for (const tutorial of tutorials) {
        const index = this.tutorials.indexOf(tutorial);
        if (index !== -1) {
          this.tutorials.splice(index, 1)
        }
      }
    }

    addCourses(...course) {
      for (const course of courses) {
        this.courses.push(course);
      }
    }
  
    removeCourse(...course) {
      for (const course of courses) {
        const index = this.courses.indexOf(course);
        if (index !== -1) {
          this.courses.splice(index, 1)
        }
      }
    }
  
    viewTutorAttendance(tutor) {
    
    }
  }