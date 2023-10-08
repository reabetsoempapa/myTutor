import React, { useState } from 'react';
import './styling/styles.css';
import UserController from '../../../Controllers/UserController';

const Login = ({ setLoggedIn }) => {
    const userController = new UserController();
    userController.loadUsers();

    // State to store form input values
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [feedBack, setFeedBack] = useState('');

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Find the user based on the entered username
        const user = userController.findUser(username);

        // Check if the user exists and login credentials are correct
        if (user && user.login(username, password) === true) {
            setLoggedIn(true);
            console.log("Logged in");
            sessionStorage.setItem('username',username);
            sessionStorage.setItem('logged','true');
            sessionStorage.setItem('userRole',user.role);
        } else {
            sessionStorage.removeItem('logged');
            setFeedBack("Username or password not found");
            console.log("Login failed");
        }
    };
    //userController.loginUser(new User('JNTAMA001@myuct.ac.za','1234','tutor'));
    return (
        <div className='Logginbody'>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        value={username}
                        onChange={(e) => {setUsername(e.target.value);setFeedBack('')}}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => {setPassword(e.target.value);setFeedBack('')}}
                    />
                    <br></br>
                    <p className='feedBack'>{feedBack}</p>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
