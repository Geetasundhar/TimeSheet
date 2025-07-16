// HRDashboard.jsx
import React from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import './hrdashboard.css';
const HRDashboard = () => {
  return (
    <div className="container mt-4 hr-dashboard">
      <h3 className="mb-5 fw-semibold text-center">HR Dashboard</h3>

      <Row className="mb-5 justify-content-center">
        <Col md={4}>
          <Card className="shadow-sm feature-card">
            <Card.Body className="text-center">
              <h5>Total Employees</h5>
              <h3>58</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm feature-card">
            <Card.Body className="text-center">
              <h5>Active Projects</h5>
              <h3>12</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm feature-card">
            <Card.Body className="text-center">
              <h5>Team Leads</h5>
              <h3>6</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h5 className="text-center mb-4">Recent Team Assignments</h5>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead>
          <tr>
            <th>Project</th>
            <th>Team Lead</th>
            <th>Team Size</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Leave Tracker</td>
            <td>Ashwin Kumar</td>
            <td>5</td>
            <td>Ongoing</td>
          </tr>
          <tr>
            <td>Payroll Integration</td>
            <td>Divya R</td>
            <td>4</td>
            <td>Planning</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default HRDashboard;
