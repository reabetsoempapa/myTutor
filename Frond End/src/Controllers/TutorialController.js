import Tutorial from "../Models/Class files/Tutorial";
import BackendService from "../Service/BackendService";
export default class TutorialsController {
    constructor() {
        this.tutorials = {
            upcoming: [],
            past: []
        };
        // Initialize the 'backendService' with a base URL for the backend API
        this.backendService = new BackendService("http://196.47.228.182:8080/api/v1");
    }

    async loadTutorials(courseCode) {
        this.tutorials = {
            upcoming: [
                new Tutorial('Practical Session', 'CSC3003S', 'Monday 11:00 AM', 'Senior Lab',4),
                new Tutorial('Demo Project', 'ML1000S', 'Tuesday 12:00 AM', 'Menzies Building',5),
                new Tutorial('Mentor Meetup', 'INFO2011S', 'Thursday 13:00 AM', 'Commerce Building',10)
            ],
            past: [
                new Tutorial('Prac Session', 'CSC2002S', '2023-02-01 10:00 AM', 'Ishango Lab',5),
                new Tutorial('Tutorial', 'MAM1000W', '2023-08-15 10:00 AM', 'Math. Building',4),
                new Tutorial('Lab Session', 'INFO2009S', '2023-08-15 10:00 AM', 'Leslie Socials Building',7)
            ]
        };
        this.tutorials['upcoming'] = (await this.getAllTutorials()).filter((tut)=> tut.courseCode ===courseCode);
        return this.tutorials;
    }

    async getUpcoming() {
        const tempTuts = [];
        await this.getAllTutorials().forEach(tut=>{
            if(tut.isPast() ===false){
                tempTuts.push(tut);
            }
        })
        return tempTuts;
    }

    async getPast() {
        const tempTuts = [];
        await this.getAllTutorials().forEach(tut=>{
            if(tut.isPast() ===true){
                tempTuts.push(tut);
            }
        })
        return tempTuts;
    }
    async getAllTutorials() {
        try {
            const tutorialsAll = await this.backendService.get("tutorials");
            const tutorialFromJSON = tutorialsAll.map(tutorial=> Tutorial.fromJSONType(tutorial));
            return tutorialFromJSON;

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async updateTutorial(tutorial) {
        try {
          // Send a PUT request to update the tutorial on the backend
          const response = await this.backendService.put('tutorials/updateTutorial?tutorialID=' + tutorial.tutorialID, tutorial);
          console.log(response);
      
          // Find the index of the tutorial with the matching tutorialID
          let indexToUpdate = this.tutorials['past'].findIndex(tut => tut.tutorialID === tutorial.tutorialID);
      
          // If the tutorial with the matching tutorialID is found, update it
          if (indexToUpdate !== -1) {
            this.tutorials['past'][indexToUpdate] = tutorial;
          }else{
            indexToUpdate = this.tutorials['upcoming'].findIndex(tut => tut.tutorialID === tutorial.tutorialID);
            if (indexToUpdate !== -1) {
                this.tutorials['upcoming'][indexToUpdate] = tutorial;
                }
          }
      
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      

    async addTutorial(tutorial) {
        try {
            const res = await this.backendService.post('tutorials',tutorial);
            console.log(res);
        } catch (error) {
            console.log(error);
            return false;
        }
        if (tutorial.isPast()) {
            this.tutorials['past'].push(tutorial);
        } else {
            this.tutorials['upcoming'].push(tutorial);
        }
        return true;
    }

    async removeTutorial(tutorialID) {
        try {
            const res = await this.backendService.delete('tutorials/' + tutorialID);
            console.log(res);
    
            // Find the index of the tutorial with the matching tutorialID in 'past'
            let indexToUpdate = this.tutorials['past'].findIndex(tut => tut.tutorialID === tutorialID);
    
            // If the tutorial with the matching tutorialID is found in 'past', remove it
            if (indexToUpdate !== -1) {
                this.tutorials['past'].splice(indexToUpdate, 1);
            } else {
                // If it's not in 'past', find it in 'upcoming' and remove it
                indexToUpdate = this.tutorials['upcoming'].findIndex(tut => tut.tutorialID === tutorialID);
                if (indexToUpdate !== -1) {
                    this.tutorials['upcoming'].splice(indexToUpdate, 1);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    
}
