import Tutor from './Tutor';

export default class Tutorial {
  constructor(title, courseCode, datetime, venue, numberOfTutors,tutorialID,tutTutors) {
    this._title = title;
    this.tutorialID = tutorialID || this.generateRandomId();
    this._courseCode = courseCode;
    this._datetime = datetime;
    this.dayOfWeek = datetime.split("TS")[0];
    this.time =  datetime.split("TS")[1];
    this._venue = venue;
    this.tutTutors = tutTutors || [new Tutor("JNTA929","***","jnt929",'jenete','...','+27837463794')];
    this._numberOfTutors = numberOfTutors;
  }
  
  get title() {
    
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get courseCode() {
    return this._courseCode;
  }

  set courseCode(courseCode) {
    this._courseCode = courseCode;
  }

  get datetime() {
    return this._datetime;
  }
  get numberOfTutors(){
    return this._numberOfTutors;
  }
  set numberOfTutors(numberOfTutors){
    return this._numberOfTutors = numberOfTutors;
  }
  set datetime(datetime) {
    this._datetime = datetime;
  }

  get venue() {
    return this._venue;
  }

  set venue(venue) {
    this._venue = venue;
  }
  addTutor(tutor){
    if(this.numberOfTutors !== 0){
      this.tutTutors.push(tutor);
      const newValue = this.numberOfTutors -1;
      this._numberOfTutors = newValue;
      return true
    }else{
      return false;
    }
    
}
removeTutor() {
  if (this.tutTutors.length > 0) {
    // Remove a tutor from the array
    this.tutTutors.pop();

    // Increment the numberOfTutors
    this._numberOfTutors++;

    return true;
  } else {
    return false; // No tutors to remove
  }
}
hasTutor(tutorEmail){
  console.log("Checking tutorials for "+tutorEmail);
  return this.tutTutors.some((tutor) => tutor.email === tutorEmail);
}
  // Method to check if the tutorial is in the past
  isPast() {
    return false;
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

  // Method to convert Tutorial object to a JSON-friendly format
  toJSONType() {
    return {
      title: this._title,
      courseCode: this._courseCode,
      time: this.time,
      dayOfWeek: this.dayOfWeek,
      venue: this._venue,
      tutorialID: this.tutorialID,
      numberOfTutors: this._numberOfTutors,
      tutTutors: this.tutTutors,
    };
  }

  // Static method to create a Tutorial object from a JSON object
  static fromJSONType(json) {
    return new Tutorial(
      json.title,
      json.courseCode,
      json.dayOfWeek+"TS"+
      json.time,
      json.venue,
      json.numberOfTutors,
      json.tutorialID,
      json.tutTutors,
    );
  }
}


  
  
  