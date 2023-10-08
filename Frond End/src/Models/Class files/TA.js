class TA extends User{
    constructor(studentId, name, email, phone) {
      super(username, password);
      this.studentId = studentId;
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.jobAccepted = false;
      this.attendanceRecord = {};
    }
  
    submitApplication(application) {
      // Application is added to the database
      
    }
  
    acceptJob() {
      this.jobAccepted = true;
    }
}