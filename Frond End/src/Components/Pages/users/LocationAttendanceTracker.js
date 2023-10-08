import React, { useState, useEffect } from 'react';
import './styling/LocationAttendanceTracker.css'; 
import TutorialsController from '../../../Controllers/TutorialController';

const LocationAttendanceTracker = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState(''); // 'Present' or 'Absent'
  const [tutorials, setTutorials] = useState([]);
  const [selectedTutorial, setSelectedTutorial] = useState('');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const locationRadiusInMeters = 300; // Adjust as needed

  useEffect(() => {
    // Request location permissions and update user's location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          setUserLocation({ latitude: userLat, longitude: userLng });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    const classLocation = { latitude: -33.9571515, longitude: 18.4641483 };
    // Calculate the distance between user and class location
    if (userLocation) {
      const distance = calculateDistance(userLocation, classLocation);
      if (distance <= locationRadiusInMeters) {
        setAttendanceStatus('Present');
      } else {
        setAttendanceStatus('Absent');
      }
    }
  }, [userLocation]);

  useEffect(() => {
    const userName = sessionStorage.getItem('username');
    const tutorialController = new TutorialsController();

    tutorialController.getAllTutorials().then((data) => {
      if(data) {
        console.log(data);
        const tutsbytutor = data.filter((tut) => tut.hasTutor(userName));
        if (tutsbytutor) setTutorials(tutsbytutor);}
    });
  }, []);

  useEffect(() => {
    // Start a timer to update the current time every second
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => {
      // Cleanup the timer when the component unmounts
      clearInterval(timerId);
    };
  }, []);

  const calculateDistance = (pointA, pointB) => {
    // Calculate distance between two coordinates using Haversine formula or geolib library
    const geolib = require('geolib');
    return geolib.getDistance(pointA, pointB);
  };

  const handleCheckIn = () => {
    setIsCheckedIn(true);
  };

  const handleTutorialSelect = (event) => {
    setSelectedTutorial(event.target.value);
    console.log(selectedTutorial);
  };

  return (
    <div className="attendance-tracker">
  <h2>Location Attendance Tracker</h2>
  <h4>Select Tutorials</h4>
  <select onChange={handleTutorialSelect}>
    <option value="">Select tutorial</option>
    {tutorials.map((tut) => (
      <option key={tut.tutorialID} value={tut.tutorialID}>
        {tut.title} - {tut.venue}
      </option>
    ))}
  </select>

  {userLocation && (
    <p>
      Your current location: Latitude {userLocation.latitude}, Longitude {userLocation.longitude}
    </p>
  )}

  {/* Display current time that updates every second */}
  <div className="current-time">
    <p>Current Time: <strong>{currentTime.toLocaleTimeString()}</strong></p>
  </div>

  {isCheckedIn ? (
    <p className={`attendance-status ${attendanceStatus.toLowerCase()}`}>
      Attendance Status: {attendanceStatus}
    </p>
  ) : (
    <button className="check-in-button" onClick={handleCheckIn}>
      Check-In
    </button>
  )}
</div>

  )
};

export default LocationAttendanceTracker;


