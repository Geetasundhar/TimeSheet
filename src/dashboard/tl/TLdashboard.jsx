import React, { useState, useEffect } from 'react';
import TLsidebar from '../../dashboard/tl/TLsidebar';
import TLtopbar from '../../dashboard/tl/TLtopbar';
import {
  FaCalendarDay, FaCalendarWeek, FaCalendarAlt, FaCalendar,
  FaSearch, FaUserPlus, FaEdit, FaCheck, FaTimes
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TLdashboard = () => {
  const [selectedSummary, setSelectedSummary] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(true); // 🔹 toggle state
const [timesheetData, setTimesheetData] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tl_team_members')) || [];
    setTeamMembers(stored);
  }, []);
useEffect(() => {
  const allData = JSON.parse(localStorage.getItem('timesheet_data')) || {};
  setTimesheetData(allData);
}, []);

  const summaries = [
    { type: 'daily', icon: <FaCalendarDay size={30} className="text-primary mb-2" />, title: 'Daily Summary', data: '12 hours logged', progress: 60 },
    { type: 'weekly', icon: <FaCalendarWeek size={30} className="text-success mb-2" />, title: 'Weekly Summary', data: '56 hours logged', progress: 75 },
    { type: 'monthly', icon: <FaCalendarAlt size={30} className="text-warning mb-2" />, title: 'Monthly Summary', data: '220 hours logged', progress: 90 },
    { type: 'yearly', icon: <FaCalendar size={30} className="text-danger mb-2" />, title: 'Yearly Summary', data: '2500 hours logged', progress: 40 },
  ];
const handleApproveAllTimesheets = () => {
  const allData = JSON.parse(localStorage.getItem('timesheet_data')) || {};
  let modified = false;

  for (const emp in allData) {
    const empEntries = allData[emp];

    for (const date in empEntries) {
      empEntries[date] = empEntries[date].map(entry => {
        if (!entry.approved) {
          modified = true;
          return { ...entry, approved: true, rejected: false };
        }
        return entry;
      });
    }

    allData[emp] = empEntries;
  }

  if (modified) {
    localStorage.setItem('timesheet_data', JSON.stringify(allData));
    alert('All pending timesheets approved!');
  } else {
    alert('No pending entries to approve.');
  }
};
const handleRejectAllTimesheets = () => {
  const allData = JSON.parse(localStorage.getItem('timesheet_data')) || {};
  let modified = false;

  for (const emp in allData) {
    const empEntries = allData[emp];

    for (const date in empEntries) {
      empEntries[date] = empEntries[date].map(entry => {
        if (!entry.rejected && !entry.approved) {
          modified = true;
          return { ...entry, rejected: true, approved: false };
        }
        return entry;
      });
    }

    allData[emp] = empEntries;
  }

  if (modified) {
    localStorage.setItem('timesheet_data', JSON.stringify(allData));
    alert('All pending timesheets rejected!');
  } else {
    alert('No pending entries to reject.');
  }
};

  const handleClick = (type) => setSelectedSummary(type);

  return (
    <div style={{ display: 'flex' }}>
      {sidebarVisible && <TLsidebar />} {/* 🔹 Conditionally render sidebar */}
<div
  className="flex-grow-1"
  style={{
    marginLeft: sidebarVisible && window.innerWidth >= 992 ? '220px' : '0',
    padding: 0,
    transition: 'margin-left 0.3s ease',
  }}
>
        <TLtopbar onToggle={() => setSidebarVisible(!sidebarVisible)} /> {/* 🔹 Toggle callback */}
<br></br>      <div className="container-fluid p-4" style={{ marginTop: '20px' }}>

        <h2 className="fw-bold mb-4">Welcome, Team Leader</h2>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-4">
          {['overview', 'pending', 'team'].map((tab) => (
            <li className="nav-item" key={tab}>
              <button className={`nav-link ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        {/* === Overview Tab === */}
        {activeTab === 'overview' && (
          <>
            <div className="row g-4 mb-4">
              {summaries
                .filter((item) => selectedSummary === 'all' || selectedSummary === item.type)
                .map((item, index) => (
                  <div className="col-md-6 col-xl-3" key={index}>
                    <div className={`card shadow border-0 text-center summary-card ${selectedSummary === item.type ? 'active-summary' : ''}`} onClick={() => handleClick(item.type)} style={{ cursor: 'pointer' }}>
                      <div className="card-body">
                        {item.icon}
                        <h6 className="card-title mt-2 fw-semibold">{item.title}</h6>
                        <p className="card-text">{item.data}</p>
                        <div className="progress" style={{ height: '6px' }}>
                          <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${item.progress}%`, backgroundColor: '#007bff' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {selectedSummary !== 'all' && (
              <div className="text-end mb-4">
                <button className="btn btn-outline-secondary btn-sm" onClick={() => setSelectedSummary('all')}>
                  Show All Summaries
                </button>
              </div>
            )}

            <div className="card shadow-sm mt-5 p-4">
              <h5 className="mb-3">Work Analytics (Chart Placeholder)</h5>
              <div className="border bg-light d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                📈 Chart will appear here (e.g., bar/line graph)
              </div>
            </div>
          </>
        )}

        {/* === Pending Tab === */}
       {activeTab === 'pending' && (
  <div className="card shadow-sm p-4">
    <h5 className="fw-semibold mb-3">Pending Timesheets</h5>
    <p>Review and approve team member timesheets.</p>

    <Link to="/tl/edit-timesheet" className="btn btn-sm btn-primary me-2" style={{ width: '140px' }}>
      <FaEdit className="me-1" /> Edit
    </Link>
    <Link to="/tl/add-members" className="btn btn-sm btn-outline-primary" style={{ width: '140px' }}>
      <FaUserPlus className="me-1" /> Add
    </Link>

    <div className="mt-4">
      <h6>Quick Actions:</h6>
      <button className="btn btn-sm btn-outline-success me-2" onClick={handleApproveAllTimesheets}>
        <FaCheck className="me-1" /> Approve All
      </button>
      <button className="btn btn-sm btn-outline-danger" onClick={handleRejectAllTimesheets}>
        <FaTimes className="me-1" /> Reject All
      </button>
    </div>

    {/* 🔽 🔽 🔽 ADD THIS BLOCK HERE 🔽 🔽 🔽 */}
    <div className="mt-4">
      <h6>Pending Entries:</h6>
      {Object.entries(timesheetData).map(([employee, empEntries]) => (
        <div key={employee} className="mb-3">
          <h6 className="text-primary">{employee}</h6>
          {Object.entries(empEntries).map(([date, entries]) =>
            entries
              .filter(e => !e.approved && !e.rejected)
              .map((entry, idx) => (
                <div key={idx} className="border p-2 rounded small bg-light mb-2">
                  <strong>{date}</strong> — {entry.projectName} → {entry.task} ({entry.hours}h)
                </div>
              ))
          )}
        </div>
      ))}
    </div>
    {/* 🔼 END OF PENDING LIST BLOCK */}
  </div>
)}


        {/* === Team Tab === */}
        {activeTab === 'team' && (
          <div>
<div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
              <h5 className="fw-semibold">Team Members</h5>
              <div className="input-group w-50">
                <span className="input-group-text"><FaSearch /></span>
                <input type="text" className="form-control" placeholder="Search by name or ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>

            <div className="list-group">
              {teamMembers
                .filter((name) => name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((member, i) => (
                  <div key={i} className="list-group-item d-flex justify-content-between align-items-center shadow-sm">
                    <div>
                      <strong>{member}</strong>
                      <p className="mb-0 text-muted">Role: Developer</p>
                    </div>
                    <button className="btn btn-sm btn-danger" onClick={() => alert('Feature to remove member can be added.')}>Remove</button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Styles */}
        <style>{`
          .summary-card {
            transition: transform 0.3s ease, background-color 0.3s ease;
          }
          .summary-card:hover {
            background-color: #f9f9f9;
            transform: scale(1.02);
          }
          .summary-card.active-summary {
            border: 2px solid #007bff;
            background-color: #f0f8ff;
          }
          .nav-tabs .nav-link.active {
            font-weight: 600;
          }
        `}</style>
      </div>
    </div></div>
  );
};

export default TLdashboard;
