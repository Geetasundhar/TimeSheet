// All imports
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Updated Topbar Component
const Topbar = ({ employeePhoto, onProfileClick, showProfileMenu, onLogout, onEdit }) => (
  <div className="d-flex justify-content-between align-items-center px-4 py-2 shadow-sm bg-white sticky-top" style={{ zIndex: 999 }}>
    <button className="btn btn-outline-primary">
      <i className="bi bi-list"></i>
    </button>
    <h5 className="mb-0 text-primary">Timesheet Calendar</h5>
    <div className="position-relative">
      <img
        src={employeePhoto || 'https://cdn-icons-png.flaticon.com/512/194/194938.png'}
        alt="Avatar"
        className="rounded-circle"
        style={{ width: '40px', height: '40px', cursor: 'pointer' }}
        onClick={onProfileClick}
      />
      {showProfileMenu && (
        <div className="position-absolute end-0 mt-2 p-2 bg-white border rounded shadow" style={{ minWidth: '160px' }}>
          <button className="dropdown-item mb-1" onClick={onEdit}>Edit Profile</button>
          <button className="dropdown-item" onClick={onLogout}>Logout</button>
        </div>
      )}
    </div>
  </div>
);

// Updated Sidebar Component
const Sidebar = ({ employeeName, employeeId, employeePhoto }) => (
  <div
    className="text-white d-flex flex-column justify-content-between p-3"
    style={{ width: '250px', backgroundColor: '#007bff', minHeight: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 1000 }}
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
          <p className="mb-0 text-white-50" style={{ fontSize: '13px' }}>{employeeId || 'ID not available'}</p>
        </div>
      </div>
      <hr className="border-light" />
      <div className="d-flex flex-column">
        <a href="/dashboard/Employee" className="text-white d-flex align-items-center text-decoration-none mb-2">
          <i className="bi bi-bar-chart-line me-2"></i> Dashboard
        </a>
        <a href="#" className="text-white d-flex align-items-center text-decoration-none mb-2">
          <i className="bi bi-clipboard-data me-2"></i> Your Timesheet
        </a>
        <a href="/employee/reports" className="text-white d-flex align-items-center text-decoration-none mb-2">
          <i className="bi bi-pie-chart me-2"></i> Reports
        </a>
      </div>
    </div>
    <div className="mt-auto">
      <hr className="border-light" />
      <button className="btn text-white text-start d-flex align-items-center" style={{ background: 'none', border: 'none', paddingLeft: 0 }}>
        <i className="bi bi-box-arrow-right me-2"></i> Logout
      </button>
    </div>
  </div>
);

export default function FullCalendarAppWithLayout() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [entries] = useState({}); // No adding entries from employee side
  const employeeId = localStorage.getItem('employeeId');
  const employeeName = localStorage.getItem('employeeName');
  const employeePhoto = localStorage.getItem('employeePhoto');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay() || 7;
  const totalDays = endOfMonth.getDate();

  const handlePrev = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNext = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const renderCalendar = () => {
    const boxes = [];
    for (let i = 1; i < startDay; i++) {
      boxes.push(<div key={`empty-${i}`} className="border p-3 bg-transparent"></div>);
    }
    for (let day = 1; day <= totalDays; day++) {
      const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateKey = dateObj.toDateString();

      boxes.push(
        <div
          key={day}
          className="border rounded p-2 bg-light"
          style={{ height: '120px', overflowY: 'auto' }}
        >
          <div className="fw-bold">{day}</div>
          {entries[dateKey]?.map((entry, idx) => (
            <div key={idx} className="small">
              <strong>{entry.projectType}</strong> - {entry.task} ({entry.hours}h)
            </div>
          ))}
        </div>
      );
    }
    return boxes;
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="d-flex">
      <Sidebar employeeName={employeeName} employeeId={employeeId} employeePhoto={employeePhoto} />
      <div className="flex-grow-1" style={{ marginLeft: '250px' }}>
        <Topbar
          employeePhoto={employeePhoto}
          onProfileClick={() => setProfileMenuOpen(!profileMenuOpen)}
          showProfileMenu={profileMenuOpen}
          onLogout={handleLogout}
          onEdit={() => alert('Edit Profile Clicked')}
        />
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button className="btn btn-outline-primary" onClick={handlePrev}>&lt; Prev</button>
            <h4>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h4>
            <button className="btn btn-outline-primary" onClick={handleNext}>Next &gt;</button>
          </div>
          <div className="d-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
            {daysOfWeek.map(day => <div key={day} className="fw-bold text-center">{day}</div>)}
            {renderCalendar()}
          </div>
        </div>
      </div>
    </div>
  );
}
