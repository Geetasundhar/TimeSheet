import React from 'react';
import { FaUserFriends, FaProjectDiagram, FaClock, FaBuilding } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AdminAnalytics from './components/AdminAnalytics'; // ✅ Importing the graph component

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Total Users',
      value: '2,500',
      change: 'All active',
      icon: <FaUserFriends />,
      bg: '#d0e3faff',
      path: 'members',
    },
    {
      title: 'Total Projects',
      value: '5',
      change: 'Ongoing & Completed',
      icon: <FaProjectDiagram />,
      bg: '#d0e3faff',
      path: 'projects',
    },
    {
      title: 'Billable Hours',
      value: '420',
      change: 'This month',
      icon: <FaClock />,
      bg: '#d0e3faff',
      path: 'billable-hours',
    },
    {
      title: 'Departments',
      value: '6',
      change: 'Updated structure',
      icon: <FaBuilding />,
      bg: '#d0e3faff',
      path: 'departments',
    },
  ];

  return (
    <div className="container-fluid px-4 py-4 dashboard-bg">
      <h2 className="fw-bold mb-4 text-primary">Welcome Admin</h2>

      {/* Summary Cards */}
      <div className="row g-4">
        {cards.map((card, index) => (
          <div className="col-md-3" key={index}>
            <div
              className="card-box p-4"
              style={{ background: card.bg, cursor: 'pointer' }}
              onClick={() => navigate(card.path)}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0 text-primary">{card.title}</h6>
                <span className="fs-5 text-muted">{card.icon}</span>
              </div>
              <h3 className="fw-bold text-dark">{card.value}</h3>
              <p className="mb-0 text-secondary" style={{ fontSize: '0.9rem' }}>{card.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Section Title */}
      <div className="mt-5 mb-3">
        <h4 className="fw-semibold text-primary">Analytics Overview</h4>
        <hr className="mb-4" />
      </div>

      {/* 👇 Real Graphs Instead of Placeholders */}
      <AdminAnalytics />

      {/* Styles */}
      <style>{`
        .dashboard-bg {
          background: #ebf1f9cd;
          min-height: 100vh;
        }

        .card-box {
          border-radius: 16px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }

        .card-box:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
        }

        hr {
          border-top: 2px solid #c3d5f0;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
