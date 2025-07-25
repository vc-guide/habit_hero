import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import {BrowserRouter as Router} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import CreateHabit from './components/CreateHabit.jsx';


createRoot(document.getElementById('root')).render(
  <Router>
    <StrictMode>
      <CreateHabit/>
    </StrictMode>
  </Router>
)
