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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const efficiency = {
    daily: '80%',
    weekly: '75%',
    monthly: '70%',
    yearly: '85%',
  };

  const presentPercent = '75%';
  const absentPercent = '25%';

  const presentDates = []; // Update as needed
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

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const filteredLabels = Object.entries(efficiency).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value,
  }));

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
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div style={{ background: '#e6effaff', height: '100vh', display: 'flex', margin: 0, padding: 0 }}>
      {sidebarOpen && (
        <div
          className="text-white d-flex flex-column justify-content-between p-3"
          style={{
            width: '250px',
            backgroundColor: '#007bff',
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
              <p className="mb-0 text-white-50" style={{ fontSize: '13px' }}>{employeeId || 'ID not available'}</p>
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

      <div className="flex-grow-1" style={{ marginLeft: sidebarOpen ? '250px' : '0', padding: '2rem', width: '100%' }}>
        <div className="d-flex justify-content-between align-items-center px-4 py-3 rounded shadow-sm mb-4" style={{ backgroundColor: '#ffffff', color: '#000', position: 'sticky', top: 0, zIndex: 1000 }}>
          <button className="btn border d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }} onClick={() => setSidebarOpen(!sidebarOpen)}>
            <i className="bi bi-list"></i>
          </button>
          <h4 className="mb-0 flex-grow-1 text-primary">Work Efficiency Record</h4>
          <i className="bi bi-bell-fill fs-4 text-primary"></i>
        </div>

        <div ref={dashboardRef}>
          <div className="row g-4 row-cols-1 row-cols-md-2 mb-4">
            {filteredLabels.map((item, index) => {
              const isSelected = selected === item.label;
              return (
                <div key={index} className="col">
                  <div
                    className={`card text-center shadow-sm h-100 ${isSelected ? 'border-primary border-3' : ''}`}
                    style={{ backgroundColor: '#d0e3faff', cursor: 'pointer', borderRadius: '16px', border: '1px solid #dee2e6' }}
                    onClick={() => handleCardClick(item.label)}
                  >
                    <div className="card-body">
                      <h5 className="card-title text-primary">{item.label}</h5>
                      <p className="card-text fs-4">{item.value || 'Not updated'}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {selected && (
            <div className="mb-4">
              <div className="card shadow-sm border border-primary" style={{ borderRadius: '16px', backgroundColor: '#d0e3faff' }}>
                <div className="card-body">
                  <h5 className="card-title text-primary">{selected} Efficiency Details</h5>
                  <p className="card-text">Efficiency: {efficiency[selected.toLowerCase()]}</p>
                  <div style={{ height: '150px' }}>
                    <Line data={chartData} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="row g-4 row-cols-1 row-cols-md-2 mb-4">
            <div className="col">
              <div className="card text-center shadow-sm" style={{ backgroundColor: '#e9f9ef', border: '1px solid #c5f0d2', color: '#198754', borderRadius: '16px' }}>
                <div className="card-body">
                  <h5 className="mb-2">Present Percentage</h5>
                  <p className="fs-3 mb-0">{presentPercent || 'Not updated'}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-center shadow-sm" style={{ backgroundColor: '#ffecec', border: '1px solid #f1c2c2', color: '#dc3545', borderRadius: '16px' }}>
                <div className="card-body">
                  <h5 className="mb-2">Absent Percentage</h5>
                  <p className="fs-3 mb-0">{absentPercent || 'Not updated'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded shadow-sm" style={{ backgroundColor: '#d0e3faff' }}>
            <h5 className="text-primary mb-3">Attendance Calendar</h5>
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
              className="w-100 border-0"
            />
          </div>
        </div>
      </div>

      <style>{`
        .present-day {
          background-color: #d4edda !important;
          color: #155724 !important;
          border-radius: 6px;
        }
        .absent-day {
          background-color: #f8d7da !important;
          color: #721c24 !important;
          border-radius: 6px;
        }
        .second-saturday {
          background-color: #fff3cd !important;
          color: #856404 !important;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
};

export default Employee;
