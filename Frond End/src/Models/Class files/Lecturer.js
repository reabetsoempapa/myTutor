
export default class Lecturer extends User {
    constructor(username, password, employeeId, name) {
      super(username, password);
      this.employeeId = employeeId;
      this.name = name;
      this.admins = [];
    }
  
    addAdmin(adminName) {
      this.admins.push(adminName);
    }
  }
 