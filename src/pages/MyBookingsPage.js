import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: { pathname: '/my-bookings' } } });
      return;
    }

    axios
      .get('/api/bookings/my', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  }, [navigate]);

  return (
    <Box sx={{ bgcolor: '#fff3e0' , minHeight: '100vh', py: 4 }}>
    <Container sx={{ mt: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">My Bookings</Typography>
        <Button variant="outlined" onClick={() => navigate('/')}>
          Back to Events
        </Button>
      </Box>

      <Grid container spacing={3}>
        {bookings.map((b) => (
          <Grid item xs={12} sm={6} md={4} key={b._id}>
            <Card
              sx={{
                minHeight: 250,
                boxShadow: 4,
                borderRadius: 3,
                padding: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {b.eventId?.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Type:</strong> {b.ticketType}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Quantity:</strong> {b.quantity}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Total:</strong> ₹{b.totalPrice}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Booked On:</strong>{' '}
                  {new Date(b.bookingDate).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </Box>
  );
}

export default MyBookingsPage;
