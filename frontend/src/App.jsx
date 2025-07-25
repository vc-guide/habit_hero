import react from 'react';
import Login from './components/Login.jsx';
import {Routes, Route} from "react-router-dom";
import Home from './components/Home.jsx';


function App(){

  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="home/" element={<Home/>}/>
    </Routes>
  )

}

export default App;