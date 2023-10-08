export default class Course {
  constructor(courseName, courseCode,duration,year,creator,ta,convener) {
      this._courseCode = courseCode;
      this._courseName = courseName;
      this._duration = duration || "";
      this._year = year || "";
      this._creator = creator || "";
      this._ta = ta || null;
      this.convener = convener || null;
      this.tutors = [];
      this.otherUsers = '';
  }

  // Getters
  get courseCode() {
      return this._courseCode;
  }

  get courseName() {
      return this._courseName;
  }

  get duration() {
      return this._duration;
  }

  get year() {
      return this._year;
  }

  get creator() {
      return this._creator;
  }
  get ta(){
    return this._ta;
  }

  // Setters
  set courseCode(courseCode) {
      this._courseCode = courseCode;
  }

  set courseName(courseName) {
      this._courseName = courseName;
  }

  set duration(duration) {
      this._duration = duration;
  }

  set year(year) {
      this._year = year;
  }

  set creator(creator) {
      this._creator = creator;
  }
  set ta(ta){
    this._ta = ta;
  }


 

  addTutor(tutor) {
      this.tutors.push(tutor);
  }

  removeLecturer(lecturer) {
      const index = this.lecturers.indexOf(lecturer);
      if (index !== -1) {
          this.lecturers.splice(index, 1);
      }
  }

  removeTA(ta) {
      const index = this.tas.indexOf(ta);
      if (index !== -1) {
          this.tas.splice(index, 1);
      }
  }

  removeTutor(tutor) {
      const index = this.tutors.indexOf(tutor);
      if (index !== -1) {
          this.tutors.splice(index, 1);
      }
  }

  // Method to convert the class object to a plain object
  toJSONType() {
    return {
      courseCode: this._courseCode,
      courseName: this._courseName,
      duration: this._duration,
      year: this._year,
      creator: this._creator,
      ta: this.ta,
    //   courseConvener: this.convener,
       tutors: this.tutors,
    };
  }
  // Static method to create a Course instance from a plain object
  static fromJSONType(courseData) {
    const {
      courseCode,
      courseName,
      duration,
      year,
      creator,
      courseConvener,
      ta,
      tutors,
    } = courseData;

    const course = new Course(courseName, courseCode, duration, year, creator,ta);

    // Add lecturers, tas, and tutors to the course instance
    course.convener = courseConvener || null;
    course.ta = ta || null;
    course.tutors = tutors || [];

    return course;
  }
}
