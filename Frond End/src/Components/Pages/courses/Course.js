import React from 'react';

const Course = ({ courseinfo }) => {
  return (
    <div className="course-card">
      <h2>{courseinfo.courseName}</h2>
      <p className="course-metadata">Course Code: {courseinfo.courseCode}</p>
      <p className="course-metadata">Duration: {courseinfo.duration}</p>
      <p className="course-metadata">Year: {courseinfo.year}</p>
      <p className="course-creator">Created by {courseinfo.creator}</p>
    </div>
  );
};

export default Course;
