import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  CartesianGrid
} from 'recharts';

// Theme colors
const blueColor = '#0d6efd';     // Bootstrap Primary
const lightBlue = '#5bc0de';     // Soft Blue for line
const borderColor = '#e0e0e0';   // Light grid lines

const AdminAnalytics = () => {
  const [projectHoursData, setProjectHoursData] = useState([]);
  const [timesheetSubmissionData, setTimesheetSubmissionData] = useState([]);

  // Dummy data generators
  const generateDummyProjectHours = () => [
    { name: 'Project A', hours: Math.floor(Math.random() * 200) },
    { name: 'Project B', hours: Math.floor(Math.random() * 150) },
    { name: 'Project C', hours: Math.floor(Math.random() * 180) },
    { name: 'Project D', hours: Math.floor(Math.random() * 100) }
  ];

  const generateDummySubmissions = () => [
    { week: 'Week 1', submissions: Math.floor(Math.random() * 50) },
    { week: 'Week 2', submissions: Math.floor(Math.random() * 50) },
    { week: 'Week 3', submissions: Math.floor(Math.random() * 50) },
    { week: 'Week 4', submissions: Math.floor(Math.random() * 50) }
  ];

  useEffect(() => {
    // Initial data
    setProjectHoursData(generateDummyProjectHours());
    setTimesheetSubmissionData(generateDummySubmissions());

    // Simulate real-time updates every 15 seconds
    const interval = setInterval(() => {
      setProjectHoursData(generateDummyProjectHours());
      setTimesheetSubmissionData(generateDummySubmissions());
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="row">
      {/* Project Hours Bar Chart */}
      <div className="col-md-6 mb-4">
        <div className="card shadow p-3" style={styles.card}>
          <h5 className="text-center mb-3" style={styles.title}>Project-wise Logged Hours</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectHoursData}>
              <CartesianGrid stroke={borderColor} strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip />
              <Legend />
              <Bar dataKey="hours" fill={blueColor} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Timesheet Submissions Line Chart */}
      <div className="col-md-6 mb-4">
        <div className="card shadow p-3" style={styles.card}>
          <h5 className="text-center mb-3" style={styles.title}>Weekly Timesheet Submissions</h5>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timesheetSubmissionData}>
              <CartesianGrid stroke={borderColor} strokeDasharray="3 3" />
              <XAxis dataKey="week" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="submissions"
                stroke={lightBlue}
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Optional inline styles
const styles = {
  card: {
    borderRadius: '16px',
    backgroundColor: '#f8fbff',
    boxShadow: '0 4px 12px rgba(13, 110, 253, 0.1)'
  },
  title: {
    color: blueColor,
    fontWeight: '600'
  }
};

export default AdminAnalytics;
