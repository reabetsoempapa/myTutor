export default class Application {
  constructor(applicationId, details, department, dueDate, accessLink) {
      this.applicationId = applicationId;
      this.department = department; 
      this.dueDate = dueDate;
      this.accessLink = accessLink;
      this.details= details;
  }

  // Method to convert the object to a JSON-compatible structure
  toJSONType() {
    return {
      applicationId: this.applicationId,
      department: this.department,
      dueDate: this.dueDate,
      accessLink: this.accessLink,
      details: this.details
    };
  }

  // Static method to create an object from a JSON representation
  static fromJSONType(json) {
    const { id, department, dueDate, accessLink, details } = json;
    return new Application(id, details, department, dueDate, accessLink);
  }

  
}


 