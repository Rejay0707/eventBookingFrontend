import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import { Typography, Grid, Box } from '@mui/material';

function HomePage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Box sx={{ bgcolor: '#f3e5f5', minHeight: '100vh', px: 2, py: 4 }}>
      {/* px: 2 gives slight padding left and right */}
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ textAlign: 'left', ml: 1 }} // aligns text left
      >
        Upcoming Events
      </Typography>

      <Grid container spacing={3}>
  {events.map(event => (
    <Grid 
      item 
      xs={12} 
      sm={6} 
      md={4} 
      lg={3} 
      key={event._id}
      sx={{ display: 'flex' }} // make each grid item a flex container
    >
      <EventCard event={event} />
    </Grid>
  ))}
</Grid>

    </Box>
  );
}

export default HomePage;
