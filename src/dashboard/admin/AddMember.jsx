import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AddMember = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'hr',
    phone: '',
    employeeId: '',
    department: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showExample, setShowExample] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setShowExample(value.length > 0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      alert('Password must include uppercase, lowercase, number, special character and be at least 8 characters long.');
      return;
    }

    console.log('User added:', formData);
    setSuccessMessage('Member added successfully!');

    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);

    setFormData({
      name: '',
      email: '',
      role: 'hr',
      phone: '',
      employeeId: '',
      department: '',
      password: '',
    });

    setShowExample(false);
  };

  return (
    <>
      {successMessage && (
        <div className="custom-toast">Member added successfully!</div>
      )}

      <div className="container-fluid px-4 py-4">
        <h2 className="fw-bold mb-4 text-primary">Add New Member</h2>

        <div
          className="card shadow-sm border-0 p-4 mx-auto add-member-card"
          style={{ maxWidth: '600px' }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="employeeId"
                placeholder="Employee ID"
                value={formData.employeeId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <select
                className="form-select"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="hr">HR</option>
                <option value="tl">Team Lead</option>
                <option value="ceo">CEO</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            <div className="mb-3 position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control pe-5"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {showExample && (
                <div className="mt-2 text-muted" style={{ fontSize: '0.85rem' }}>
                  Try: <strong>Secure@2025!</strong>
                </div>
              )}
            </div>

            <div className="text-end mt-4">
              <button className="btn btn-primary" type="submit">
                Add Member
              </button>
            </div>
          </form>
        </div>

        <style>{`
          .add-member-card {
            background: #dbeaf7;
            border-radius: 20px;
          }

          .form-control,
          .form-select {
            border-radius: 12px;
            padding: 12px;
            border: 1px solid #c2ced9;
            box-shadow: none;
            background-color: #fff;
            transition: none !important;
          }

          .form-control:hover,
          .form-select:hover {
            background-color: #fff !important;
          }

          .form-control:focus,
          .form-select:focus {
            border-color: #4682b4;
            box-shadow: 0 0 0 0.1rem rgba(70, 130, 180, 0.25);
          }

          .btn-primary {
            background: #139ff0ff;
            border: none;
            border-radius: 30px;
            padding: 10px 24px;
            font-weight: 600;
          }

          .btn-primary:hover {
            background: #3a6d99;
          }

          .password-toggle-icon {
            position: absolute;
            top: 50%;
            right: 14px;
            transform: translateY(-50%);
            cursor: pointer;
            color: #6c757d;
            font-size: 1rem;
            z-index: 5;
            background: #fff;
            padding: 2px;
          }

          .container-fluid {
            background-color: rgba(255, 255, 255, 0.9);
            position: relative;
            z-index: 1;
          }
            .custom-toast {
  position: fixed;
  top: 80px; /* Adjust if your topbar height is different */
  right: 20px;
  background-color: #d1e7dd;
  color: #0f5132;
  border: 1px solid #badbcc;
  padding: 10px 16px;
  border-radius: 8px;
  max-width: 300px;  /* Reduced width */
  width: fit-content;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1055;
  font-weight: 500;
  animation: slideIn 0.3s ease-out;
}

/* Optional animation */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

        `}</style>
      </div>
    </>
  );
};

export default AddMember;
