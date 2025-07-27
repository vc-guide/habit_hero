import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {AuthContext} from './AuthProvider.jsx'
import {useContext} from 'react'
import {useNavigate, Link} from 'react-router-dom';


const Navbar = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout =()=>{
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    navigate('/');
  }
 
  return (
    <div >
       <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           <strong> HABIT HERO</strong>
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
          <Link to="/home"><Button  variant="contained">Home</Button></Link>
          <Link to="/createhabit"><Button variant="contained" >Create Habit</Button></Link>
          <Link to="/habittracker"><Button variant="contained" >Track Habit</Button></Link>
          <Link to="/viewhabits"><Button variant="contained" >view Habits</Button></Link>
          { isLoggedIn && 
          <Button  variant="contained" onClick={handleLogout}>Logout</Button>}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Navbar