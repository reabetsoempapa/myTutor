import User from "../Models/Class files/User";
import BackendService from "../Service/BackendService";

// Define a class called UserController
export default class UserController {
    constructor() {
        // Initialize the 'users' array and the 'backendService'
        this.users = [];
        this.backendService = new BackendService("http://196.47.228.182:8080/api/v1");
    }

    // Asynchronous method to load users
    async loadUsers() {
        // Load users from the local database (fallback data)
        const localUsers = [
            new User("JNTAMA001", "123", 'tutor'),
            new User("Admin", "123", 'admin'),
            new User("1234", "123", 'admin')
        ];
    
        // Load users from the backend
        try {
            const backendUsers = await this.getUsersFromBE();
            const usersFromBackend = backendUsers.map(User.fromJSONType);
            
            // Concatenate both local and backend users
            this.users = [...localUsers, ...usersFromBackend];
            
        } catch (error) {
            console.error("Error loading users:", error);
            // If there's an error loading from the backend, fall back to local users
            this.users = localUsers;
        }
    }

    // Method to get users in a specified order (ascending, descending, or default)
    getUsersInorder(order) {
        switch (order) {
            case 'ascending':
                return this.users.slice().sort((a, b) => a.username.localeCompare(b.username));
            case 'descending':
                return this.users.slice().sort((a, b) => b.username.localeCompare(a.username));
            default:
                return [...this.users];
        }
    }

    // Method to check if a user with a specific username exists
    userExists(username) {
        return this.users.some(user => user.username === username);
    }

    // Method to find a user by their username
    findUser(username) {
        return this.users.find(user => user.username === username);
    }

    // Asynchronous method to register a new user
    async registerUser(user) {
        try {
            const response = await this.backendService.post('registration', user);
            console.log(response);
            return 1; // Registration successful
        } catch (error) {
            // Check if the error message indicates that the email is already registered
            const res = (error.response.data) === "Email already Registered";
            console.log(res);
            if (res) return 0; // Email already registered
            return -1; // Registration failed for other reasons
        }
    }

    // Asynchronous method to log in a user
    async loginUser(user) {
        try {
            const response = await this.backendService.post_login(user);
            console.log(response);
            return response; // Return the login response
        } catch (error) {
            console.log(error);
            return false; // Login failed
        }
    }

    // Asynchronous method to promote a user to a tutor
    async promoteToTutor(studentId) {
        try {
            const response = await this.backendService.put('users/promotetotutor', studentId);
            console.log(response);
            return true; // Promotion to tutor successful
        } catch (error) {
            console.log(error);
            return false; // Promotion to tutor failed
        }
    }

    // Asynchronous method to get users from the backend
    async getUsersFromBE() {
        try {
            const response = await this.backendService.get('users');
            return response; // Return users from the backend
        } catch (error) {
            console.log(error);
            return []; // Return an empty array if there was an error
        }
    }

    // Asynchronous method to update a user
    async updateUser(updatedUser) {
        try {
            // Send a PUT request to update the user information on the backend
            const response = await this.backendService.put('users/updateUser', updatedUser);
            
            // Update the user in the local data store (assuming you have a user with the same username)
            const index = this.users.findIndex(user => user.username === updatedUser.username);
            if (index !== -1) {
                this.users[index] = updatedUser;
            }
            console.log(response);
            console.log(updatedUser);
            return true; // User updated successfully
        } catch (error) {
            // Handle any errors that occur during the update process
            console.error("Error updating user:", error);
            return false; // User update failed
        }
    }
}

