import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios'
import { Button, Card,CardContent, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const HabitDisplay = () => {

  const [habitData, setHabitData] = useState([])
  const navigate = useNavigate();

  useEffect(()=>{
    const accessToken = localStorage.getItem('accessToken');
    axios.get(
      "http://127.0.0.1:8000/habitview/",{
        headers :{
          Authorization : `Bearer ${accessToken}`
        },
      })
      .then((response)=>{
      setHabitData(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[]);

  const tagstyle = {backgroundColor: 'red', color: 'white', padding: "0.3rem", width: "3rem",
    fontFamily:'Montserrat, sans-serif',textAlign: 'center', margin: '-10px -10px 0px', height: "15px",
    fontSize: "13px"
  }


  return (
    <div style={{margin:"10px auto", width:"80%"}}>
     <Card elevation={3}>
       <Typography gutterBottom variant="h5" align="center" sx={{fontWeight:'bold',fontFamily:'Montserrat, sans-serif',margin:"1rem 0 0 0"}}>
            Your Habits
       </Typography>
       <CardContent>
        <Grid container spacing={2}>
          {habitData.map((item)=>(
          <Grid size={{xs:12, sm:6, md:4}}>
            <Card style={{padding: '1rem'}} elevation={5}>
              <div style={tagstyle}>{item.habit_frequency}</div>
              <Typography variant="h5" sx={{marginTop: "10px"}}><strong>{item.habit_name}</strong></Typography>
              <Typography variant="h6"><strong>Category: </strong>{item.habit_category}</Typography>
              <Typography variant="h6"><strong>Started: </strong>{new Date(item.habit_start_date).toLocaleDateString('en-GB',
               {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
              </Typography>
              <Button variant="contained" onClick={()=>navigate(`/habithistory/${item.id}`)}>Habit History</Button>
            </Card>
          </Grid>
          ))}
        </Grid>
       </CardContent>
     </Card>
    </div>
  )
}

export default HabitDisplay