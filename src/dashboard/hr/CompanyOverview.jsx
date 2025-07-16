import React from 'react';
import { Card } from 'react-bootstrap';
import './CompanyOverview.css';

const CompanyOverview = () => {
  return (
    <div className="company-overview-container">
      <h3 className="mb-4">Company Overview</h3>
      <Card className="company-overview-card">
        <p><strong>Founded:</strong> 2021</p>
        <p><strong>Total Employees:</strong> 58</p>
        <p><strong>Projects:</strong> 12 active, 4 completed</p>
        <p><strong>Departments:</strong> HR, Development, QA, Support</p>
        <p><strong>Office Locations:</strong> Chennai, Bangalore</p>
      </Card>
    </div>
  );
};

export default CompanyOverview;