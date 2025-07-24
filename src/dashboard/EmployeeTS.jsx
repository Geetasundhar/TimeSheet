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
  const [formVisible, setFormVisible] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [formData, setFormData] = useState({
    projectType: '',
    projectName: '',
    phase: '',
    task: '',
    hours: ''
  });
  const [entries, setEntries] = useState({});
  const [editProfileData, setEditProfileData] = useState({
    name: localStorage.getItem('employeeName') || '',
    photo: localStorage.getItem('employeePhoto') || ''
  });
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

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setFormVisible(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleEditProfile = () => {
    localStorage.setItem('employeeName', editProfileData.name);
    localStorage.setItem('employeePhoto', editProfileData.photo);
    setEditProfileVisible(false);
    window.location.reload();
  };

  const handleAddEntry = () => {
    if (!formData.projectType || !formData.projectName || !formData.phase || !formData.task || !formData.hours) return;
    const dateKey = selectedDate.toDateString();
    const newEntry = { ...formData };
    setEntries((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEntry]
    }));
    setFormVisible(false);
    setSelectedDate(null);
    setFormData({ projectType: '', projectName: '', phase: '', task: '', hours: '' });
  };

  const renderCalendar = () => {
    const boxes = [];
    for (let i = 1; i < startDay; i++) {
      boxes.push(<div key={`empty-${i}`} className="border p-3 bg-transparent"></div>);
    }
    for (let day = 1; day <= totalDays; day++) {
      const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateKey = dateObj.toDateString();
      const isSelected = selectedDate && dateKey === selectedDate.toDateString();

      boxes.push(
        <div
          key={day}
          className={`border rounded p-2 ${isSelected ? 'bg-info text-white' : 'bg-light'}`}
          style={{ cursor: 'pointer', height: '120px', overflowY: 'auto' }}
          onClick={() => handleDateClick(dateObj)}
        >
          <div className="fw-bold">{day}</div>
          {entries[dateKey]?.map((entry, idx) => (
            <div key={idx} className="small">
              <strong>{entry.projectType}</strong><br />
              {entry.projectName} - {entry.phase}<br />
              {entry.task} ({entry.hours}h)
            </div>
          ))}
        </div>
      );
    }
    return boxes;
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
          onEdit={() => setEditProfileVisible(true)}
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

        {formVisible && (
          <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Entry - {selectedDate?.toDateString()}</h5>
                  <button type="button" className="btn-close" onClick={() => setFormVisible(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <select className="form-select" value={formData.projectType} onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}>
                      <option value="">Select Project Type</option>
                      <option value="Internal">Internal</option>
                      <option value="Billable">Billable</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <input className="form-control" placeholder="Project Name" value={formData.projectName} onChange={(e) => setFormData({ ...formData, projectName: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <select className="form-select" value={formData.phase} onChange={(e) => setFormData({ ...formData, phase: e.target.value })}>
                      <option value="">Select Phase</option>
                      <option value="Planning">Planning</option>
                      <option value="Development">Development</option>
                      <option value="Testing">Testing</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <select className="form-select" value={formData.task} onChange={(e) => setFormData({ ...formData, task: e.target.value })}>
                      <option value="">Select Task</option>
                      <option value="Coding">Coding</option>
                      <option value="Review">Review</option>
                      <option value="Bug Fix">Bug Fix</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <input type="number" className="form-control" placeholder="Hours Worked" value={formData.hours} onChange={(e) => setFormData({ ...formData, hours: e.target.value })} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setFormVisible(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleAddEntry}>Add Entry</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {editProfileVisible && (
          <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Profile</h5>
                  <button type="button" className="btn-close" onClick={() => setEditProfileVisible(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editProfileData.name}
                      onChange={(e) => setEditProfileData({ ...editProfileData, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Photo URL</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editProfileData.photo}
                      onChange={(e) => setEditProfileData({ ...editProfileData, photo: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setEditProfileVisible(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleEditProfile}>Save</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}