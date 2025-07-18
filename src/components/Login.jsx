import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import './Login.css'; // Animation keyframes
import { users } from '../data/users'; // Adjust path if needed

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ id: '', password: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      u => u.empId === formData.id && u.password === formData.password
    );

    if (user) {
      switch (user.role) {
        case 'admin':
          navigate('/dashboard/admin');
          break;
        case 'hr':
          navigate('/hr');
          break;
        case 'teamlead':
          navigate('/tl/dashboard');
          break;
        case 'employee':
          navigate('/dashboard/Employee');
          break;
        default:
          alert('Unknown role');
      }
    } else {
      alert('Invalid Employee ID or Password');
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Animated Background */}
      <div style={styles.animatedBackground}></div>

      {/* Home Icon */}
      <Link to="/" style={styles.homeIcon}>
        <HomeIcon fontSize="large" />
      </Link>

      {/* Login Form Card */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        zIndex={1}
      >
        <Card style={styles.card}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                label="Employee ID"
                variant="outlined"
                fullWidth
                margin="normal"
                name="id"
                value={formData.id}
                onChange={handleChange}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '16px' }}
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

const styles = {
  wrapper: {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
  },
  animatedBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(-45deg, #0099ff, #ffffff, #33ccff, #ffffff)',
    backgroundSize: '400% 400%',
    animation: 'gradientAnimation 15s ease infinite',
    zIndex: -1,
    pointerEvents: 'none',
  },
  homeIcon: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    zIndex: 2,
    textDecoration: 'none',
    color: '#000',
  },
  card: {
    maxWidth: '400px',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    zIndex: 2,
  },
};

export default Login;