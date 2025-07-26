import React from 'react'
import {useState} from 'react';
import { Card, CardContent, Typography, Grid, TextField, FormControl, InputLabel,
  Select, MenuItem, Button
 } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import dayjs from 'dayjs';


const CreateHabit = () => {

   const maincontainer = {
    top:"0%", left: "0%", width: "50%", height:"4rem", backgroundColor: "yellow", alignItems: 'center',
    margin:"20px auto", 
  } 
  const [habitName, setHabitName] = useState('')
  const [frequency, setFrequency] = useState('')
  const handleFrequencyChange = (e) =>{
    setFrequency(e.target.value);
  }

  const [category, setCategory] = useState('');
  const handleCategoryChange = (e) =>{
    setCategory(e.target.value);
  }
  const [date, setDate] = useState(null)
  const accessToken = localStorage.getItem("accessToken");


  const handleSubmit= async(e)=>{
    e.preventDefault();

    if (habitName && frequency && category && date){
      const habitData = {
        habit_name : habitName,
        habit_frequency : frequency,
        habit_category : category,
        habit_start_date : dayjs(date).format('YYYY-MM-DD'),
      }
      try { 
        const response = await axios.post('http://127.0.0.1:8000/habitview/', habitData,{
          headers:{
            Authorization: `Bearer ${accessToken}`
          }
        })
        console.log('habitadd successfull', response.data)
      }
      catch(error){
        console.error('error',error.response?.data || error.message)
      }
    }

  };

  return (
    <div style={maincontainer}>
    <Card elevation={10} sx={{padding: '2rem'}}>
        <Typography variant="h5" align='center'>
          Add Habit details here
        </Typography>
        <CardContent>
          <form onSubmit={(handleSubmit)}>
            <Grid container spacing={2}>
              <Grid size={{xs:12}} >
                <TextField  label="Name" name='habitname' value={habitName} placeholder='Enter Name' variant="outlined" className='text-box' onChange={(e)=>setHabitName(e.target.value)}  fullWidth required/>
              </Grid>
              
              <Grid size={{xs:12}}>
                  <FormControl fullWidth>
                    <InputLabel id="frequency-label">Frequency</InputLabel>
                    <Select
                      labelId="frequency-label"
                      value={frequency}
                      label="Frequency"
                      onChange={handleFrequencyChange}
                    >
                      <MenuItem value="weekly">Daily</MenuItem>
                      <MenuItem value="daily">Weekly</MenuItem>
                    </Select>
                  </FormControl>
              </Grid>

              <Grid size={{xs:12}}>
                  <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      value={category}
                      label="Frequency"
                      onChange={handleCategoryChange}
                    >
                      <MenuItem value="health">Health</MenuItem>
                      <MenuItem value="work">Work</MenuItem>
                      <MenuItem value="learning">Learning</MenuItem>
                    </Select>
                  </FormControl>
              </Grid>
              <Grid size={{xs:12, sm:6}}>
                <div><h3>Select the start date</h3></div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Select date" value={date} onChange={(newdate)=>setDate(newdate)} />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid size={{xs:12, sm:6}}  >
                 <Button variant="contained" color='primary' type="submit"  fullWidth>Submit</Button>
              </Grid> 
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateHabit;