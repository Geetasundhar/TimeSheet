import React from "react";
import { Card, Row, Col, Table } from "react-bootstrap";
import "./hrdashboard.css";

const HRDashboard = () => {
  return (
    <div className="hr-dashboard-container">
      <header className="hr-dashboard-header">
        <h2 className="hr-title">HR Dashboard</h2>
        <p className="hr-subtitle">Projects and Assignments Overview</p>
      </header>

      <Row className="summary-row">
        <Col md={4}>
          <Card className="summary-card">
            <Card.Body>
              <h5>Total Employees</h5>
              <h3>58</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="summary-card">
            <Card.Body>
              <h5>Active Projects</h5>
              <h3>12</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="summary-card">
            <Card.Body>
              <h5>Team Leads</h5>
              <h3>6</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h4 className="table-title">Recent Team Assignments</h4>
      <Table striped bordered hover responsive className="assignment-table">
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
