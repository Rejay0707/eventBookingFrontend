import React from 'react';
import { useNavigate } from 'react-router-dom';

function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <div
  onClick={() => navigate(`/events/${event._id}`)}
  style={{
    border: '2px solid #ccc',
    borderRadius: '12px',
    padding: '1rem',
    width: '100%',
    cursor: 'pointer',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    textAlign: 'left'
  }}
  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
>

      <img 
  src={event.image} 
  alt={event.title} 
  style={{
    width: '350px',
    height: '250px',
    objectFit: 'cover',
    borderRadius: '8px'
  }} 
/>

      <h3>{event.title}</h3>
      <p>{event.date?.substring(0, 10)} | {event.time}</p>
      <p>{event.location}</p>
      <p>
        🎫 Regular: ₹{event.seatTypes?.regular?.price} <br />
        ⭐ VIP: ₹{event.seatTypes?.vip?.price}
      </p>
    </div>
  );
}

export default EventCard;