import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Typography, Card } from '@mui/material';

const HabitHistory = () => {
  const { habitId } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    axios.get(`http://127.0.0.1:8000/habithistory/${habitId}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(res => {setHistory(res.data);console.log(res.data);})
      .catch(err => console.error("Error:", err));
  }, [habitId]);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Habit History</Typography>
      {history.length === 0 && <Typography>No history available.</Typography>}
      {history.map((item, index) => (
        <Card key={index} style={{ margin: '10px 0', padding: '15px' }} elevation={5}>
          <Typography><strong>Date:</strong>{new Date(item.date).toLocaleDateString('en-GB',
               {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}</Typography>
          <Typography><strong>Status:</strong> {item.status}</Typography>
          <Typography><strong>Note:</strong> {item.description || "No comment"}</Typography>
        </Card>
      ))}
    </div>
  );
};

export default HabitHistory;
