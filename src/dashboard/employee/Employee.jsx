// All imports
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-calendar/dist/Calendar.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Employee = () => {
  const navigate = useNavigate();
  const dashboardRef = useRef(null);

  const employeeId = localStorage.getItem('employeeId');
  const employeeName = localStorage.getItem('employeeName');
  const employeePhoto = localStorage.getItem('employeePhoto');

  const [selected, setSelected] = useState(null);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedName, setEditedName] = useState(employeeName || '');
  const [editedPhoto, setEditedPhoto] = useState(employeePhoto || '');

  const efficiency = {
    daily: '80%',
    weekly: '75%',
    monthly: '70%',
    yearly: '85%',
  };

  const presentPercent = '75%';
  const absentPercent = '25%';
  const presentDates = [];
  const absentDates = [];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleCardClick = (label) => {
    setSelected(label === selected ? null : label);
  };

  const scrollToDashboard = () => {
    setSelected(null);
    if (dashboardRef.current) {
      dashboardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatDate = (date) => date.toISOString().split('T')[0];

  const filteredLabels = Object.entries(efficiency).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value,
  }));

  const cardIcons = [
    'https://cdn-icons-png.flaticon.com/512/1170/1170576.png',
    'https://cdn-icons-png.flaticon.com/512/1170/1170583.png',
    'https://cdn-icons-png.flaticon.com/512/1170/1170579.png',
    'https://cdn-icons-png.flaticon.com/512/1170/1170580.png',
  ];

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Efficiency (%)',
        data: [70, 75, 80, 85],
        fill: true,
        backgroundColor: 'rgba(0, 153, 255, 0.2)',
        borderColor: '#0099ff',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true },
      x: { grid: { display: false } },
    },
  };

  const handleEditProfile = () => {
    setProfileMenuOpen(false);
    setShowEditForm(true);
  };

  const handleSaveProfile = () => {
    localStorage.setItem('employeeName', editedName);
    localStorage.setItem('employeePhoto', editedPhoto);
    window.location.reload();
  };

  return (
    <div className="p-4" ref={dashboardRef}>
      <div className="row g-4 row-cols-1 row-cols-md-4 mb-4">
        {filteredLabels.map((item, index) => (
          <div key={index} className="col">
            <div
              className="card shadow-sm h-100 p-3"
              onClick={() => handleCardClick(item.label)}
              style={{ borderRadius: '16px', cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center mb-2">
                <img src={cardIcons[index % cardIcons.length]} alt="icon" style={{ width: '30px', marginRight: '10px' }} />
                <h6 className="text-muted mb-0">{item.label}</h6>
              </div>
              <div className="fs-4 fw-bold text-primary">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="mb-4 p-3 shadow-sm rounded bg-white">
          <h5 className="text-primary mb-3">{selected} Efficiency Record</h5>
          <div style={{ height: '240px' }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      )}

      <div className="row g-4 row-cols-1 row-cols-md-2 mb-4">
        <div className="col">
          <div className="card text-center shadow-sm" style={{ backgroundColor: '#e9f9ef', border: '1px solid #c5f0d2', color: '#198754', borderRadius: '16px' }}>
            <div className="card-body">
              <h5 className="mb-2">Present Percentage</h5>
              <p className="fs-3 mb-0">{presentPercent}</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-center shadow-sm" style={{ backgroundColor: '#ffecec', border: '1px solid #f1c2c2', color: '#dc3545', borderRadius: '16px' }}>
            <div className="card-body">
              <h5 className="mb-2">Absent Percentage</h5>
              <p className="fs-3 mb-0">{absentPercent}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="p-4 rounded shadow-sm mb-4 bg-white">
        <h5 className="text-primary mb-3">Attendance Calendar</h5>
        <Calendar
          value={calendarDate}
          onChange={setCalendarDate}
          tileClassName={({ date }) => {
            const formatted = formatDate(date);
            if (presentDates.includes(formatted)) return 'present-day';
            if (absentDates.includes(formatted)) return 'absent-day';
            return null;
          }}
          className="w-100 border-0"
        />
      </div>

      {/* Edit Profile Modal */}
      {showEditForm && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditForm(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Photo URL</label>
                  <input type="text" className="form-control" value={editedPhoto} onChange={(e) => setEditedPhoto(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowEditForm(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSaveProfile}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Colors */}
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
      `}</style>
    </div>
  );
};

export default Employee;
