import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('/api/auth/register', { name, email, password });
      setMsg('Registered successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Registration failed');
    }
    
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>Register</Typography>
      <Box>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>
          Register
        </Button>
        {msg && <Typography sx={{ mt: 2 }}>{msg}</Typography>}
      </Box>
    </Container>
  );
}

export default RegisterPage;
