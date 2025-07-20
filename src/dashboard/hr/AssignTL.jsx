import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import './AssignTL.css';

const AssignTL = () => {
  const [project, setProject] = useState('');
  const [teamLead, setTeamLead] = useState('');

  const handleAssign = (e) => {
    e.preventDefault();
    alert(`Assigned ${teamLead} to ${project}`);
  };

  return (
    <Container fluid className="assign-tl-wrapper">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="assign-tl-card shadow-sm">
            <Card.Body>
              <h3 className="form-title text-center mb-4">Assign Team Lead</h3>
              <Form onSubmit={handleAssign}>
                <Form.Group className="mb-3">
                  <Form.Label>Project</Form.Label>
                  <Form.Control
                    type="text"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    placeholder="Enter project name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Team Lead</Form.Label>
                  <Form.Control
                    type="text"
                    value={teamLead}
                    onChange={(e) => setTeamLead(e.target.value)}
                    placeholder="Enter TL name"
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Assign
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AssignTL;
