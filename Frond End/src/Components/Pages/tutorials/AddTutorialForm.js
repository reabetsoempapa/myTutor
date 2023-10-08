import React, { useState, useEffect } from 'react';
import './styling/addtutorialform.css';
import Tutorial from '../../../Models/Class files/Tutorial';
import TutorialsController from '../../../Controllers/TutorialController';

const AddTutorialForm = ({ setTutorials, tutorials, setToggle, courseCode, toggle, tutorialToUpdate }) => {
    const [formData, setFormData] = useState({
        title: '',
        dayOfWeek: 'Monday', // Default to Monday
        timeOfDay: '10:00', // Default to 10:00
        venue: '',
        numberOfTutors: '',
    });

    useEffect(() => {
        // If tutorialToUpdate is provided, populate the form for updating
        if (tutorialToUpdate && toggle === 'update') {
            setFormData({
                title: tutorialToUpdate.title,
                dayOfWeek: tutorialToUpdate.dayOfWeek, 
                timeOfDay: tutorialToUpdate.time,
                venue: tutorialToUpdate.venue,
                numberOfTutors: tutorialToUpdate.numberOfTutors,
            });
        }
    }, [tutorialToUpdate, toggle]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get input values from formData
        const { title, dayOfWeek, timeOfDay, venue, numberOfTutors } = formData;

        // Combine dayOfWeek and timeOfDay into a single datetime string
        const dateTime = `${dayOfWeek}TS${timeOfDay}`;
        // Create a new tutorial object
        const newTutorial = new Tutorial(title, courseCode, dateTime, venue, numberOfTutors,toggle === 'update'? tutorialToUpdate.tutorialID: false);
        const tutorialController = new TutorialsController();

        if (toggle === 'update' && tutorialToUpdate) {
            // Update the existing tutorial
            tutorialController
                .updateTutorial(newTutorial)
                .then((updated) => {
                    console.log("Updated on backend: " + updated);
                    console.log(newTutorial);
                    // Replace the old tutorial with the updated one
                    const updatedTutorials = tutorials['upcoming'].map((tutorial) =>
                        tutorial.tutorialID === tutorialToUpdate.tutorialID ? newTutorial : tutorial
                    );

                    setTutorials({ ...tutorials, [toggle]: updatedTutorials });

                    // Close the modal and reset form
                    setToggle('upcoming');
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // Add a new tutorial
            tutorialController
                .addTutorial(newTutorial)
                .then((added) => {
                    console.log("Added on backend: " + added);

                    // Add the new tutorial to the appropriate list
                    const newTutorials = { ...tutorials };
                    newTutorials['upcoming'].push(newTutorial);

                    setTutorials(newTutorials);

                    // Close the modal and reset form
                    e.target.reset();
                    setToggle('upcoming');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            <div id="addModal" className="tut-modal">
                <div className="tut-modal-content">
                    <span className="tut-close" id="closeButton" onClick={() => setToggle('upcoming')}>
                        &times;
                    </span>
                    <h2>{toggle === 'update' ? "Update" : "Add"} Tutorial</h2>
                    <form id="addForm" onSubmit={handleSubmit}>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                        <br />
                        <div>
                            <label htmlFor="dayOfWeek">Day of the Week:</label>
                            <select
                                id="dayOfWeek"
                                name="dayOfWeek"
                                required
                                value={formData.dayOfWeek}
                                onChange={handleInputChange}
                            >
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                            <input
                                type="time"
                                id="timeOfDay"
                                name="timeOfDay"
                                required
                                value={formData.timeOfDay}
                                onChange={handleInputChange}
                            />
                        </div>
                        <br />
                        <label htmlFor="venue">Venue:</label>
                        <input
                            type="text"
                            id="venue"
                            name="venue"
                            required
                            value={formData.venue}
                            onChange={handleInputChange}
                        />
                        <br />
                        <br />
                        <label htmlFor="numberOfTutors">Number of tutors:</label>
                        <input
                            type="number"
                            id="numberOfTutors"
                            name="numberOfTutors"
                            required
                            value={formData.numberOfTutors}
                            onChange={handleInputChange}
                        />
                        <br />

                        <button type="submit">{toggle === 'update' ? "Update Tutorial" : "Add Tutorial"}</button>
                        <button type="button" onClick={() => setToggle('upcoming')}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTutorialForm;
