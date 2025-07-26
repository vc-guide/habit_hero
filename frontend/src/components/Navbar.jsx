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
            HABIT HERO
          </Typography>
          <Link to="/createhabit"><Button color="inherit">Create Habit</Button></Link>
          <Link to="/habittracker"><Button color="inherit">Track Habit</Button></Link>
          { isLoggedIn && 
          <Button color="inherit" onClick={handleLogout}>Logout</Button>}
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Navbar