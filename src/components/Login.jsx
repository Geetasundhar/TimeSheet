import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    alert(`Logging in with ID: ${id}`);
  };

  const handleForgotSubmit = () => {
    alert(`Password reset link sent to ${email}`);
    setEmail('');
    setShowForgot(false);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.animatedBackground}></div>

      {/* Home Icon */}
      <a href="/" style={styles.homeIcon}>
        <i className="bi bi-house-fill" style={{ fontSize: '24px', color: 'dark grey' }}></i>
      </a>

      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-lg" style={styles.card}>
          <h2 className="text-center mb-4">Login</h2>

          {!showForgot ? (
            <>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter ID"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="btn btn-primary w-100 mb-2" onClick={handleLogin}>
                Login
              </button>

              <p
                className="text-primary text-decoration-underline text-center"
                style={{ cursor: 'pointer' }}
                onClick={() => setShowForgot(true)}
              >
                Forgot Password?
              </p>
            </>
          ) : (
            <>
              <h5 className="text-center">Reset Password</h5>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button className="btn btn-primary w-100 mb-2" onClick={handleForgotSubmit}>
                Send Reset Link
              </button>
              <button className="btn btn-secondary w-100" onClick={() => setShowForgot(false)}>
                Back to Login
              </button>
            </>
          )}
        </div>
      </div>
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
  },
  homeIcon: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    zIndex: 10,
    textDecoration: 'none',
  },
  card: {
    maxWidth: '400px',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    zIndex: 1,
  },
};


const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`;
document.head.appendChild(styleSheet);

export default Login;
