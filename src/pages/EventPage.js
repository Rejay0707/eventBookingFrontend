import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Box,
} from '@mui/material';

function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [type, setType] = useState('regular');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleBooking = () => {
    const token = sessionStorage.getItem('token');
    if (!token) return alert('Please login first');

    const available = event.seatTypes?.[type]?.available || 0;
    if (quantity > available) {
      return alert(`Only ${available} ${type} seats available`);
    }

    axios
      .post(
        'http://localhost:5000/api/bookings',
        {
          eventId: id,
          ticketType: type,
          quantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => setMessage('Booking successful'))
      .catch((err) => {
        setMessage(err.response?.data?.msg || 'Booking failed');
      });
  };

  if (!event) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ bgcolor: '#e8f5e9' , minHeight: '100vh' }}>
      {/* Full width navigation bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 4, pt: 2 }}>
        <Button variant="text" onClick={() => navigate('/')}>
          ← Back to Events
        </Button>
        <Button variant="outlined" onClick={() => navigate('/my-bookings')}>
          My Bookings
        </Button>
      </Box>

      <Container maxWidth="sm" sx={{ mt: 3 }}>
        <Card>
          <Box sx={{ width: '100%', height: '300px', overflow: 'hidden' }}>
            <CardMedia
              component="img"
              image={event.image}
              alt={event.title}
              sx={{ width: '100%', objectFit: 'contain', maxHeight: 500 }}
            />

          </Box>

          <CardContent>
            <Typography variant="h4" gutterBottom>
              {event.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {event.description}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Date:</strong> {event.date?.substring(0, 10)} | <strong>Time:</strong> {event.time}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Location:</strong> {event.location}
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2">
                <strong>Available Regular Seats:</strong> {event.seatTypes?.regular?.available || 0}
              </Typography>
              <Typography variant="body2">
                <strong>Available VIP Seats:</strong> {event.seatTypes?.vip?.available || 0}
              </Typography>
            </Box>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select Ticket Type</InputLabel>
              <Select
                value={type}
                label="Select Ticket Type"
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="regular">
                  Regular (₹{event.seatTypes?.regular?.price})
                </MenuItem>
                <MenuItem value="vip">
                  VIP (₹{event.seatTypes?.vip?.price})
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              type="number"
              label="Quantity"
              fullWidth
              inputProps={{ min: 1 }}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              sx={{ mb: 2 }}
            />

            <Button variant="contained" color="primary" fullWidth onClick={handleBooking}>
              Book Now
            </Button>

            {message && (
              <Typography sx={{ mt: 2 }} color={message.includes('success') ? 'green' : 'red'}>
                {message}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default EventPage;
