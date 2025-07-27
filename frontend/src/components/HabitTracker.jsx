import React from 'react'
import axios from 'axios';
import {useState, useEffect} from 'react';
import { Typography, Grid, Card, TextField, Container, Button} from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const HabitTracker = () => {

  const [habitData, setHabitData] = useState([]);
  
  useEffect(()=>{
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken){
      console.error("NO access found");
      return;
    }else{
      console.log(accessToken)
    }
    const today = new Date().toISOString().split("T")[0];
    axios.get(
      `http://127.0.0.1:8000/viewhabit/?date=${today}`,{
        headers :{
          Authorization : `Bearer ${accessToken}`
        },
      })
      .then((response)=>{
      setHabitData(response.data.map(h=>({
        ...h, description: '',
        checked: h.status==='completed'
      })));
    })
    .catch((error)=>{
      console.log(error)
    })
  },[]);

  const handleCheckboxChange = (index)=>{
    const updated = [...habitData];
    updated[index].checked = !updated[index].checked;
    setHabitData(updated);
  };

  const handleDescChange = (index, value) => {
    const updated = [...habitData];
    updated[index].description = value;
    setHabitData(updated);
  };

   const handleSubmit = (habit) => {
    const accessToken = localStorage.getItem('accessToken');
    const today = new Date().toISOString().split("T")[0];

    axios.post('http://127.0.0.1:8000/habitlog/', {
      habit_id: habit.id,
      date: today,
      status: habit.checked ? 'completed' : 'not_completed',
      description: habit.description || ''
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((res) => {
        alert(`Habit "${habit.name}" updated successfully`);
      })
      .catch((err) => {
        console.error(err);
      });
  };
 
  let today = new Date();
  return (
    <div style={{width: '100%'}}>
      {habitData && habitData.map((item,index)=>(
        <Card key={index} sx={{margin:"20px auto", padding: '2rem', width: "70%"}} elevation={10}>
          <div style={{margin:"-15px 0 10px 23px"}}><strong>{today.toDateString()}</strong></div>
          <Grid container spacing={4}>
              <Grid size={{xs:12, sm: 6}}>
               <Container>
                <Typography variant='h4'>{item.name}</Typography>
                <FormGroup>
                  <FormControlLabel control={<Checkbox checked={item.checked} onChange={()=>handleCheckboxChange(index)} size="small"/>} label="Mark to complete" />
                </FormGroup>
                </Container> 
              </Grid>
              <Grid size={{xs:12, sm: 6}}
               sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection:'column',
                alignItems:'center',
                gap: "1rem"
                
              }}>                
                
                  <TextField
                  id="outlined-multiline-static"
                  label="Comments"
                  multiline
                  rows={4}
                  value={item.description}
                  placeholder="Add your thoughts, changes through the habit"
                  onChange={(e) => handleDescChange(index, e.target.value)}
                  style={{width:"80%"}}
                />
                
                   <Button size="small" color="success" variant='contained' onClick={() => handleSubmit(item)}>Submit</Button>
                 
              </Grid>
          </Grid>
        </Card>
      ))}
    </div>
  )
}

export default HabitTracker 