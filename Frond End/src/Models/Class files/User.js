export default class User {
  constructor(username, password, role) {
      this._username = username;
      this._password = password;
      this._role = role;
  }

  // Getter methods
  get username() {
      return this._username;
  }

  get password() {
      return this._password;
  }

  get role() {
      return this._role;
  }

  // Setter methods
  set username(username) {
      this._username = username;
  }

  set password(password) {
      this._password = password;
  }

  set role(role) {
      this._role = role;
  }

  login(enteredUsername, enteredPassword) {
      if (enteredUsername.toLowerCase() === this._username.toLowerCase() && enteredPassword === this._password) {
          return true;
      } else {
          return false;
      }
  }
  toJSONType(){
    return{
        email: this.username,
        password: this.password,
        role: this.role,
    }
  }
  static fromJSONType(user) {
    return new User(user.email, user.password, user.role ==='staffMember'?'admin':user.role);
}
}
