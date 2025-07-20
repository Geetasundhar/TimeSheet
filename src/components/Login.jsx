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
import './Login.css'; 

import { users } from '../data/users'; 

const Login = () => {
  const navigate = useNavigate();
  const [showForgot, setShowForgot] = useState(false);
  const [formData, setFormData] = useState({ id: '', password: '' });
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      u => u.empId === formData.id && u.password === formData.password
    );

    if (user) {
      localStorage.setItem('employeeId', user.empId);
      localStorage.setItem('employeeName', user.name || 'Employee');
      localStorage.setItem('employeePhoto', user.photo || '');
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
        case 'ceo':
          navigate('/ceo');
          break;
        default:
          alert('Unknown role');
      }
    } else {
      alert('Invalid Employee ID or Password');
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    alert(`Verification code sent to ${email}`);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.animatedBackground}></div>

      <Link to="/" style={styles.homeIcon}>
        <HomeIcon fontSize="large" />
      </Link>

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
              {showForgot ? 'Forgot Password' : 'Login'}
            </Typography>

            {!showForgot ? (
              <form onSubmit={handleLogin}>
                <TextField
                  label="Employee ID"
                  name="id"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.id}
                  onChange={handleChange}
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
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
                <Typography
                  variant="body2"
                  align="right"
                  style={{ marginTop: '10px', cursor: 'pointer', color: '#1976d2' }}
                  onClick={() => setShowForgot(true)}
                >
                  Forgot Password?
                </Typography>
              </form>
            ) : (
              <form onSubmit={handleForgotSubmit}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  style={{ marginTop: '16px' }}
                  type="submit"
                >
                  Send Code
                </Button>
                <Typography
                  variant="body2"
                  align="left"
                  style={{ marginTop: '10px', cursor: 'pointer', color: '#1976d2' }}
                  onClick={() => setShowForgot(false)}
                >
                  ← Back to Login
                </Typography>
              </form>
            )}
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
