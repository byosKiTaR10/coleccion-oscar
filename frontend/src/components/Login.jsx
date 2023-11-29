// ./components/Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginActions } from '../store/storelogin';
import {
  Typography,
  Button,
  Grid,
  Paper,
  Box,
  TextField,
  Avatar
} from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3030/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data === null) {
          console.error('Error en el inicio de sesión');
        } else {
          console.log('Inicio de sesión exitoso:', data);
          dispatch(loginActions.login({
            name: data.user,
            rol: data.rol
          }))
          navigate('/home');
        }
      }
    } catch (error) {
      console.error('Error en la comunicación con el backend:', error);
    }
  };


  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item>
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '300px' }}>
          <Avatar />

          <Typography variant="h5" align="center" gutterBottom>
            Iniciar sesión
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Usuario"
              fullWidth
              margin="normal"
              value={username}
              onChange={handleUsernameChange}
            />

            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={handlePasswordChange}
            />

            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Iniciar sesión
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;

