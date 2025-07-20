import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './CompanyOverview.css';

const CompanyOverview = () => {
  return (
    <Container fluid className="company-overview-wrapper">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h3 className="overview-title text-center mb-4">Company Overview</h3>
          <Card className="company-overview-card shadow-sm">
            <Card.Body>
              <p><strong>Founded:</strong> 2021</p>
              <p><strong>Total Employees:</strong> 58</p>
              <p><strong>Projects:</strong> 12 active, 4 completed</p>
              <p><strong>Departments:</strong> HR, Development, QA, Support</p>
              <p><strong>Office Locations:</strong> Chennai, Bangalore</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyOverview;
