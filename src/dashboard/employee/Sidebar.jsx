import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Sidebar = ({ employeeName, employeeId, employeePhoto }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/dashboard/Login'); // ⬅ This redirects to the Login page
  };

  return (
    <div
      className="text-white d-flex flex-column justify-content-between p-3"
      style={{
        width: '250px',
        backgroundColor: '#007bff',
        minHeight: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000
      }}
    >
      <div>
        <div className="d-flex align-items-center mb-4">
          <img
            src={employeePhoto || 'https://cdn-icons-png.flaticon.com/512/194/194938.png'}
            alt="Profile"
            className="rounded-circle me-2"
            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
          />
          <div>
            <p className="mb-0 fw-bold">{employeeName || 'Employee'}</p>
            <p className="mb-0 text-white-50" style={{ fontSize: '13px' }}>
              {employeeId || 'ID not available'}
            </p>
          </div>
        </div>
        <hr className="border-light" />
        <div className="d-flex flex-column">
          <a href="/dashboard/Employee" className="text-white d-flex align-items-center text-decoration-none mb-2">
            <i className="bi bi-bar-chart-line me-2"></i> Dashboard
          </a>
          <a href="/dashboard/employee/timesheet" className="text-white d-flex align-items-center text-decoration-none mb-2">
            <i className="bi bi-clipboard-data me-2"></i> Your Timesheet
          </a>
          <a href="/dashboard/employee/reports" className="text-white d-flex align-items-center text-decoration-none mb-2">
            <i className="bi bi-pie-chart me-2"></i> Reports
          </a>
        </div>
      </div>
      <div className="mt-auto">
        <hr className="border-light" />
        <button
          className="btn text-white text-start d-flex align-items-center"
          style={{ background: 'none', border: 'none', paddingLeft: 0 }}
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-2"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
