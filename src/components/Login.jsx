import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [role, setRole] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    alert(`Logging in as ${role} with ID: ${id}`);
  };

  const handleForgotSubmit = () => {
    alert(`Password reset link sent to ${email}`);
    setEmail('');
    setShowForgot(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Login Page</h2>

        {!role ? (
          <div className="d-grid gap-2">
            <button className="btn btn-primary" onClick={() => setRole('Employee')}>Employee</button>
            <button className="btn btn-primary" onClick={() => setRole('HR')}>HR</button>
            <button className="btn btn-primary" onClick={() => setRole('Team Lead')}>Team Lead</button>
            <button className="btn btn-primary" onClick={() => setRole('CEO')}>CEO</button>
            <button className="btn btn-primary" onClick={() => setRole('Admin')}>Admin</button>
          </div>
        ) : (
          <>
            {!showForgot ? (
              <>
                <h4 className="text-center">{role} Login</h4>
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
                <button className="btn btn-primary w-100 mb-2" onClick={handleLogin}>Login</button>
                <p
                  className="text-primary text-decoration-underline text-center mb-2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowForgot(true)}
                >
                  Forgot Password?
                </p>
                <button className="btn btn-secondary w-100" onClick={() => setRole('')}>Back</button>
              </>
            ) : (
              <>
                <h4 className="text-center">Reset Password</h4>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
