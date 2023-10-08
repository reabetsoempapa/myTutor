import React, { useEffect, useState } from 'react';
import './styling/Tutorials.css';
import AddTutorialForm from './AddTutorialForm';
import TutorialsController from '../../../Controllers/TutorialController';
import { useLocation } from 'react-router-dom';
import TutorController from '../../../Controllers/TutorController';

const Tutorials = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const courseName = searchParams.get('courseName');
    const courseCode = searchParams.get('courseCode');
    
    const [tutorials, setTutorials] = useState({
        upcoming: [],
        past: []
    });

    useEffect(() => {
        const tutorialController = new TutorialsController();
        tutorialController.loadTutorials(courseCode).then(
            data=> {setTutorials(data);}
        );

        // Create the setInterval timer
        const intV = setInterval(() => {
            setUpdateMessage("");
        }, 5000);
    
        // Return a cleanup function to clear the timer on unmount
        return () => {
            clearInterval(intV); // Clear the timer when the component unmounts
        };
    }, [courseCode]);

    const [toggle, setToggle] = useState('upcoming');
    const [selectedTutorial, setSelectedTutorial] = useState(null);
    const [showOptions, setShowOptions] = useState({});
    const [updateMessage,setUpdateMessage] = useState('');

    const role = sessionStorage.getItem("userRole");

    const handleRemove = (tutorial) => {
        const tutorialController = new TutorialsController();
        tutorialController.removeTutorial(tutorial.tutorialID).then(() => {
            alert("Removed successfully!");
            tutorialController.loadTutorials().then(dataTut=>{
                setTutorials(dataTut);
            })
            
        });

    }


    const HandleSignUp = async (tutorial)=>{
        const tutorialController = new TutorialsController();
        const tutorController = new TutorController();
        const userName = sessionStorage.getItem('username');
        const tutor = await tutorController.getTutorByEmail(userName);
        if(tutor){
            //console.log(tutor);
            // setUpdateMessage("Hi "+tutor.name+"!");
            
        }else{
            console.log(userName+ " not found in tutors");
            setUpdateMessage("Something went wrong, please restart page!");
            return;
        }
        // const studentNumber = "AMA"+(Math.random()*1000);
        // const tutor = new Tutor(studentNumber,"***",studentNumber,'jenete','...','+27837463794');
        if (signedUp(tutorial)){
            const updatePossible = tutorial.removeTutor();
            if(updatePossible){
                tutorialController.updateTutorial(tutorial).then((value)=>{
                    console.log("Removed tutor: "+value);
                    setUpdateMessage("Removed tutor!");
                })
            }
        }else{ 
            
            const updatePossible = tutorial.addTutor(tutor);
            if(updatePossible){
                tutorialController.updateTutorial(tutorial).then((value)=>{
                    console.log("Added tutor: "+value);
                    setUpdateMessage("Added tutor!");
                })
            }
            else{
                alert("Slots are full!");
            }}
        
    }

    const toggleOptions = (tutorialID) => {
        setShowOptions(prevState => ({
            ...prevState,
            [tutorialID]: !prevState[tutorialID]
        }));
    }
    const signedUp= (tutorial) =>{
            const userName = sessionStorage.getItem('username');
            console.log(tutorial.tutTutors.some(tutor=> tutor.email === userName))
            return tutorial.tutTutors.some(tutor=> tutor.email === userName)
    }
    return (
        <div className="tut-container">
            <div className="tut-tabs">
                {role.includes('utor')===false && <button className="tut-tab-button" id="addButton" onClick={() => setToggle("add")}>+ Add Tutorial</button>}
                <button className="tut-tab-button" id="viewPastButton" style={{ display: toggle === "past" ? 'none' : 'block' }} onClick={() => setToggle("past")}>Past Tutorials</button>
                <button className="tut-tab-button" id="viewUpcoming" style={{ display: toggle === "upcoming" ? 'none' : 'block' }} onClick={() => setToggle("upcoming")}>View Upcoming</button>
            </div>
            {updateMessage.length>1&& <div className="popup" id="popup">
             <div className="popup-content">
                <span className="close" id="close-popup" onClick={()=>setUpdateMessage('')}>&times;</span>
                <div id="update-message">{updateMessage}</div>
            </div>
            </div>}
            <div className="tut-content">
                <h2>{courseName} Sessions</h2>
                {toggle === "add" || toggle === "update" ? (
                    <AddTutorialForm setTutorials={setTutorials} tutorials={tutorials} toggle={toggle} setToggle={setToggle} courseCode={courseCode} tutorialToUpdate={selectedTutorial} />
                ) : (
                    <div>Viewing {toggle} tutorials</div>
                )}
                {toggle === "add" || toggle === "update" ? (
                    "Please complete the form"
                ) : (
                    <div className="tut-tab-content active">
                        {(toggle==='upcoming' || toggle==='past') && tutorials[toggle].length === 0 ? (
                            <div>No tutorials available</div>
                        ) : (
                            <table className="tut-tutorial-table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Day & Time</th>
                                        <th>Venue</th>
                                        <th>Space</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tutorials[toggle].map((tutorial, index) => (
                                        <tr key={index}>
                                            <td className="tut-tut-name">{tutorial.title}</td>
                                            <td>{tutorial.dayOfWeek+" "+ tutorial.time}</td>
                                            <td>{tutorial.venue}</td>
                                            <td>{tutorial.numberOfTutors}</td>
                                            <td>
                                                {role.includes('utor') ? (
                                                    <button className="tut-update-button" onClick={() => {HandleSignUp(tutorial)}}>{signedUp(tutorial)?"Cancel":"SignUp"}</button>
                                                    
                                                ) : (
                                                    <div>
                                                        <button className="tut-update-button" onClick={() => toggleOptions(tutorial.tutorialID)}>Options</button>
                                                        {showOptions[tutorial.tutorialID] && (
                                                            <div className='hiddenoptions'>
                                                                <a href='#!' onClick={() => { setSelectedTutorial(tutorial); setToggle('update') }}>Update</a>
                                                                 | <a href='#!' onClick={() => handleRemove(tutorial)}>Remove</a>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tutorials;
