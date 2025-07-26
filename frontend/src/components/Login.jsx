import React from 'react'
import {Grid, Avatar, TextField, Button, Paper, Tabs, Tab, Typography, Box} from '@mui/material';
import { IoIosLock } from "react-icons/io";
import { RiUserFill } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiMailFill } from "react-icons/ri";
import { useTheme } from '@mui/material/styles';
import {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from './AuthProvider';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


const Login = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const userUrl = 'http://127.0.0.1:8000/api/register/'
  const [ userData, setUserData ] = useState({
      username: '',
      email: '', 
      password: ''
    })
  const [error, setError] = useState({})
  
  const addValue = (e) =>{
      const {name, value}= e.target
      setUserData((prev)=>({...prev, [name]: value}))   
    };

  const handleUserSubmit = async(e) =>{
      e.preventDefault();
        if (userData.username && userData.email && userData.password){
            console.log(userData);
            try {
              const response = await axios.post( userUrl, userData);
              console.log("response.data==>", response.data)
              alert('Registered successfully');
              setUserData({
                username: '',
                email: '',
                password: ''
              })
              setError({});
              setValue(0);
            }
            catch(error) {
              console.error("Registration error:", error.response.data)
              setError(error.response.data)
          }
        }
        else{ alert('Add all details')}
      }
  const loginUrl = "http://127.0.0.1:8000/api/token/"
  const [loginData, setLoginData] = useState({
      username: '',
      password: '',
    });
  const navigate = useNavigate()

  const addloginvalue = (e) =>{
    const {name, value} = e.target
      setLoginData((prev)=>({...prev, [name]: value}))
    }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      alert("Please fill in both fields");
      return;
    }

    try {
      const response = await axios.post(loginUrl, loginData);
      console.log(response.data);
      localStorage.setItem('accessToken', response.data.access)
      localStorage.setItem('refreshToken', response.data.refresh)
      setIsLoggedIn(true);
      alert("Login successful!");
      navigate('home/');
      
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.data);
        alert("Login failed: " + JSON.stringify(error.response.data));
      } else {
        console.error("Unexpected error:", error);
        alert("Something went wrong.");
      }
    }
};

  const paperStyle = { height: '400px', width: '340px', margin: '0 auto'};
  const boxstyle = {display:'flex', alignItems:'center', gap:2};
  const avatarStyle = { backgroundColor: '#fab800', width:'1.7rem', height: '1.7rem'};    
  
  return (
     <div style={{display:'flex', justifyContent:'center'}}>
      <Paper elevation={20} sx={paperStyle}>
      <div >
         <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{style: {backgroundColor: '#fab800'}}}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Sign in" {...a11yProps(0)} />
          <Tab label="Sign up" {...a11yProps(1)} />
          
        </Tabs>
      </div>
      <div>
        <TabPanel value={value} index={0} dir={theme.direction} >
          <Grid align="center" sx={{marginTop: '-0.5rem'}}>
            <Avatar style = {avatarStyle}><IoIosLock /></Avatar>
            <h2 style={{marginTop: '2px'}}>Sign in</h2>
          </Grid>
       <Box
         sx={{display:'flex', alignItems:'center', gap:2}}>
        <RiUserFill style={{fontSize: '28px'}}/><TextField name="username" value={loginData.username} label='username' placeholder='Username' variant="outlined" size='small' onChange={addloginvalue} fullWidth required className="text-box"/>
       </Box>
       <br/>
       <Box sx={{display:'flex', alignItems:'center', gap:2}}>
          <RiLockPasswordFill style={{fontSize: '28px'}}/><TextField name="password" type="password" value={loginData.password} label='password' placeholder='Password' variant="outlined" size='small' fullWidth required onChange={addloginvalue} className="text-box" />
       </Box>
       <br/>
       
       <Button onClick={handleLoginSubmit}  sx={{
          background: 'linear-gradient(to bottom,#454444e8, black)',
          borderRadius: '0.5rem',
          color: 'white',
          border: '1px solid #ccc',
          margin: '8px 0',
          '&:hover': {transform: 'scale(1.02)'}}} variant="contained" fullWidth>Sign in
       </Button>
      
      </TabPanel>
       <TabPanel value={value} index={1} dir={theme.direction}>
       <Grid align='center' sx={{marginTop: '-0.5rem'}}>
        <Avatar style={avatarStyle}></Avatar>
         <h2 style={{marginTop: '2px'}}>Sign up</h2>
      </Grid>
        
        <form onSubmit={handleUserSubmit}>
          <Box sx={boxstyle}>
            <RiUserFill style={{fontSize: '28px'}}/>
            <TextField name='username' value={userData.username} label='Name' placeholder="Name" size='small' onChange={addValue} fullWidth required className="text-box"/>
            <small>{error.username && <div style={{color:"red"}} >{error.username}</div>}</small>
          </Box>
          <br/>
          <Box sx={boxstyle}>
            <RiMailFill style={{fontSize: '28px'}}/>
            <TextField name='email' value={userData.email} label='Email' placeholder="Email" size='small' onChange={addValue} fullWidth required className="text-box"/>
            <small>{error.email && <div style={{color:"red"}} >{error.email}</div>}</small>
          </Box>
          <br/>
          <Box sx={boxstyle}>
            <RiLockPasswordFill style={{fontSize: '28px'}}/>
            <TextField name='password' type="password" value={userData.password} label= 'Password' placeholder="Password" size='small' onChange={addValue} fullWidth required className="text-box"/>
            <small>{error.password && <div style={{color:"red"}} >{error.password}</div>}</small>
          </Box>
          <br/>
          <Button type= "submit"  sx={{
            background: 'linear-gradient(to bottom,#454444e8, black)',
            borderRadius: '0.5rem',
            color: 'white',
            border: '1px solid #ccc',
            '&:hover': {transform: 'scale(1.02)'}}} variant="contained" fullWidth>Sign up
          </Button>
        </form>
  </TabPanel>
  </div>
  </Paper>
  </div>
  )
}

export default Login