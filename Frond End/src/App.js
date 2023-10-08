import './App.css';
import HomePage from './Components/Pages/MainPages/HomePage';
import Header from './Components/HeaderFooter/Header';
import { Routes ,Route } from 'react-router-dom';
import Tutorials from './Components/Pages/tutorials/Tutorials';
import ErrorPage from './Components/Pages/MainPages/ErrorPage';
import SignUp from './Components/Pages/tutorials/SignUp';
import Applications from './Components/Pages/applications/Applications';
import { useEffect, useState } from 'react';
import Navigation from './Components/HeaderFooter/Navigation';
import CoursePage from './Components/Pages/courses/CoursePage';
import ManageCourse from './Components/Pages/courses/ManageCourse';
import FloatingBackButton from './Components/HeaderFooter/FloatingBackButton';
import Register from './Components/Pages/MainPages/Register';
import LocationAttendanceTracker from './Components/Pages/users/LocationAttendanceTracker';
import ManualAttendanceTracker from './Components/Pages/tutorials/ManualAttendanceTracker ';
import TutorialAttendancePage from './Components/Pages/tutorials/TutorialAttendancePage';

function App() {
  let [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(()=>{
    const logged = sessionStorage.getItem('logged');
    if(logged==='true') setLoggedIn(true);
  },[]);
  // let [registered, setRegistered] = useState(false);
  return (
    <div className="App">
      
      {loggedIn === false? <Register setLoggedIn={setLoggedIn}/> :
      <>
      <Header/>
      <Navigation/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/tutorials' element={<Tutorials/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/checkin' element={<LocationAttendanceTracker/>}/>
        <Route path='/manualcheckin' element={<ManualAttendanceTracker/>}/>
        <Route path='/attendance' element={<TutorialAttendancePage/>}/>
        <Route path='/applications/*' element={<Applications/>}/>
        <Route path='/manageCourse' element={<ManageCourse courseinfo={{
      courseName: "Information Systems 2",
      courseCode: "INF2011S",
      id: "5lp6pqtz",
      duration: "June - October",
      year: "2023",
      creator: "John Smith"
    }}/>}/>
        <Route path='/coursePage' element={<CoursePage/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
      <FloatingBackButton/>
      </>}
      
    </div>
  );
}

export default App;
