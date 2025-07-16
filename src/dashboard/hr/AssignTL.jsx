import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './AssignTL.css';

const AssignTL = () => {
  const [project, setProject] = useState('');
  const [teamLead, setTeamLead] = useState('');

  const handleAssign = (e) => {
    e.preventDefault();
    alert(`Assigned ${teamLead} to ${project}`);
  };

  return (
   <div className="assign-tl-container">

      <h3 className="mb-4">Assign Team Lead</h3>
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

        <Form.Group className="mb-3">
          <Form.Label>Team Lead</Form.Label>
          <Form.Control
            type="text"
            value={teamLead}
            onChange={(e) => setTeamLead(e.target.value)}
            placeholder="Enter TL name"
            required
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Assign
        </Button>
      </Form>
    </div>
  );
};

export default AssignTL;
