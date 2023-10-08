import User from './User'

export default class Tutor extends User{
    constructor(username, password, studentID, name, email, phone) {
      super(username, password, 'tutor');
      this.studentID = studentID;
      this.name = name;
      this.email = email;
      this.phone = phone;
    }

    studentDetails(){
      return `${this.name} -${this.studentID}`;
    }
    toJSONType() {
      return {
        username: this.username,
        password: this.password,
        role: this.role,
        studentID: this.studentID,
        name: this.name,
        email: this.email,
        phone: this.phone
      };
    }

    static fromJSONType(json) {
      const user = new User();
      user.username = json.username || "";
      user.password = json.password || "";
      user.role = json.role || "";
      user.studentID = json.studentID || "";
      user.name = json.name || "";
      user.email = json.email || "";
      user.phone = json.phone || "";
    
      return user;
    }
}
  
  