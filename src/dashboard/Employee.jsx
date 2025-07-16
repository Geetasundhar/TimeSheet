import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-calendar/dist/Calendar.css';

const Employee = () => {
  const navigate = useNavigate();
  const dashboardRef = useRef(null);

  const employeeId = localStorage.getItem('employeeId');
  const employeeName = localStorage.getItem('employeeName');
  const employeePhoto = localStorage.getItem('employeePhoto');

  const [selected, setSelected] = useState(null);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const efficiency = {
    daily: '',
    weekly: '',
    monthly: '',
    yearly: '',
  };

  const presentPercent = ''; // You can update this later
  const absentPercent = '';  // You can update this later

  const presentDates = [];
  const absentDates = [];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleCardClick = (label) => {
    setSelected(label);
  };

  const scrollToDashboard = () => {
    if (dashboardRef.current) {
      dashboardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {sidebarOpen && (
        <div
          className="text-white d-flex flex-column justify-content-between p-3"
          style={{
            width: '250px',
            backgroundColor: '#0099ff',
            minHeight: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
          }}
        >
          <div>
            <div className="text-center mb-4">
              <img
                src={employeePhoto || 'https://cdn-icons-png.flaticon.com/512/194/194938.png'}
                alt="Profile"
                className="rounded-circle mb-2"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <p className="mb-0 fw-bold">{employeeName || 'Employee'}</p>
              <p className="mb-0 text-white-50" style={{ fontSize: '13px' }}>
                {employeeId || 'ID not available'}
              </p>
            </div>
            <hr className="border-light" />
            <div className="d-flex flex-column">
              <button
                onClick={scrollToDashboard}
                className="btn text-white text-start d-flex align-items-center mb-2"
                style={{ background: 'none', border: 'none', paddingLeft: 0 }}
              >
                <i className="bi bi-bar-chart-line me-2"></i> Dashboard
              </button>
              <a
                href="/"
                className="text-white d-flex align-items-center text-decoration-none"
                style={{ paddingLeft: '0.25rem' }}
              >
                <i className="bi bi-house me-2"></i> Home
              </a>
            </div>
          </div>
          <button className="btn btn-light w-100 mt-4" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </div>
      )}

      <div
        className="flex-grow-1 bg-light"
        style={{ marginLeft: sidebarOpen ? '250px' : '0', width: '100%' }}
      >
        <div
          className="d-flex justify-content-between align-items-center px-4 py-3 shadow"
          style={{
            backgroundColor: '#ffffff',
            color: '#000',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
          }}
        >
          <button
            className="btn border d-flex align-items-center justify-content-center me-3"
            style={{ width: '40px', height: '40px' }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="bi bi-list"></i>
          </button>
          <h4 className="mb-0 flex-grow-1">Work Efficiency Record</h4>
          <i className="bi bi-bell-fill fs-4"></i>
        </div>

        <div className="p-4" ref={dashboardRef}>
          <div className="container">
            {/* Efficiency Cards */}
            <div className="row g-4">
              {Object.entries(efficiency).map(([key, value], index) => {
                const label = key.charAt(0).toUpperCase() + key.slice(1);
                const isSelected = selected === label;
                return (
                  <div key={index} className="col-md-6">
                    <div
                      className={`card text-center shadow-sm h-100 ${
                        isSelected ? 'border-primary border-3' : ''
                      }`}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: isSelected ? '#e6f0ff' : 'white',
                      }}
                      onClick={() => handleCardClick(label)}
                    >
                      <div className="card-body">
                        <h5 className="card-title text-primary">{label}</h5>
                        <p className="card-text fs-4">Not updated</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Box Details */}
            {selected && (
              <div className="mt-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-primary">{selected} Efficiency Details</h5>
                    <p className="card-text">Not updated</p>
                  </div>
                </div>
              </div>
            )}

            {/* Attendance Percent Cards */}
            <div className="row g-4 mt-4">
              <div className="col-md-6">
                <div className="card shadow-sm bg-success text-white text-center">
                  <div className="card-body">
                    <h5>Present Percentage</h5>
                    <p className="fs-3">{presentPercent || 'Not updated'}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card shadow-sm bg-danger text-white text-center">
                  <div className="card-body">
                    <h5>Absent Percentage</h5>
                    <p className="fs-3">{absentPercent || 'Not updated'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Calendar */}
            <div className="mt-5">
              <h4 className="mb-3">Attendance Calendar</h4>
              <Calendar
                value={calendarDate}
                onChange={setCalendarDate}
                tileClassName={({ date }) => {
                  const formatted = formatDate(date);
                  if (presentDates.includes(formatted)) return 'present-day';
                  if (absentDates.includes(formatted)) return 'absent-day';

                  const isSaturday = date.getDay() === 6;
                  const month = date.getMonth();
                  const year = date.getFullYear();
                  let count = 0;
                  for (let d = 1; d <= date.getDate(); d++) {
                    const temp = new Date(year, month, d);
                    if (temp.getDay() === 6) count++;
                  }
                  if (isSaturday && count === 2) return 'second-saturday';
                  return null;
                }}
                className="w-100 border rounded shadow-sm p-3"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .present-day {
          background-color: #28a745 !important;
          color: white !important;
          border-radius: 6px;
        }
        .absent-day {
          background-color: #dc3545 !important;
          color: white !important;
          border-radius: 6px;
        }
        .second-saturday {
          background-color: #ffc107 !important;
          color: black !important;
        }
      `}</style>
    </div>
  );
};

export default Employee;
