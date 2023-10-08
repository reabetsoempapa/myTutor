import Tutor from "../Models/Class files/Tutor";
import BackendService from "../Service/BackendService";

export default class TutorController {
    constructor() {
        this.tutors = [];
        // Initialize the 'backendService' with a base URL for the backend API
        this.backendService = new BackendService("http://196.47.228.182:8080/api/v1");
    }
    
    // Create a new tutor and add it to the list
    createTutor(studentId, name, email, phone) {
        const newTutor = new Tutor(studentId,"",studentId, name, email, phone);
        this.tutors.push(newTutor);
        try {
            this.backendService.post("tutors/addtutor", newTutor).then((data)=>{
                console.log("posted: "+data);
                return data;
            })
            
        } catch (error) {
            console.log(error);
            return null;
        }
        
    }

    // Get a specific tutor by student ID
    getTutorByStudentId(studentId) {
        return this.tutors.find((tutor) => tutor.studentId === studentId) || null;
    }

    // Get a specific tutor by student email
    async getTutorByEmail(studentEmail) {
        try {
            await this.loadTutors(); // Ensure tutors are loaded
            return this.tutors.find((tutor) => tutor.email === studentEmail) || null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    // Update tutor information
    async updateTutor(studentId, updatedTutor) {
        try {
            await this.loadTutors(); // Ensure tutors are loaded
            const tutorIndex = this.tutors.findIndex((tutor) => tutor.studentId === studentId);
            if (tutorIndex !== -1) {
                this.tutors[tutorIndex] = updatedTutor;
                return updatedTutor;
            }
            return null; // Tutor not found
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    // Delete a tutor by student ID
    async deleteTutor(studentId) {
        try {
            await this.loadTutors(); // Ensure tutors are loaded
            const tutorIndex = this.tutors.findIndex((tutor) => tutor.studentId === studentId);
            if (tutorIndex !== -1) {
                this.tutors.splice(tutorIndex, 1);
                return true; // Tutor deleted
            }
            return false; // Tutor not found
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    // Get all tutors
    async getAllTutors() {
        try {
            await this.loadTutors(); // Ensure tutors are loaded
            return this.tutors;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    // Load tutors from the backend
    async loadTutors() {
        if (this.tutors.length === 0) {
            const data = await this.backendService.get("tutors");
            if (data) {
                this.tutors = data.map((tutor) => Tutor.fromJSONType(tutor));
            }
        }
    }
}


