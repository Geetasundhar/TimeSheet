import React from 'react';
import { FaUserFriends, FaProjectDiagram, FaClock, FaBuilding } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AdminAnalytics from './components/AdminAnalytics'; 

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Total Users',
      value: '2,500',
      change: 'All active',
      icon: <FaUserFriends />,
      path: 'members',
    },
    {
      title: 'Total Projects',
      value: '5',
      change: 'Ongoing & Completed',
      icon: <FaProjectDiagram />,
      path: 'projects',
    },
    {
      title: 'Billable Hours',
      value: '420',
      change: 'This month',
      icon: <FaClock />,
      path: 'billable-hours',
    },
    {
      title: 'Departments',
      value: '6',
      change: 'Updated structure',
      icon: <FaBuilding />,
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
              className="card-box"
              onClick={() => navigate(card.path)}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="card-title">{card.title}</div>
                  <div className="card-value">{card.value}</div>
                  <div className="card-change">{card.change}</div>
                </div>
                <div className="card-icon">{card.icon}</div>
              </div>
              <div className="mini-chart" />
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="mt-5 mb-3">
        <h4 className="fw-semibold text-primary">Analytics Overview</h4>
        <hr className="mb-4" />
      </div>

      <AdminAnalytics />

      {/* Style Section */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        .dashboard-bg {
          background: #f0f4f8;
          min-height: 100vh;
          font-family: 'Poppins', sans-serif;
        }

        .card-box {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
          padding: 20px 24px;
        }

        .card-box:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
        }

        .card-title {
          font-size: 0.95rem;
          font-weight: 500;
          color: #6c757d;
        }

        .card-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: #212529;
          margin-top: 8px;
        }

        .card-change {
          font-size: 0.85rem;
          color: #7c8a9a;
        }

        .card-icon {
          font-size: 1.5rem;
          color: #0d6efd;
          background: #e7f0ff;
          border-radius: 50%;
          padding: 8px;
        }

        .mini-chart {
          width: 100%;
          height: 40px;
          background: linear-gradient(90deg, #d0e3fa 0%, #c0d4ee 100%);
          border-radius: 8px;
          margin-top: 14px;
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