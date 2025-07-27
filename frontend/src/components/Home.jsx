import { Grid,Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material'
import React from 'react'

const Home = () => {

  const homeobject = [
    {id : "1", image: "/images/habitimage1.jpg", title : "Pages of Discovery", description:"Discover the underlying patterns guiding your day. This section highlights the emotional, mental, or behavioral themes shaping your habits and mindset. Use this insight to better understand yourself, track your growth, and stay aligned with your personal goals."},
    {id : "2", image: "/images/habitimage2.jpg", title : "Power Up", description: "Stay energized, focused, and consistent. This theme centers around building physical strength, improving endurance, and cultivating a disciplined routine. Track your workouts, celebrate progress, and push toward your fitness goals one step at a time."},
    {id : "3", image: "/images/habitimage4.jpeg", title : "Play Mode On", description: "Play isn’t just for fun—it’s how we explore, learn, and recharge. Whether it's a sport, a game, or free creative activity, this theme celebrates movement, joy, and spontaneity. Let yourself unwind, boost your mood, and reconnect with your playful side."}

  ]
  return (
    <div style={{width: '90%',margin: '20px auto'}}>
      
      <Grid container spacing={2}>
        {homeobject.map((item,index)=>(
        <Grid size={{xs:12, sm:6, md: 4}} key={index}>
          <Card elevation={6}>
            <CardActionArea>
              <CardMedia component='img'  image={item.image} alt="loading..."/>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                 {item.title}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                  {item.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        ))}
      </Grid>

    </div>
      
  )
}

export default Home