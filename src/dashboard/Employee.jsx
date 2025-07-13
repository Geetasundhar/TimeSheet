import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Employee = () => {
  const navigate = useNavigate();
  const employeeId = localStorage.getItem('employeeId');

  const efficiency = {
    daily: '',
    weekly: '',
    monthly: '',
    yearly: '',
  };

  const [selected, setSelected] = useState(null);

  const labels = [
    { label: 'Daily', value: efficiency.daily },
    { label: 'Weekly', value: efficiency.weekly },
    { label: 'Monthly', value: efficiency.monthly },
    { label: 'Yearly', value: efficiency.yearly },
  ];

  const handleLogout = () => {
    localStorage.removeItem('employeeId');
    navigate('/');
  };

  const handleCardClick = (label) => {
    setSelected(label === selected ? null : label);
  };

  const filteredLabels = selected
    ? labels.filter((item) => item.label === selected)
    : labels;

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      {/* Sidebar */}
      <div
        className="text-white d-flex flex-column justify-content-between p-3"
        style={{ width: '250px', backgroundColor: '#0099ff' }}
      >
        <div>
          <h5 className="mb-3">Employee Dashboard</h5>
          <hr className="border-light" />
          <a href="/" className="text-white d-flex align-items-center mb-3 text-decoration-none">
            <i className="bi bi-house me-2"></i> Home
          </a>
          <hr className="border-light" />
          <p><strong>Employee ID:</strong></p>
          <p>{employeeId || 'Not logged in'}</p>
          <a href="#dashboard" className="text-white d-flex align-items-center mb-3 text-decoration-none">
            <i className="bi bi-bar-chart-line me-2"></i> Dashboard
          </a>
          
        </div>

        <div>
          <button className="btn btn-light w-100 mt-3" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light" id="dashboard">
        <h2 className="mb-4">Work Efficiency Record</h2>

        {selected && (
          <div className="mb-3 text-end">
            <button
              className="btn"
              style={{ backgroundColor: '#0099ff', color: 'white' }}
              onClick={() => setSelected(null)}
            >
              Show All
            </button>
          </div>
        )}

        <div className="container">
          <div className="row g-4">
            {filteredLabels.map((item, index) => (
              <div key={index} className="col-md-6">
                <div
                  className="card text-center shadow-sm h-100"
                  style={{ cursor: 'pointer', transition: '0.3s' }}
                  onClick={() => handleCardClick(item.label)}
                >
                  <div className="card-body">
                    <h5 className="card-title text-primary">{item.label}</h5>
                    <p className="card-text fs-4">{item.value || 'Not updated'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Employee;
