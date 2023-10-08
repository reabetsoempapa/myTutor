import Application from "../Models/Class files/Application";
import BackendService from "../Service/BackendService";

// Define a class called ApplicationController
export default class ApplicationController {
    constructor() {
        // Initialize the 'applications' array with sample Application objects
        this.applications = [
            new Application(
                "1",
                "Application 1 details...",
                "Department of Computer Science",
                "2023-09-30",
                "http://localhost:3000/applications/accessapplications?id=1"
            ),
        ];

        // Initialize the 'backendService' with a base URL for the backend API
        this.backendService = new BackendService("http://196.47.228.182:8080/api/v1");
    }

    // Method to create a new application and add it to the list
    createApplication(applicationId, details, department, dueDate, accessLink) {
        // Create a new Application instance
        const newApplication = new Application(applicationId, details, department, dueDate, accessLink);
        
        // Add the new application to the 'applications' array
        this.applications.push(newApplication);

        try {
            // Send a POST request to the backend to save the new application
            this.backendService.post('applicationcreation', newApplication).then((value) => {
                console.log("Pushed application to the database: " + value);
            });
        } catch (error) {
            console.log(error);
        }
        
        return newApplication; // Return the newly created application
    }

    // Method to get a specific application by ID
    getApplicationById(applicationId) {
        return this.applications.find((app) => app.applicationId === applicationId);
    }

    // Method to delete an application by ID
    deleteApplication(applicationId) {
        const index = this.applications.findIndex((app) => app.applicationId === applicationId);
        if (index !== -1) {
            this.applications.splice(index, 1);
            return true; // Application deleted
        }
        return false; // Application not found
    }

    // Method to get all applications
    getAllApplications() {
        return this.applications;
    }

    // Asynchronous method to update an application
    async updateApplication(application) {
        const index = this.applications.findIndex((app) => app.applicationId === application.applicationId);
        if (index >= 0) {
            this.applications[index] = application;
            return true; // Application updated successfully
        } else {
            alert("Could not update application!");
            return false; // Application not found, update failed
        }
    }
}


