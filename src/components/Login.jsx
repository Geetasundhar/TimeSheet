import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import './Login.css'; // Include keyframes for background animation

const Login = () => {
  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login with', username, password);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    console.log('Forgot Password Email:', email);
    alert('Verification code sent to your email!');
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
              <form onSubmit={handleLoginSubmit}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: '16px' }}
                  type="submit"
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
                {/* Add reCAPTCHA below if needed */}
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
