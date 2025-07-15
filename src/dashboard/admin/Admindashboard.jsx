import React from 'react';
import { FaUserFriends, FaProjectDiagram, FaClock, FaBuilding } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Total Users',
      value: '2,500',
      change: 'All active',
      icon: <FaUserFriends />,
      bg: 'linear-gradient(135deg, #f5576c, #f093fb)',
      path: 'members',
    },
    {
      title: 'Total Projects',
      value: '5',
      change: 'Ongoing & Completed',
      icon: <FaProjectDiagram />,
      bg: 'linear-gradient(135deg, #36d1dc, #5b86e5)',
      path: 'projects',
    },
    {
      title: 'Billable Hours',
      value: '420',
      change: 'This month',
      icon: <FaClock />,
      bg: 'linear-gradient(135deg, #43e97b, #38f9d7)',
      path: 'billable-hours',
    },
    {
      title: 'Departments',
      value: '6',
      change: 'Updated structure',
      icon: <FaBuilding />,
      bg: 'linear-gradient(135deg, #ff9966, #ff5e62)',
      path: 'departments',
    },
  ];

  return (
    <div className="container-fluid px-4 py-4">
      <h2 className="fw-bold mb-4">Welcome Admin</h2>

      {/* Gradient Cards */}
      <div className="row g-4">
        {cards.map((card, index) => (
          <div className="col-md-3" key={index}>
            <div
              className="card-box p-4 text-white"
              style={{ background: card.bg, cursor: 'pointer' }}
              onClick={() => navigate(card.path)}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">{card.title}</h6>
                <span className="fs-5">{card.icon}</span>
              </div>
              <h3 className="fw-bold">{card.value}</h3>
              <p className="mb-0" style={{ fontSize: '0.9rem' }}>{card.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Placeholder */}
      <div className="row mt-4 g-4">
        <div className="col-md-6">
          <div className="chart-card p-4">
            <h5 className="fw-semibold mb-3">Visit And Sales Statistics</h5>
            <div className="chart-placeholder">Bar/Line chart placeholder</div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="chart-card p-4">
            <h5 className="fw-semibold mb-3">Traffic Sources</h5>
            <div className="chart-placeholder">Donut/Pie chart placeholder</div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .card-box {
          border-radius: 16px;
          color: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease;
        }

        .card-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
        }

        .chart-card {
          background: #81b2e2ff;
          border-radius: 12px;
          border: 1px solid #ddd;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .chart-card:hover {
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
        }

        .chart-placeholder {
          background: #e9ecef;
          height: 220px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
