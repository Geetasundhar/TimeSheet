import React, { useState } from 'react';

const AddMember = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'hr',
    phone: '',
    employeeId: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [passwordRules, setPasswordRules] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setPasswordRules({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /\d/.test(value),
        specialChar: /[@$!%*?&]/.test(value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      alert('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
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
      password: '',
    });

    setPasswordRules({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
    });
  };

  return (
    <div className="container-fluid px-4 py-4">
      <h2 className="fw-bold mb-4">Add New Member</h2>

      {successMessage && <div className="custom-toast">{successMessage}</div>}

      <div className="card shadow-sm border-0 p-4 mx-auto add-member-card" style={{ maxWidth: '960px' }}>
        <form onSubmit={handleSubmit}>
          {/* Row 1: Button only */}
          <div className="row mb-3">
            <div className="col text-end">
              <button className="btn btn-primary" type="submit">
                Add Member
              </button>
            </div>
          </div>

          {/* Row 2: Input fields */}
          <div className="row g-4">
            <div className="col-md-4">
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
            <div className="col-md-4">
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
            <div className="col-md-4">
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
            <div className="col-md-4">
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
            <div className="col-md-4">
              <select
                className="form-select"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="hr">HR</option>
                <option value="tl">Team Lead</option>
                <option value="ceo">CEO</option>
              </select>
            </div>
            <div className="col-md-4">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              {formData.password && (
                <ul className="password-validation mt-2">
                  <li className={passwordRules.length ? 'valid' : ''}>At least 8 characters</li>
                  <li className={passwordRules.uppercase ? 'valid' : ''}>At least one uppercase letter</li>
                  <li className={passwordRules.lowercase ? 'valid' : ''}>At least one lowercase letter</li>
                  <li className={passwordRules.number ? 'valid' : ''}>At least one number</li>
                  <li className={passwordRules.specialChar ? 'valid' : ''}>At least one special character</li>
                </ul>
              )}
            </div>
          </div>
        </form>
      </div>

      <style>{`
        .add-member-card {
          background: #adcae7ff;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          border-radius: 20px;
        }

        .add-member-card:hover {
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
        }

        .form-control, .form-select {
          border-radius: 12px;
          padding: 12px;
          border: 1px solid #c2ced9;
          box-shadow: none;
          transition: border 0.3s ease;
        }

        .form-control:focus, .form-select:focus {
          border-color: #6f42c1;
          outline: none;
          box-shadow: 0 0 0 0.1rem rgba(111, 66, 193, 0.25);
        }

        .btn-primary {
          background: linear-gradient(135deg, #6f42c1, #0d6efd);
          border: none;
          border-radius: 30px;
          padding: 10px 24px;
          font-weight: 600;
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #5e36ac, #0a58ca);
        }

        .password-validation {
          list-style: none;
          padding-left: 0;
          font-size: 0.85rem;
          margin: 0;
        }

        .password-validation li {
          color: #999;
          transition: color 0.2s ease;
        }

        .password-validation li.valid {
          color: green;
          font-weight: 500;
        }

        .custom-toast {
          position: fixed;
          top: 20px;
          right: 20px;
          background-color: #ffffff;
          color: #198754;
          padding: 12px 20px;
          border-radius: 12px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
          font-weight: 500;
          z-index: 1055;
          border: 1px solid #c3e6cb;
          transition: opacity 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default AddMember;
