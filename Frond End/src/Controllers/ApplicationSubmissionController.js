import ApplicationSubmission from '../Models/Class files/ApplicationSubmission';
import BackendService from '../Service/BackendService';

// Define a class called ApplicationSubmissionController
class ApplicationSubmissionController {
    constructor() {
        // Initialize the 'submissions' array with sample ApplicationSubmission objects
        this.submissions = [
            new ApplicationSubmission(
                "Kwame Nkrumah",
                "KKN001",
                "kwamenkrumah@gmail.com",
                "07344534543",
                "2nd year",
                new Date("2023-09-15"),
                "Computer Science"
            ),
        ];

        // Initialize the 'backendService' with a base URL for the backend API
        this.backendService = new BackendService("http://196.47.228.182:8080/api/v1");
    }

    // Method to create a new application submission
    async createSubmission(name, studentNumber, email, yearOfStudy, department, courseHistory) {
        // Create a new ApplicationSubmission instance
        const dateSubmitted = new Date();
        const submission = new ApplicationSubmission(
            name,
            studentNumber,
            email,
            yearOfStudy,
            dateSubmitted,
            department,
            courseHistory
        );

        try {
            // Send a POST request to the backend to save the new submission
            const response = await this.backendService.post('applicationsubmission', submission);
            console.log("Posted submission: " + response);

            // Add the new submission to the 'submissions' array
            this.submissions.push(submission);
            return true; // Submission created successfully
        } catch (error) {
            return false; // Submission creation failed
        }
    }

    // Method to get all application submissions
    async getAllSubmissions() {
        try {
            // Send a GET request to the backend to retrieve all submissions
            const response = await this.backendService.get('applicationsubmission');
            
            if (response) {
                // Convert the JSON response into ApplicationSubmission objects
                let tempSubmissions = [];
                response.forEach(submission => {
                    tempSubmissions.push(ApplicationSubmission.fromJSONType(submission));
                });

                // Update the 'submissions' array with the retrieved submissions
                this.submissions = tempSubmissions;
                return this.submissions;
            }
        } catch (error) {
            console.log(error);
            return []; // Return an empty array if there was an error
        }

        return this.submissions; // Return the 'submissions' array
    }
}

// Export the ApplicationSubmissionController class
export default ApplicationSubmissionController;
