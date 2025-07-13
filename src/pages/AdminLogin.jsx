import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now: hardcoded admin login (later replace with API)
    const { email, password } = formData;

    if (email === 'admin@example.com' && password === 'admin123') {
      // Save role in localStorage (simulate auth)
      localStorage.setItem('role', 'admin');
      navigate('/dashboard/admin');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-3">Admin Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className="text-danger mb-2">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
