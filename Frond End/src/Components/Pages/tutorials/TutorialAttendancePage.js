import React, { useState } from 'react';
import './styling/TutorialAttendancePage.css';
const TutorialAttendancePage = () => {
  // Mock data for tutorial attendance
  const tutorialAttendanceData = [
    {
      title: 'Hotseat',
      dayAndTime: 'Monday 10:00 AM',
      tutor: 'John Doe',
      location: 'Senior Lab',
    },
    {
      title: 'Practical 2',
      dayAndTime: 'Wednesday 2:00 PM',
      tutor: 'Jane Smith',
      location: 'Ishango Lab',
    },
    // Add more attendance data as needed
  ];
  const role = sessionStorage.getItem('userRole');

  // State variables for filtering and search
  const [filters, setFilters] = useState({
    day: '',
    tutor: '',
    location: '',
  });
  const [searchTitle, setSearchTitle] = useState('');

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Filter the attendance data based on the selected filters and search title
  const filteredAttendance = tutorialAttendanceData.filter((attendance) => {
    const { dayAndTime, tutor, location } = attendance;
    const { day, tutor: tutorFilter, location: locationFilter } = filters;

    return (
      dayAndTime.toLowerCase().includes(day.toLowerCase()) &&
      tutor.toLowerCase().includes(tutorFilter.toLowerCase()) &&
      location.toLowerCase().includes(locationFilter.toLowerCase()) &&
      attendance.title.toLowerCase().includes(searchTitle.toLowerCase()) // Added title filter
    );
  });

  return (
    <div className="tutorial-attendance-page">
      <h2>Tutorial Attendance</h2>
      <div className="filter-section">
        <input
          type="text"
          name="day"
          placeholder="Filter by Day"
          value={filters.day}
          onChange={handleFilterChange}
        />
        {role.includes('tutor') ===false &&<input
          type="text"
          name="tutor"
          placeholder="Filter by Tutor"
          value={filters.tutor}
          onChange={handleFilterChange}
        />}
        <input
          type="text"
          name="location"
          placeholder="Filter by Location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          placeholder="Search by Title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)} // Handle title search
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Day and Time</th>
            {role.includes('tutor') ===false&& <th>Tutor</th>}
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendance.map((attendance, index) => (
            <tr key={index}>
              <td>{attendance.title}</td>
              <td>{attendance.dayAndTime}</td>
              {role.includes('tutor') ===false&&<td>{attendance.tutor}</td>}
              <td>{attendance.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TutorialAttendancePage;
