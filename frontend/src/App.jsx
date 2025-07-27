import React from 'react';
import Login from './components/Login.jsx';
import {Routes, Route} from "react-router-dom";
import Home from './components/Home.jsx';
import AuthProvider from './components/AuthProvider.jsx'
import Navbar from './components/Navbar.jsx';
import CreateHabit from './components/CreateHabit.jsx';
import HabitTracker from './components/HabitTracker.jsx';
import HabitDisplay from './components/HabitDisplay.jsx';


function App(){

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<><Navbar/><Home/></>}/>
          <Route path="/createhabit" element={<><Navbar/><CreateHabit/></>}/>
          <Route path="/habittracker" element={<><Navbar/><HabitTracker/></>}/>
          <Route path="/viewhabits" element={<><Navbar/><HabitDisplay/></>}/>
      </Routes>
    </AuthProvider>
  )

}

export default App;