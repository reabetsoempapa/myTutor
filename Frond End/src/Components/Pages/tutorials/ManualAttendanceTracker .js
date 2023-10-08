import React, { useState } from 'react';
import './styling/ManualAttendanceTracker.css';

const ManualAttendanceTracker = () => {
  const [venue, setVenue] = useState('');
  const [adminName, setAdminName] = useState('');
  const [sessionTitle, setSessionTitle] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [attendees, setAttendees] = useState([]);
  const [date, setDate] = useState('');

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleAddAttendee = () => {
    if (studentNumber.trim() === '') return;
    const newAttendee = { studentNumber, time: getCurrentTime() };
    setAttendees([...attendees, newAttendee]);
    setStudentNumber('');
  };

  const handleRemoveAttendee = (index) => {
    const updatedAttendees = [...attendees];
    updatedAttendees.splice(index, 1);
    setAttendees(updatedAttendees);
  };
  const handleSubmit= ()=>{
    console.log(date);
  }

  return (
    <div className="attendance-tracker">
      <h2>Manual Attendance Tracker</h2>
      <div className="attendance-form">
        <div className="input-group">
          <label>Venue:</label>
          <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Admin Name:</label>
          <input type="text" value={adminName} onChange={(e) => setAdminName(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Session Title:</label>
          <input type="text" value={sessionTitle} onChange={(e) => setSessionTitle(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Date:</label>
          <input type="date" onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Student Number:</label>
          <input type="text" value={studentNumber} onChange={(e) => setStudentNumber(e.target.value)} />
          <button onClick={handleAddAttendee}>Add Attendee</button>
        </div>
      </div>
      <div className="attendance-list">
        <h3>Attendees:</h3>
        <ul>
          {attendees.map((attendee, index) => (
            <li key={index}>
              {index+1}. {attendee.studentNumber} - {attendee.time}
              <button onClick={() => handleRemoveAttendee(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ManualAttendanceTracker;
