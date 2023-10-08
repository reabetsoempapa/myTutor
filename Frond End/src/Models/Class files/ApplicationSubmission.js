class ApplicationSubmission {
    constructor(name, studentNumber, email, yearOfStudy, submissionDate, department,courseHistory) {
        this.name = name;
        this.studentNumber = studentNumber;
        this.email = email;
        this.yearOfStudy = yearOfStudy;
        this.dateSubmitted = submissionDate;
        this.department = department;
        this.courseHistory= courseHistory;
    }

    studentDetails(){
        return `
        ${this.name} - ${this.studentNumber}\n
        ${this.email}\n
        ${this.yearOfStudy}
    `;
    }

    // Generate a random alphanumeric ID
    generateRandomId() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const idLength = 10;
        let randomId = '';

        for (let i = 0; i < idLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomId += characters.charAt(randomIndex);
        }

        return randomId;
    }

    // Convert instance to JSON
    toJSONType() {
        return {
            name: this.name,
            studentNumber: this.studentNumber,
            email: this.email,
            yearOfStudy: this.yearOfStudy,
            created: this.dateSubmitted,
            department: this.department,
            transcript: this.courseHistory,
        };
    }

    // Create an instance from JSON
    static fromJSONType(json) {
        const {
            name,
            studentNumber,
            email,
            yearOfStudy,
            created,
            department,
            transcript
        } = json;

        return new ApplicationSubmission(
            name,
            studentNumber,
            email,
            yearOfStudy,
            created,
            department,
            transcript
        );
    }
}

export default ApplicationSubmission;

