import React from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import ApplicationForm from './ApplicationForm';
import ApplicationProgress from './ApplicationProgress';
import './styling/applications.css';
import CreateApplication from './CreateApplication';
import AdminViewAppProgress from './AdminViewAppProgress';

const Applications = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const courseName = searchParams.get('courseName');
  const courseCode = searchParams.get('courseCode');
  const role = sessionStorage.getItem("userRole");
  
  return (
    <div className="applications-body">
      <div className="tabs">
        <Link to="/applications/applicationprogress" className="tab">
          Application Progress
        </Link>
        {role !== 'admin'?'':<Link to={`/applications/createapplications?courseCode=${courseCode}&courseName=${courseName}`} className="tab">
          Create Application
        </Link>}
      </div>
      <div className="route-content">
        <Routes>
          <Route path="/" element={<p>Manage your applications for {courseName} with just a few clicks</p>} />
          <Route path="applicationprogress" element={role !== 'admin'?<ApplicationProgress />:<AdminViewAppProgress/>} />
          <Route path="createapplications" element={<CreateApplication/>} />
          <Route path={`accessapplications`} element={<ApplicationForm/>} />
        </Routes>
      </div>
    </div>
  );
};

export default Applications;

