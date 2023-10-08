import React, { useState } from 'react';
import './styling/Register.css';
import Login from './Login';
import UserController from '../../../Controllers/UserController';
import User from '../../../Models/Class files/User';

const WelcomePage = ({ setSelectedRole }) => {
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  return (
    <div className="page">
      <h1>Welcome to MyTutor Web Tool</h1>
      <p>Welcome to MyTutor, a web tool for managing tutors.<br></br><br></br>Please select your role:</p>
      <select className="role-select" onChange={handleRoleChange}>
        <option value="n">Select here</option>
        <option value="prospectivetutor">I am a prospective tutor</option>
        <option value="tutor">I am a tutor</option>
        <option value="TA">I am a TA</option>
        <option value="admin">I am a staff member</option>
      </select>
    </div>
  );
};

const RegisterPage = ({ formData, handleInputChange, handleSubmit, messagetoUser }) => {
  return (
    <div className="page">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm password:</label>
          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm password"
            value={formData.confirmpassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div style={{'color': 'red'}}>{messagetoUser}</div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

const Register = ({ setLoggedIn }) => {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [selectedRole, setSelectedRole] = useState('');
  const [messagetoUser, setMessagetoUser] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmpassword:''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMessagetoUser('');
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const isUctEmail = (userEmail) => {
    const uctEmailPattern = /uct\.ac\.za$|uct\.ac\.za/i;
    // Test if the user's email matches the pattern
    return uctEmailPattern.test(userEmail);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
   // console.log(selectedRole);
    //console.log(isUctEmail(formData.email));
    
    if(isUctEmail(formData.email) === false) {
      setMessagetoUser("Please provide your UCT email");
      return;
    }
    if(formData.password !== formData.confirmpassword){
        setMessagetoUser('Password does not match.');
        return;
    }
    const userController = new UserController();
    userController.registerUser(new User(formData.email,formData.password,selectedRole)).then((value)=>{
      setMessagetoUser("");
      if (value === 1){
        const verificationLink = "localhost:3000/verify?usr="+generateToken();
        console.log(verificationLink);
        alert("A verification message has been sent to "+formData.email+". Please use the instructions on the email to login. \n\nstatus"+value);
        setCurrentPage('login');
      }
      else if(value === 0){
        console.log("An error occured");
        setMessagetoUser("Email already exists");
      }else{
        console.log("An error occured");
        setMessagetoUser("Email already exists");
      }
    })
    
    
  };
  const generateToken = ()=>{
        const string  = formData.email+"_"+formData.password+"_"+selectedRole;
        //encryptstring
        const encryptedstring = string;
        return encryptedstring;
  }
  const renderPage = () => {
    if (currentPage === 'welcome') {
      return <WelcomePage setSelectedRole={setSelectedRole} />;
    } else if (currentPage === 'register') {
      return <RegisterPage formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} messagetoUser={messagetoUser}/>;
    } else if (currentPage === 'login') {
      return <Login setLoggedIn={setLoggedIn} />;
    }
  };
  return (
    <div className="register-container">
      {renderPage()}
      {(selectedRole.length>1)&& (currentPage === 'welcome')&& <div className='actionRequired'>
        <p>I want to:</p>
        <ul className="tab-menu">
          <li>
            <button onClick={() => setCurrentPage('login')}>Login</button>
          </li>
          <li>
            <button onClick={() => setCurrentPage('register')}>Register</button>
          </li>
        </ul>
      </div>}
    </div>
  );
};

export default Register;
